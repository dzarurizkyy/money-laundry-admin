import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type headerTableProps = {title: string, totalData: number}

const HeaderTable = ({ title, totalData } : headerTableProps) => {
  const handleTotalData = () => {
    const Message = () => (<div>MoneyLaundry App has <span className="font-extrabold">{totalData}</span> {title.toLowerCase()} </div>) 
    toast.info(<Message />, { style: { fontSize: "13px", backgroundColor: "#18212E", color: "#F0F1F2", border: "2px solid #F0F1F2"}});
  }

  return (
    <div className="flex items-center w-full border-b-2 pb-6 border-[#232E3E]">
      <div className="text-2xl font-bold text-[#F0F1F2]">List of {title}</div>
      <div className="ml-auto">
        <button className="bg-[#00C97F] hover:hover:brightness-110 text-white font-semibold py-3 px-6 text-sm rounded-md" onClick={handleTotalData}>Total {title}</button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default HeaderTable