import React, { useRef, useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const Timeline = () => {
  const daysRef = useRef()
  const hoursRef = useRef()
  const minutesRef = useRef()
  const secondsRef = useRef()
  const headingRef = useRef()
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Countdown Timer
  useEffect(() => {
    const targetDate = new Date('2026-12-31T23:59:59').getTime()
    
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Scroll Animation
  useEffect(() => {
    const elements = [
      { ref: daysRef, x1: -200, y1: -200, x2: -200, y2: -200 },
      { ref: hoursRef, x1: 200, y1: -200, x2: 200, y2: -200 },
      { ref: minutesRef, x1: -200, y1: 200, x2: -200, y2: 200 },
      { ref: secondsRef, x1: 200, y1: 200, x2: 200, y2: 200 },
    ]

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "32% center",
      end: "60% center",
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;

        // COME IN (0% → 30%)
        if (progress <= 0.3) {
          const p = progress / 0.3

          gsap.set(headingRef.current, {
            y: gsap.utils.interpolate(-100, 0, p),
            opacity: p
          })

          elements.forEach(el => {
            gsap.set(el.ref.current, {
              x: gsap.utils.interpolate(el.x1, 0, p),
              y: gsap.utils.interpolate(el.y1, 0, p),
              opacity: p
            })
          })
        }

        // PAUSE (30% → 70%)
        else if (progress <= 0.7) {
          gsap.set(
            [headingRef.current, daysRef.current, hoursRef.current, minutesRef.current, secondsRef.current],
            { x: 0, y: 0, opacity: 1 }
          )
        }

        // GO OUT (70% → 100%)
        else {
          const p = (progress - 0.7) / 0.3

          gsap.set(headingRef.current, {
            y: gsap.utils.interpolate(0, -100, p),
            opacity: 1 - p
          })

          elements.forEach(el => {
            gsap.set(el.ref.current, {
              x: gsap.utils.interpolate(0, el.x2, p),
              y: gsap.utils.interpolate(0, el.y2, p),
              opacity: 1 - p
            })
          })
        }
      }
    })

    return () => trigger.kill()
  }, [])

  return (
    <div className="timeline-container fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 px-4">
        
        {/* Heading */}
        <div 
          ref={headingRef}
          className="text-4xl font-bold text-white"
          style={{ opacity: 0 }}
        >
          FEST FLOW
        </div>
        
        {/* Boxes */}
        <div className="flex flex-wrap justify-center gap-4">
          
          <div ref={daysRef} className="bg-gray-500 text-white rounded-2xl p-8 shadow-2xl" style={{ opacity: 0 }}>
            <div className="text-6xl font-bold text-center">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-xl text-center mt-2">DAYS</div>
          </div>

          <div ref={hoursRef} className="bg-white text-black rounded-2xl p-8 shadow-2xl" style={{ opacity: 0 }}>
            <div className="text-6xl font-bold text-center">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-xl text-center mt-2">HOURS</div>
          </div>

          <div ref={minutesRef} className="bg-gray-500 text-white rounded-2xl p-8 shadow-2xl" style={{ opacity: 0 }}>
            <div className="text-6xl font-bold text-center">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-xl text-center mt-2">MINUTES</div>
          </div>

          <div ref={secondsRef} className="bg-white text-black rounded-2xl p-8 shadow-2xl" style={{ opacity: 0 }}>
            <div className="text-6xl font-bold text-center">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-xl text-center mt-2">SECONDS</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Timeline