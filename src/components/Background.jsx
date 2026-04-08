import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useIsMobile from '../hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

const Background = () => {
    const containerRef = useRef()
    const contentRef = useRef()
    const theme1Ref = useRef()
    const theme2Ref = useRef()
    const theme3Ref = useRef()
    const isMobile = useIsMobile()

    useEffect(() => {
        // 1. Initial State
        gsap.set([theme2Ref.current, theme3Ref.current], { opacity: 0 })
        gsap.set(theme1Ref.current, { opacity: 1 })

        // Theme 1 Blobs
        const blobs = theme1Ref.current.querySelectorAll('.blob')
        blobs.forEach((blob, i) => {
            gsap.to(blob, {
                x: 'random(-100, 100)', y: 'random(-100, 100)',
                scale: 'random(0.8, 1.2)', duration: 5 + Math.random() * 5,
                repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.5
            })
        })

        // Theme 1 XXX Symbols
        const xxxSymbols = theme1Ref.current.querySelectorAll('.triple-x span')
        xxxSymbols.forEach((x, i) => {
            gsap.to(x, {
                y: '+=15', rotation: 'random(-10, 10)',
                duration: 2 + Math.random() * 2,
                repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.2
            })
        })

        // Theme 2 Blobs
        const kaleidoBlobs = theme2Ref.current.querySelectorAll('.kaleido-blob')
        kaleidoBlobs.forEach((kblob, i) => {
            gsap.to(kblob, {
                x: 'random(-60, 60)', y: 'random(-60, 60)',
                rotation: 'random(-180, 180)', duration: 6 + Math.random() * 4,
                repeat: -1, yoyo: true, ease: 'power1.inOut'
            })
        })

        // Theme 3 Symbols
        const neonSymbols = theme3Ref.current.querySelectorAll('.neon-symbol')
        neonSymbols.forEach((symbol, i) => {
            gsap.to(symbol, {
                y: 'random(-50, 50)', x: 'random(-30, 30)',
                rotation: 'random(-45, 45)', duration: 4 + Math.random() * 3,
                repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3
            })
        })

        // 3. Theme Cross-Fade Logic (GSAP ScrollTrigger instead of RAF polling)
        const triggers = []

        // Phase 1 -> 2 (0% to 15%)
        triggers.push(
            ScrollTrigger.create({
                trigger: document.body,
                start: "top top",
                end: "15% center",
                scrub: 1,
                onUpdate: (self) => {
                    const p = self.progress;
                    if (theme1Ref.current) theme1Ref.current.style.opacity = 1 - p;
                    if (theme2Ref.current) theme2Ref.current.style.opacity = p;
                    if (containerRef.current) {
                        containerRef.current.style.backgroundColor = p > 0.5 ? '#FFFFFF' : '#FF0072'
                    }
                }
            })
        )

        // Phase 2 -> 3 (15% to 30%)
        triggers.push(
            ScrollTrigger.create({
                trigger: document.body,
                start: "15% center",
                end: "30% center",
                scrub: 1,
                onUpdate: (self) => {
                    const p = self.progress;
                    if (theme2Ref.current) theme2Ref.current.style.opacity = 1 - p;
                    if (theme3Ref.current) theme3Ref.current.style.opacity = p;
                    if (containerRef.current) {
                        containerRef.current.style.backgroundColor = p > 0.5 ? '#050505' : '#FFFFFF'
                    }
                }
            })
        )

        // 4. Parallax Animation (Using GSAP ticker for smooth performance)
        const rotationSpeed = isMobile ? 0.4 : 1.5
        const parallaxSpeed = isMobile ? 0.02 : 0.05

        const onTick = () => {
            if (!contentRef.current) return

            const elapsed = gsap.ticker.time;
            const scrollY = window.scrollY;

            if (!isMobile) {
                // High-performance rotation for desktop
                const totalRotation = (elapsed * 1.5 * 10) + (scrollY * 0.05)
                const scale = 1.2 + (scrollY * 0.0005)
                contentRef.current.style.transform = `rotate(${totalRotation}deg) scale(${scale})`
            } else {
                // Smooth rotation + parallax for mobile
                const totalRotation = (elapsed * 0.2 * 10) + (scrollY * 0.02)
                contentRef.current.style.transform = `translateY(${scrollY * -0.05}px) rotate(${totalRotation}deg) scale(1.1)`
            }
        }

        gsap.ticker.add(onTick)

        return () => {
            triggers.forEach(t => t.kill())
            gsap.ticker.remove(onTick)
        }
    }, [isMobile])

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

                    {/* Stylized Triple X - Bottom Left */}
                    <div className="triple-x absolute top-[70%] left-[28%] md:top-[72%] md:left-[28%] flex gap-1 md:gap-3 opacity-90">
                        {['X', 'X', 'X'].map((x, i) => (
                            <span key={i} className="text-5xl md:text-8xl font-black text-[#00F5FF] drop-shadow-[0_0_15px_rgba(0,245,255,0.6)] leading-none">
                                {x}
                            </span>
                        ))}
                    </div>

                    {/* Stylized Triple X - Top Right */}
                    <div className="triple-x absolute top-[25%] right-[25%] md:top-[20%] md:right-[28%] flex gap-1 md:gap-3 opacity-90">
                        {['X', 'X', 'X'].map((x, i) => (
                            <span key={i} className="text-5xl md:text-8xl font-black text-[#00F5FF] drop-shadow-[0_0_15px_rgba(0,245,255,0.6)] leading-none">
                                {x}
                            </span>
                        ))}
                    </div>

                    {/* Dotted Grid - Top Right */}
                    <div className="absolute top-[18%] right-[18%] w-32 h-32 opacity-40 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '16px 16px' }}>
                    </div>

                    {/* Dotted Grid - Bottom Right */}
                    <div className="absolute top-[75%] right-[15%] w-48 h-16 opacity-40 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, white 3px, transparent 3px)', backgroundSize: '20px 20px' }}>
                    </div>

                    {/* Dotted Grid - Mid Left */}
                    <div className="absolute top-[50%] left-[15%] w-24 h-48 opacity-40 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, white 2.5px, transparent 2.5px)', backgroundSize: '18px 18px' }}>
                    </div>

                    {/* Diagonal Lines */}
                    <div className="absolute top-[30%] left-[30%] w-[40%] h-1 bg-white opacity-60 rotate-45 transform origin-left rounded-full"></div>
                    <div className="absolute top-[35%] left-[25%] w-[50%] h-1 bg-white opacity-30 rotate-45 transform origin-left rounded-full"></div>
                    <div className="absolute top-[60%] right-[30%] w-[30%] h-1.5 bg-white opacity-80 rotate-45 transform origin-right rounded-full"></div>
                </div>

                {/* --- THEME 2: WHITE --- */}
                <div ref={theme2Ref} className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-white"></div>
                    <div className="absolute inset-0 opacity-[0.10] flex flex-wrap gap-x-20 gap-y-10 rotate-[-15deg] scale-150">
                        {[...Array(isMobile ? 12 : 30)].map((_, i) => <div key={i} className="text-4xl font-black">INOVEX CODE THE FUTURE</div>)}
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
                    <div className={`absolute top-[15%] right-[25%] ${isMobile ? 'w-32 h-40' : 'w-64 h-80'} bg-zinc-900 border border-white/20 rounded-lg overflow-hidden shadow-2xl`}>
                        <div className="w-full h-full opacity-20 animate-pulse"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white/40 font-mono text-xs">NO_SIGNAL</div>
                    </div>

                    {!isMobile && (
                        <div className="absolute bottom-[10%] left-[20%] w-56 h-56 rounded-full border-2 border-cyan-500/30 flex items-center justify-center">
                            <div className="w-40 h-40 rounded-full border border-pink-500/40 animate-spin transition-all duration-[3s]"
                                style={{ background: 'conic-gradient(from 0deg, transparent, #ff00ff22, transparent)' }}></div>
                        </div>
                    )}

                    {/* Neon Symbols */}
                    <div className="neon-symbol absolute top-[25%] left-[25%] text-red-500 text-6xl drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">▲</div>
                    {!isMobile && <div className="neon-symbol absolute bottom-[30%] right-[30%] text-purple-500 text-5xl border-2 border-purple-500 w-12 h-12 rotate-45 opacity-60"></div>}
                    <div className="neon-symbol absolute top-[40%] right-[15%] text-cyan-400 text-7xl opacity-40">○</div>

                    {/* Vertical Wires - Simplified for Mobile */}
                    <div className="absolute inset-0 flex justify-around opacity-10">
                        {[...Array(isMobile ? 6 : 12)].map((_, i) => <div key={i} className="w-px h-full bg-white"></div>)}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Background