import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { ExpenseCard } from "../../components/expenses/expense-card"
import { Header } from "../../components/global"
import { NewExpenseType } from "../../types/expense"
import { getExpenses } from "../../utils/getExpenses"
import { getWallets } from "../../utils/getWallets"

const WalletActivities = () => {
  const router = useRouter()
  const walletID = router.query.walletID
  const expenses = getExpenses()
  const wallets = getWallets()

  const [walletName, setWalletName] = useState('')

  useEffect(() => {
    const wallet = wallets.find(e => e.id === walletID)
    wallet && setWalletName(wallet.name)
  }, [wallets])
  
  return (
    <>
      <main className='w-full'>
        <Header headerOption={false}></Header>
      </main>
      <div className="flex flex-col gap-4 p-4">
        <h1 className='text-cyan text-2xl'>{walletName}</h1>
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
      </div>
    </>
  )
}

export default WalletActivities
