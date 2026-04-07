import React, { useEffect, useRef, useState } from 'react'

const FPSCounter = ({ position = 'top-right' }) => {
  const [fps, setFps] = useState(0)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const animationId = useRef(null)

  useEffect(() => {
    const calculateFPS = (currentTime) => {
      frameCount.current++
      
      // Update FPS every 500ms for smoother reading
      if (currentTime - lastTime.current >= 500) {
        const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current))
        setFps(fps)
        frameCount.current = 0
        lastTime.current = currentTime
      }
      
      animationId.current = requestAnimationFrame(calculateFPS)
    }

    animationId.current = requestAnimationFrame(calculateFPS)

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
    }
  }, [])

  // Position styles
  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  }

  // Color coding based on FPS performance
  const getFPSColor = (fps) => {
    if (fps >= 55) return 'text-green-400'  // Excellent
    if (fps >= 30) return 'text-yellow-400' // Good
    if (fps >= 15) return 'text-orange-400' // Poor
    return 'text-red-400'  // Very Poor
  }

  return (
    <div className={`fixed ${positionStyles[position]} z-50 font-mono text-sm bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-700`}>
      <div className="flex flex-col">
        <div className="text-gray-400 text-xs mb-1">FPS</div>
        <div className={`font-bold text-lg ${getFPSColor(fps)}`}>
          {fps}
        </div>
        <div className="text-gray-500 text-xs mt-1">
          {fps >= 55 ? 'Excellent' : fps >= 30 ? 'Good' : fps >= 15 ? 'Poor' : 'Very Poor'}
        </div>
      </div>
    </div>
  )
}

export default FPSCounter
