// Import Packages
import React, {useState, useEffect} from "react"
import { useRouter } from "next/router";

// Import Libraries
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Components
import { Email, Password, RememberMe, Submit, MobileSize } from "@/components";

// Import Functions
import useHandleResize from "@/utils/handleResize";

const LoginPage = () => {
  // State
  const [emailInput, setEmailInput] = useState<string>("")
  const [passwordInput, setPasswordInput] = useState<string>("")
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const isDesktop = useHandleResize()

  // Router
  const router = useRouter()

  // Credential
  const email = "moneylaundry@gmail.com"
  const password = "moneylaundry2024"

  // Function
  const rememberLogin = (value: boolean) => setRememberMe(value)
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(emailInput === email && passwordInput === password) {
      toast.success("Login Success! Redirecting...", { style: { fontSize: "13px", backgroundColor: "#18212E", color: "#F0F1F2", border: "2px solid #F0F1F2"}});
      if(rememberMe) {localStorage.setItem("rememberMe", "true")}
      localStorage.setItem("login", "true")
      setTimeout(() => {router.push("/home")}, 2000)
    } else {
      toast.error("Incorect email or password...", { style: { fontSize: "13px", backgroundColor: "#18212E", color: "#F0F1F2", border: "2px solid #F0F1F2"}});
    }
  }

  // Effect
  useEffect(() => {
    const remember = localStorage.getItem("rememberMe");
    if (remember === "true") {setRememberMe(true); router.push("/home")}
  }, [])

  return (
    <>
      {isDesktop ? (
        <div className="flex flex-row justify-center items-center h-screen">
          <div className="flex flex-col w-full h-full justify-center items-center bg-[#121A24]">
            {/* Title */}
            <div className="w-16 h-16 mb-4"><img src="Icon.png"></img></div>
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
export default LoginPage;