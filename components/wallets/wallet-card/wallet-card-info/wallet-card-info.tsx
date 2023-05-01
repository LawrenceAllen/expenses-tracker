import { walletsColRef } from "../../../../firebase.config"
import { doc, updateDoc } from "@firebase/firestore"
import { BiEdit } from "react-icons/bi"
import { Button, Form, Text } from "../../../global"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { NewWalletType } from "../../../../types/wallet"
import { useState } from 'react'

type WalletCardInfoType = {
  wallet: NewWalletType
  arrowVisibility: boolean
  openWalletOptions: () => void
  closeWalletOptions: () => void
  setWarningText:(e: string) => void
}

export const WalletCardInfo = ({
  wallet, 
  arrowVisibility,
  openWalletOptions,
  closeWalletOptions,
  setWarningText,
}: WalletCardInfoType
) => {
  
  const [newName, setNewName] = useState('')
  const [isNameChange, setIsNameChange] = useState(false)
  
  const openChangeNameForm = () => {
    setIsNameChange(true)
    closeWalletOptions()
  }

  const setNewWalletName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value)
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

  return (
    <div className="w-full p-4 pb-2 z-20 bg-orange-300 rounded-sm">
      {!isNameChange
        ? <>
            <li id={wallet.id} style={{listStyleType: "none"}}>
              <div className="flex justify-between items-center">
                <Text className="text-2xl" text={wallet.name} />
                <BiEdit size={"24px"} className="cursor-pointer" color="#214454" onClick={openChangeNameForm} />
              </div>
              <Text text={`Balance: ${wallet.balance}`} />
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
  )
}
