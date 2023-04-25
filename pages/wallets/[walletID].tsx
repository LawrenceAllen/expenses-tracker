import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { Header } from "../../components/global"
import { getExpenses } from "../../utils/getExpenses"
import { getWallets } from "../../utils/getWallets"
import ExpenseList from '../../components/expenses/expense-list'

const WalletActivities = () => {
  const [walletName, setWalletName] = useState('')
  const [walletID, setWalletID] = useState('')

  const expenses = getExpenses()
  const wallets = getWallets()

  const router = useRouter()
  const id = router.query.walletID

  useEffect(() => {
    const wallet = wallets.find(e => e.id === id)

    if (wallet !== undefined) {
      setWalletName(wallet.name)
      setWalletID(wallet.id)
    } else {
      setWalletName('')
      setWalletID('')
    }
      
    const timeout = setTimeout(() => {
      if (walletID === '') {
        router.push('/404')
      }
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }

  }, [wallets, walletID])
  

  if (walletName !== '' && walletID !== '') {
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
  } else {
    return (
      <main className='w-full'>
        <Header page='wallets' />
        <div className='flex flex-col justify-center items-center w-full pt-24 text-2xl'>
          <h1>Loading...</h1>
        </div>
      </main>
    )
  }
}

export default WalletActivities
