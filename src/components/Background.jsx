import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Background = () => {
  const containerRef = useRef()
  const contentRef = useRef()
  const theme1Ref = useRef()
  const theme2Ref = useRef()
  const theme3Ref = useRef()
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    // 1. Theme 1 Animations
    const blobs = theme1Ref.current.querySelectorAll('.blob')
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        x: 'random(-100, 100)', y: 'random(-100, 100)',
        scale: 'random(0.8, 1.2)', duration: 5 + Math.random() * 5,
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.5
      })
    })

    // 2. Theme 2 Animations
    const kaleidoBlobs = theme2Ref.current.querySelectorAll('.kaleido-blob')
    kaleidoBlobs.forEach((kblob, i) => {
      gsap.to(kblob, {
        x: 'random(-60, 60)', y: 'random(-60, 60)',
        rotation: 'random(-180, 180)', duration: 6 + Math.random() * 4,
        repeat: -1, yoyo: true, ease: 'power1.inOut'
      })
    })

    // 3. Theme 3 Animations (Neon & Panels)
    const neonSymbols = theme3Ref.current.querySelectorAll('.neon-symbol')
    neonSymbols.forEach((symbol, i) => {
      gsap.to(symbol, {
        y: 'random(-50, 50)', x: 'random(-30, 30)',
        rotation: 'random(-45, 45)', duration: 4 + Math.random() * 3,
        repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3
      })
    })

    // 4. High Performance Loop
    let rafId
    const animate = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const elapsedTime = (currentTime - startTimeRef.current) / 1000

      const theme2Progress = parseFloat(getComputedStyle(document.body).getPropertyValue('--bg-theme-2')) || 0
      const theme3Progress = parseFloat(getComputedStyle(document.body).getPropertyValue('--bg-theme-3')) || 0

      // Multi-Theme Cross-Fade
      if (theme1Ref.current) theme1Ref.current.style.opacity = 1 - Math.min(1, theme2Progress * 1.5)
      if (theme2Ref.current) theme2Ref.current.style.opacity = Math.max(0, (theme2Progress - 0.2) * 1.25) * (1 - theme3Progress)
      if (theme3Ref.current) theme3Ref.current.style.opacity = Math.max(0, (theme3Progress - 0.1) * 1.2)

      if (containerRef.current) {
        let bgColor = '#FF0072'
        if (theme3Progress > 0.1) bgColor = '#050505'
        else if (theme2Progress > 0.5) bgColor = '#FFFFFF'
        containerRef.current.style.backgroundColor = bgColor
      }

      // Parallax & Rotation (Optimized for Mobile)
      const isMobile = window.innerWidth < 1024
      const rotationSpeed = isMobile ? 0.5 : 1.5
      const totalRotation = (elapsedTime * rotationSpeed) + (currentScrollY * 0.05)
      const scale = isMobile ? 1.1 : 1.2 + (currentScrollY * 0.0005)

      if (contentRef.current) {
        contentRef.current.style.transform = `rotate(${totalRotation}deg) scale(${scale})`
      }

      rafId = requestAnimationFrame(animate)
    }
    animate()
    return () => { if (rafId) cancelAnimationFrame(rafId) }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-screen overflow-hidden -z-10 transition-colors duration-700 bg-[#FF0072]">
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.05]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>

      <div ref={contentRef} className="absolute inset-[-50%] w-[200%] h-[200%] flex items-center justify-center pointer-events-none transition-transform duration-100 ease-out">

        {/* --- THEME 1: MAGENTA --- */}
        <div ref={theme1Ref} className="absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF0072] to-[#7B2CBF]"></div>
          <div className="blob absolute w-[40%] h-[40%] rounded-full blur-[100px] opacity-60 bg-[#FF1CF7] left-[15%] top-[20%]"></div>
          <div className="blob absolute w-[35%] h-[35%] rounded-full blur-[120px] opacity-40 bg-[#00F5FF] right-[20%] bottom-[25%]"></div>
        </div>

        {/* --- THEME 2: WHITE --- */}
        <div ref={theme2Ref} className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 transition-opacity duration-500">
          <div className="absolute inset-0 bg-white"></div>
          <div className="absolute inset-0 opacity-[0.10] flex flex-wrap gap-x-20 gap-y-10 rotate-[-15deg] scale-150">
            {[...Array(30)].map((_, i) => <div key={i} className="text-4xl font-black">INOVEX CODE THE FUTURE</div>)}
          </div>
          <div className="absolute bottom-[20%] left-[10%] text-black font-black text-[10vw]">INOVEX</div>
          <div className="absolute top-[20%] right-[10%] text-black font-black text-[8vw] text-right">CODE THE <br /> FUTURE</div>
        </div>

        {/* --- THEME 3: DARK/NEON --- */}
        <div ref={theme3Ref} className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#050505]"></div>

          {/* Curved Massive Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full">
            <div className="text-white font-black text-[12vw] whitespace-nowrap tracking-tighter opacity-80"
              style={{ transform: 'rotate(-5deg) perspective(1000px) rotateY(10deg)' }}>
              CREATE THE CHANGE
            </div>
          </div>
          {/* Lower Text */}
          <div className="absolute bottom-[20%] w-full flex justify-center translate-x-1/4">
            <div className="text-white font-black text-[15vw] opacity-70"
              style={{ transform: 'rotate(2deg) skewX(-10deg)' }}>
              CHALLENGING
            </div>
          </div>

          {/* Animated Floating Panels */}
          <div className="absolute top-[15%] right-[25%] w-64 h-80 bg-zinc-900 border border-white/20 rounded-lg overflow-hidden shadow-2xl">
            <div className="w-full h-full opacity-20 animate-pulse"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}></div>
            <div className="absolute inset-0 flex items-center justify-center text-white/40 font-mono text-xs">NO_SIGNAL</div>
          </div>

          <div className="absolute bottom-[10%] left-[20%] w-56 h-56 rounded-full border-2 border-cyan-500/30 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-pink-500/40 animate-spin transition-all duration-[3s]"
              style={{ background: 'conic-gradient(from 0deg, transparent, #ff00ff22, transparent)' }}></div>
          </div>

          {/* Neon Symbols */}
          <div className="neon-symbol absolute top-[25%] left-[25%] text-red-500 text-6xl drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">▲</div>
          <div className="neon-symbol absolute bottom-[30%] right-[30%] text-purple-500 text-5xl border-2 border-purple-500 w-12 h-12 rotate-45 opacity-60"></div>
          <div className="neon-symbol absolute top-[40%] right-[15%] text-cyan-400 text-7xl opacity-40">○</div>

          {/* Vertical Wires */}
          <div className="absolute inset-0 flex justify-around opacity-10">
            {[...Array(12)].map((_, i) => <div key={i} className="w-px h-full bg-white"></div>)}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Background