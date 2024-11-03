import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter()
  localStorage.removeItem("login")
  localStorage.removeItem("rememberMe")
  router.push("/login")
  return null
}

export default Logout