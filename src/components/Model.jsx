import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

//Register the plugin
gsap.registerPlugin(ScrollTrigger)

const Model = () => {
    const { scene } = useGLTF('/models/laptop.glb')
    const modelRef = useRef()
    
    useEffect(() => {
        // Set initial position to CENTER
        scene.rotation.set(0.3, -0.8, 0.1)
        scene.position.set(0, 0, 0)  // ← Centered position
        
        // Enable the GSAP animations
        gsap.to(scene.rotation, {
            x: Math.PI / 6,
            y: Math.PI * 1.5,
            z: Math.PI / 12,
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            }
        })
        
        gsap.to(scene.scale, {
            x: 3,
            y: 3,
            z: 3,
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            }
        })
        
        gsap.to(scene.position, {
            x: -1,
            y: 0.5,
            z: 1,
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            }
        })
        
    }, [scene])
    
    return (
        <primitive 
            ref={modelRef}
            object={scene}
            scale={6}
            // Remove position and scale here - let useEffect control it
        />
    )
}

export default Model