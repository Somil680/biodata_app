import { AlignJustify } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='w-full h-11 bg-[#] dark:bg-[#ffffff] flex items-center justify-between px-4 shadow-xl'>
      <div className='flex gap-2'>

      <AlignJustify />
      <p>Biodata Maker</p>
      </div>
      <p>Login</p>
    </div>
  )
}

export default Header
