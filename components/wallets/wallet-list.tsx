import { useWallet } from "../../hooks/useWallet"
import { NewWalletType } from "../../types/wallet"
import { List } from "../global"
import WalletCard from "./wallet-card"

type WalletList = {
  className?: string
  warningText: string
  setWarningText: (value: string) => void
}

export const WalletList = ({className, warningText, setWarningText}: WalletList) => {

  const wallets = useWallet()

  return(
    <div className="p-4 pt-0">
      <List className={className}>
        {wallets.map((wallet: NewWalletType) => (
          <WalletCard 
            key={wallet.id}
            wallet={wallet}
            warningText={warningText}
            setWarningText={setWarningText}
          />
        ))}
      </List>
    </div>
  )
}

export default WalletList
