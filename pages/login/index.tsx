// Import Packages
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Import Libraries
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Import Components
import { MobileSize } from "@/components"

// Import Templates
import { Login } from "@/pages/templates"

// Improt Context
import { useAuth } from "@/context/authContext"

// Import Functions
import useHandleResize from "@/utils/handleResize"

const LoginPage = () => {
  // State
  const [emailInput, setEmailInput] = useState<string>("")
  const [passInput, setPassInput] = useState<string>("")
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const { setToken } = useAuth()

  // Util
  const isDesktop = useHandleResize()

  // Router
  const router = useRouter()

  // Function
  const rememberLogin = (value: boolean) => setRememberMe(value)
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/admin/login`, {
        email: emailInput,
        password: passInput
      })
      
      if(response.status === 200) {
        toast.success("Login Success! Redirecting...", { 
          style: { 
            fontSize: "13px", 
            backgroundColor: "#18212E", 
            color: "#F0F1F2", 
            border: "2px solid #F0F1F2"
          }
        });
        
        if(rememberMe) {
          localStorage.setItem("rememberMe", "true")
        }
        
        setToken(response.data.data.token)
        sessionStorage.setItem("login", "true")
        setTimeout(() => {router.push("/home")}, 2000)
      }
    } catch (error) {
      toast.error("Incorrect email or password...", { 
        style: { 
          fontSize: "13px", 
          backgroundColor: "#18212E", 
          color: "#F0F1F2", 
          border: "2px solid #F0F1F2"
        }
      });
    }
  }

  // Effect
  useEffect(() => {
    const remember = localStorage.getItem("rememberMe");
    if (remember === "true") {setRememberMe(true); router.push("/home")}
  }, [router])

  return (
    <>
      {isDesktop ? (
          <>
            <Login emailInput={emailInput} passInput={passInput} setEmailInput={setEmailInput} setPassInput={setPassInput} handleLogin={handleLogin} rememberLogin={rememberLogin} />
            <ToastContainer />
          </>
      ) : (
        <MobileSize />
      )}
    </>
  );
}

export default LoginPage