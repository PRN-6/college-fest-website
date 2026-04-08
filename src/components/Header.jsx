import React from 'react'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full bg-[#080808] z-50 px-8 py-5 flex justify-center items-center'>
      <div className='flex items-center gap-2'>
        <img
          src={null}
          alt="Logo"
          className='w-8 h-8 sm:w-10 sm:h-10 hidden'
        />
        <span className='text-white font-bold text-sm sm:text-lg tracking-widest'>INOVEX</span>
      </div>
    </header>
  )
}

export default Header