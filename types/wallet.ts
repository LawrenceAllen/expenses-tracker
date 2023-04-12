export interface WalletsArray {
  wallets: NewWalletType[]
}

export interface NewWalletType {
  id: string
  name: string
  balance: number
  subid: number
}
