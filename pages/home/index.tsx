// Import Packages
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

// Import Components
import { MobileSize } from "@/components"

// Import Templates
import Sidebar from "../templates/sidebar"

// Import Sections
import OrderSection from "./order"
import UserSection from "./user"
import Logout from "./logout"

// Import Functions
import useHandleResize from "@/utils/handleResize"

const HomePage = () => {
  // State
  const [open, setOpen] = useState<boolean>(true)  
  const [activeComponent, setActiveComponent] = useState<string>("user")
  const isDesktop = useHandleResize()
  
  // Function
  const handleComponentChange = (component: string) => {setActiveComponent(component)}
  
  // Router
  const router = useRouter()

  // Effect
  useEffect(() => {
    const login = localStorage.getItem("login")
    if(login !== "true"){router.push("/login")}
  }, [])

  return (
    <>
      {isDesktop ? (
        <div className="flex fixed">
          <Sidebar page="home" onMenuClick={handleComponentChange} open={open} setOpen={setOpen}/>
          {activeComponent === "user" && <UserSection open={open} />}
          {activeComponent === "order" && <OrderSection />}
          {activeComponent === "logout" && <Logout />}
        </div>
      ) : (
        <MobileSize />
      )}
      
    </>
  )
}

export default HomePage;