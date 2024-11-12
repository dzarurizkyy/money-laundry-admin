type CardProps = {
  open: boolean
  title: string
  icon: JSX.Element
  selectedData: string
  totalData: string
}

const Card = ({ open, title, icon, selectedData, totalData } : CardProps) => {
  return (
    <div className={`${open ? "w-[368px]" : "w-[500px]"} h-40 bg-[#121A24] rounded-2xl duration-500 origin-left p-6 flex flex-col gap-3`}>
      <div className="flex text-[#B5B5B5] items-center gap-2">
        <div className="text-2xl text-[#F0F1E6]">{icon}</div>
        <div>Total {title}</div>
      </div>
      <div className="flex items-center px-1">
        <div className={`${title === "Transactions" ? "text-[50px]" : "text-[36px]"} text-[#F0F1E6] font-bold`}>
          {title === "Transactions" ? selectedData : totalData}
        </div>
        <div className={`${title !== "Transactions" && "hidden"} text-[#D1D5DB]`}>&nbsp;&nbsp;of {totalData}</div>
      </div>
    </div>
  )
}

export default Card