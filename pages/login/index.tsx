// Import Package
import React, {useState, useEffect} from "react"
import { useRouter } from "next/router";

// Import Library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Component
import { Email, Password, RememberMe, Submit } from "@/components";

const LoginPage = () => {
  // State
  const [emailInput, setEmailInput] = useState<string>("")
  const [passwordInput, setPasswordInput] = useState<string>("")
  const [rememberMe, setRememberMe] = useState<boolean>(false)

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
      toast.success("Login Success! Redirecting...");
      if(rememberMe) {localStorage.setItem("rememberMe", "true")}
      setTimeout(() => {router.push("/home")}, 2000)
    } else {
      toast.error("Incorect email or password...");
    }
  }

  // Effect
  useEffect(() => {
    const remember = localStorage.getItem("rememberMe");
    if (remember === "true") {setRememberMe(true); router.push("/home")}
  }, [])

  return (
    <div className="flex flex-row justify-center items-center h-screen">
      {/* Left */}
      <div className="flex flex-col w-[66%] h-full justify-center items-center">
        <img src="Login.jpg" alt="Laundry Background" className="w-full h-full object-center" />
      </div>
      {/* Right */}
      <div className="flex flex-col w-[44%] h-full justify-center items-center">
        {/* Title */}
        <div className="font-extrabold text-xl mb-9">Sign in to MoneyLaundry</div>
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
  );
}

// Export
export default LoginPage;