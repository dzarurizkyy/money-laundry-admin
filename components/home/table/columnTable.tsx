type ColumnTableProps  = {
  columns: Array<string>
}

const ColumnTable = ({columns}: ColumnTableProps) => {
  return (
    <thead className="border-b-2 border-[#03242F] text-gray-400 text-center">
      <tr>
        {columns && columns.map((column, index) => (
          <td className="pb-4" key={index}>
            {column.split(" ").map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
          </td>
        ))}
      </tr>
    </thead>
  )
}

export default ColumnTable