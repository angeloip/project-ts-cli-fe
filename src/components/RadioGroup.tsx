interface Props {
  name?: string
  options?: string[]
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  disabled?: boolean
}

export const RadioGroup: React.FC<Props> = ({
  name = 'radio-group',
  options,
  onChange,
  value,
  disabled
}) => {
  return (
    <section className="flex flex-col gap-3">
      {options?.map((option) => (
        <label key={option} className="relative w-ful pl-6 cursor-pointer">
          <input
            type="radio"
            name={name}
            className="radio-input hidden"
            onChange={onChange}
            value={option}
            checked={value === option}
            disabled={disabled}
          />
          <span className="radio-value">{option}</span>
          <span className="radio-btn"></span>
        </label>
      ))}
    </section>
  )
}
