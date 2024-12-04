// Import Packages
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

// Import Libraries
import axios from "axios"
import Swal from "sweetalert2"

// Import Components
import { MobileSize } from "@/components"

// Import Templates
import { Sidebar, Table } from "@/pages/templates"

// Import Functions
import useHandleResize from "@/utils/handleResize"

// Import Context
import { useAuth } from "@/context/authContext"

// Interfaces
interface User {
  users_id: number,
  name: string,
  email: string,
  account_status: { name: string },
  created_at: string,
  updated_at: string,
}
interface Orders {
  transaction_order_id: number,
  package_laundry: { name: string },
  quantity: number,
  weight: number,
  status: string,
  order_date: string,
  payment_status: string,
  total_price: number
}

const UserSection = () => {
  // Router
  const router = useRouter()

  // Context
  const { token } = useAuth()

  // Util
  const isDesktop = useHandleResize()

  // State
  const [users, setUsers] = useState<User[]>([])
  const [totalUser, setTotalUser] = useState<number>(0)
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [search, setSearch] = useState<string>("")

  // Variable
  const userFilterBy = ["free", "paid"]
  const userSortBy = ["newest", "oldest"]
  const userColumn = ["name", "email", "status", "created_at", "updated_at", "action"]

  // Axios
  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/admin/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUsers(response.data.data.users)
      setFilteredUsers(response.data.data.users)
      setTotalUser(response.data.data.total_data)
    } catch (error) {
      console.log(error)
    }
  }, [token])

  const changeStatusUser = async (id: number) => {
    const user = users.find(user => user.users_id === id);
    if (!user || user.account_status.name === "paid") {
      Swal.fire({
        title: "No Change!",
        text: "No changes were made to the user status.",
        icon: "error",
        background: "#18212E",
      });
      return
    }

    Swal.fire({
      title: "Update User Status",
      html: `
          <div class="flex flex-col gap-4 mt-4 w-full">
            <div class="select-wrapper">
              <select id="subscription" class="swal2-input border border-gray-400 rounded-lg text-gray-400 bg-[#18212E] w-full cursor-pointer">
                <option value="" disabled selected>Select subscription duration</option>
                <option value="1">1 Month</option>
                <option value="3">3 Month</option>
              </select>
            </div>
          </div>
        `,
      background: "#18212E",
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonColor: "#D33",
      confirmButtonColor: "#3085D6"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const element = document.getElementById("subscription") as HTMLSelectElement
        const price = element?.value === "1" ? 50000 : 130000

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/admin/transaction-member`,
            {
              users_id: Number(id),
              subscription_range: Number(element?.value),
              total_price: Number(price)
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          if (response.status === 200) {
            getUsers()
            Swal.fire({
              title: "Changed!",
              text: "The user status has been changed to paid.",
              icon: "success",
              background: "#18212E",
            });
          } else {
            Swal.fire({
              title: "No Change!",
              text: "No changes were made to the user status.",
              icon: "error",
              background: "#18212E",
            });
          }
        } catch (error) {
          console.log("err :", error)
        }
      }
    })
  }

  const deleteUser = (id: number) => {
    Swal.fire({
      title: "Delete User",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user",
      width: "600px",
      background: "#18212E",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/admin/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if (response.status === 200) {
            getUsers()
            Swal.fire({
              title: "Deleted!",
              text: "The user has been succesfully deleted.",
              icon: "success",
              background: "#18212E",
            });
          } else {
            Swal.fire({
              title: "Failed",
              text: "The user unsuccessfully deleted. Please try again !!",
              icon: "error",
              background: "#18212E",
            });
          }
        }
        catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An internal error occured during your request",
            icon: "error",
            background: "#18212E",
          })
        }
      }
    })
  }

  // Function
  const handleUserOrder = (id: number) => {
    router.push(`/home/user/order/${id}`)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filterUser = (option: string) => {
    switch (option) {
      case "paid":
        setFilteredUsers(users.filter(user => user.account_status.name === "paid"))
        break;
      case "free":
        setFilteredUsers(users.filter(user => user.account_status.name === "free"))
        break;
      case "newest":
        setFilteredUsers([...users].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()))
        break;
      case "oldest":
        setFilteredUsers([...users].sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()))
        break;
      default:
        setFilteredUsers(users)
    }
  }

  // Effect
  useEffect(() => {
    if (sessionStorage.getItem("login") !== "true" && localStorage.getItem("rememberMe") !== "true") { router.push("/login") }
    getUsers()
  }, [router, getUsers])

  useEffect(() => {
    if (search === "") {
      setFilteredUsers(users)
    } else {
      const searching = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
      setFilteredUsers(searching)
    }
  }, [search, users])

  // Undefined
  const [orders] = useState<Orders[]>([])
  
  return (
    <>
      {isDesktop ? (
        <div className="flex fixed">
          <Sidebar page="/home/user" />
          <Table
            option={"user"}
            search={search}
            handleSearch={handleSearch}
            filtering={filterUser}
            filterBy={userFilterBy}
            sortBy={userSortBy}
            columns={userColumn}
            users={filteredUsers}
            totalData={totalUser}
            changeStatusUser={changeStatusUser}
            handleUserOrder={handleUserOrder}
            deleteUser={deleteUser}
            orders={orders}
          />
        </div>
      ) : (
        <MobileSize />
      )}
    </>
  )
}

export default UserSection