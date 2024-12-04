import { useSidebar } from "@/context/sidebarContext"
import { HeaderTable, SearchTable, FilterTable, ColumnTable, UserTable, OrderTable } from "@/components"

type TableProps = {
  search: string,
  handleSearch: (value: React.ChangeEvent<HTMLInputElement>) => void
  filtering: (value: string) => void
  filterBy: Array<string>
  sortBy: Array<string>
  columns: Array<string>
  totalData: number,
  changeStatusUser: (id: number) => void
  handleUserOrder: (id: number) => void
  deleteUser: (id: number) => void
  option: string
  users: Array<{
    users_id: number,
    name: string,
    email: string,
    account_status: { name: string },
    created_at: string,
    updated_at: string
  }>
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

const Table = ({
  search, handleSearch, filtering, filterBy, sortBy, columns, users, totalData,
  changeStatusUser, handleUserOrder, deleteUser, orders, option
}: TableProps) => {

  const { open } = useSidebar()

  return (
    <div className={`flex bg-[#18212E] ${open ? "w-[85vw]" : "w-[96vw]"} h-screen justify-center py-6 duration-300`}>
      <div className={`flex flex-col items-center p-7 text-2xl font-semibold ${open ? "w-[75vw]" : "w-[89vw]"} bg-[#121A24] rounded-lg duration-300 shadow-custom gap-y-5`}>
        <HeaderTable title={option && option.charAt(0).toUpperCase() + option.slice(1)} totalData={totalData} />
        <div className="flex justify-between items-center w-full mt-3">
          <SearchTable title={option} search={search} handleSearch={handleSearch} />
          <div className="flex gap-x-2">
            {[...Array(2)].map((_, index) => (
              <FilterTable
                title={index === 0 ? "Filter By" : "Sort By"}
                sortName={index === 0 ? filterBy : sortBy}
                sortBy={filtering}
                key={index} />
            ))}
          </div>
        </div>
        <div className="w-full my-3 overflow-y-auto px-2" id="scrollbar">
          <table className="border-collapse border-spacing-x-6 w-full text-sm">
            <ColumnTable columns={columns} />
            {
              option === "user" ?
                (<UserTable users={users} changeStatusUser={changeStatusUser} deleteUser={deleteUser} handleUserOrder={handleUserOrder} />) :
                (<OrderTable orders={orders} />)
            }
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table