interface Props {
  type?: string
  text?: string
  id?: string
  name?: string
  onChange?: (...args: any[]) => void
  value?: any
  icon?: JSX.Element
  onClick?: () => void
  readOnly?: boolean
}

export const Input: React.FC<Props> = ({
  type = 'text',
  text,
  id,
  name,
  onChange,
  value,
  icon,
  onClick,
  readOnly
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        className={`input-dynamic pl-3 ${
          icon ? 'pr-9' : 'pr-3'
        } py-2.5 w-full bg-transparent rounded-lg border-2 border-gray-400 outline-none focus:border-indigo-500 peer`}
        placeholder=" "
        name={name}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
        autoComplete="off"
      />
      {icon && (
        <span
          className="absolute right-3 top-[50%] -translate-y-1/2 text-lg cursor-pointer"
          onClick={onClick}
        >
          {icon}
        </span>
      )}

      <label
        htmlFor={id}
        className="label-dynamic peer-focus:text-indigo-500 absolute left-2.5 top-[50%] -translate-y-1/2 select-none px-1 pointer-events-none text-gray-500
        bg-white"
      >
        {text}
      </label>
    </div>
  )
}
