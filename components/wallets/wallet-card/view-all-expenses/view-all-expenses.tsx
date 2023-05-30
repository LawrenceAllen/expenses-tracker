import Link from "next/link"
import { NewExpenseType } from "../../../../types/expense"
import { ExpenseCard } from "../../../expenses/expense-card"
import { Button } from "../../../global"
import { NewWalletType } from "../../../../types/wallet"

type ViewAllExpensesType = {
  firstSortedExpense: NewExpenseType | undefined
  wallet: NewWalletType
  className: string
}

export const ViewAllExpenses = ({firstSortedExpense, wallet, className}: ViewAllExpensesType) => {

  return (
    <div className={className}>
      {firstSortedExpense &&
        <>
          <ExpenseCard 
            key={firstSortedExpense.id}
            className="bg-transparent px-4 py-0 rounded-tr-[0px] rounded-tl-[0px] first:pt-6"
            id={firstSortedExpense.id}
            amount={firstSortedExpense.amount}
            transaction_date={firstSortedExpense.transaction_date}
            transaction_type={firstSortedExpense.transaction_type}
            wallet_id={firstSortedExpense.wallet_id}
            type="preview"
          />
          <Link className="block mt-3" href={`wallets/${wallet.name.replace(' ', '_')}`}>
            <Button className="bg-orange-100 border-[1px] border-orange-200 rounded-tl-[0px] rounded-tr-[0px] shadow-sm">
              <p className="text-cyan text-center">View all</p>
            </Button>
          </Link>
        </>
      }
    </div>
  )
}
