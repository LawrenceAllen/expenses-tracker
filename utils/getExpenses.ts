import { useState, useEffect } from 'react'
import { db } from '../firebase.config'
import { collection, onSnapshot, QuerySnapshot, DocumentData} from '@firebase/firestore'
import { NewExpenseType } from '../types/expense'

export function getExpenses() {
  const [expenses, setExpenses] = useState<NewExpenseType[]>([])
  const expensesColRef = collection(db, 'expenses')

  useEffect(
    () => onSnapshot(expensesColRef, (snapshot: QuerySnapshot<DocumentData>) => {
      setExpenses(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            amount: doc.data().amount,
            transaction_date: doc.data().transaction_date,
            transaction_type: doc.data().transaction_type,
            wallet_id: doc.data().wallet_id,
            subid: doc.data().subid
          }
        }).sort((a, b) => b.transaction_date - a.transaction_date)
      )}),
    []
  )

  return expenses
}
