import { useState, useEffect, useMemo } from 'react'
import { Header, Button } from '../../components/global'
import { WalletProvider, useWallet } from '../../hooks/useWallet'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import AddWalletForm from '../../components/wallets/add-wallet-form'
import WalletList from '../../components/wallets/wallet-list'
import AddBalanceForm from '../../components/wallets/add-balance-form'

const Wallets = () => {
  const [optionsVisibility, setOptionsVisibility] = useState(true) 
  const [addFormVisibility, setAddFormVisibility] = useState(false)
  const [addBalanceVisibility, setAddBalanceVisibility] = useState(false)
  const [walletID, setWalletID] = useState('') 
  const [name, setName] = useState('')
  const [balance, setBalance] = useState(0)
  const [newBalanceAmount, setNewBalanceAmount] = useState(0)
  const [warningText, setWarningText] = useState('')
  const [dropdownTitle, setDropdownTitle] = useState('Wallets')

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
      setOptionsVisibility(true)
      clearAddWalletForm()
    } else {
      setAddFormVisibility(true)
      setOptionsVisibility(false)
    }
  }

  const toggleAddBalanceForm = () => {
    if (addBalanceVisibility) {
      setAddBalanceVisibility(false)
      setOptionsVisibility(true)
      clearAddBalanceForm()
    } else {
      setAddBalanceVisibility(true)
      setOptionsVisibility(false)
    }
  }

  const addFormClickAway = () => {
    setAddFormVisibility(false)
    setAddBalanceVisibility(false)
    setOptionsVisibility(true)
    clearWarningText()
  }

  const clearWarningText = () => {
    warningText !== '' && setWarningText('')
  }

  const clearAddWalletForm = (string?: string) => {
    if (string === 'name') {
      setName('')
    } else if (string === 'balance') {
      setBalance(0)
    } else {
      setName('')
      setBalance(0)
    }
  }

  const clearAddBalanceForm = (string?: string) => {
    if (string === 'newBalanceAmount') {
      setNewBalanceAmount(0)
    } else {
      setNewBalanceAmount(0)
      setDropdownTitle('Wallets')
    }
  }

  const setWalletName = (e : React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const setWalletBalance = (e : React.ChangeEvent<HTMLInputElement>) => {
    setBalance(parseInt(e.currentTarget.value))
  }

  const setNewWalletBalance = (e : React.ChangeEvent<HTMLInputElement>) => {
    setNewBalanceAmount(parseInt(e.currentTarget.value))
  }

  const WalletListComponent = useMemo(() =>
    <WalletProvider>
      <WalletList className="gap-4" warningText={warningText} setWarningText={setWarningText}/>
    </WalletProvider>
  , [wallets])
  
  return (
    <main>
      <Header page='wallets' />
      <ClickAwayListener onClickAway={addFormClickAway}>
        <div className='p-4 pt-6'>
          {optionsVisibility
            ? <div className='flex gap-2 justify-between align-center w-full'>
                <Button variant="add" onClick={toggleAddWalletForm}><p>Add Wallet</p></Button>
                <Button variant="add" onClick={toggleAddBalanceForm}><p>Add Balance</p></Button>
              </div>
            : ''
          }
          <WalletProvider>
            <AddWalletForm 
              name={name} 
              balance={balance} 
              setWalletName={setWalletName}  
              setWalletBalance={setWalletBalance} 
              addFormVisibility={addFormVisibility} 
              warningText={warningText}  
              setWarningText={setWarningText} 
              toggleAddWalletForm={toggleAddWalletForm} 
              clearWarningText={clearWarningText} 
              clearAddWalletForm={clearAddWalletForm}  
            />
            <AddBalanceForm
              dropdownTitle={dropdownTitle} 
              newBalanceAmount={newBalanceAmount}  
              walletID={walletID} 
              setDropdownTitle={setDropdownTitle} 
              setNewWalletBalance={setNewWalletBalance} 
              setWalletID={setWalletID} 
              addBalanceVisibility={addBalanceVisibility} 
              warningText={warningText} 
              setWarningText={setWarningText} 
              toggleAddBalanceForm={toggleAddBalanceForm} 
              clearWarningText={clearWarningText} 
              clearAddBalanceForm={clearAddBalanceForm} 
            />
          </WalletProvider>
        </div>
      </ClickAwayListener>
      {WalletListComponent}
    </main>
  )
}

export default Wallets
