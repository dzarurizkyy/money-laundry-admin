import rupiachCurrencyFormat from "@/utils/rupiahCurrencyFormat"

type OrderTableProps = {
  orders: Array<{
    transaction_order_id: number,
    package_laundry: { name: string },
    quantity: number,
    weight: number,
    status: string,
    order_date: string,
    payment_status: string,
    total_price: number
  }>
}

const OrderTable = ({ orders }: OrderTableProps) => {
  return (
    <tbody>
      {orders && orders.map((order, index) => (
        <tr className={`${index % 2 === 0 ? "bg-[#18212E]" : "bg-none"}  text-center text-[#F0F1F2]`} key={index}>
          <td className="hidden">{order.transaction_order_id}</td>
          <td>{order.package_laundry.name}</td>
          <td>{order.quantity} Item</td>
          <td>{order.weight} Kg</td>
          <td className="flex justify-center items-center h-[84px]">
            <div className="border-2 py-2 rounded-full flex ps-4 items-center gap-2 w-[102px] border-2">
              <div className={`${order.status === "new" ? "bg-[#FF5771]" : order.status == "process" ? "bg-[#216BFE]" : "bg-[#00C97F]"}  rounded-full w-3 h-3`} />
              <div>{order.status === "new" ? "Baru" : order.status === "process" ? "Proses" : "Selesai"}</div>
            </div>
          </td>
          <td>{order.order_date.split(" ")[0]}</td>
          <td>
            <div className="flex justify-center items-center h-[84px]">
              <div className="border-2 py-2 rounded-full flex ps-4 items-center gap-2 w-[100px] border-2">
                <div className={`${order.payment_status === "paid" ? "bg-[#00C97F]" : "bg-[#FF5771]"}  rounded-full w-3 h-3`} />
                <div>{order.payment_status === "paid" ? "Lunas" : "Belum"}</div>
              </div>
            </div>
          </td>
          <td>{rupiachCurrencyFormat(order.total_price)}</td>
        </tr>
      ))}
    </tbody>
  )
}

export default OrderTable