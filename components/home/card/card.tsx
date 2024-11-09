import rupiachCurrencyFormat from "@/utils/rupiahCurrencyFormat"

type CardProps = {
  open: boolean,
  cards: Array<{title:string; icon: JSX.Element; selectedData: number; totalData: number}>
}

const Card = ({open, cards} : CardProps) => {
  return (
    <div className="flex gap-4 w-full justify-center px-3" >
      {cards && cards.map((card, index) => (
        <div className={`${open ? "w-[368px]" : "w-[500px]"} h-40 bg-[#121A24] rounded-2xl duration-500 origin-left p-6 flex flex-col gap-3`} key={index}>
          <div className="flex text-[#B5B5B5] items-center gap-2">
            <div className="text-2xl text-[#F0F1E6]">{card.icon}</div>
            <div>Total {card.title} {card.title === "Paid" && "Users"}</div>
          </div>
          <div className="flex items-center px-1">
            {card.title !== "Income" ? (
              <>
                <div className="text-[50px] text-[#F0F1E6] font-bold">{card.selectedData}</div>
                <div className="text-[#D1D5DB]">&nbsp;&nbsp;of {card.totalData}</div>
              </>
              ) : (
                <div className="text-[36px] text-[#F0F1E6] font-bold">{rupiachCurrencyFormat(card.totalData)}</div>
              )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card