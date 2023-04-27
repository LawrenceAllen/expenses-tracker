import { db } from '../../firebase.config'
import { setDoc, doc, serverTimestamp } from '@firebase/firestore'
import { useWallet } from "../../hooks/useWallet"
import { Button, Form } from "../global"
import { CustomCircularProgressbar } from '../global/progressbar/circular-progress-bar'

type AddWalletForm = {
  name: string
  balance: number
  setWalletName: (e: any) => void
  setWalletBalance: (e: any) => void
  addFormVisibility: boolean
  warningText: string
  setWarningText: (e: string) => void
  toggleAddWalletForm: () => void
  clearWarningText: () => void
  clearAddWalletForm: (e?: string) => void
}

const AddWalletForm = ({
  name, 
  balance,
  setWalletName, 
  setWalletBalance,
  addFormVisibility,
  warningText, 
  setWarningText, 
  toggleAddWalletForm,
  clearWarningText,
  clearAddWalletForm, 
}: AddWalletForm
) => {

  const wallets = useWallet()

  const addWallet = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const existingWallet = wallets.find(e => e.name === name)

    if (name === '' && balance === 0) {
      setWarningText('Please fill out the fields')
      clearAddWalletForm()
    } else if (name === '') {
      setWarningText('Please enter a name for the wallet')
      clearAddWalletForm('name')
    } else if (existingWallet) {
      setWarningText('Wallet exists already')
      clearAddWalletForm('name')
    }  else if (balance <= 0 || isNaN(balance)) {
      setWarningText('Please enter a number higher than 0')
      clearAddWalletForm('balance')
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
      toggleAddWalletForm()
      clearAddWalletForm()
    }
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
  
  return (
    <>
      {addFormVisibility && 
        <Form inputInfo={addWalletInputInfo}>
          {warningText !== ''
            ? <Button className='cursor-default flex justify-center items-center border-2 border-red-500 mt-4' onClick={clearWarningText}>
                <p className='ml-auto'>{warningText}</p>
                <CustomCircularProgressbar warningText={warningText}/>
              </Button>
            : <div className='flex flex-col gap-2 justify-between align-center w-full mt-4'>
                <Button variant='add' onClick={addWallet}>Add</Button>
                <Button variant="cancel" onClick={toggleAddWalletForm}><p>Cancel</p></Button>
              </div>
          }
        </Form>
      }
    </>
  )
}

export default AddWalletForm
