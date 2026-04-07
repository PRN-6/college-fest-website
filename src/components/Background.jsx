// Background.jsx
import React, { useEffect, useRef } from 'react'

const Background = () => {
  const scrollYRef = useRef(0)       // no re-renders on scroll
  const startTimeRef = useRef(Date.now())
  const animationRef = useRef()
  const tickingRef = useRef(false)

  useEffect(() => {
    const el = document.getElementById('background-image')
    if (!el) return

    // Set all static styles once, not on every scroll
    Object.assign(el.style, {
      backgroundImage: "url('/images/bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '-1',
      filter: 'blur(0.5px)',
      willChange: 'transform',
    })

    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          scrollYRef.current = window.scrollY  // ref, not state — no re-render
          tickingRef.current = false
        })
        tickingRef.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Single rAF loop — never restarted on scroll
    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const sy = scrollYRef.current

      const totalRotation = elapsed * 2 + sy * 0.5
      const scale = 2.5 + sy * 0.002

      el.style.transform = `rotate(${totalRotation}deg) scale(${scale})`
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationRef.current)
    }
  }, []) // empty deps — runs once, never restarts

  return <div id="background-image" />
}

export default Background