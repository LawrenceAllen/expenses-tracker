export interface ExpensesArray {
  expenses: NewExpenseType[]
  className?: string
  listTitle: string
  walletID: string | string[] | undefined
}

export interface NewExpenseType {
  id: string
  amount: number
  transaction_date: any
  transaction_type: string
  wallet_id: string
  subid: number
}
