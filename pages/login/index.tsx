// Import Packages
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import axios from "axios"

// Import Libraries
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Import Components
import { Email, Password, RememberMe, Submit, MobileSize } from "@/components"

// Import Functions
import useHandleResize from "@/utils/handleResize"

const LoginPage = () => {
  // State
  const [emailInput, setEmailInput] = useState<string>("")
  const [passwordInput, setPasswordInput] = useState<string>("")
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  
  // Util
  const isDesktop = useHandleResize()

  // Router
  const router = useRouter()

  // Function
  const rememberLogin = (value: boolean) => setRememberMe(value)
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin/login', {
        email: emailInput,
        password: passwordInput
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
        localStorage.setItem("login", "true")
        setTimeout(() => {router.push("/home")}, 2000)
      }
    } catch (error) {
      console.log("err", error)
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
        <div className="flex flex-row justify-center items-center h-screen">
          <div className="flex flex-col w-full h-full justify-center items-center bg-[#121A24]">
            {/* Title */}
            <div className="w-16 h-16 mb-4"><Image src="/Icon.png" width={100} height={100} alt="MoneyLaundry Icon" /></div>
            <div className="font-extrabold text-xl mb-9 text-[#FDFDFD]">Sign in to MoneyLaundry</div>
            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-5 w-80" >
              <Email value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
              <Password value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
              <Submit />
              <RememberMe rememberLogin={rememberLogin}/>
            </form>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <MobileSize />
      )}
    </>
  );
}

// Export
export default LoginPage