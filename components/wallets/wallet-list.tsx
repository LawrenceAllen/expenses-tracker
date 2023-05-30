import { useWallet } from "../../hooks/useWallet"
import { NewWalletType } from "../../types/wallet"
import { List } from "../global"
import WalletCard from "./wallet-card"
import { twMerge } from "tailwind-merge"

type WalletList = {
  className?: string
  warningText: string
  setWarningText: (value: string) => void
}

export const WalletList = ({className, warningText, setWarningText}: WalletList) => {

  const wallets = useWallet()

  const classNames = twMerge('flex-1 relative z-0 overflow-y-auto h-screen', className)

  return(
    <List className={classNames}>
      {wallets.map((wallet: NewWalletType) => (
        <WalletCard 
          key={wallet.id}
          wallet={wallet}
          warningText={warningText}
          setWarningText={setWarningText}
        />
      ))}
    </List>
  )
}

export default WalletList
