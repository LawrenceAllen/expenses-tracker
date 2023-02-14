import { twMerge } from "tailwind-merge"

export const Text = ({text, className}: {text: string, className?: string}) => {

  const classNames = twMerge('text-cyan', className)
  
  return(
    <p className={classNames}>{text}</p>
  )
}
