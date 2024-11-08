type RememberMeProps = {
  rememberLogin: (value: boolean) => void
}

const RememberMe = ({rememberLogin}: RememberMeProps) => {
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const isCheck = (event.target as HTMLInputElement).checked
    rememberLogin(isCheck)
  }

  return (
    <div className="flex flex-row items-center gap-2 mt-3">
      {/* Button */}
      <label className="relative flex items-center cursor-pointer" htmlFor="rememberMe">
        <input
          type="radio"
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
          onClick={handleClick}
          id="rememberMe"
        />
        <span className="absolute bg-slate-400 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
      </label>
      {/* Text */}
      <label className="text-xs font-semibold cursor-pointer text-gray-400" htmlFor="rememberMe">Remember Me</label>
    </div>
  )
}

export default RememberMe
