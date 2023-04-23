import { NewWalletType } from "../../types/wallet"
import DropdownList from "../global/list/dropdown_list"

type WalletDropdownListProps = {
  listData: NewWalletType[]
  title: string
  setWalletID: (e: string) => void
  setDropdownTitle: (e: string) => void
  titleStyle?: string
  listStyle?: string
}

export const WalletDropdownList = ({ listData, title, titleStyle, listStyle, setWalletID, setDropdownTitle}: WalletDropdownListProps) => {

  const getWalletID = (item: any) => {
    setWalletID(item.id)
    setDropdownTitle(item.name)
  }

  return (
    <DropdownList  
      listData={listData} 
      title={title}
      titleStyle={titleStyle} 
      listStyle={listStyle} 
      onItemClick={getWalletID}
    />
  )
}

export default DropdownList
