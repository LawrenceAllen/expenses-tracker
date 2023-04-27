import { useState, useEffect, createContext, useContext } from 'react'
import { db } from '../firebase.config'
import { collection, onSnapshot, QuerySnapshot, DocumentData} from '@firebase/firestore'
import { NewWalletType } from '../types/wallet'

export const useWalletSource = () => {
  const [wallets, setWallets] = useState<NewWalletType[]>([])
  const walletsColRef = collection(db, 'wallets')

  useEffect(() => 
    onSnapshot(walletsColRef, (snapshot: QuerySnapshot<DocumentData>) => {
      setWallets(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
            balance: doc.data().balance,
            subid: doc.data().subid,
            date_added: doc.data().date_added
          }
        })
      )
    }),
  [])

  return wallets
}

const WalletContext = createContext<ReturnType<typeof useWalletSource>>(
  {} as unknown as ReturnType<typeof useWalletSource>
)

export function useWallet() {
  return useContext(WalletContext)
}

export const WalletProvider = ({ children }: { children: React.ReactNode }) =>{
  return (
    <WalletContext.Provider value={useWalletSource()}>
      {children}
    </WalletContext.Provider>
  )
}
