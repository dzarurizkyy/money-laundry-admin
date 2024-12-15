import { GiPadlockOpen } from "react-icons/gi"
import { MdDeleteForever } from "react-icons/md"
import { FaShoppingCart } from "react-icons/fa"

type UserTableProps = {
  users: Array<{ users_id: number, name: string, email: string, account_status: { name: string }, created_at: string, updated_at: string }>
  changeStatusUser: (id: number) => void
  handleUserOrder: (id: number) => void
  deleteUser: (id: number) => void
}

const UserTable = ({ users, changeStatusUser, handleUserOrder, deleteUser }: UserTableProps) => {
  return (
    <tbody>
      {users && users.map((user, index) => (
        <tr className={`${index % 2 === 0 ? "bg-[#18212E]" : "bg-none"}  text-center text-[#F0F1F2]`} key={index}>
          <td className="hidden">{user.users_id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td className="flex justify-center items-center h-[84px]">
            <div className="border-2 py-2 rounded-full flex ps-4 items-center gap-2 w-[96px] border-2">
              <div className={`${user.account_status.name === "basic" ? "bg-[#B3A389]" : user.account_status.name === "silver" ? "bg-[#C4BEbE]" : "bg-[#E5C680]"}  rounded-full w-3 h-3`} />
              <div>{(user.account_status.name[0].toUpperCase() + user.account_status.name.slice(1))}</div>
            </div>
          </td>
          <td>{user.created_at.split("T")[0]}</td>
          <td>{user.updated_at.split("T")[0]}</td>
          <td className="flex justify-center items-center gap-2">
            {[...Array(3)].map((_, index) => (
              <div className={`w-12 h-9 ${index === 0 ? "bg-[#216BFE]" : index === 1 ? "bg-[#FEB421]" : "bg-[#FF5771]"} text-white flex justify-center items-center rounded-md hover:brightness-125 cursor-pointer duration-300`} onClick={() => index === 0 ? changeStatusUser(user.users_id) : index === 1 ? handleUserOrder(user.users_id) : deleteUser(user.users_id)} key={index}>
                {index === 0 ? <GiPadlockOpen /> : index === 1 ? <FaShoppingCart /> : <MdDeleteForever />}
              </div>
            ))}
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default UserTable