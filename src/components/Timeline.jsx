import React, { useRef, useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import useIsMobile from '../hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

const Timeline = () => {
  const daysRef = useRef()
  const hoursRef = useRef()
  const minutesRef = useRef()
  const secondsRef = useRef()
  const headingRef = useRef()
  const isMobile = useIsMobile()

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
      { ref: daysRef, x1: -200, y1: -200, x2: -200, y2: -200, label: 'days' },
      { ref: hoursRef, x1: 200, y1: -200, x2: 200, y2: -200, label: 'hours' },
      { ref: minutesRef, x1: -200, y1: 200, x2: -200, y2: 200, label: 'minutes' },
      { ref: secondsRef, x1: 200, y1: 200, x2: 200, y2: 200, label: 'seconds' },
    ]

    if (!isMobile) {
      // --- DESKTOP VERSION (UNTOUCHED) ---
      const trigger = ScrollTrigger.create({
        trigger: document.body,
        start: "30% center",
        end: "50% center",
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress <= 0.3) {
            const p = progress / 0.3
            gsap.set(headingRef.current, { y: gsap.utils.interpolate(-100, 0, p), opacity: p })
            elements.forEach(el => {
              gsap.set(el.ref.current, {
                x: gsap.utils.interpolate(el.x1, 0, p),
                y: gsap.utils.interpolate(el.y1, 0, p),
                opacity: p
              })
            })
          }
          else if (progress <= 0.7) {
            gsap.set(
              [headingRef.current, daysRef.current, hoursRef.current, minutesRef.current, secondsRef.current],
              { x: 0, y: 0, opacity: 1 }
            )
          }
          else {
            const p = (progress - 0.7) / 0.3
            gsap.set(headingRef.current, { y: gsap.utils.interpolate(0, -100, p), opacity: 1 - p })
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
    } else {
      // --- MOBILE VERSION (OPTIMIZED TIMELINE) ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "30% center",
          end: "35% center",
          scrub: 1, // Smoother scrub for mobile
        }
      })

      // Entry
      tl.fromTo(headingRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 0)
      elements.forEach((el, i) => {
        tl.fromTo(el.ref.current,
          { x: el.x1 / 4, y: el.y1 / 4, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
          0
        )
      })

      // Hold (30% to 70% of the trigger duration)
      tl.to({}, { duration: 0.4 })

      // Exit
      tl.to(headingRef.current, { y: -50, opacity: 0, duration: 0.3 }, 0.7)
      elements.forEach((el, i) => {
        tl.to(el.ref.current,
          { x: el.x2 / 4, y: el.y2 / 4, opacity: 0, duration: 0.3, ease: 'power2.in' },
          0.7
        )
      })

      return () => tl.kill()
    }
  }, [isMobile])

  return (
    <div className={`timeline-container fixed inset-0 flex items-center justify-center pointer-events-none z-10`}>
      <div className="flex flex-col items-center gap-8 px-4">

        {/* Heading */}
        <div
          ref={headingRef}
          className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase"
          style={{ opacity: 0, willChange: isMobile ? 'transform, opacity' : 'auto' }}
        >
          FEST FLOW
        </div>

        {/* Boxes */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-full">

          <div ref={daysRef} className="bg-zinc-900 border border-white/10 md:bg-gray-500/20 md:backdrop-blur-xl text-white rounded-2xl p-4 md:p-8 shadow-2xl min-w-[80px] md:min-w-[140px]" style={{ opacity: 0, willChange: isMobile ? 'transform, opacity' : 'auto' }}>
            <div className="text-4xl md:text-6xl font-black text-center tracking-tighter">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xl font-mono tracking-widest text-center mt-2 opacity-40">DAYS</div>
          </div>

          <div ref={hoursRef} className="bg-white text-black rounded-2xl p-4 md:p-8 shadow-2xl min-w-[80px] md:min-w-[140px]" style={{ opacity: 0, willChange: isMobile ? 'transform, opacity' : 'auto' }}>
            <div className="text-4xl md:text-6xl font-black text-center tracking-tighter">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xl font-mono tracking-widest text-center mt-2 opacity-60">HOURS</div>
          </div>

          <div ref={minutesRef} className="bg-zinc-900 border border-white/10 md:bg-gray-500/20 md:backdrop-blur-xl text-white rounded-2xl p-4 md:p-8 shadow-2xl min-w-[80px] md:min-w-[140px]" style={{ opacity: 0, willChange: isMobile ? 'transform, opacity' : 'auto' }}>
            <div className="text-4xl md:text-6xl font-black text-center tracking-tighter">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xl font-mono tracking-widest text-center mt-2 opacity-40">MINS</div>
          </div>

          <div ref={secondsRef} className="bg-white text-black rounded-2xl p-4 md:p-8 shadow-2xl min-w-[80px] md:min-w-[140px]" style={{ opacity: 0, willChange: isMobile ? 'transform, opacity' : 'auto' }}>
            <div className="text-4xl md:text-6xl font-black text-center tracking-tighter">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xl font-mono tracking-widest text-center mt-2 opacity-60">SECS</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Timeline