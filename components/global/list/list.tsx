import { twMerge } from "tailwind-merge"

type ListProps = {
  children: React.ReactNode
  className?: string
}

export const List = ({className, children}: ListProps) => {

  const classNames = twMerge('flex flex-col gap-4 w-full', className)
  
  return(
    <ul className={classNames}>
      {children}
    </ul>
  )
}
