import { ExpensesArray, NewExpenseType } from "../../types/expense"
import { List } from "../global"
import { twMerge } from 'tailwind-merge'
import { ExpenseCard } from "./expense-card"

export const ExpenseList = ({expenses, className, listTitle, walletID}: ExpensesArray) => {

  const classNames = twMerge('flex-1 relative z-0 overflow-y-auto h-screen', className)

  const ListTitle = () => {
    return (
      <>
        {listTitle 
          ? <h1 className="text-3xl text-cyan">
              {listTitle}
            </h1>
          : null
        }
      </>
    )
  }

  return (
    <>
      {walletID === undefined
        ? <>
            <ListTitle />
            <List className={classNames}>
              {expenses.map((expense: NewExpenseType) => 
                <ExpenseCard
                  key={expense.id}
                  id={expense.id}
                  amount={expense.amount}
                  transaction_date={expense.transaction_date}
                  transaction_type={expense.transaction_type}
                  wallet_id={expense.wallet_id}
                />
              )}
            </List>
          </>
        : <>
            <ListTitle />
            <List className={classNames}>
              {expenses
                .filter((expense: NewExpenseType) => expense.wallet_id === walletID)
                .map((expense: NewExpenseType) => 
                  <ExpenseCard
                    key={expense.id}
                    id={expense.id}
                    amount={expense.amount}
                    transaction_date={expense.transaction_date}
                    transaction_type={expense.transaction_type}
                    wallet_id={expense.wallet_id}
                  />
                )
              }
            </List>
          </>
      }
    </>
  )
}

export default ExpenseList
