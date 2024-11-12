import Image from "next/image"

type HeaderSidebarProps = { open: boolean }

const HeaderSidebar = ({ open } : HeaderSidebarProps) => {
  return (
    <div className="flex items-center gap-4">
      <Image src="/Logo.png" width={100} height={100} alt="Logo Image" className={`cursor-pointer duration-500 w-9 rounded-lg duration-500`} />
      <h1 className={`text-white origin-left font-semibold text-lg duration-300 ${!open && "scale-0"}`}>MoneyLaundry</h1>
    </div>
  )
} 

export default HeaderSidebar