import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { RiInformationLine, RiTeamLine, RiPaletteLine, RiAddLine } from 'react-icons/ri'

const FooterNav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const dockItems = [
    { label: 'About', icon: RiInformationLine, path: '/about' },
    { label: 'Team', icon: RiTeamLine, path: '/team' },
    { label: 'Themes', icon: RiPaletteLine, path: null },
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
    <>
      {/* ── Desktop Footer Bar ── */}
      <div className="hidden sm:flex fixed bottom-0 left-0 w-full bg-[#080808]/95 backdrop-blur-md z-50 px-8 py-3 justify-between items-center text-[10px] text-gray-500 tracking-widest font-mono border-t border-white/5">
        <div className="hidden md:block text-center whitespace-nowrap">
          CODE THE FUTURE
        </div>
        <div className="flex gap-2 ml-auto">
          {dockItems.map((item, index) => {
            const Icon = item.icon
            const isActive = item.path && location.pathname === item.path
            return (
              <div
                key={index}
                onClick={() => item.path && navigate(item.path)}
                className={`group cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-300
                  ${isActive
                    ? 'bg-white text-black border-white'
                    : 'text-white bg-black/60 border-white/10 hover:bg-white hover:text-black hover:border-white'
                  }`}
                title={item.label}
              >
                <Icon size={20} />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Mobile Expandable Bottom Nav ── */}
      <div className="sm:hidden fixed bottom-6 right-6 z-50" ref={menuRef}>
        {/* Expandable Menu Panel */}
        <div className={`absolute bottom-16 right-0 w-48 bg-[#080808]/98 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right ${isMenuOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10 pointer-events-none'}`}>
          <div className="p-3 flex flex-col gap-2">
            {dockItems.map((item, index) => {
              const Icon = item.icon
              const isActive = item.path && location.pathname === item.path
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (item.path) navigate(item.path)
                    setIsMenuOpen(false)
                  }}
                  className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 cursor-pointer
                    ${isActive ? 'bg-white text-black' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300
                    ${isActive ? 'bg-black text-white' : 'bg-white/5'}`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-xs font-mono tracking-widest uppercase font-bold">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Toggle Button (FAB style) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-14 h-14 flex items-center justify-center rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-white/20 transition-all duration-500 active:scale-90
            ${isMenuOpen ? 'rotate-45 bg-[#111] text-white' : ''}`}
        >
          <RiAddLine size={28} className="transition-transform duration-500" />
        </button>
      </div>
    </>
  )
}

export default FooterNav