import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useThree, useFrame, invalidate } from '@react-three/fiber'

gsap.registerPlugin(ScrollTrigger)

const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  || window.innerWidth < 768

// Mobile performance optimizations
const MOBILE_SCRUB = isMobile ? 2 : 3
const THROTTLE_MS = isMobile ? 16 : 8 // 60fps vs 120fps

const Model = () => {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/laptop-proper.glb')
  const { actions } = useAnimations(animations, scene)
  const { camera } = useThree()
  const scrollStarted = useRef(false)
  // Cache DOM ref — never query inside onUpdate
  const timelineEl = useRef(null)

  useEffect(() => {
    // Resolve DOM ref once
    timelineEl.current = document.querySelector('.timeline-container')
  }, [])

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return

    const action = actions[Object.keys(actions)[0]]
    action.play()
    action.paused = true

    gsap.set(group.current.rotation, {
      x: Math.PI / 10,
      y: Math.PI / 6,
    })

    const triggers = []
    let lastUpdateScroll1 = 0
    let lastUpdateScroll2 = 0
    let lastUpdateScroll3 = 0

    // Scroll 1 — Rotate + animation (throttled for mobile)
    triggers.push(
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: '25% center',
        scrub: MOBILE_SCRUB,
        onEnter: () => { scrollStarted.current = true },
        onLeaveBack: () => { scrollStarted.current = false },
        onUpdate: (self) => {
          const now = performance.now()
          if (isMobile && now - lastUpdateScroll1 < THROTTLE_MS) return
          lastUpdateScroll1 = now

          const p = self.progress
          action.time = p * action.getClip().duration
          group.current.rotation.x = gsap.utils.interpolate(Math.PI / 10, 0, p)
          group.current.rotation.y = gsap.utils.interpolate(Math.PI / 6, 0, p)
          group.current.position.y = gsap.utils.interpolate(0, -1, p)
          
          // Reduce invalidate calls on mobile
          if (!isMobile || (now - lastUpdateScroll1 > THROTTLE_MS * 2)) {
            invalidate()
          }
        },
      })
    )

    // Scroll 2 — Camera zoom + rotate + move (throttled)
    triggers.push(
      ScrollTrigger.create({
        trigger: document.body,
        start: '25% center',
        end: '40% center',
        scrub: MOBILE_SCRUB,
        onUpdate: (self) => {
          const now = performance.now()
          if (isMobile && now - lastUpdateScroll2 < THROTTLE_MS) return
          lastUpdateScroll2 = now

          const p = self.progress
          camera.position.z = gsap.utils.interpolate(6, -7, p)
          group.current.rotation.x = gsap.utils.interpolate(0, Math.PI / 3, p)
          group.current.rotation.y = gsap.utils.interpolate(0, Math.PI / 4, p)
          group.current.rotation.z = gsap.utils.interpolate(0, Math.PI / 10, p)
          group.current.position.x = gsap.utils.interpolate(0, 2, p)
          
          // Reduce invalidate calls on mobile
          if (!isMobile || (now - lastUpdateScroll2 > THROTTLE_MS * 2)) {
            invalidate()
          }
        },
      })
    )

    // Scroll 3 — Show timeline (opacity only, throttled)
    triggers.push(
      ScrollTrigger.create({
        trigger: document.body,
        start: '25% center',
        end: '35% center',
        scrub: MOBILE_SCRUB,
        onUpdate: (self) => {
          const now = performance.now()
          if (isMobile && now - lastUpdateScroll3 < THROTTLE_MS) return
          lastUpdateScroll3 = now
          
          if (timelineEl.current) {
            timelineEl.current.style.opacity = self.progress
          }
        },
      })
    )

    return () => { triggers.forEach(t => t.kill()) }
  }, [actions, camera])

  useFrame((state) => {
    if (!group.current || scrollStarted.current) return
    
    // Reduce floating animation frequency on mobile
    if (!isMobile || Math.floor(state.clock.elapsedTime * 10) % 2 === 0) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2
    }
  })

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.5}
    />
  )
}

export default Model