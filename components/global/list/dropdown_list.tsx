import { NewWalletType } from "../../../types/wallet"
import { List } from "./list"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useState } from "react"
import { getWallets } from "../../../utils/getWallets"

type DropdownListProps = {
  listData: any[]
  onClick?: () => void
  className?: string
}

export const DropdownList = ({ listData, onClick, className}: DropdownListProps) => {

  const wallets = getWallets()
  
  const [showList, setShowList] = useState(false)
  const [walletID, setWalletID] = useState('')
  const [dropdownTitle, setDropdownTitle] = useState('Choose Wallets')

  const toggleList = () => {
    if (showList) {
      setShowList(false)
    } else {
      setShowList(true)
    }
  }

  const getWalletID = (e: any) => {
    setWalletID(e.target.id)

    if (wallets !== undefined && wallets !== null) {
      const wallet = wallets.find(e => e.id === walletID)
      console.log(wallet);
      
      if (wallet !== undefined && wallet !== null) {
        setDropdownTitle(wallet.name)
      }
    }
    toggleList()
  }

  return (
    <div>
      <div className="select-none cursor-pointer flex justify-between items-center w-full mt-4 bg-none bg-transparent border-b-2 border-cyan text-gray-500 placeholder:text-gray-500" onClick={toggleList}>
        <h1>{dropdownTitle}</h1>
        <MdKeyboardArrowDown />
      </div>
      {showList && 
        <List className="gap-0">
          {listData.map((e: any) => (
            <div key={e.id} id={e.id} className="select-none cursor-pointer flex items-center h-8 px-2 py-5 bg-orange-200 border-b-2 border-x-2 border-cyan" onClick={getWalletID}>
              <p>{e.name}</p>
            </div>
          ))}
        </List>
      }
    </div>
  )
}

export default DropdownList
