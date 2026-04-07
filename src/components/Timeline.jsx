// Timeline.jsx
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

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date('2026-12-31T23:59:59').getTime()

    const tick = () => {
      const diff = target - Date.now()
      if (diff > 0) {
        setTimeLeft({
          days:    Math.floor(diff / 86400000),
          hours:   Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
        })
      }
    }

    tick() // run immediately so there's no 1s blank on mount
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Define once — not recreated on every scroll tick
    const elements = [
      { ref: daysRef,    x: -200, y: -200 },
      { ref: hoursRef,   x:  200, y: -200 },
      { ref: minutesRef, x: -200, y:  200 },
      { ref: secondsRef, x:  200, y:  200 },
    ]

    // Collect all box DOM nodes once for batch gsap.set calls
    const boxes = elements.map(e => e.ref.current)
    const all = [headingRef.current, ...boxes]

    // Mobile performance throttling
    const isMobile = window.innerWidth <= 768
    const THROTTLE_MS = isMobile ? 16 : 8
    let lastUpdate = 0

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: '32% center',
      end: '60% center',
      scrub: isMobile ? 2 : 3,
      onUpdate: (self) => {
        // Throttle updates for mobile performance
        if (isMobile) {
          const now = performance.now()
          if (now - lastUpdate < THROTTLE_MS) return
          lastUpdate = now
        }

        const progress = self.progress

        if (progress <= 0.3) {
          const p = progress / 0.3

          // Batch heading + all boxes in as few gsap.set calls as possible
          gsap.set(headingRef.current, { y: gsap.utils.interpolate(-100, 0, p), opacity: p })
          elements.forEach(el => {
            gsap.set(el.ref.current, {
              x: gsap.utils.interpolate(el.x, 0, p),
              y: gsap.utils.interpolate(el.y, 0, p),
              opacity: p,
            })
          })

        } else if (progress <= 0.7) {
          // Single batch call for the pause state
          gsap.set(all, { x: 0, y: 0, opacity: 1 })

        } else {
          const p = (progress - 0.7) / 0.3

          gsap.set(headingRef.current, { y: gsap.utils.interpolate(0, -100, p), opacity: 1 - p })
          elements.forEach(el => {
            gsap.set(el.ref.current, {
              x: gsap.utils.interpolate(0, el.x, p),
              y: gsap.utils.interpolate(0, el.y, p),
              opacity: 1 - p,
            })
          })
        }
      },
    })

    return () => trigger.kill()
  }, [])

  const fmt = n => String(n).padStart(2, '0')

  return (
    <div className="timeline-container fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 px-4">
        <div ref={headingRef} className="text-4xl font-bold text-white" style={{ opacity: 0 }}>
          FEST FLOW
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { ref: daysRef,    val: timeLeft.days,    label: 'DAYS',    dark: true  },
            { ref: hoursRef,   val: timeLeft.hours,   label: 'HOURS',   dark: false },
            { ref: minutesRef, val: timeLeft.minutes, label: 'MINUTES', dark: true  },
            { ref: secondsRef, val: timeLeft.seconds, label: 'SECONDS', dark: false },
          ].map(({ ref, val, label, dark }) => (
            <div
              key={label}
              ref={ref}
              className={`${dark ? 'bg-gray-500 text-white' : 'bg-white text-black'} rounded-2xl p-8 shadow-2xl`}
              style={{ opacity: 0 }}
            >
              <div className="text-6xl font-bold text-center">{fmt(val)}</div>
              <div className="text-xl text-center mt-2">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Timeline