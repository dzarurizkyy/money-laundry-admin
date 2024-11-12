import Image from "next/image"
import { Email, Password, RememberMe, Submit } from "@/components"

type LoginProps = {
  emailInput: string
  passInput: string
  setEmailInput: (value: string) => void
  setPassInput: (value: string) => void
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void
  rememberLogin: (value: boolean) => void
}

const Login = ({ emailInput, passInput, setEmailInput, setPassInput, handleLogin, rememberLogin } : LoginProps) => {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <div className="flex flex-col w-full h-full justify-center items-center bg-[#121A24]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-4"><Image src="/Icon.png" width={100} height={100} alt="MoneyLaundry Icon" /></div>
          <div className="font-extrabold text-xl mb-9 text-[#FDFDFD]">Sign in to MoneyLaundry</div>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-5 w-80" >
          <Email value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
          <Password value={passInput} onChange={(e) => setPassInput(e.target.value)} />
          <Submit />
          <RememberMe rememberLogin={rememberLogin}/>
        </form>
      </div>
    </div>
  )
}

export default Login