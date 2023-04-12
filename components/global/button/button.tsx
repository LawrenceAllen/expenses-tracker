import { twMerge } from "tailwind-merge"

type ButtonProps = {
  children?: React.ReactNode
  style?: React.CSSProperties
  onClick?: (e : any) => void
  className?: string
  variant?: string
}

export const Button = ({children, style, onClick, className, variant }: ButtonProps) => {

  const defaultStyles = twMerge('w-full rounded-md p-2 drop-shadow-sm text-center', className)
  const addButtonStyles = twMerge('bg-orange-300', defaultStyles)
  const cancelButtonStyles = twMerge('bg-red-400', defaultStyles)

  return (
    <button 
      className={
        variant === 'add' ? addButtonStyles : 
        variant === 'cancel' ? cancelButtonStyles : 
        defaultStyles
      } 
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  )
}
