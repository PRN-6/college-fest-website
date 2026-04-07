import React, { useState } from 'react'

const FooterNav = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const dockItems = [
    { icon: 'I', label: 'Home' },
    { icon: 'C', label: 'People' },
    { icon: 'O', label: 'Ideas' },
    { icon: 'N', label: 'Favorites' },
    { icon: 'S', label: 'Search' }
  ]

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-12 sm:h-14  bg-black z-40"></div>
      <div className={`fixed bottom-16 right-4 z-50 transition-all duration-300 ${isExpanded ? 'scale-110' : 'scale-100'}`}>
        <div className="bg-black-500 bg-opacity-10 backdrop-blur-xl rounded-lg shadow-2xl">
          {/* Toggle Button */}
          <div 
            onClick={toggleExpand}
            className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all duration-200 ${
              isExpanded ? 'animate-bounce' : 'animate-pulse'
            }`}
          >
            <span className={`text-white text-xs transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
              {isExpanded ? '▼' : '▲'}
            </span>
          </div>
          
          {/* Menu Items - Only show when expanded */}
          <div 
            className={`transition-all duration-300 ${
              isExpanded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-2'
            }`}
            style={{
              maxHeight: isExpanded ? '20rem' : '0',
              overflow: 'hidden'
            }}
          >
            <div className="flex flex-col gap-2 p-3 pt-8">
              {dockItems.map((item, index) => (
                <div
                  key={index}
                  className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white text-xs sm:text-sm bg-black bg-opacity-60 rounded hover:bg-opacity-80 hover:scale-110 transition-all duration-300 ease-out"
                  title={item.label}
                >
                  <span>{item.icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FooterNav