type MenusSideBarProps = {
  open: boolean
  activeMenu: string
  menus: Array<{title: string, icon: JSX.Element; activeIcon: JSX.Element; href: string; gap?: boolean}>
  handleMenuClick: (href: string) => void
}

const MenusSideBar = ({menus, activeMenu, open, handleMenuClick} : MenusSideBarProps) => {
  return (
    <ul className="pt-8 relative h-full">
      {menus && menus.map((menu, index) => (
        <li 
          key={index} 
          className={`flex items-center text-gray-300 text-base w-full p-2 mb-2 gap-3 cursor-pointer hover:bg-slate-700 rounded-md ${menu.gap && "absolute bottom-8"}`}
          onClick={() => handleMenuClick(menu.href)}>
            <div className={`${!open && "ps-[2px]"}`}>{activeMenu === menu.href ? menu.activeIcon : menu.icon}</div>
            <div className={`${!open && "hidden"} ${activeMenu === menu.href && "font-semibold"} origin-left duration-300`}>
              {menu.title}
            </div>
        </li>
      ))}
    </ul>
  )
}

export default MenusSideBar