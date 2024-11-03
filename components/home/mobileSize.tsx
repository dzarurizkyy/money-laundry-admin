import { TiWarning } from "react-icons/ti";

const MobileSize = () => {
  return (
    <div className="bg-black w-screen h-screen flex justify-center items-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center gap-3">
        <TiWarning className="text-[#9CA3AF] text-4xl"/>
        <p className="mb-3 font-normal text-xs md:text-base text-gray-500 dark:text-gray-400">Sorry, only available for dekstop size</p>
      </div>
    </div>
  )
}

export default MobileSize