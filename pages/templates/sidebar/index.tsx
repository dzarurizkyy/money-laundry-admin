// Import Packages
import { useState } from "react"

// Import Icons
import { RiUserSearchLine, RiUserSearchFill, RiLogoutCircleRFill} from "react-icons/ri"
import { IoCartOutline, IoCart } from "react-icons/io5"
import { AiOutlineLogout } from "react-icons/ai"

// Import Components
import { HeaderSidebar, MenusSideBar, Collapsible } from "@/components"

// Props
type SidebarProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  page: string;
  onMenuClick: (component: string) => void
}

const Sidebar = ({page, onMenuClick, open, setOpen} : SidebarProps) => {
  // State 
  const [activeMenu, setActiveMenu] = useState<string>(page)

  // Variable
  const menus = [
    {title: "User Management", icon: <RiUserSearchLine />, activeIcon: <RiUserSearchFill />, href: "user"},
    {title: "Order Management", icon: <IoCartOutline />, activeIcon: <IoCart />, href: "order"},
    {title: "Logout", icon: <AiOutlineLogout />, activeIcon: <RiLogoutCircleRFill />, gap: true, href: "logout"},
  ]

  // Function
  const handleMenuClick = (href: string) => {
    setActiveMenu(href)
    onMenuClick(href)
  }

  return (
    <div className={`${open ? "w-72" : "w-20"} p-5 pt-8 h-screen bg-[#03242F] relative duration-300`}>
      <Collapsible open={open} setOpen={setOpen}/>
      <HeaderSidebar open={open} />
      <MenusSideBar open={open} activeMenu={activeMenu} menus={menus} handleMenuClick={handleMenuClick}/>
    </div>
  )
}

export default Sidebar

