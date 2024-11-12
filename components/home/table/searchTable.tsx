import { IoMdSearch } from "react-icons/io"

type SearchTable = {
  title: string,
  search: string,
  handleSearch: (value: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchTable = ({ title, search, handleSearch } : SearchTable) => {
  return (
    <div className="relative flex items-center text-gray-400 w-72 focus-within:text-gray-600">
      <IoMdSearch className="w-5 h-5 absolute ml-3 pointer-events-none"/>
      <input 
        type="text" 
        name="search"
        placeholder={`Search ${title}...`}
        autoComplete="off"
        className="w-full px-3 py-2 pl-10 font-semibold placeholder-gray-400 text-[#F0EAD2] text-sm rounded-md bg-[#232E3E] focus:ring-gray-500 focus:ring-2 focus:outline-none" 
        value={search}
        onChange={handleSearch} />
      </div>
  )
}

export default SearchTable