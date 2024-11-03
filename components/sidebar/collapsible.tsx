import { FaAngleLeft } from "react-icons/fa"

type CollapsibleProps = {
  open: boolean;
  setOpen: (value: boolean) => void
}

const Collapsible = ({open, setOpen}: CollapsibleProps) => {
  return (
    <FaAngleLeft 
      className={`absolute rounded-full -right-3 top-9 w-7 h-7 p-1 border-2 border-[#03242F] bg-[#FFFFFF] text-[#BDBDCF]  cursor-pointer ${!open && "rotate-180"}`}
      onClick={() => setOpen(!open)} />
  )
}

export default Collapsible