import React from 'react'

const Header = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-12 sm:h-17 bg-black z-40"></div>
      <header className='fixed top-4 left-4 z-50'>
          <div className='flex items-center gap-2'>
              <img 
                  src="/images/ajiet-logo.svg"
                  alt="Logo" 
                  className='w-8 h-8 sm:w-10 sm:h-10'
              />
              <span className='text-white font-bold text-sm sm:text-xl'>AJ Institute of Engineering & Technology</span>
          </div>
      </header>
    </>
  )
}

export default Header