import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type headerTableProps = {
  title: string,
  totalData: number
}

const HeaderTable = ({title, totalData} : headerTableProps) => {
  const handleTotalData = () => {
    const Message = () => (<div>MoneyLaundry App has <span className="font-extrabold">{totalData}</span> users</div>) 
    toast.info(<Message />, { style: { fontSize: "13px"}});
  }

  return (
    <div className="flex items-center w-full border-b pb-5">
      <div className="text-2xl font-bold">List of {title}</div>
      <div className="ml-auto">
        <button className="bg-green-500 hover:hover:brightness-110 text-white font-semibold py-3 px-6 text-sm rounded-md" onClick={handleTotalData}>
          Total {title} 
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default HeaderTable