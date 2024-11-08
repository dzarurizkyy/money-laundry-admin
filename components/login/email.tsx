type EmailProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Email = ({value, onChange}: EmailProps) => {
  return (
    <input 
      type="email" 
      className="bg-[#232E3E] text-[#FDFDFD] rounded-2xl p-3 text-sm" 
      placeholder="Email"
      value={value}
      onChange={onChange} />
  )
}

export default Email