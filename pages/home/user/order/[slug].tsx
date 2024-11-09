// Import Packages
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Import Components
import { MobileSize } from "@/components"

// Import Templates
import Table from "@/pages/templates/table"
import Sidebar from "@/pages/templates/sidebar"

// Import Functions
import useHandleResize from "@/utils/handleResize"

// Import Responses
import orderResponse from "@/dummy/orderResponse"
import userResponse from "@/dummy/userResponse"

const OrderSection = () => {
  // States
  const [orders] = useState(orderResponse.data)
  const [search, setSearch] = useState<string>("")
  const [filteredOrders, setFilteredOrders] = useState(orderResponse.data)

  // Variables
  const orderFilterBy = ["baru", "proses", "selesai", "belum", "lunas"]
  const orderSortBy   = ["terbaru", "terlama"]
  const orderColumn   = ["name", "quantity", "weight", "status", "order_date", "payment", "total_price"]
  
  // Util
  const isDesktop = useHandleResize()

  // Router
  const router = useRouter()

  // Functions
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  
  const filterOrder = (option: string) => {
    switch(option) {
      case "baru" :
        setFilteredOrders(orders.filter(order => order.status === "baru"))
        break;
      case "proses" :
        setFilteredOrders(orders.filter(order => order.status === "proses"))
        break;
      case "selesai" :
        setFilteredOrders(orders.filter(order => order.status === "selesai"))
        break;
      case "belum" :
        setFilteredOrders(orders.filter(order => order.payment === "belum"))
        break;
      case "lunas" :
        setFilteredOrders(orders.filter(order => order.payment === "lunas"))
        break;
      case "terbaru" :
        setFilteredOrders([...orders].sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime()))
        break;
      case "terlama" :
        setFilteredOrders([...orders].sort((a, b) => new Date(a.order_date).getTime() - new Date(b.order_date).getTime()))
        break;
      default :
        setFilteredOrders(orders)
    }
  } 

  // Effect
  useEffect(() => {
    const login = localStorage.getItem("login")
    if(login !== "true"){router.push("/login")}
  }, [router])

  useEffect(() => {
    if(search === "") {
      setFilteredOrders(orders)
    } else {
      const searching = orders.filter(order => order.name.toLowerCase().includes(search.toLowerCase()))      
      setFilteredOrders(searching)  
    }
  }, [search, orders])

  // Undefined
  const [users] = useState(userResponse.data)
  const changeStatusUser = () => {}
  const deleteUser = () => {}
  const handleUserOrder = () => {}

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