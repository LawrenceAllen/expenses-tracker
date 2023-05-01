import { doc, deleteDoc } from '@firebase/firestore'
import { walletsColRef } from "../../../../firebase.config"
import { MdDeleteOutline } from "react-icons/md"
import { Button } from "../../../global"
import { NewWalletType } from "../../../../types/wallet"

type RemoveWalletButtonType = {
  wallet: NewWalletType
  className: string
}
export const RemoveWalletButton = ({className, wallet}: RemoveWalletButtonType) => {

  const deleteWallet = () => {
    const walletDocRef = doc(walletsColRef, wallet.id)
    deleteDoc(walletDocRef)
  }

  return (
    <Button className={`flex justify-center items-center gap-2 h-14 pb-4 max-h-0 mb-[-22px] translate-y-[42px] ${className}`} variant="cancel" onClick={deleteWallet}>
      <p>Remove Wallet</p>
      <MdDeleteOutline size={"24px"}/>
    </Button>
  )
}
