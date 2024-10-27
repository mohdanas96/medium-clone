import { ChangeEvent } from 'react'

interface LabelledInput {
  label: string
  placeholder: string
  type: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const LabelledInputBox = ({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInput) => {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-start w-full h-20">
        <label className="mb-2" htmlFor="">
          {label}
        </label>

        <input
          className="mb-2 border-2 border-slate-300 p-2 rounded-md"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default LabelledInputBox
