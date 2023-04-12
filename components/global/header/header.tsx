import { useState, useEffect } from "react"
import Link from 'next/link'

type Header = {
  headerOption: boolean
}

export const Header = ({headerOption}: Header) => {

  const removeMarker = {
    listStyleType: 'none'
  }

  const liStyling = ('border-b-2 border-cyan')

  return (
    <header className='w-full h-max bg-orange-300 p-4 py-5 drop-shadow'>
      <ul className="w-max ml-auto flex gap-5 text-cyan text-lg font-semibold">
        <li className={!headerOption ? liStyling: ''} style={removeMarker}><Link href='/wallets'>Wallets</Link></li>
        <li className={headerOption ? liStyling: ''} style={removeMarker}><Link href='/'>Expenses</Link></li>
      </ul>
    </header>
  )
}
