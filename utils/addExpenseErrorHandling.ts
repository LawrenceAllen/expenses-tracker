

export const AddExpenseErrorHandling = (amount: number, transactionType: string, balance: number, setWarningText: (value: string) => void) => {
  if (amount < 0 || amount === 0) {
    setWarningText("Enter a number higher than 0")
    return false
  } else if (transactionType === '') {
    setWarningText("Please enter transaction type")
    return false
  } else if (amount > balance) {
    setWarningText("Amount is greater than your wallet's balance")
    return false
  } else {
    return true
  }
}
