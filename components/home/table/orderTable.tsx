type OrderTableProps = {
  orders: Array<{id: number, name: string, order_date: string, status: string, payment: string, weight: number, total_price: number, quantity: number}>
}

const OrderTable = ({orders} : OrderTableProps) => {
  return (
    <tbody>
      {orders && orders.map((order, index) => (
        <tr className={`${index % 2 === 0 ? "bg-[#18212E]" : "bg-none"}  text-center text-[#F0F1F2]`} key={index}>
          <td className="hidden">{order.id}</td>
          <td>{order.name}</td>
          <td>{order.quantity} Pakaian</td>
          <td>{order.weight} Kg</td>
          <td className="flex justify-center items-center h-[84px]">
            <div className="border-2 py-2 rounded-full flex ps-4 items-center gap-2 w-[102px] border-2">
              <div className={`${order.status === "Baru" ? "bg-[#FF5771]" : order.status == "Proses" ? "bg-[#216BFE]" : "bg-[#00C97F]"}  rounded-full w-3 h-3`} />
              <div>{order.status}</div>
            </div>
          </td>
          <td>{order.order_date.split("T")[0]}</td>
          <td>
            <div className="flex justify-center items-center h-[84px]">
              <div className="border-2 py-2 rounded-full flex ps-4 items-center gap-2 w-[100px] border-2">
                <div className={`${order.payment === "Lunas" ? "bg-[#00C97F]" : "bg-[#FF5771]"}  rounded-full w-3 h-3`} />
                <div>{order.payment}</div>
              </div>
            </div>
          </td>
          <td>Rp{order.total_price}</td>
        </tr>
      ))}
    </tbody>
  )
}

export default OrderTable