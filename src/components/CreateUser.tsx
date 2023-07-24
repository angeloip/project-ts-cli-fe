import { useUser } from '../context/UserContext'
import { Input } from './Input'

export const CreateUser = () => {
  const { createUser } = useUser()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const id = crypto.randomUUID()
    const name = data.get('name') as string
    const email = data.get('email') as string
    const github = data.get('github') as string

    createUser({ id, name, email, github })
    form.reset()
  }
  return (
    <section>
      <h1 className="text-2xl font-bold text-center mb-3">Crear Usuario</h1>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <Input text="Nombre" name="name" />
        <Input text="Email" name="email" />
        <Input text="Github" name="github" />
        <button type="submit" className="button-primary">
          Crear Usuario
        </button>
      </form>
    </section>
  )
}
