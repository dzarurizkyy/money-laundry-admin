import { GiPadlockOpen } from "react-icons/gi"
import { MdDeleteForever } from "react-icons/md"

type UserTableProps = {
  users: Array<{id: string, name: string, email: string, status: string, created_at: string, updated_at: string}>,
  changeStatusUser: (id: string) => void,
  deleteUser: (id: string) => void
}

const UserTable = ({users, changeStatusUser, deleteUser} : UserTableProps) => {
  return (
    <tbody>
      {users.map((user, index) => (
        <tr className={`${index % 2 === 0 ? "bg-[#F7F8FC]" : "bg-white"}  text-center`} key={index}>
          <td className="hidden">{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td className="flex justify-center items-center h-[84px]">
            <div className="bg-white py-2 rounded-full flex ps-4 items-center gap-2 w-[96px] border-2">
              <div className={`${user.status === "free" ? "bg-[#00C97F]" : "bg-[#216BFE]"}  rounded-full w-3 h-3`} />
              <div>{(user.status[0].toUpperCase() + user.status.slice(1))}</div>
            </div>
          </td>
          <td>{user.created_at.split("T")[0]}</td>
          <td>{user.updated_at.split("T")[0]}</td>
          <td className="flex justify-center items-center gap-2">
            {[...Array(2)].map((_, index) => (
              <div className={`w-12 h-9 ${index === 0 ? "bg-[#216BFE]" : "bg-[#FF5771]"} text-white flex justify-center items-center rounded-md hover:brightness-125 cursor-pointer duration-300`} onClick={() => index === 0 ? changeStatusUser(user.id) : deleteUser(user.id)} key={index}>
                {index === 0 ? <GiPadlockOpen /> : <MdDeleteForever />}
              </div>
            ))}
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default UserTable