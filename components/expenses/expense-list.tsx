import { ExpensesArray, NewExpenseType } from "../../types/expense"
import { List } from "../global"
import ExpenseCard from "./expense-card"

export const ExpenseList = ({expenses, className}: ExpensesArray) => {

  return(
    <div className="p-4">
      <h1 className="text-3xl text-cyan mb-2">Expenses</h1>
      <List className={className}>
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
  )
}

export default ExpenseList
