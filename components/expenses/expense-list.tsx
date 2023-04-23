import { useEffect } from 'react'
import { ExpensesArray, NewExpenseType } from "../../types/expense"
import { List } from "../global"
import { twMerge } from 'tailwind-merge'
import { useRouter } from "next/router"
import ExpenseCard from "./expense-card"

export const ExpenseList = ({expenses, className, listTitle, walletID}: ExpensesArray) => {

  const classNames = twMerge('overflow-y-auto h-screen py-4', className)

  const router = useRouter()

  useEffect(() => {
    if (listTitle === '') {
      router.push('/404')
    }
  }, [listTitle])

  return(
    <>
      {walletID === ''
        ? <div>
            <h1 className="text-3xl text-cyan mb-2">{listTitle}</h1>
            <List className={classNames}>
              {expenses.map((expense: NewExpenseType) => (
                <ExpenseCard
                  key={expense.id}
                  className="rounded-md"
                  id={expense.id}
                  amount={expense.amount}
                  transaction_date={expense.transaction_date}
                  transaction_type={expense.transaction_type}
                  wallet_id={expense.wallet_id}
                />
              ))}
            </List>
          </div>
        : <div>
            <h1 className="text-3xl text-cyan mb-2">{listTitle}</h1>
            <List className={classNames}>
              {expenses.map((expense: NewExpenseType) => {
                if (expense.wallet_id === walletID) {
                  return <ExpenseCard
                    key={expense.id}
                    id={expense.id}
                    amount={expense.amount}
                    transaction_date={expense.transaction_date}
                    transaction_type={expense.transaction_type}
                    wallet_id={expense.wallet_id}
                    isHideWalletName={true}
                  />
                }
              })}
            </List>
          </div>
      }
    </>
  )
}

export default ExpenseList
