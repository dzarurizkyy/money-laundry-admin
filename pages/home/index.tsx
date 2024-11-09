// Import Packages
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Import Components
import { MobileSize } from "@/components"

// Import Templates
import Sidebar from "../templates/sidebar"

// Import Functions
import useHandleResize from "@/utils/handleResize"

const HomePage = () => {
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
          <div>Home Page</div>
        </div>
      ) : (
        <MobileSize />
      )}
    </>
  )
}

export default HomePage