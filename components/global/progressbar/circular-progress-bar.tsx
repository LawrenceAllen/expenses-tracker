import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const CustomCircularProgressbar = ({warningText}: {warningText: string}) => {
  const [circularValue, setCircularValue] = useState(0)

  let circularTempValue: number = 0; // value used by circular progressbar
  let interval: any; // ID for setInterval function use by circular progressbar

  useEffect(() => {
    if (warningText !== '') {
      resetCounter();
      interval = setInterval(function() {
        if (circularTempValue === 100) {
          stopCounter()
        }
        setCircularValue(circularTempValue += 1)
      }, 30);
    }

    return () => {
      resetCounter()
    }

  }, [warningText])

  const stopCounter = () => {
    clearInterval(interval);
  }
  
  const resetCounter = () => {
    stopCounter();
    circularTempValue = 0
    setCircularValue(circularTempValue)
  }

  return (
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
  )
}

