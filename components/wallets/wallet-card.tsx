import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { NewWalletType } from "../../types/wallet"
import { Text, List, Button, Form } from "../global"
import { BiEdit } from "react-icons/bi"
import { MdDeleteOutline, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { doc, updateDoc, deleteDoc } from "@firebase/firestore"
import { walletsColRef } from "../../firebase.config"
import { getExpenses } from "../../utils/getExpenses"
import { NewExpenseType } from "../../types/expense"
import { ExpenseCard } from "../expenses/expense-card"
import { twMerge } from "tailwind-merge"
import { ClickAwayListener } from "@mui/base"

type WalletCard = {
  wallet: NewWalletType
  warningText: string
  setWarningText: (value: string) => void
}

export const WalletCard = ({wallet, setWarningText}: WalletCard) => {

  const [arrowVisibility, setArrowVisibility] = useState(true)
  const [isNameChange, setIsNameChange] = useState(false)
  const [newName, setNewName] = useState('')
  const [widthAnimation, setWidthAnimation] = useState('hidden')
  const [removeButtonAnimation, setRemoveButtonAnimation] = useState('')
  const [firstTwoExpenses, setFirstTwoExpenses] = useState<NewExpenseType[]>([])
  const expenses = getExpenses()
  
  const contentStyling = "flex justify-between items-center"
  const listContainerAnim = twMerge('w-full mt-[-20px] bg-orange-200 rounded-md max-h-[0px]', widthAnimation)

  useEffect(() => {
    const sortedTwoExpenses: any[] = expenses
      .filter(e => e.wallet_id === wallet.id)
      .sort((a, b) => b.transaction_date.toDate() - a.transaction_date.toDate())
      .slice(0, 2)
    setFirstTwoExpenses(sortedTwoExpenses)
  }, [expenses])

  const openWalletOptions = () => {
    setWidthAnimation('animate-widthDown max-h-[1000px]')
    setRemoveButtonAnimation('translate-y-[0px] animate-removeButtonUp max-h-[1000px]')
    setArrowVisibility(false)
  }

  const closeWalletOptions = () => {
    if (!arrowVisibility) {
      setRemoveButtonAnimation('hidden')
      setWidthAnimation('hidden')
      setArrowVisibility(true)
    }
  }

  const updateWalletName = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const walletDocRef = doc(walletsColRef, wallet.id)

    if (newName !== '') {
      updateDoc(walletDocRef, {
        name: newName
      })
    } else {
      setWarningText("Please input something")
    }

    setIsNameChange(false)
  }

  const setNewWalletName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value)
  }

  const deleteWallet = () => {
    const walletDocRef = doc(walletsColRef, wallet.id)
    deleteDoc(walletDocRef)
  }

  const editFormInfo = [
    {
      id: 1,
      type: "text",
      value: newName,
      labelName: "editWalletName",
      placeholder: wallet.name,
      onChange: setNewWalletName
    },
  ]

  const MiniExpensesList = useMemo(() => 
    <List className="gap-0">
      {firstTwoExpenses
        .filter((expense: NewExpenseType) => expense.wallet_id === wallet.id)
        .map((e: NewExpenseType) => 
          <ExpenseCard 
            key={e.id}
            className="bg-transparent px-4 py-2 rounded-tr-[0px] rounded-tl-[0px] first:pt-6"
            id={e.id}
            amount={e.amount}
            transaction_date={e.transaction_date}
            transaction_type={e.transaction_type}
            wallet_id={e.wallet_id}
            type="preview"
          />
        )
      }
    </List>
  , [firstTwoExpenses])

  const ViewAllButton = useMemo(() => 
    <>
      {firstTwoExpenses.length >= 2 &&
        <Link className="block mt-3" href={`wallets/${wallet.id}`}>
          <Button className="bg-orange-100 border-[1px] border-orange-200 rounded-tl-[0px] rounded-tr-[0px] shadow-sm">
            <p className="text-cyan text-center">View all</p>
          </Button>
        </Link>
      }
    </>
  , [firstTwoExpenses])
  
  return (
    <ClickAwayListener onClickAway={closeWalletOptions}>
      <div className="w-full flex flex-col gap-2 items-center">
        <Button className={`flex justify-center items-center gap-2 h-14 pb-4 max-h-0 mb-[-22px] translate-y-[42px] ${removeButtonAnimation}`} variant="cancel" onClick={deleteWallet}>
          <p>Remove Wallet</p>
          <MdDeleteOutline size={"24px"}/>
        </Button>
        <div className="w-full p-4 pb-2 z-20 bg-orange-300 rounded-sm">
          {!isNameChange
            ? <>
                <li
                  id={wallet.id} 
                  style={{listStyleType: "none"}} 
                  className="w-full"
                >
                  <div className={contentStyling}>
                    <Text 
                      className="text-2xl"
                      text={wallet.name}
                    />
                    <BiEdit size={"24px"} className="cursor-pointer" color="#214454" onClick={() => setIsNameChange(true)} />
                  </div>
                  <Text 
                    text={`Balance: ${wallet.balance}`}
                  />
                </li>
                {arrowVisibility 
                  ? <div className="cursor-pointer w-full flex justify-center" onClick={openWalletOptions}>
                    <MdOutlineKeyboardArrowDown size="28px" color="#214454"/> 
                  </div> 
                  : <div className="cursor-pointer w-full flex justify-center" onClick={closeWalletOptions}>
                    <MdOutlineKeyboardArrowUp size="28px" color="#214454"/>
                  </div> 
                }
              </>
            : <Form inputInfo={editFormInfo}>
                <div className="flex gap-4 pb-2">
                  <Button variant="cancel" className="mt-4" onClick={() => setIsNameChange(false)}>Cancel</Button>
                  <Button variant="add" className="mt-4 bg-orange-100" onClick={updateWalletName}>Change</Button>
                </div>
              </Form>
          }
        </div>
        <div className={`${listContainerAnim}`}>
          {MiniExpensesList}
          {ViewAllButton}
        </div>
      </div>
    </ClickAwayListener>
  )
}

export default WalletCard
