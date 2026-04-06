import React from 'react'

const FooterNav = () => {
  const dockItems = [
    { icon: 'I', label: 'Home' },
    { icon: 'C', label: 'People' },
    { icon: 'O', label: 'Ideas' },
    { icon: 'N', label: 'Favorites' },
    { icon: 'S', label: 'Search' }
  ]

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black-500 bg-opacity-10 backdrop-blur-xl rounded-full border border-white border-opacity-20 shadow-xl">
        <div className="flex gap-2 px-6 py-3">
          {dockItems.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer w-12 h-12 flex items-center justify-center text-white text-xl bg-black bg-opacity-60 rounded-lg border border-white border-opacity-20 hover:bg-opacity-80 hover:scale-125 hover:-translate-y-2 transition-all duration-300 ease-out"
              title={item.label}
            >
              <span>{item.icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FooterNav