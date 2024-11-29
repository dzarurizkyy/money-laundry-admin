// Import Packages
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Import Icons
import { BsPersonCheck } from "react-icons/bs"
import { TbShoppingBagCheck } from "react-icons/tb"
import { HiOutlineBanknotes } from "react-icons/hi2"

// Import Components
import { MobileSize } from "@/components"

// Import Templates
import { Sidebar, Home } from "@/pages/templates"

// Import Contexts
import { useSidebar } from "@/context/sidebarContext"

// Import Functions
import useHandleResize from "@/utils/handleResize"
import rupiachCurrencyFormat from "@/utils/rupiahCurrencyFormat"

// Import Responses
import transactionResponse from "@/dummy/transactionResponse"
import statusUserResponse from "@/dummy/statusUserResponse"

const HomePage = () => {
  // Context
  const { open } = useSidebar()

  // Variable
  const cardData = [
    {
      title: "Transactions",
      icon: <TbShoppingBagCheck />,
      selectedData: String(130),
      totalData: String(140)
    },
    {
      title: "Transaction Members",
      icon: <BsPersonCheck />,
      selectedData: String(0),
      totalData: String(310)
    },
    {
      title: "Incomes",
      icon: <HiOutlineBanknotes />,
      selectedData: String(0),
      totalData: rupiachCurrencyFormat(100000)
    }
  ]

  // Util
  const isDesktop = useHandleResize()

  // Router
  const router = useRouter()

  // Effect
  useEffect(() => {
    const login = localStorage.getItem("login")
    if (login !== "true") { router.push("/login") }
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