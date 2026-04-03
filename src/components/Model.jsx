import React, { useEffect , useRef } from 'react'
import { useGLTF , useAnimations} from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

const Model = () => {
  const group = useRef()
  const { scene , animations} = useGLTF('/models/laptop-proper.glb')
  const { actions } = useAnimations(animations, scene)


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
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        action.time = progress * action.getClip().duration;


        // rotate the model
        group.current.rotation.x = gsap.utils.interpolate(Math.PI / 10, 0, progress);
        group.current.rotation.y = gsap.utils.interpolate(Math.PI / 6, 0, progress);
        group.current.rotation.z = gsap.utils.interpolate(0, 0, progress);
        
        group.current.position.x = gsap.utils.interpolate(0, 0, progress);
        group.current.position.y = gsap.utils.interpolate(0, 0, progress);
        group.current.position.z = gsap.utils.interpolate(0, 2 - (progress * 2), progress);

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