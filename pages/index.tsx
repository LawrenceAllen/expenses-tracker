import { useState, useEffect } from 'react'
import { Header, Button, Form } from '../components/global'
import { ExpenseList } from "../components/expenses/expense-list"
import { getWallets } from '../utils/getWallets'
import { getExpenses } from '../utils/getExpenses'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { db, walletsColRef } from '../firebase.config'
import { setDoc, updateDoc, doc, serverTimestamp } from '@firebase/firestore'
import { WarningButton } from '../components/global/button/warning_button'
import { AddExpenseErrorHandling } from '../utils/addExpenseErrorHandling'
import { WalletDropdownList } from '../components/wallets/wallet-dropdown-list'
 
const Home = () => {
  const [isExistingWallet, setIsExistingWallet] = useState(false)
  const [isAddExpenseForm, setIsAddExpenseForm] = useState(false)
  const [addExpenseContainerWidth, setAddExpenseContainerWidth] = useState('w-14')
  const [dropdownTitle, setDropdownTitle] = useState('Choose Wallets')
  const [amount, setAmount] = useState(0)
  const [transactionType, setTransactionType] = useState('')
  const [walletID, setWalletID] = useState('')
  const [warningText, setWarningText] = useState('')
  const [circularValue, setCircularValue] = useState(0)
  const expenses = getExpenses()
  const wallets = getWallets()

  const addExpenseContainer = twMerge('flex justify-between h-screen mb-20 bg-cyan', addExpenseContainerWidth)

  let value: number = 0;
  let interval: any;

  useEffect(() => {
    if (wallets.length > 0) {
      setIsExistingWallet(true)
    } else {
      setIsExistingWallet(false)
    }
  }, [wallets])

  useEffect(() => {
    if (isAddExpenseForm) {
      setAddExpenseContainerWidth('absolute top-[68px] right-0 w-full')
    } else {
      setAddExpenseContainerWidth('w-14')
    }
  }, [isAddExpenseForm])

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

  const toggleAddExpenseForm = () => {
    if (isAddExpenseForm) {
      setIsAddExpenseForm(false)
    } else {
      setIsAddExpenseForm(true)
    }
  }

  const clearWarningText = () => {
    warningText !== '' && setWarningText('')
  }

  const addExpense = () => {
    const highest = Math.max(...expenses.map(e => e.subid), 0)
    const walletDocRef = doc(walletsColRef, walletID)
    const wallet = wallets.find(e => e.id === walletID)
    
    const addExpenseErrorCheck = AddExpenseErrorHandling(amount, transactionType, wallet!.balance, setWarningText)
    if (addExpenseErrorCheck) {
      updateDoc(walletDocRef, {
        balance: wallet!.balance - amount
      })
      setDoc(doc(db, 'expenses', '52416514195-' + (highest + 1).toString()), 
        {
          amount: amount,
          transaction_date: serverTimestamp(),
          transaction_type: transactionType,
          wallet_id: walletID,
          subid: highest + 1
        }
      )
      toggleAddExpenseForm()
    }
  }

  const setExpenseAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.currentTarget.value)
    setAmount(n)
  }

  const setExpenseTransactionType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionType(e.currentTarget.value)
  }

  const setExpenseWalletID = (e: any) => {
    setWalletID(e.target.value)
  }

  const inputInfo = [
    {
      id: 1,
      type: "number",
      labelName: "amount",
      value: amount,
      placeholder: "Amount",
      required: true,
      onChange: setExpenseAmount
    },
    {
      id: 2,
      type: "text",
      labelName: "transaction_type",
      value: transactionType,
      placeholder: "Transaction Type",
      required: true,
      onChange: setExpenseTransactionType
    }
  ]

  return (
    <>
      <main className='w-full'>
        <Header headerOption={true}></Header>
        {!isExistingWallet ? 
          <div className='flex flex-col gap-2 w-full py-8 px-4 mx-auto text-xl text-cyan'>
            <strong>Go to Wallets and add a wallet/account</strong>
            <h2></h2>
            <p className='text-sm'>This is where you can enter or modify the amount that you have in your wallets/accounts</p>
          </div>
          : ''
        }
      </main>
      <div className='flex justify-between items-center'>
        <div className='place-self-start w-full'>
          <ExpenseList expenses={expenses} />
        </div>
        <div className={addExpenseContainer}>
          {isAddExpenseForm 
            ? <div className='w-full p-4'>
                <Form inputInfo={inputInfo} inputClassNames="border-orange-300 placeholder:text-gray-300 text-white">
                  {warningText !== ''
                    ? <WarningButton
                        onClick={clearWarningText} 
                        warningText={warningText}
                        circularValue={circularValue}
                      />
                    : <>
                        <label htmlFor="walletUsed"></label>
                        <WalletDropdownList
                          listData={wallets}
                          title={dropdownTitle}
                          setWalletID={setWalletID}
                          setDropdownTitle={setDropdownTitle}
                        />
                        <div className='flex flex-col gap-2 justify-between align-center w-full mt-4'>
                          <Button variant='add' onClick={addExpense}><p>Add</p></Button>
                          <Button variant="cancel" onClick={toggleAddExpenseForm}><p>Cancel</p></Button>
                        </div>                    
                      </>
                  }
                </Form>
              </div>
            : <Button className='flex flex-col items-center gap-2 my-auto' onClick={toggleAddExpenseForm}>
                <p className='text-orange-300 font-bold' style={{writingMode: "vertical-rl", textOrientation: "upright", textTransform: "uppercase"}}>add expense</p>
                <MdOutlineAddCircleOutline size="30px" color="#fdba74"/>
              </Button>
          }
        </div>
      </div>
    </>
  )
}

export default Home
