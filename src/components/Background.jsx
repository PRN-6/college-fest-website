import React, { useRef, useEffect } from 'react'
import { Text3D, Center } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Background = () => {
  const letters = useRef([])

  const word = "COLLEGE"
  
  const letterPositions = React.useMemo(() => {
    return Array(7).fill(0).map(() => [
      Math.random() * 16 - 8,  // Random x between -8 and 8
      Math.random() * 6 - 3,   // Random y between -3 and 3
      Math.random() * 5 + 8  // Random z between 8 and 13 (behind)
    ])
  }, [])

   const finalPositions = [
  [-2.1, 0, 5], [-1.4, 0, 5], [-0.7, 0, 5], 
  [0, 0, 5], [0.7, 0, 5], [1.4, 0, 5], [2.1, 0, 5]
]

  useEffect(() => {
    // Set initial random positions
    letters.current.forEach((letter, i) => {
      if (letter) {
        letter.position.set(
          letterPositions[i][0],
          letterPositions[i][1],
          letterPositions[i][2]
        )
      }
    })

    // Animate to final positions on scroll
    ScrollTrigger.create({
      trigger: document.body,
      start: "80% bottom",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        letters.current.forEach((letter, i) => {
          if (letter) {
            const wordProgress = Math.min(progress * 2, 1)
            letter.position.x = gsap.utils.interpolate(
              letterPositions[i][0], 
              finalPositions[i][0], 
              wordProgress
            )
            letter.position.y = gsap.utils.interpolate(
              letterPositions[i][1], 
              finalPositions[i][1], 
              wordProgress
            )
            letter.position.z = gsap.utils.interpolate(
              letterPositions[i][2], 
              finalPositions[i][2], 
              wordProgress
            )
             if (progress > 0.5) {
          const screenProgress = (progress - 0.5) * 2 // 0 to 1 for second half
          letter.position.z = gsap.utils.interpolate(
            finalPositions[i][2],
            finalPositions[i][2] + 10, // Move 10 units closer
            screenProgress
          )
        }
          }
        })
      }
    })
  }, [letterPositions])

  return (
  <>
    {word.split('').map((letter, i) => (
      <Text3D
        key={i}
        ref={el => letters.current[i] = el}
        font="https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_regular.typeface.json"
        size={1.5}
        height={0.3}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[
          letterPositions[i][0],
          letterPositions[i][1],
          letterPositions[i][2]
        ]}
      >
        {letter}
        <meshStandardMaterial color="gray" opacity={0.4} transparent />
      </Text3D>
    ))}
  </>
)
}

export default Background