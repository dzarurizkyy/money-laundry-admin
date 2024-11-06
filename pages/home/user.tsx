import { useState, useEffect } from "react";

import { IoMdSearch, IoIosArrowDown } from "react-icons/io";
import { GiPadlockOpen } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";

// Import Libraries
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

import userResponse from "@/dummy/userResponse";

type UserSection = {
  open: boolean
}

const UserSection = ({open} : UserSection) => {
    const [users, setUsers] = useState(userResponse.data)
    const [search, setSearch] = useState<string>("")

    const totalUsers = () => {
      const Message = () => (<div>MoneyLaundry App has <span className="font-extrabold">{userResponse.total_data}</span> users</div>) 
      toast.info(<Message />, { style: { fontSize: "13px"}});
    }

    const changeStatusUser = () => {
      Swal.fire({
        title: "User Status",
        text: "Are you sure you want to change the user status to paid?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it",
        width: "600px"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Changed!",
            text: "The user status has been changed to paid.",
            icon: "success"
          });
        }
      });
    }

    const deleteUser = () => {
      Swal.fire({
        title: "Delete User",
        text: "Are you sure you want to delete this user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete user",
        width: "600px"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "The user has been succesfully deleted.",
            icon: "success"
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

    useEffect(() => {
      if(search === "") {
        setUsers(userResponse.data)
      } else {
        const searching = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))      
        setUsers(searching)  
      }
    }, [search])

  return (
    <div className={`flex bg-[#F7F8FC] ${open ? "w-[82vw]" : "w-[95vw]"} h-screen justify-center py-6 duration-300`}>
      {/* Card */}
      <div className={`flex flex-col items-center p-7 text-2xl font-semibold ${open ? "w-[75vw]" : "w-[89vw]"} bg-white rounded-lg duration-300 shadow-custom gap-y-5`}>
        {/* Header */}
        <div className="flex items-center justify-between text-2xl font-bold w-full border-b pb-5">
          <div>List of Users</div>
          <div>
            <button className="bg-green-500 hover:hover:brightness-110 text-white font-semibold py-3 px-6 text-sm rounded-md" onClick={ totalUsers}>
              Total Users
            </button>
          </div>
        </div>
        {/* Search & Filter */}
        <div className="flex justify-between items-center w-full">
          {/* Search */}
          <div className="relative flex items-center text-gray-400 w-72 focus-within:text-gray-600">
            <IoMdSearch className="w-5 h-5 absolute ml-3 pointer-events-none"/>
            <input 
              type="text" 
              name="search"
              placeholder="Search user..."
              autoComplete="off"
              className="w-full px-3 py-2 pl-10 font-semibold placeholder-gray-400 text-black text-sm rounded-md bg-[#F7F8FC] focus:ring-gray-500 focus:ring-2 focus:outline-none" 
              value={search}
              onChange={handleSearch} />
          </div>
          {/* Filter By & Sort By*/}
          <div className="flex gap-x-2">
            {/* Filter By */}
            <div>
              <button className="relative flex justify-center items-center bg-[#F7F8FC] text-gray-400 text-sm rounded-md hover:bg-gray-100 focus:outline-none focus:ring-gray-500 focus:ring-2 group">
                <div className="px-5 py-2">Filter By</div>
                <span className="pr-4">
                  <IoIosArrowDown />
                </span>
                <div className="absolute hidden group-focus:block top-full w-full bg-white shadod-sm mt-2">
                  <ul className="text-left border rounded-md">
                    <li className="px-4 py-1 hover:bg-gray-100 border-b" onClick={() => filterUser("free")}>Free</li>
                    <li className="px-4 py-1 hover:bg-gray-100 border-b" onClick={() => filterUser("paid")}>Paid</li>
                  </ul>
                </div>
              </button>
            </div>
            {/* Sort By */}
            <div>
              <button className="relative flex justify-center items-center bg-[#F7F8FC] text-gray-400 text-sm rounded-md hover:bg-gray-100 focus:outline-none focus:ring-gray-500 focus:ring-2 group">
                <div className="px-5 py-2">Sort By</div>
                <span className="pr-4">
                  <IoIosArrowDown />
                </span>
                <div className="absolute hidden group-focus:block top-full w-full bg-white shadod-sm mt-2">
                  <ul className="text-left border rounded-md">
                    <li className="px-4 py-1 hover:bg-gray-100 border-b" onClick={() => filterUser("newest")}>Newest</li>
                    <li className="px-4 py-1 hover:bg-gray-100 border-b" onClick={() => filterUser("oldest")}>Oldest</li>
                  </ul>
                </div>
              </button>
            </div>
          </div>          
        </div>
        {/* Table */}
        <div className="w-full my-3 overflow-y-auto">
          <table className="border-collapse border-spacing-x-6 w-full text-sm">
            <thead className="border-b-2 border-[#03242F] text-gray-400 text-center">
              <tr>
                <td className="pb-4">Name</td>
                <td className="pb-4">Email</td>
                <td className="pb-4">Status</td>
                <td className="pb-4">Created At</td>
                <td className="pb-4">Updated At</td>
                <td className="pb-4">Action</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr className={`${index % 2 === 0 ? "bg-[#F7F8FC]" : "bg-white"}  text-center`}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="flex justify-center items-center h-[84px]">
                    <div className="bg-white py-2 rounded-full flex ps-4 items-center gap-2 w-[96px] border-2">
                      <div className={`${user.status === "free" ? "bg-[#00C97F]" : "bg-[#216BFE]"}  rounded-full w-3 h-3`} />
                      <div>{(user.status[0].toUpperCase() + user.status.slice(1))}</div>
                    </div>
                  </td>
                  <td>{user.created_at.split("T")[0]}</td>
                  <td>{user.updated_at.split("T")[0]}</td>
                  <td className="flex justify-center items-center gap-2">
                    <div className="w-12 h-9 bg-[#216BFE] text-white flex justify-center items-center rounded-md hover:brightness-125 cursor-pointer" onClick={changeStatusUser}>
                      <GiPadlockOpen />
                    </div>
                    <div className="w-12 h-9 bg-[#FF5771] text-white flex justify-center items-center rounded-md hover:brightness-125 cursor-pointer" onClick={deleteUser}>
                      <MdDeleteForever />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default UserSection;