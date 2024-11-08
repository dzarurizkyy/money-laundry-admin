import React, {useState} from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type PasswordProps = {
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Password = ({value, onChange}: PasswordProps) => {
  const [passwordVisible, setpasswordVisible] = useState<boolean>(false)
  const toggle = () => setpasswordVisible(!passwordVisible)

  return (
     <div className="relative">
        {/* Input */}
        <div>
          <input 
            type={(passwordVisible === false ? 'password' : 'text')} 
            className="bg-[#232E3E] text-[#FDFDFD] rounded-2xl p-3 text-sm w-full" 
            placeholder="Password"
            value={value}
            onChange={onChange} />
        </div>
        {/* Icon */}
        <div className="text-xl absolute top-3 right-4 cursor-pointer text-[#758299]">
          {(passwordVisible === false) ?  <IoEyeOffOutline onClick={toggle}/> : <IoEyeOutline onClick={toggle} />}
        </div>
   </div>
  )
}

export default Password