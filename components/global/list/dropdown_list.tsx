import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import { twMerge } from "tailwind-merge"
import { List } from "./list"

type DropdownListProps = {
  listData: any[]
  title: string
  setWalletID: (e: string) => void
  setDropdownTitle: (e: string) => void
  className?: string
}

export const DropdownList = ({ listData, title, className, setWalletID, setDropdownTitle}: DropdownListProps) => {

  const defaultStyles = twMerge('bg-orange-200 gap-1 h-56 overflow-y-auto', className)
  
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
    <div>
      <div className="select-none cursor-pointer flex justify-between items-center w-full mt-4 bg-none bg-transparent border-b-2 border-cyan text-gray-500 placeholder:text-gray-500" onClick={toggleList}>
        <h1>{title}</h1>
        <MdKeyboardArrowDown />
      </div>
      {showList && 
        <List className={defaultStyles}>
          {listData.map((item: any) => (
            <div key={item.id} id={item.id} className="select-none cursor-pointer flex items-center h-8 px-2 py-6 bg-orange-200 border-cyan hover:bg-orange-300" onClick={() => getWalletID(item)}>
              <p>{item.name}</p>
            </div>
          ))}
        </List>
      }
    </div>
  )
}

export default DropdownList
