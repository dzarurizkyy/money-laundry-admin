// Import Packages
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

// Import Libraries
import axios from "axios"

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
import { useAuth } from "@/context/authContext"

// Import Functions
import useHandleResize from "@/utils/handleResize"
import rupiachCurrencyFormat from "@/utils/rupiahCurrencyFormat"

// Interfaces
interface TotalTransactions {
  total_order_paid: number,
  total_order: number
}

interface usersDistribution {
  user_free_percentage: number,
  user_paid_percentage: number,
}

interface weeklyTransaction {
  order_day: string,
  total_transaction: number
}

const HomePage = () => {
  // Router
  const router = useRouter()

  // Util
  const isDesktop = useHandleResize()

  // Context
  const { open } = useSidebar()
  const { token } = useAuth()

  // State
  const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>({ total_order_paid: 0, total_order: 0 })
  const [transactionMembers, setTransactionMembers] = useState<number>(0)
  const [transactionMemberIncomes, setTransactionMemberIncomes] = useState<number>(0)
  const [usersDistribution, setUsersDistribution] = useState<usersDistribution>({ user_free_percentage: 0, user_paid_percentage: 0 })
  const [weeklyTransaction, setWeeklyTransaction] = useState<weeklyTransaction[]>([])

  // Axios
  const getDashboard = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      setTotalTransactions(response.data.data.total_transaction)
      setTransactionMembers(response.data.data.transaction_member)
      setTransactionMemberIncomes(response.data.data.transaction_member_incomes)
      setUsersDistribution(response.data.data.user)
      setWeeklyTransaction(response.data.data.weekly_transaction)
    }
    catch (error) {
      console.log(error)
    }
  }, [token])

  // Variable
  const cardData = [
    {
      title: "Transactions",
      icon: <TbShoppingBagCheck />,
      selectedData: String(totalTransactions?.total_order_paid),
      totalData: String(totalTransactions?.total_order),
    },
    {
      title: "Transaction Members",
      icon: <BsPersonCheck />,
      selectedData: String(0),
      totalData: String(transactionMembers)
    },
    {
      title: "Incomes",
      icon: <HiOutlineBanknotes />,
      selectedData: String(0),
      totalData: String(rupiachCurrencyFormat(transactionMemberIncomes))
    }
  ]

  // Effect
  useEffect(() => {
    if (sessionStorage.getItem("login") !== "true" && localStorage.getItem("rememberMe") !== "true") { router.push("/login") }
    getDashboard()
  }, [router, getDashboard])

  return (
    <>
      {isDesktop ? (
        <div className="flex fixed">
          <Sidebar page="/home" />
          <Home open={open} transactions={weeklyTransaction} distributions={usersDistribution} cards={cardData} />
        </div>
      ) : (
        <MobileSize />
      )}
    </>
  )
}

export default HomePage