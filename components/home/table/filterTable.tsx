import { IoIosArrowDown } from "react-icons/io"

type FilterTableProps = {
  title: string,
  sortName: Array<string>,
  sortBy: (value: string) => void
}

const FilterTable =  ({title, sortName, sortBy} : FilterTableProps) => {
  return (
    <div>
      <button className="relative flex justify-center items-center bg-[#F7F8FC] text-gray-400 text-sm rounded-md hover:bg-gray-100 focus:outline-none focus:ring-gray-500 focus:ring-2 group">
        <div className="px-5 py-2">{title}</div><span className="pr-4"><IoIosArrowDown /></span>
        <div className="absolute hidden group-focus:block top-full w-full bg-white shadod-sm mt-2">
          <ul className="text-left border rounded-md">
            {sortName && sortName.map((list, index) => (
              <li className="px-4 py-1 hover:bg-gray-100 border-b" onClick={() => sortBy(list)} key={index}>
                {list.charAt(0).toUpperCase() + list.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      </button>
    </div>
  )
}

export default FilterTable