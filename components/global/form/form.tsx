import { twMerge } from "tailwind-merge"

type Form = {
  children?: React.ReactNode 
  className?: string
  inputInfo?: {
    id: number
    type: string
    labelName: string
    value: any
    placeholder?: string
    required?: boolean
    pattern?: string
    onChange: (e : React.ChangeEvent<HTMLInputElement>) => void
  }[],
  inputClassNames?: string
}

export const Form = ({children, className, inputInfo, inputClassNames}: Form) => {

  const classNames = twMerge('flex flex-col gap-4', className)
  const inputStyling = twMerge('bg-none bg-transparent border-b-2 border-b-cyan placeholder:text-gray-500 active:outline-none bg-transparent focus:outline-none bg-transparent', inputClassNames)
  
  if (inputInfo) {
    return (
      <div>
        {inputInfo.map((input) => (
          <div key={input.id} className={classNames}>
            <label htmlFor={input.labelName}></label>
            <input id={input.labelName} className={inputStyling} type={input.type} name={input.labelName} value={input.value} placeholder={input.placeholder} required={input.required} pattern={input.pattern} onChange={input.onChange} />
          </div>
        ))}
        {children}
      </div>
    )
  } else {
    return (
      <form className={classNames}>
        {children}
      </form>
    )
  }
}
