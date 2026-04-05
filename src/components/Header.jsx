import React from 'react'

const Header = () => {
  return (
    <header className='fixed top-4 left-4 z-50'>
        <div className='flex items-center gap-2'>
            <img 
                src=""
                alt="Logo" 
                className='w-8 h-8 sm:w-10 sm:h-10'
            />
            <span className='text-white font-bold text-sm sm:text-xl'>AJ Institute of Engineering & Technology</span>
        </div>
    </header>
  )
}

export default Header