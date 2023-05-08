import { useState, useEffect } from 'react'
import { Text } from "../global"
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
}

export const ExpenseCard = ({id, amount, transaction_date, transaction_type, wallet_id, className, type}: ExpenseCard) => {
  
  const normalDateOptions = {month: 'long', day: 'numeric', year: 'numeric'}
  const weekdayOptions = {weekday: 'long'}
  const timeOptions = {hour: 'numeric', minute: 'numeric'}
  const wallets = getWallets()

  const [walletName, setWalletName] = useState('')
  const [date, setDate] = useState('')

  const classNames = twMerge('w-full p-4 bg-orange-300 rounded-sm', className)

  useEffect(() => {
    const wallet = wallets.find((e) => e.id === wallet_id)
    wallet && setWalletName(wallet.name)
  }, [wallets, id])

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
          <div className='flex justify-between items-center w-full'>
            <Text className="text-2xl" text={transaction_type} />
            {walletName 
              ? <Text className="text-md place-self-end" text={walletName} /> 
              : <Text className="italic text-sm text-red-500 place-self-end" text='Wallet Deleted' />
            }
          </div>
          <Text text={`Amount: ₱${amount}`} />
          <Text text={`Date Added: ${date}`} />
        </li>
      }
    </>
  )
}

export default ExpenseCard
