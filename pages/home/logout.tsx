import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem("login")
    localStorage.removeItem("rememberMe")
    router.push("/login")
  }, [])
  
  return null
}

export default Logout