
import { HeaderTable, SearchTable, FilterTable, ColumnTable, UserTable, OrderTable } from "@/components";
import { useSidebar } from '@/context/sidebarContext'

type TableProps = {
  search: string,
  handleSearch: (value: React.ChangeEvent<HTMLInputElement>) => void
  filtering: (value: string) => void,
  filterBy: Array<string>,
  sortBy: Array<string>,
  columns: Array<string>
  users: Array<{id: number, name: string, email: string, status: string, created_at: string, updated_at: string}>,
  changeStatusUser: (id: number) => void,
  deleteUser: (id: number) => void,
  orders: Array<{id: number, name: string, order_date: string, status: string, payment: string, weight: number, total_price: number, quantity: number}>,
  option: string
}

const Table = (
  {search, handleSearch, filtering, filterBy, sortBy, columns, users, changeStatusUser, deleteUser, orders, option} : TableProps) => {
    const {open} = useSidebar();

  return (
    <div className={`flex bg-[#18212E] ${open ? "w-[85vw]" : "w-[96vw]"} h-screen justify-center py-6 duration-300`}>
      <div className={`flex flex-col items-center p-7 text-2xl font-semibold ${open ? "w-[75vw]" : "w-[89vw]"} bg-[#121A24] rounded-lg duration-300 shadow-custom gap-y-5`}> 
        {/* Header */}
        <HeaderTable title={option && option.charAt(0).toUpperCase() + option.slice(1)} totalData={users?.length ?? 0} />
        {/* Filter */}
        <div className="flex justify-between items-center w-full mt-3">
          <SearchTable title={option} search={search} handleSearch={handleSearch} />
          <div className="flex gap-x-2">
            {[...Array(2)].map((_, index) => (
              <FilterTable 
                title={index === 0 ? "Filter By" : "Sort By"} 
                sortName={index === 0 ? filterBy : sortBy} 
                sortBy={filtering} 
                key={index}/>
            ))}
          </div>          
        </div>
        {/* Table */}
        <div className="w-full my-3 overflow-y-auto px-2" id="scrollbar">
          <table className="border-collapse border-spacing-x-6 w-full text-sm">
            <ColumnTable columns={columns} />
            {
              option === "user" ? 
              (<UserTable users={users} changeStatusUser={changeStatusUser} deleteUser={deleteUser} />) : 
              (<OrderTable orders={orders} />)
            }
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table;