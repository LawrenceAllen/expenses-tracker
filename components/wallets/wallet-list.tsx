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
    <div className="p-4">
      <h1 className="text-3xl text-cyan mb-2">Wallets</h1>
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
