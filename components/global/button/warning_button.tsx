import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { Button } from "./button"

type WarningButton = {
  onClick: () => void
  warningText: string
  circularValue: number
  className?: string
}

export const WarningButton = ({onClick, warningText, circularValue, className}: WarningButton) => {


  return (
    <Button className="cursor-default flex justify-center items-center border-2 border-red-500 mt-4" onClick={onClick}>
      <p className='ml-auto'>{warningText}</p>
      <div className='ml-auto w-6 h-6'>
        <CircularProgressbar
          maxValue={80} 
          value={circularValue}
          strokeWidth={50}
          background={true}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: "#fca5a5",
          })}
        />
      </div>
    </Button>
  )
}
