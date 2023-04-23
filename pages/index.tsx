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
import { NewWalletType } from '../types/wallet'
 
const Home = () => {
  const [isExistingWallet, setIsExistingWallet] = useState(false)
  const [isAddExpenseForm, setIsAddExpenseForm] = useState(false)
  const [addExpenseFormAnimation, setAddExpenseFormAnimation] = useState('')
  const [dropdownTitle, setDropdownTitle] = useState('Wallets')
  const [amount, setAmount] = useState(0)
  const [transactionType, setTransactionType] = useState('')
  const [walletID, setWalletID] = useState('')
  const [warningText, setWarningText] = useState('')
  const expenses = getExpenses()
  const wallets = getWallets()

  const addExpenseForm = twMerge('absolute top-[70px] right-0 p-4 bg-cyan h-screen w-full z-10 translate-x-[32rem]', addExpenseFormAnimation)

  useEffect(() => {
    if (wallets.length > 0) {
      setIsExistingWallet(true)
    } else {
      setIsExistingWallet(false)
    }
  }, [wallets])

  useEffect(() => {
    const warningTextTimeout = setTimeout(() => {
      setWarningText('')
    }, 3000)

    return () => {
      clearTimeout(warningTextTimeout)
    }
  }, [warningText])

  const toggleAddExpenseForm = () => {
    if (isAddExpenseForm) {
      setIsAddExpenseForm(false)
      setAddExpenseFormAnimation('animate-expenseFormSwipeRight')
      setAmount(0)
      setDropdownTitle('Wallets')
      setTransactionType('')
    } else {
      setIsAddExpenseForm(true)
      setAddExpenseFormAnimation('translate-x-[0px] animate-expenseFormSwipeLeft')
    }
  }

  const clearWarningText = () => {
    warningText !== '' && setWarningText('')
  }

  const addExpense = () => {
    let walletDocRef: any
    let wallet: NewWalletType | undefined

    if (walletID !== '') {
      walletDocRef = doc(walletsColRef, walletID)
      wallet = wallets.find(e => e.id === walletID)
    } else {
      setWarningText('Please choose a wallet')
    }

    const highest = Math.max(...expenses.map(e => e.subid), 0)
    
    if (wallet !== undefined) {
      const addExpenseErrorCheck = AddExpenseErrorHandling(amount, transactionType, wallet.balance, setWarningText)
      
      if (addExpenseErrorCheck) {
        updateDoc(walletDocRef, {
          balance: wallet.balance - amount
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
    
  }

  const setExpenseAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.currentTarget.value)
    setAmount(n)
  }

  const setExpenseTransactionType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionType(e.currentTarget.value)
  }

  const inputInfo = [
    {
      id: 1,
      type: "number",
      labelName: "amount",
      value: amount || '',
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
    <main className='w-full'>
      <Header page='expenses' />
      {!isExistingWallet 
        ? <div className='flex flex-col gap-2 w-full py-8 px-4 mx-auto text-xl text-cyan'>
            <strong>Go to Wallets and add a wallet/account</strong>
            <p className='text-sm'>This is where you can enter or modify the amount that you have in your wallets/accounts</p>
          </div>
        : <div className='flex justify-between items-center'>
            <div className='place-self-start w-full p-4'>
              <ExpenseList expenses={expenses} listTitle='Expenses' walletID=''/>
            </div>
            <div className={addExpenseForm}>
              <Form 
                inputInfo={inputInfo} 
                inputClassNames="border-orange-300 placeholder:text-gray-300 text-white"
              >
                {warningText !== ''
                  ? <WarningButton
                      onClick={clearWarningText} 
                      warningText={warningText}
                    />
                  : <>
                      <WalletDropdownList
                        titleStyle='text-gray-300 border-orange-300'
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
            <Button className='flex flex-col justify-center items-center gap-2 w-14 h-screen mb-20 bg-cyan rounded-none' onClick={toggleAddExpenseForm}>
              <p className='text-orange-300 font-bold' style={{writingMode: "vertical-rl", textOrientation: "upright", textTransform: "uppercase"}}>add expense</p>
              <MdOutlineAddCircleOutline size="30px" color="#fdba74"/>
            </Button>
          </div>
      }
    </main>
  )
}

export default Home
