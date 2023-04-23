import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import { twMerge } from "tailwind-merge"
import { List } from "./list"
import { ClickAwayListener } from "@mui/base"

type DropdownListProps = {
  listData: any[]
  title: string
  titleStyle?: string
  listStyle?: string
  onItemClick: (e: any) => void
}

export const DropdownList = ({ listData, title, titleStyle, listStyle, onItemClick }: DropdownListProps) => {

  const titleStyles = twMerge(`${title === 'Wallets' ? 'text-gray-500' : 'text-black'} select-none cursor-pointer flex justify-between items-center w-full mt-4 bg-none bg-transparent border-b-2 border-cyan text-gray-500 placeholder:text-gray-500`, titleStyle)
  const listStyles = twMerge('bg-orange-200 gap-1 max-h-56 overflow-y-auto', listStyle)

  const [showList, setShowList] = useState(false)

  const toggleList = () => {
    if (showList) {
      setShowList(false)
    } else {
      setShowList(true)
    }
  }

  const itemClickHandler = (item: any) => {
    onItemClick(item)
    toggleList()
  }

  return (
    <div>
      <div className={titleStyles} onClick={toggleList}>
        <h1>{title}</h1>
        <MdKeyboardArrowDown />
      </div>
      {showList &&
        <List className={listStyles}>
          {listData.map((item: any) => (
            <ClickAwayListener onClickAway={toggleList}>
              <div key={item.id} id={item.id} className="select-none cursor-pointer flex items-center h-8 px-2 py-6 bg-orange-200 border-cyan hover:bg-orange-300" onClick={() => itemClickHandler(item)}>
                <p>{item.name}</p>
              </div>
            </ClickAwayListener> 
          ))}
        </List>
      }
    </div>
  )
}

export default DropdownList
