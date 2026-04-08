import React, { useEffect, useState, useRef } from 'react'
import { useProgress } from '@react-three/drei'
import gsap from 'gsap'
import useIsMobile from '../hooks/useIsMobile'

const Loader = ({ onFinished }) => {
    const { progress } = useProgress()
    const [show, setShow] = useState(true)
    const isMobile = useIsMobile()
    const loaderRef = useRef(null)

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => {
                if (loaderRef.current) {
                    gsap.to(loaderRef.current, {
                        opacity: 0,
                        scale: isMobile ? 1 : 1.1, // Scaling with heavy filters causes mobile lag
                        duration: isMobile ? 0.8 : 1.2, // Faster exit on mobile
                        ease: 'power3.inOut',
                        onComplete: () => {
                            setShow(false)
                            if (onFinished) onFinished()
                        }
                    })
                }
            }, 800)
            return () => clearTimeout(timer)
        }
    }, [progress, onFinished])

    if (!show) return null

    return (
        <div 
            ref={loaderRef}
            className="loader-container fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
            style={{ willChange: 'opacity, transform' }}
        >
            {/* Background Texture & Gradients */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0072]/15 via-transparent to-[#00F5FF]/10 blur-[40px] md:blur-[120px]"></div>

            {/* Logo Content - Fully Responsive */}
            <div className="relative mb-12 md:mb-16 flex flex-col items-center px-4 w-full">
                {/* 3D Extrusion Text Effect (Scaled for mobile) */}
                <h1 className="text-[18vw] md:text-[15rem] lg:text-[18rem] font-black italic tracking-tighter text-white leading-none select-none text-center"
                    style={{
                        textShadow: isMobile ? `
                            1px 1px 0px #000,
                            2px 2px 0px #000,
                            3px 3px 0px #000,
                            4px 4px 15px rgba(0,0,0,0.8)
                        ` : `
                            1px 1px 0px #000,
                            2px 2px 0px #000,
                            3px 3px 0px #000,
                            4px 4px 0px #000,
                            5px 5px 0px #000,
                            6px 6px 0px #000,
                            7px 7px 20px rgba(0,0,0,0.8)
                        `
                    }}
                >
                    INOVEX
                </h1>

                {/* Pulsing sub-text */}
                <div className="mt-4 md:absolute md:-bottom-4 text-white font-mono text-[8px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] opacity-30 animate-pulse text-center uppercase">
                    Hyper Texture Festival
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-[85%] max-w-[450px] relative">
                <div className="flex justify-between items-end mb-3 md:mb-4 px-1">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#FF0072] animate-ping"></div>
                        <span className="text-white/40 font-mono text-[8px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] uppercase truncate max-w-[150px] md:max-w-none">
                            {progress < 100 ? 'Initializing Vortex...' : 'Matrix Ready'}
                        </span>
                    </div>
                    <span className="text-white font-mono text-[10px] md:text-sm font-bold">{Math.round(progress)}%</span>
                </div>

                {/* The Bar */}
                <div className="h-[1px] md:h-[2px] w-full bg-white/5 relative overflow-hidden rounded-full text-white">
                    <div
                        className="h-full bg-white transition-all duration-500 ease-out shadow-[0_0_20px_rgba(255,255,255,1)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Progress details */}
                <div className="mt-6 flex justify-center">
                    <span className="text-white/20 font-mono text-[7px] md:text-[8px] tracking-[0.4em] uppercase italic text-center">
                        {progress < 30 ? 'PHASE I: ASSET EXTRACTION' : progress < 70 ? 'PHASE II: GEOMETRY SYNTHESIS' : 'PHASE III: FINALIZING SHADER MATRIX'}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Loader
