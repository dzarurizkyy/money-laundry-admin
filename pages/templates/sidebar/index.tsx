// Import Packages
import { useState } from "react"
import { useRouter } from "next/router"
import { useSidebar } from '@/context/sidebarContext'
// Import Icons
import { RiUserSearchLine, RiUserSearchFill, RiLogoutCircleRFill} from "react-icons/ri"
import { AiOutlineLogout } from "react-icons/ai"
import { HiHome, HiOutlineHome } from "react-icons/hi";

// Import Components
import { HeaderSidebar, MenusSideBar, Collapsible } from "@/components"

type SidebarProps = {
  page: string
}

// Props
const Sidebar = ({page}:SidebarProps) => {
  // State 
  const {open, setOpen} = useSidebar();
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState<string>(`${page}`)

  // Variable
  const menus = [
    {title: "Home", icon: <HiOutlineHome/>, activeIcon: <HiHome />, href: "/home"},
    {title: "User Management", icon: <RiUserSearchLine />, activeIcon: <RiUserSearchFill />, href: "/home/user"},
    {title: "Logout", icon: <AiOutlineLogout />, activeIcon: <RiLogoutCircleRFill />, gap: true, href: "/home/logout"},
  ]

  // Function
  const handleMenuClick = (href: string) => {
    setActiveMenu(href)
    router.push(href)
  }
  
  return (
    <div className={`${open ? "w-72" : "w-20"} p-5 pt-8 h-screen bg-[#121A24] relative duration-300`}>
      <Collapsible open={open} setOpen={setOpen}/>
      <HeaderSidebar open={open} />
      <MenusSideBar open={open} activeMenu={activeMenu} menus={menus} handleMenuClick={handleMenuClick}/>
    </div>
  )
}

export default Sidebar

