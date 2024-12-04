// Import Packages
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/router"

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

// Interface
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

const OrderSection = () => {
  // Router
  const router = useRouter()

  // State
  const { token } = useAuth()

  const [userID, setUserID] = useState<string>("")
  const [orders, setOrders] = useState<Orders[]>([])
  const [search, setSearch] = useState<string>("")
  const [filteredOrders, setFilteredOrders] = useState(orders)
  const [totalOrders, setTotalOrders] = useState<number>(0)

  // Variable
  const orderFilterBy = ["baru", "proses", "selesai", "belum", "lunas"]
  const orderSortBy = ["terbaru", "terlama"]
  const orderColumn = ["name", "quantity", "weight", "status", "order_date", "payment", "total_price"]

  const getOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/admin/transaction-order/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("res:", response)
      setOrders(response.data.data.transaction_order)
      setTotalOrders(response.data.data.total_data_transaction)

      if (response.data.data.transaction_order.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No Data Found",
          text: "There are no orders available",
          background: "#18212E",
        });
        router.push("/home/user")
      }
    } catch (error) {
      console.log(error)
    }
  }, [token, userID, router])

  // Util
  const isDesktop = useHandleResize()

  // Function
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filterOrder = (option: string) => {
    switch (option) {
      case "baru":
        setFilteredOrders(orders.filter(order => order.status === "new"))
        break;
      case "proses":
        setFilteredOrders(orders.filter(order => order.status === "process"))
        break;
      case "selesai":
        setFilteredOrders(orders.filter(order => order.status === "done"))
        break;
      case "belum":
        setFilteredOrders(orders.filter(order => order.payment_status === "unpaid"))
        break;
      case "lunas":
        setFilteredOrders(orders.filter(order => order.payment_status === "paid"))
        break;
      case "terbaru":
        setFilteredOrders([...orders].sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime()))
        break;
      case "terlama":
        setFilteredOrders([...orders].sort((a, b) => new Date(a.order_date).getTime() - new Date(b.order_date).getTime()))
        break;
      default:
        setFilteredOrders(orders)
    }
  }

  // Effect
  useEffect(() => {
    const login = sessionStorage.getItem("login") === "true"
    const rememberMe = localStorage.getItem("rememberMe") === "true"
    if (!login && !rememberMe) { router.push("/login") }
    setUserID(String(router.query.slug))
    getOrders()
  }, [router, getOrders])

  useEffect(() => {
    if (search === "") {
      setFilteredOrders(orders)
    } else {
      const searching = orders.filter(order => order.package_laundry.name.toLowerCase().includes(search.toLowerCase()))
      setFilteredOrders(searching)
    }
  }, [search, orders])

  // Undefined
  const [users] = useState<User[]>([])
  const changeStatusUser = () => { }
  const deleteUser = () => { }
  const handleUserOrder = () => { }

  return (
    <>
      {isDesktop ? (
        <div className="flex fixed">
          <Sidebar page="/home/user" />
          <Table
            option={"order"}
            search={search}
            handleSearch={handleSearch}
            filtering={filterOrder}
            filterBy={orderFilterBy}
            sortBy={orderSortBy}
            columns={orderColumn}
            users={users}
            totalData={totalOrders}
            changeStatusUser={changeStatusUser}
            handleUserOrder={handleUserOrder}
            deleteUser={deleteUser}
            orders={filteredOrders}
          />
        </div>
      ) : (
        <MobileSize />
      )}
    </>
  )
}

export default OrderSection