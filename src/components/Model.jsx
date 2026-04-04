import React, { useEffect , useRef } from 'react'
import { useGLTF , useAnimations} from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useThree } from '@react-three/fiber'

gsap.registerPlugin(ScrollTrigger)

const Model = () => {
  const group = useRef()
  const { scene , animations} = useGLTF('/models/laptop-proper.glb')
  const { actions } = useAnimations(animations, scene)
  const { camera } = useThree()
  // play the animation when the component mounts

  useEffect(() => {
    const action = actions[Object.keys(actions)[0]]
    action.play()
    action.paused = true
    
    // set the initial rotation
    gsap.set(group.current.rotation, {
      x: Math.PI / 10,
      y: Math.PI / 6,
    })  

    // scroll trigger to control the animation
    // first scroll trigger - rotate the model
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "25% center",
      scrub: 2,
      onUpdate: (self) => {
        const progress = self.progress;
        action.time = progress * action.getClip().duration;

        // rotate the model
        group.current.rotation.x = gsap.utils.interpolate(Math.PI / 10, 0, progress);
        group.current.rotation.y = gsap.utils.interpolate(Math.PI / 10, 0, progress);
        group.current.rotation.z = gsap.utils.interpolate(0, 0, progress);
        // group.current.position.x = gsap.utils.interpolate(0, 0, progress);
        group.current.position.y = gsap.utils.interpolate(0, -1, progress);
        // group.current.position.z = gsap.utils.interpolate(0, 2 - (progress * 2), progress);
        
      }     
    })
     ScrollTrigger.create({ 
      trigger: document.body,
      start: "25% center",
      end: "50% center", 
      scrub:3,
      onUpdate: (self) => {
        const progress = self.progress
        camera.position.z = gsap.utils.interpolate(6, -7, progress);
        
        // Add rotation to compensate for tilted laptop screen
        group.current.rotation.x = gsap.utils.interpolate(0, Math.PI / 3, progress);
        group.current.rotation.y = gsap.utils.interpolate(0, Math.PI / 4, progress);
        group.current.rotation.z = gsap.utils.interpolate(0,Math.PI / 10, progress);
        
        // Move model to the right
        group.current.position.x = gsap.utils.interpolate(0, 2, progress);  
      }
    })

  },[actions])

  return (
    <primitive 
        ref={group}
        object={scene}
        scale={0.5}
    />
  )
}

export default Model