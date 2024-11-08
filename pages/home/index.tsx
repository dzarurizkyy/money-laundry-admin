// Import Packages
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

// Import Components
import { MobileSize } from "@/components"

// Import Templates
import Sidebar from "../templates/sidebar"

// Import Functions
import useHandleResize from "@/utils/handleResize"

const HomePage = () => {
  // State
  const isDesktop = useHandleResize()
  
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
          <Sidebar page="/home" />
          <div>Home Page</div>
        </div>
      ) : (
        <MobileSize />
      )}
      
    </>
  )
}

export default HomePage;