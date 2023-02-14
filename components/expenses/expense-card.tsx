import { useState, useEffect } from 'react'
import { NewExpenseType } from "../../types/expense"
import { Text, List } from "../global"
import { getWallets } from '../../utils/getWallets'
import { twMerge } from 'tailwind-merge'

type ExpenseCard = {
  id: string
  amount: number
  transaction_date: any
  transaction_type: string
  wallet_id: string
  className?: string
  type?: string 
  isHideWalletName?: boolean
}

export const ExpenseCard = ({id, amount, transaction_date, transaction_type, wallet_id, className, type, isHideWalletName}: ExpenseCard) => {
  const normalDateOptions = {month: 'long', day: 'numeric', year: 'numeric'}
  const weekdayOptions = {weekday: 'long'}
  const timeOptions = {hour: 'numeric', minute: 'numeric'}
  const wallets = getWallets()

  const [walletName, setWalletName] = useState('')
  const [date, setDate] = useState('')

  const classNames = twMerge('w-full p-4 bg-orange-300 rounded-xl', className)

  useEffect(() => {
    if (wallets !== null && wallets !== undefined) {
      const wallet = wallets.find((e) => e.id === wallet_id)
      if (wallet !== undefined && wallet !== null) {
        setWalletName(wallet.name)
      }
    }
  }, [id, wallets])

  useEffect(() => {
    if (transaction_date !== null && transaction_date !== undefined) {
      const transactionDate = transaction_date.toDate()
      const normalDate = transactionDate.toLocaleDateString('en-us', normalDateOptions)
      const weekday = transactionDate.toLocaleDateString('en-us', weekdayOptions)
      const time = transactionDate.toLocaleTimeString('en-us', timeOptions)
      const date = normalDate + ' ' + weekday + ' - ' + time
      const previewDate = normalDate + ' - ' + time
      if (type === 'preview') {
        setDate(previewDate)
      } else {
        setDate(date)
      }
    }
  }, [transaction_date])
  
  return (
    <>
      {type === 'preview'
      ? <li
          key={id}
          id={id} 
          style={{listStyleType: "none"}} 
          className={classNames}
        >
          <div className='flex justify-between items-center'>
            <Text text={`${transaction_type} - ₱${amount}`} />
            <Text className='ml-auto' text={date} />
          </div>
        </li>
      : <li
          key={id}
          id={id} 
          style={{listStyleType: "none"}} 
          className={classNames}
        >
          <div className='flex justify-between items-center'>
            <Text className="text-2xl" text={transaction_type} />
            {!isHideWalletName && <Text className="text-xl" text={walletName} />}
          </div>
          <Text text={`Amount: ₱${amount}`} />
          <Text text={date} />
        </li>
      }
    </>
  )
}

export default ExpenseCard
