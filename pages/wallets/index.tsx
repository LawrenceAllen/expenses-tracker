import { useState, useEffect } from 'react'
import { setDoc, doc, serverTimestamp, updateDoc } from '@firebase/firestore'
import { db } from '../../firebase.config'
import { CustomCircularProgressbar } from '../../components/global/progressbar/circular-progress-bar'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import { Header, Button, Form } from '../../components/global'
import DropdownList from '../../components/global/list/dropdown_list'
import WalletList from '../../components/wallets/wallet-list'
import { getWallets } from '../../utils/getWallets'

const Wallets = () => {
  const [optionsVisibility, setOptionsVisibility] = useState(true) 
  const [addFormVisibility, setAddFormVisibility] = useState(false)
  const [addBalanceVisibility, setAddBalanceVisibility] = useState(false)
  const [walletID, setWalletID] = useState('') 
  const [name, setName] = useState('')
  const [balance, setBalance] = useState(0)
  const [newBalanceAmount, setNewBalanceAmount] = useState(0)
  const [warningText, setWarningText] = useState('')
 
  const [dropdownTitle, setDropdownTitle] = useState('Choose Wallets')
  const wallets = getWallets()

  useEffect(() => {
    const warningTextTimeout = setTimeout(() => {
      setWarningText('')
    }, 3000)

    return () => {
      clearTimeout(warningTextTimeout)
    }
  }, [warningText])

  const toggleAddForm = () => {
    if (addFormVisibility) {
      setAddFormVisibility(false)
      setOptionsVisibility(true)
    } else {
      setAddFormVisibility(true)
      setOptionsVisibility(false)
    }
  }

  const toggleAddBalanceForm = () => {
    if (addBalanceVisibility) {
      setAddBalanceVisibility(false)
      setOptionsVisibility(true)
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

  const addWallet = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const existingWallet = wallets.find(e => e.name === name)

    if (name === '' && balance === 0) {
      setWarningText('Please fill out the fields')
      clearNameAndBalance()
    } else if (name === '') {
      setWarningText('Please enter a name for the wallet')
      clearNameAndBalance('name')
    } else if (existingWallet) {
      setWarningText('Wallet exists already')
      clearNameAndBalance('name')
    }  else if (balance <= 0 || isNaN(balance)) {
      setWarningText('Please enter a number higher than 0')
      clearNameAndBalance('balance')
    } else {
      const highest = Math.max(...wallets.map(e => e.subid), 0)
      setDoc(doc(db, 'wallets', '2311212520-' + (highest + 1).toString()), 
        {
          name: name, 
          balance: balance,
          subid: highest + 1,
          date_added: serverTimestamp()
        }
      )
      toggleAddForm()
      clearNameAndBalance()
    }
  }

  const clearNameAndBalance = (string?: string) => {
    if (string === 'name') {
      setName('')
    } else if (string === 'balance') {
      setBalance(0)
    } else {
      setName('')
      setBalance(0)
    }
  }

  const updateBalance = () => {
    if (walletID === '') {
      setWarningText("Please choose a wallet")
    } else {
      const walletDocRef = doc(db, 'wallets', walletID)
      const wallet = wallets.find(e => e.id === walletID)
      if (wallet !== null && wallet !== undefined) {
        if (newBalanceAmount > 0) {
          const balance = wallet.balance + newBalanceAmount
          updateDoc(walletDocRef, {
            balance: balance
          })
        } else if (isNaN(newBalanceAmount)) {
          setWarningText('Please fill out amount')
        } else {
          setWarningText("Must not be less than 0")
        }
      }
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

  const addWalletInputInfo = [
    {
      id: 1,
      type: "text",
      labelName: "name",
      value: name,
      placeholder: "Name",
      required: true,
      onChange: setWalletName,
    },
    {
      id: 2,
      type: "number",
      labelName: "balance",
      value: balance || '',
      placeholder: "Balance",
      required: true,
      onChange: setWalletBalance
    }
  ]

  const addBalanceInputInfo = [
    {
      id: 1,
      type: "number",
      labelName: "amount",
      value: newBalanceAmount,
      placeholder: "Amount",
      required: true,
      onChange: setNewWalletBalance
    }
  ]
  
  return (
    <main>
      <Header headerOption={false} />
      <ClickAwayListener onClickAway={addFormClickAway}>
        <div className='p-6'>
          {optionsVisibility
            ? <div className='flex gap-2 justify-between align-center w-full'>
                <Button onClick={toggleAddForm}><p>Add Wallet</p></Button>
                <Button onClick={toggleAddBalanceForm}><p>Add Balance</p></Button>
              </div>
            : ''
          }
          {addFormVisibility && 
            <Form inputInfo={addWalletInputInfo}>
              {warningText !== ''
                ? <Button className='cursor-default flex justify-center items-center border-2 border-red-500 mt-4' onClick={clearWarningText}>
                    <p className='ml-auto'>{warningText}</p>
                    <CustomCircularProgressbar warningText={warningText}/>
                  </Button>
                : <div className='flex flex-col gap-2 justify-between align-center w-full mt-4'>
                    <Button variant='add' onClick={addWallet}><p>Add</p></Button>
                    <Button variant="cancel" onClick={toggleAddForm}><p>Cancel</p></Button>
                  </div>
              }
            </Form>
          }
          {addBalanceVisibility &&
            <Form inputInfo={addBalanceInputInfo}>
              <label htmlFor="walletUsed"></label>
              <DropdownList 
                listData={wallets}
                title={dropdownTitle}
                setWalletID={setWalletID}
                setDropdownTitle={setDropdownTitle}
              />
              {warningText !== ''
                ? <Button className='cursor-default flex justify-center items-center border-2 border-red-500 mt-4' onClick={clearWarningText}>
                    <p className='ml-auto'>{warningText}</p>
                    <CustomCircularProgressbar warningText={warningText}/>
                  </Button>
                : <div className='flex flex-col gap-2 justify-between align-center w-full mt-4'>
                    <Button variant='add' onClick={updateBalance}><p>Add</p></Button>
                    <Button variant="cancel" onClick={toggleAddBalanceForm}><p>Cancel</p></Button>
                  </div>
              }
            </Form>
          }
        </div>
      </ClickAwayListener>
      <WalletList className="gap-4" wallets={wallets} warningText={warningText} setWarningText={setWarningText}/>
    </main>
  )
}

export default Wallets
