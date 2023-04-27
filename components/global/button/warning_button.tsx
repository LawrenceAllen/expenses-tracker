import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { Button } from "./button"

type WarningButton = {
  onClick: () => void
  warningText: string
  className?: string
}

export const WarningButton = ({onClick, warningText, className}: WarningButton) => {

  const [circularValue, setCircularValue] = useState(0)

  let value: number = 0
  let interval: any

  useEffect(() => {
    if (warningText !== '') {
      resetCounter()
      interval = setInterval(function() {
        if (value === 100) {
          stopCounter()
        }
        value++
        setCircularValue(value)
      }, 30)
    }

    return () => {
      resetCounter()
    }

  }, [warningText])

  const stopCounter = () => {
    clearInterval(interval)
  }
  
  const resetCounter = () => {
    stopCounter()
    value = 0
    setCircularValue(value)
  }

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
