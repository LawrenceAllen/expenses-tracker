import { useState } from "react"
import { NewWalletType } from "../../types/wallet"
import DropdownList from "../global/list/dropdown_list"

type WalletDropdownListProps = {
  listData: NewWalletType[]
  title: string
  setWalletID: (e: string) => void
  setDropdownTitle: (e: string) => void
  className?: string
}

export const WalletDropdownList = ({ listData, title, className, setWalletID, setDropdownTitle}: WalletDropdownListProps) => {
  
  const [showList, setShowList] = useState(false)

  const toggleList = () => {
    if (showList) {
      setShowList(false)
    } else {
      setShowList(true)
    }
  }

  const getWalletID = (item: any) => {
    setWalletID(item.id)
    setDropdownTitle(item.name)
    toggleList()
  }

  return (
    <DropdownList  
      listData={listData} 
      title={title} 
      className={className} 
      onItemClick={getWalletID}
    />
  )
}

export default DropdownList
