import { HeaderTable, SearchTable, FilterTable, ColumnTable, UserTable } from "@/components";

type TableProps = {
  open: boolean,
  search: string,
  handleSearch: (value: React.ChangeEvent<HTMLInputElement>) => void
  filtering: (value: string) => void,
  filterBy: Array<string>,
  sortBy: Array<string>,
  columns: Array<string>
  users: Array<{id: string, name: string, email: string, status: string, created_at: string, updated_at: string}>,
  changeStatusUser: (id: string) => void,
  deleteUser: (id: string) => void,
  option: string
}

const Table = (
  {open,search, handleSearch, filtering, filterBy, sortBy, columns, users, changeStatusUser, deleteUser, option} : TableProps) => {
  return (
    <div className={`flex bg-[#F7F8FC] ${open ? "w-[82vw]" : "w-[95vw]"} h-screen justify-center py-6 duration-300`}>
      <div className={`flex flex-col items-center p-7 text-2xl font-semibold ${open ? "w-[75vw]" : "w-[89vw]"} bg-white rounded-lg duration-300 shadow-custom gap-y-5`}>
        {/* Header */}
        <HeaderTable title={"Users"} totalData={users?.length ?? 0} />
        {/* Filter */}
        <div className="flex justify-between items-center w-full">
          <SearchTable title="user" search={search} handleSearch={handleSearch} />
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
        <div className="w-full my-3 overflow-y-auto">
          <table className="border-collapse border-spacing-x-6 w-full text-sm">
            <ColumnTable columns={columns} />
            {option === "user" ? (<UserTable users={users} changeStatusUser={changeStatusUser} deleteUser={deleteUser} />) : ("")}
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table;