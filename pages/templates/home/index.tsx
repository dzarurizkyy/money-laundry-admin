import { Card, UserDistributionChart, WeeklyTransactionChart } from "@/components"

type HomeProps = {
  open: boolean
  cards: Array<{ title: string; icon: JSX.Element; selectedData: string; totalData: string }>
  transactions: Array<{ order_day: string, total_transaction: number }>
  distributions: {user_basic_percentage: number, user_silver_percentage: number, user_gold_percentage: number}
}

const Home = ({ open, transactions, distributions, cards }: HomeProps) => {
  return (
    <div className={`p-8 bg-[#18212E] h-screen ${open ? "w-[85vw]" : "w-[96vw]"} flex flex-col gap-5 justify-center items-center`}>
      <div className="flex gap-4 w-full justify-center px-3">
        {cards && cards.map((card, index) => (
          <Card open={open} title={card.title} icon={card.icon} selectedData={card.selectedData} totalData={card.totalData} key={index} />)
        )}
      </div>
      <div className="flex gap-4 w-full justify-center px-3">
        <div className={`bg-[#121A24] p-12 rounded-2xl flex justify-center ${open ? "w-[700px]" : "w-[700px]"} h-[450px] duration-500 origin-left`}>
          <WeeklyTransactionChart transactions={transactions} />
        </div>
        <div className={`bg-[#121A24] p-12 rounded-2xl flex justify-center ${open ? "w-[420px]" : "w-[700px]"} h-[450px] duration-500 origin-left`}>
          <UserDistributionChart distributions={distributions} />
        </div>
      </div>
    </div>
  )
}

export default Home