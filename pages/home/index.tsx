// Import Packages
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Import Icons
import { BsPersonCheck } from "react-icons/bs"
import { TbShoppingBagCheck } from "react-icons/tb"
import { HiOutlineBanknotes } from "react-icons/hi2"

// Import Contexts
import { useSidebar } from "@/context/sidebarContext"

// Import Components
import { MobileSize } from "@/components"

// Import Templates
import Sidebar from "../templates/sidebar"
import Home from "../templates/home"

// Import Functions
import useHandleResize from "@/utils/handleResize"

// Import Responses
import transactionResponse from "@/dummy/transactionResponse"
import statusUserResponse from "@/dummy/statusUserResponse"


const HomePage = () => {
  // Context
  const {open} = useSidebar()

  // Variable
  const cardData = [
    {
      title: "Transaction",
      icon: <TbShoppingBagCheck />,
      selectedData: 130,
      totalData: 140
    },
    {
      title: "Paid",
      icon: <BsPersonCheck />,
      selectedData: 233,
      totalData: 310
    },
    {
      title: "Income",
      icon: <HiOutlineBanknotes />,
      selectedData: 0,
      totalData: 100000
    }
  ]

  // Util
  const isDesktop = useHandleResize()
 
  // Router
  const router = useRouter()

  // Effect
  useEffect(() => {
    const login = localStorage.getItem("login")
    if(login !== "true"){router.push("/login")}
  }, [router])

  return (
    <>
      {isDesktop ? (
        <div className="flex fixed">
          <Sidebar page="/home" />
          <Home open={open} transactions={transactionResponse.data} distributions={statusUserResponse.data} cards={cardData} />
        </div>
      ) : (
        <MobileSize />
      )}
    </>
  )
}

export default HomePage