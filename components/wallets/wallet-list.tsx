import { useState, useEffect } from 'react'
import { NewWalletType } from "../../types/wallet"
import { List } from "../global"
import WalletCard from "./wallet-card"

type WalletList = {
  wallets: []
  className?: string
  warningText: string
  setWarningText: (value: string) => void
}

export const WalletList = ({wallets, className, warningText, setWarningText}: WalletList) => {

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
