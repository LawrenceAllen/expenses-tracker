import { useState, useEffect } from "react"
import Link from 'next/link'

type Header = {
  page: string
}

export const Header = ({page}: Header) => {

  const removeMarker = {
    listStyleType: 'none'
  }

  const liStyling = ('border-b-2 border-cyan')

  return (
    <header className='w-full h-max bg-orange-300 p-4 py-5 drop-shadow'>
      <ul className="w-max ml-auto flex gap-5 text-cyan text-lg font-semibold">
        <li className={page === 'wallets' ? liStyling : ''} style={removeMarker}><Link href='/wallets'>Wallets</Link></li>
        <li className={page === 'expenses' ? liStyling: ''} style={removeMarker}><Link href='/'>Expenses</Link></li>
      </ul>
    </header>
  )
}
