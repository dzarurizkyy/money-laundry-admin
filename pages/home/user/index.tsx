import { useState, useEffect } from "react";
import Table from "@/pages/templates/table";
import Swal from 'sweetalert2'
import userResponse from "@/dummy/userResponse";
import orderResponse from "@/dummy/orderResponse";
import Sidebar from "@/pages/templates/sidebar";

const UserSection = () => {
    // States
    const [users, setUsers] = useState(userResponse.data)
    const [search, setSearch] = useState<string>("")

    const orders = orderResponse.data

    // Variables
    const userFilterBy = ["free", "paid"]
    const userSortBy = ["newest", "oldest"]
    const userColumn = ["name", "email", "status", "created_at", "updated_at", "action"]

    // Functions
    const changeStatusUser = (id: number) => {
      Swal.fire({
        title: "User Status",
        text: "Are you sure you want to change the user status to paid?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it",
        width: "600px",
        background: "#18212E",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedUsers = users && users.map(user => user.id === id && user.status !== "paid" ? { ...user, status: "paid" } : user)

          if (JSON.stringify(updatedUsers) !== JSON.stringify(users)) {
            setUsers(updatedUsers);
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
        }
      });
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
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedUsers =  users.filter(user => user.id !== id)
          setUsers(updatedUsers)

          Swal.fire({
            title: "Deleted!",
            text: "The user has been succesfully deleted.",
            icon: "success",
            background: "#18212E",
          });
        }
      });
    }

    const filterUser = (option: string) => {  
      switch(option) {
        case "paid" : 
          setUsers(userResponse.data.filter(user => user.status === "paid"))
          break;
        case "free" :
          setUsers(userResponse.data.filter(user => user.status === "free"))
          break;
        case "newest" :
          setUsers([...userResponse.data].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()))
          break;
        case "oldest" :
          setUsers([...userResponse.data].sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()))
          break;
        default :
         setUsers(userResponse.data)
      }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    }
    
    // Effect
    useEffect(() => {
      if(search === "") {
        setUsers(userResponse.data)
      } else {
        const searching = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))      
        setUsers(searching)  
      }
    }, [search])
    
  return (
    <div className="flex fixed">
      <Sidebar page="/home/user"/>
      <Table 
        option={"user"} 
        search={search} 
        handleSearch={handleSearch}
        filtering={filterUser}
        filterBy={userFilterBy}
        sortBy={userSortBy}
        columns={userColumn}
        users={users}
        changeStatusUser={changeStatusUser}
        deleteUser={deleteUser}
        orders={orders}
        />
    </div>
  )
}

export default UserSection;