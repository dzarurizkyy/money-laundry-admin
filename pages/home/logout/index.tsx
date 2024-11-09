import { useEffect } from "react"
import { useRouter } from "next/navigation"

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem("login")
    localStorage.removeItem("rememberMe")
    router.push("/login")
  }, [router])
  
  return null
}

export default Logout