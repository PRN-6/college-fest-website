import React, { useState, useEffect, useRef } from 'react'

const FooterNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const dockItems = [
    { icon: 'I', label: 'Home' },
    { icon: 'C', label: 'People' },
    { icon: 'O', label: 'Ideas' },
    { icon: 'N', label: 'Favorites' },
    { icon: 'S', label: 'Search' }
  ]

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#080808]/95 backdrop-blur-md z-50 px-6 py-1 sm:px-8 sm:py-3 flex justify-between items-center text-[10px] sm:text-xs text-gray-500 tracking-widest font-mono border-t border-white/5">


      {/* Copyright text (Center on bigger screens) */}
      <div className="hidden md:block flex-1 text-center whitespace-nowrap">
        CODE THE FUTURE
      </div>

      {/* Navigation - Right Side */}
      <div className="flex flex-1 justify-end items-center relative" ref={menuRef}>

        {/* Desktop View: Full horizontal list */}
        <div className="hidden sm:flex gap-2">
          {dockItems.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer w-9 h-9 flex items-center justify-center text-white text-lg bg-black bg-opacity-60 rounded-lg border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
              title={item.label}
            >
              <span>{item.icon}</span>
            </div>
          ))}
        </div>

        {/* Mobile View: Expandable Menu Toggle */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-full border border-white/10 transition-transform duration-500 ${isMenuOpen ? 'rotate-45' : ''}`}
          >
            <span className="text-2xl leading-none">+</span>
          </button>

          {/* Mobile Expandable Menu Panel */}
          <div className={`absolute bottom-14 right-0 w-48 bg-[#080808]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out origin-bottom-right ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}>
            <div className="p-2 flex flex-col gap-1">
              {dockItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-xl transition-colors cursor-pointer group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-lg text-white group-hover:bg-white group-hover:text-black transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-white font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Copyright fallback */}
        {!isMenuOpen && (
          <div className="md:hidden absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap text-[8px] opacity-40">
            © 2026
          </div>
        )}
      </div>
    </div>
  )
}

export default FooterNav
