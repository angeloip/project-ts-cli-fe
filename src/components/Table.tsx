import { FaTrash, FaEdit } from 'react-icons/fa'
import { useUser } from '../context/UserContext'
import { Link } from 'react-router-dom'

export const Table = () => {
  const { users, deleteUser } = useUser()

  return (
    <section className="p-4 border border-slate-200 rounded-xl shadow-md">
      <table className="w-full text-gray-500">
        <thead className="border-b border-slate-200">
          <tr>
            <th className="p-4 text-left">Id</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr
                key={user.id}
                className={`${
                  index === users.length - 1
                    ? ''
                    : ' border-b  border-slate-200'
                }`}
              >
                <td className="p-4">{user.id}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`https://unavatar.io/github/${user.github}`}
                      alt={user.name}
                    />
                    {user.name}
                  </div>
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-xl">
                    <button
                      onClick={() => {
                        deleteUser(user.id)
                      }}
                    >
                      <FaTrash />
                    </button>
                    <Link to={`edit/${user.id}`}>
                      <FaEdit />
                    </Link>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
