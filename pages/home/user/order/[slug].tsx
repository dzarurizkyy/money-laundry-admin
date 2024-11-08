import { useState, useEffect } from "react"
import Table from "../../../templates/table"
import orderResponse from "@/dummy/orderResponse"
import userResponse from "@/dummy/userResponse"
import Sidebar from "@/pages/templates/sidebar"

const OrderSection = () => {
  const [users]   = useState(userResponse.data)
  const [orders, setOrders] = useState(orderResponse.data)
  const [search, setSearch] = useState<string>("")

  // Variables
  const orderFilterBy = ["baru", "diproses", "selesai", "belum_bayar", "lunas"]
  const orderSortBy   = ["terbaru", "terlama"]
  const orderColumn   = ["name", "quantity", "weight", "status", "order_date", "payment", "total_price"]
  
  // Functions
  const changeStatusUser = () => {}
  const deleteUser = () => {}
  const filterUser = () => {}

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  
  // Effect
  useEffect(() => {
    if(search === "") {
      setOrders(orderResponse.data)
    } else {
      const searching = orders.filter(order => order.name.toLowerCase().includes(search.toLowerCase()))      
      setOrders(searching)  
    }
  }, [search])


  return (
    <div className="flex fixed">
      <Sidebar page="/home/user" />
      <Table 
        option={"order"} 
        search={search} 
        handleSearch={handleSearch}
        filtering={filterUser}
        filterBy={orderFilterBy}
        sortBy={orderSortBy}
        columns={orderColumn}
        users={users}
        changeStatusUser={changeStatusUser}
        deleteUser={deleteUser}
        orders={orders}
      />
    </div>
  )
}

export default OrderSection;