import { useState, useEffect } from 'react'
import { db } from '../../firebase.config'
import { setDoc, doc, serverTimestamp, updateDoc } from '@firebase/firestore'
import { Header, Button, Form } from '../../components/global'
import { getWallets } from '../../utils/getWallets'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import WalletList from '../../components/wallets/wallet-list'
import ClickAwayListener from '@mui/base/ClickAwayListener'; 
import { NewWalletType } from '../../types/wallet'
import DropdownList from '../../components/global/list/dropdown_list'

const Wallets = () => {
  const [optionsVisibility, setOptionsVisibility] = useState(true) 
  const [addFormVisibility, setAddFormVisibility] = useState(false)
  const [addBalanceVisibility, setAddBalanceVisibility] = useState(false)
  const [walletID, setWalletID] = useState('') 
  const [name, setName] = useState('')
  const [balance, setBalance] = useState('')
  const [newBalanceAmount, setNewBalanceAmount] = useState('')
  const [warningText, setWarningText] = useState('')
  const [circularValue, setCircularValue] = useState(0)
  const wallets = getWallets()

  let value: number = 0;
  let interval: any;

  useEffect(() => {
    const warningTextTimeout = setTimeout(() => {
      setWarningText('')
    }, 3000)

    return () => {
      clearTimeout(warningTextTimeout)
    }
  }, [warningText])

  useEffect(() => {
    if (warningText !== '') {
      resetCounter();
      interval = setInterval(function() {
        if (value === 100) {
          stopCounter()
        }
        value++
        setCircularValue(value)
      }, 30);
    }

    return () => {
      resetCounter()
    }

  }, [warningText])

  const stopCounter = () => {
    clearInterval(interval);
  }
  
  const resetCounter = () => {
    stopCounter();
    value = 0
    setCircularValue(value)
  }

  const toggleAddForm = () => {
    if (addFormVisibility) {
      setAddFormVisibility(false)
      setAddBalanceVisibility(false)
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
  }

  const clearWarningText = () => {
    warningText !== '' && setWarningText('')
  }

  const addWallet = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const existingWallet = wallets.find(e => e.name === name)
    const convertedBalance = parseInt(balance)

    if (name === '' && balance === '') {
      setWarningText('Please fill out the fields')
    } else if (name === '') {
      setWarningText('Please enter a name for the wallet')
    } else if (balance === '') {
      setWarningText('Please enter a number for the balance');
    } else if (existingWallet) {
      setWarningText('Wallet exists already')
    }  else if (convertedBalance <= 0) {
      setWarningText('Please enter a number higher than 0')
    } else {
      const highest = Math.max(...wallets.map(e => e.subid), 0)
      setDoc(doc(db, 'wallets', '2311212520-' + (highest + 1).toString()), 
        {
          name: name, 
          balance: convertedBalance,
          subid: highest + 1,
          date_added: serverTimestamp()
        }
      )
      toggleAddForm()
    }
  }

  const updateBalance = () => {
    const walletDocRef = doc(db, 'wallets', walletID)
    const wallet = wallets.find(e => e.id === walletID)
    if (wallet !== null && wallet !== undefined) {
      const balance = wallet.balance + parseInt(newBalanceAmount)
      updateDoc(walletDocRef, {
        balance: balance
      })
    }
  }

  const setExpenseWalletID = (e: any) => {
    setWalletID(e.target.value)
  }

  const setWalletName = (e : React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }

  const setWalletBalance = (e : React.ChangeEvent<HTMLInputElement>) => {
    setBalance(e.currentTarget.value);
  }

  const setNewWalletBalance = (e : React.ChangeEvent<HTMLInputElement>) => {
    setNewBalanceAmount(e.currentTarget.value);
  }

  const addWalletInputInfo = [
    {
      id: 1,
      type: "text",
      labelName: "name",
      placeholder: "Name",
      required: true,
      onChange: setWalletName
    },
    {
      id: 2,
      type: "number",
      labelName: "balance",
      placeholder: "Balance",
      required: true,
      onChange: setWalletBalance
    }
  ]

  const addBalanceInputInfo = [
    {
      id: 1,
      type: "number",
      labelName: "balance",
      placeholder: "Balance",
      required: true,
      onChange: setNewWalletBalance
    }
  ]
  
  return (
    <main>
      <Header headerOption={false}></Header>
      <ClickAwayListener onClickAway={addFormClickAway}>
        <div className='p-6'>
          {optionsVisibility
            ? <div className='flex gap-2 justify-between align-center w-full'>
                <Button onClick={toggleAddForm}><p>Add Wallet</p></Button>
                <Button onClick={toggleAddBalanceForm}><p>Add Balance</p></Button>
                {/* <Button onClick={toggleAddForm}><p>Remove Wallets</p></Button> */}
              </div>
            : ''
          }
          {addFormVisibility && 
            <Form inputInfo={addWalletInputInfo}>
              {warningText !== ''
                ? <Button className='cursor-default flex justify-center items-center border-2 border-red-500 mt-4' onClick={clearWarningText}>
                    <p className='ml-auto'>{warningText}</p>
                    <div className='ml-auto w-6 h-6'>
                      <CircularProgressbar
                        maxValue={80} 
                        value={circularValue}
                        strokeWidth={50}
                        background={true}
                        styles={buildStyles({
                          strokeLinecap: "butt",
                          pathColor: "#fca5a5",
                        })}
                      />
                    </div>
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
              />
              {/* <select className='cursor-pointer w-full mt-4 bg-none bg-transparent border-b-2 border-cyan active:outline-none focus:outline-none text-gray-500 placeholder:text-gray-500' name="walletUsed" id="walletUsed" onChange={setExpenseWalletID}>
                <option className='hidden' value="">Wallet</option>
                {wallets.map((wallet: NewWalletType) => (
                  <option className='text-cyan bg-orange-100' key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </option>
                ))}
              </select> */}
              <div className='flex flex-col gap-2 justify-between align-center w-full mt-4'>
                <Button variant='add' onClick={updateBalance}><p>Add</p></Button>
                <Button variant="cancel" onClick={toggleAddBalanceForm}><p>Cancel</p></Button>
              </div>
              {/* {warningText !== ''
                ? <Button className='cursor-default flex justify-center items-center border-2 border-red-500 mt-4' onClick={clearWarningText}>
                    <p className='ml-auto'>{warningText}</p>
                    <div className='ml-auto w-6 h-6'>
                      <CircularProgressbar
                        maxValue={80} 
                        value={circularValue}
                        strokeWidth={50}
                        background={true}
                        styles={buildStyles({
                          strokeLinecap: "butt",
                          pathColor: "#fca5a5",
                        })}
                      />
                    </div>
                  </Button>
                : 
              } */}
            </Form>
          }
        </div>
      </ClickAwayListener>
      <WalletList className="gap-4" wallets={wallets} warningText={warningText} setWarningText={setWarningText}/>
    </main>
  )
}

export default Wallets
