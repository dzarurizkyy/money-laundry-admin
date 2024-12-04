import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    sessionStorage.removeItem("login")
    localStorage.removeItem("rememberMe")
    localStorage.removeItem("token")
    router.push("/login")
  }, [router])
  
  return null
}

export default Logout