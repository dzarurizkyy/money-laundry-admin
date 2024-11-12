import { IoIosArrowDown } from "react-icons/io"

type FilterTableProps = {
  title: string
  sortName: Array<string>
  sortBy: (value: string) => void
}

const FilterTable =  ({ title, sortName, sortBy } : FilterTableProps) => {
  return (
    <div>
      <button className="relative flex justify-center items-center bg-[#232E3E] text-gray-400 text-sm rounded-md hover:brightness-150 focus:outline-none focus:ring-gray-500 focus:ring-1 group">
        <div className="px-5 py-2">{title}</div><span className="pr-4"><IoIosArrowDown /></span>
        <div className="absolute hidden group-focus:block top-full w-full bg-[#232E3E] text-[#FEFEFE] mt-2">
          <ul className="text-left border border-[#555C69] rounded-[4px] shadow">
            {sortName && sortName.map((list, index) => (
              <li className="px-4 py-1 hover:bg-gray-700 border-[#555C69] border-b font-normal text-gray-300" onClick={() => sortBy(list)} key={index}>
                {list.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </li>
            ))}
          </ul>
        </div>
      </button>
    </div>
  )
}

export default FilterTable