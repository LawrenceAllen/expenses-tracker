import { useState, useEffect } from 'react'
import { db } from '../firebase.config'
import { collection, onSnapshot, QuerySnapshot, DocumentData, CollectionReference} from '@firebase/firestore'
import { NewWalletType } from '../types/wallet'

export function getWallets() {
  const [wallets, setWallets] = useState<NewWalletType[]>([])
  const walletsColRef = collection(db, 'wallets')

  useEffect(
    () => onSnapshot(walletsColRef, (snapshot: QuerySnapshot<DocumentData>) => {
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
    []
  )

  return wallets
}
