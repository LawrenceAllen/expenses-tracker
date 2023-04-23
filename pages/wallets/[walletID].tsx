import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { Header } from "../../components/global"
import { getExpenses } from "../../utils/getExpenses"
import { getWallets } from "../../utils/getWallets"
import ExpenseList from '../../components/expenses/expense-list'

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
        <Header page='wallets' />
      </main>
      <div className="flex flex-col gap-4 p-4">
        <ExpenseList 
          expenses={expenses} 
          listTitle={walletName} 
          className='m-0'
          walletID={walletID}
        />
      </div>
    </>
  )
}

export default WalletActivities
