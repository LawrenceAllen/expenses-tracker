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
    if (wallets !== undefined && expenses !== null) {      
      const wallet = wallets.find(e => e.id === walletID)
      if (wallet !== undefined && wallet !== null) {
        setWalletName(wallet.name)
      }
    }
  }, [wallets])
  
  return (
    <>
      <main className='w-full'>
        <Header headerOption={false}></Header>
      </main>
      <div className="flex flex-col gap-4 p-4">
        <h1 className='text-cyan text-2xl'>{walletName}</h1>
        {expenses.map((e: NewExpenseType) => {
          if (e.wallet_id === walletID) {
            return <ExpenseCard
              key={e.id}
              id={e.id}
              amount={e.amount}
              transaction_date={e.transaction_date}
              transaction_type={e.transaction_type}
              wallet_id={e.wallet_id}
              isHideWalletName={true}
            />
          }
        })}
      </div>
    </>
  )
}

export default WalletActivities
