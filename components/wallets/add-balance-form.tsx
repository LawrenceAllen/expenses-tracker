import { updateDoc, doc } from "@firebase/firestore"
import { useWallet } from "../../hooks/useWallet"
import { Form, Button } from "../global"
import { CustomCircularProgressbar } from "../global/progressbar/circular-progress-bar"
import { WalletDropdownList } from "./wallet-dropdown-list"
import { db } from "../../firebase.config"

type AddBalanceForm = {
  dropdownTitle: string
  newBalanceAmount: number
  walletID: string
  setDropdownTitle: (e: string) => void
  setNewWalletBalance: (e: any) => void
  setWalletID: (e: string) => void
  addBalanceVisibility: boolean
  warningText: string
  setWarningText: (e: string) => void
  toggleAddBalanceForm: () => void
  clearWarningText: () => void
  clearAddBalanceForm: (e?: string) => void
}

const AddBalanceForm = ({
  dropdownTitle,
  newBalanceAmount, 
  walletID,
  setDropdownTitle,
  setNewWalletBalance,
  setWalletID,
  addBalanceVisibility,
  warningText,
  setWarningText,
  toggleAddBalanceForm,
  clearWarningText,
  clearAddBalanceForm,
}: AddBalanceForm
) => {

  const wallets = useWallet()
  
  const addBalanceInputInfo = [
    {
      id: 1,
      type: "number",
      labelName: "amount",
      value: newBalanceAmount || '',
      placeholder: "Amount",
      required: true,
      onChange: setNewWalletBalance
    }
  ]

  const updateBalance = () => {
    if (walletID === '') {
      setWarningText("Please choose a wallet")
    } else if (newBalanceAmount <= 0 || isNaN(newBalanceAmount)) {
      setWarningText('Please enter a number higher than 0')
      clearAddBalanceForm('newBalanceAmount')
    } else {
      const walletDocRef = doc(db, 'wallets', walletID)
      const wallet = wallets.find(e => e.id === walletID)
      const balance = wallet!.balance + newBalanceAmount
        updateDoc(walletDocRef, {
          balance: balance
        })
      toggleAddBalanceForm()
      clearAddBalanceForm()
    }
  }

  return (
    <>
      {addBalanceVisibility &&
        <Form inputInfo={addBalanceInputInfo}>
          <label htmlFor="walletUsed"></label>
          <WalletDropdownList
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
    </>
  )
}

export default AddBalanceForm
