import React, { useEffect , useRef } from 'react'
import { useGLTF , useAnimations} from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useThree, useFrame } from '@react-three/fiber'

gsap.registerPlugin(ScrollTrigger)

const Model = () => {
  const group = useRef()
  const { scene , animations} = useGLTF('/models/laptop-proper.glb')
  const { actions } = useAnimations(animations, scene)
  const { camera } = useThree()
  const scrollStarted = useRef(false)

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

    // Scroll 1 - Rotate + animation
    triggers.push(
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "25% center",
        scrub: 2,
        onEnter: () => {
          scrollStarted.current = true
        },
        onLeaveBack: () => {
          scrollStarted.current = false
        },
        onUpdate: (self) => {
          const progress = self.progress;
          action.time = progress * action.getClip().duration;

          group.current.rotation.x = gsap.utils.interpolate(Math.PI / 10, 0, progress);
          group.current.rotation.y = gsap.utils.interpolate(Math.PI / 6, 0, progress);
          group.current.position.y = gsap.utils.interpolate(0, -1, progress);
        }     
      })
    )

    // Scroll 2 - Camera zoom + rotate + move
    triggers.push(
      ScrollTrigger.create({ 
        trigger: document.body,
        start: "25% center",
        end: "40% center", 
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress

          camera.position.z = gsap.utils.interpolate(6, -7, progress);
          camera.updateProjectionMatrix()

          group.current.rotation.x = gsap.utils.interpolate(0, Math.PI / 3, progress);
          group.current.rotation.y = gsap.utils.interpolate(0, Math.PI / 4, progress);
          group.current.rotation.z = gsap.utils.interpolate(0, Math.PI / 10, progress);

          group.current.position.x = gsap.utils.interpolate(0, 2, progress);  
        }
      })
    )

    // Scroll 3 - Show timeline
    triggers.push(
      ScrollTrigger.create({
        trigger: document.body,
        start: "25% center",
        end: "35% center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const timeline = document.querySelector('.timeline-container')
          if (timeline) timeline.style.opacity = progress
        }
      })
    )

    return () => {
      triggers.forEach(t => t.kill())
    }

  }, [actions, camera])

  // Floating animation
  useFrame((state) => {
    if (group.current) {
      // Only float until user starts scrolling
      if (!scrollStarted.current) {
        // Gentle floating motion
        group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2
      }
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

useGLTF.preload('/models/laptop-proper.glb')

export default Model