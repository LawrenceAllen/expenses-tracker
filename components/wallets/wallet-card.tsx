import { useState, useEffect, useMemo } from "react"
import { NewWalletType } from "../../types/wallet"
import { getExpenses } from "../../utils/getExpenses"
import { NewExpenseType } from "../../types/expense"
import { twMerge } from "tailwind-merge"
import { ClickAwayListener } from "@mui/base"
import { ViewAllExpenses, WalletCardInfo, RemoveWalletButton } from "./wallet-card/"

type WalletCard = {
  wallet: NewWalletType
  warningText: string
  setWarningText: (value: string) => void
}

export const WalletCard = ({wallet, setWarningText}: WalletCard) => {

  const [arrowVisibility, setArrowVisibility] = useState(true)
  const [removeButtonAnimation, setRemoveButtonAnimation] = useState('')
  const [viewAllExpenseAnimation, setViewAllExpenseAnimation] = useState('translate-y-[-95px] max-h-[0px]')
  const [firstSortedExpense, setFirstSortedExpense] = useState<NewExpenseType>()

  const expenses = getExpenses()
  
  const listContainerAnim = twMerge('w-full mt-[-20px] bg-orange-200 rounded-md max-h-[110px]', viewAllExpenseAnimation)

  useEffect(() => {
    const getFirstSortedExpense: any = expenses
      .filter(e => e.wallet_id === wallet.id)
      .sort((a, b) => b.transaction_date.toDate() - a.transaction_date.toDate())
    setFirstSortedExpense(getFirstSortedExpense[0])
  }, [expenses])

  const openWalletOptions = () => {
    setViewAllExpenseAnimation('animate-viewAllButtonWidthDown')
    setRemoveButtonAnimation('translate-y-[0px] animate-removeButtonUp max-h-[1000px]')
    setArrowVisibility(false)
  }

  const closeWalletOptions = () => {
    if (!arrowVisibility) {
      setViewAllExpenseAnimation('animate-viewAllButtonWidthUp translate-y-[-95px] animate-viewAllButtonMaxHeightDown max-h-[0px]')
      setRemoveButtonAnimation('h-0')
      setArrowVisibility(true)
    }
  }
  
  const ViewAllExpensesComponent = useMemo(() => 
    <ViewAllExpenses 
      className={listContainerAnim} 
      firstSortedExpense={firstSortedExpense}
      wallet={wallet} 
    />
  , [listContainerAnim])
  
  return (
    <ClickAwayListener onClickAway={closeWalletOptions}>
      <div className="w-full flex flex-col gap-2 mt-2 first:mt-0 items-center">
        <RemoveWalletButton className={removeButtonAnimation} wallet={wallet}/>
        <WalletCardInfo 
          wallet={wallet}
          arrowVisibility={arrowVisibility}
          openWalletOptions={openWalletOptions}
          closeWalletOptions={closeWalletOptions}
          setWarningText={setWarningText}
        />
        {ViewAllExpensesComponent}
      </div>
    </ClickAwayListener>
  )
}

export default WalletCard
