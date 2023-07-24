import { useState, useEffect } from 'react'
import { Input } from './Input'
import { type User } from '../types'
import { useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export const EditUser = () => {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    github: ''
  })
  const { id } = useParams()
  const { users, updateUser } = useUser()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUser(user)
  }

  useEffect(() => {
    const user = users.find((user) => user.id === id)
    setUser(user as User)
  }, [])

  return (
    <section>
      <h1 className="text-2xl font-bold text-center mb-3">Editar Usuario</h1>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <Input text="ID" name="id" value={user.id} readOnly />
        <Input
          text="Nombre"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <Input
          text="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <Input
          text="Github"
          name="github"
          value={user.github}
          onChange={handleChange}
        />
        <button type="submit" className="button-primary">
          Editar Usuario
        </button>
      </form>
    </section>
  )
}
