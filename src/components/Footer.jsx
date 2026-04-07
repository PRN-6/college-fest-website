import React from 'react'

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#050505] pt-20 pb-10 border-t border-white/5 z-30">
      <div className="max-w-7xl mx-auto px-8">

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">

          {/* Brand Column */}
          <div className="max-w-xs">
            <h2 className="text-white text-4xl font-black tracking-tighter mb-6 italic">
              INOVEX<span className="text-white/40"></span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Pushing the boundaries of digital art and 3D experiences. Join us for the most innovative festival of the year.
            </p>
            <div className="flex gap-4">
              {['TW', 'IG', 'FB', 'LN'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 text-xs hover:border-white hover:text-white transition-all cursor-pointer"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
            <div className="flex flex-col gap-4 text-sm font-mono tracking-widest text-white/40">
              <span className="text-white font-black mb-2 uppercase">EXPLORE</span>
              <a href="#" className="hover:text-white transition-colors">TIMELINE</a>
              <a href="#" className="hover:text-white transition-colors">EVENTS</a>
              <a href="#" className="hover:text-white transition-colors">PEOPLE</a>
              <a href="#" className="hover:text-white transition-colors">IDEAS</a>
            </div>

            <div className="flex flex-col gap-4 text-sm font-mono tracking-widest text-white/40">
              <span className="text-white font-black mb-2 uppercase">SUPPORT</span>
              <a href="#" className="hover:text-white transition-colors">FAQ</a>
              <a href="#" className="hover:text-white transition-colors">HELP CENTER</a>
              <a href="#" className="hover:text-white transition-colors">TICKETS</a>
              <a href="#" className="hover:text-white transition-colors">CONTACT</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-[0.5em] text-white/20 uppercase">
          <div>© 2026 INOVEX. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS</a>
          </div>
        </div>

        {/* Massive Background Text (Refined aesthetic) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02] -z-10 translate-y-1/4">
          <div className="text-[25vw] font-black italic whitespace-nowrap text-white">
            COLLAGE FEST 0.3
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
