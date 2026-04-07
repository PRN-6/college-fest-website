import React, { useEffect, useState, useRef } from 'react'

const Background = () => {
  const [scrollY, setScrollY] = useState(0)
  const animationRef = useRef()
  const startTimeRef = useRef(Date.now())
  const tickingRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          tickingRef.current = false
        })
        tickingRef.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const backgroundElement = document.getElementById('background-image')
    if (backgroundElement) {
      // Use your image from the public folder
      backgroundElement.style.backgroundImage = "url('/images/bg.jpg')"
      backgroundElement.style.backgroundSize = 'cover'
      backgroundElement.style.backgroundPosition = 'center'
      backgroundElement.style.backgroundRepeat = 'no-repeat'
      backgroundElement.style.position = 'fixed'
      backgroundElement.style.top = '0'
      backgroundElement.style.left = '0'
      backgroundElement.style.width = '100vw'
      backgroundElement.style.height = '100vh'
      backgroundElement.style.zIndex = '-1'
      backgroundElement.style.filter = 'blur(0.5px)'
      backgroundElement.style.willChange = 'transform' // Optimize for animations
      
      let lastScrollY = 0
      const animate = () => {
        const currentTime = Date.now()
        const elapsedTime = (currentTime - startTimeRef.current) / 1000 // Convert to seconds
        
        // Continuous spinning animation (2 degrees per second - faster)
        const idleRotation = elapsedTime * 2
        
        // Additional rotation when scrolling
        const scrollRotation = scrollY * 0.5
        
        // Initial scale
        const initialScale = 2.5
        const scale = initialScale + scrollY * 0.002
        
        // Combine idle spinning with scroll rotation
        const totalRotation = idleRotation + scrollRotation
        backgroundElement.style.transform = `rotate(${totalRotation}deg) scale(${scale})`
        
        animationRef.current = requestAnimationFrame(animate)
      }
      
      animate()
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [scrollY])

  return (
    <div id="background-image"></div>
  )
}

export default Background