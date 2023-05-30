import { useState, useEffect, useMemo } from 'react'
import { Header, Button } from '../../components/global'
import { WalletProvider, useWallet } from '../../hooks/useWallet'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import AddWalletForm from '../../components/wallets/add-wallet-form'
import WalletList from '../../components/wallets/wallet-list'
import AddBalanceForm from '../../components/wallets/add-balance-form'

const Wallets = () => {
  const [addFormVisibility, setAddFormVisibility] = useState(false)
  const [addBalanceVisibility, setAddBalanceVisibility] = useState(false)
  const [warningText, setWarningText] = useState('')

  const wallets = useWallet()

  useEffect(() => {
    const warningTextTimeout = setTimeout(() => {
      setWarningText('')
    }, 3000)

    return () => {
      clearTimeout(warningTextTimeout)
    }
  }, [warningText])

  const toggleAddWalletForm = () => {
    if (addFormVisibility) {
      setAddFormVisibility(false)
    } else {
      setAddFormVisibility(true)
    }
  }

  const toggleAddBalanceForm = () => {
    if (addBalanceVisibility) {
      setAddBalanceVisibility(false)
    } else {
      setAddBalanceVisibility(true)
    }
  }

  const addFormsClickAway = () => {
    setAddFormVisibility(false)
    setAddBalanceVisibility(false)
    clearWarningText()
  }

  const clearWarningText = () => {
    warningText !== '' && setWarningText('')
  }

  const WalletListComponent = useMemo(() =>
    <div className='flex justify-between overflow-auto'>
      <div className='flex flex-col w-full px-4'>
        <WalletProvider>
          <WalletList warningText={warningText} setWarningText={setWarningText} />
        </WalletProvider >
      </div>
    </div>
    ,[wallets])

  return (
    <main className='flex flex-col h-screen'>
      <Header page='wallets' />
      <ClickAwayListener onClickAway={addFormsClickAway}>
        <div className='p-4 pt-4'>
          {!addFormVisibility && !addBalanceVisibility
            ? <div className='flex gap-2 justify-between align-center w-full'>
                <Button variant="add" onClick={toggleAddWalletForm}><p>Add Wallet</p></Button>
                <Button variant="add" onClick={toggleAddBalanceForm}><p>Add Balance</p></Button>
              </div>
            : ''
          }
          <WalletProvider>
            <AddWalletForm 
              addFormVisibility={addFormVisibility} 
              warningText={warningText}  
              setWarningText={setWarningText} 
              toggleAddWalletForm={toggleAddWalletForm} 
              clearWarningText={clearWarningText} 
            />
            <AddBalanceForm
              addBalanceVisibility={addBalanceVisibility} 
              warningText={warningText} 
              setWarningText={setWarningText} 
              toggleAddBalanceForm={toggleAddBalanceForm} 
              clearWarningText={clearWarningText} 
            />
          </WalletProvider>
        </div>
      </ClickAwayListener>
      {WalletListComponent}
    </main>
  )
}

export default Wallets
