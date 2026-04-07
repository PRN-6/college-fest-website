import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useThree, useFrame } from '@react-three/fiber'
import useIsMobile from '../hooks/useIsMobile'

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
    const { camera, invalidate } = useThree()
    const scrollStarted = useRef(false)
    const isMobile = useIsMobile()

    useEffect(() => {
        if (!actions || Object.keys(actions).length === 0) return

        const action = actions[Object.keys(actions)[0]]
        action.play()
        action.paused = true

        // Optimize model for mobile
        scene.traverse((child) => {
            if (child.isMesh) {
                child.frustumCulled = true
                if (isMobile) {
                    child.castShadow = false
                    child.receiveShadow = false
                    // Ultra-Core texture optimization
                    if (child.material.map) {
                        child.material.map.minFilter = THREE.LinearFilter
                        child.material.map.generateMipmaps = false
                    }
                    if (child.material) {
                        child.material.precision = 'lowp'
                    }
                }
            }
        })

        const triggers = []

        if (!isMobile) {
            // --- DESKTOP VERSION (UNTOUCHED) ---
            gsap.set(group.current.rotation, {
                x: Math.PI / 10,
                y: Math.PI / 6,
            })

            // Section 1 (Theme 1 -> 2): 0% - 15%
            triggers.push(
                ScrollTrigger.create({
                    trigger: document.body,
                    start: "top top",
                    end: "15% center",
                    scrub: 2,
                    onEnter: () => { scrollStarted.current = true },
                    onLeaveBack: () => {
                        scrollStarted.current = false
                        document.body.style.setProperty('--bg-theme-2', 0);
                        document.body.style.setProperty('--bg-theme-3', 0);
                    },
                    onUpdate: (self) => {
                        const progress = self.progress;
                        document.body.style.setProperty('--bg-theme-2', progress);
                        action.time = progress * action.getClip().duration;
                        group.current.rotation.x = gsap.utils.interpolate(Math.PI / 10, 0, progress);
                        group.current.rotation.y = gsap.utils.interpolate(Math.PI / 6, 0, progress);
                        group.current.position.y = gsap.utils.interpolate(0, -1, progress);
                    }
                })
            )

            // Section 2 (Theme 2 -> 3): 15% - 30%
            triggers.push(
                ScrollTrigger.create({
                    trigger: document.body,
                    start: "15% center",
                    end: "30% center",
                    scrub: 2,
                    onUpdate: (self) => {
                        const progress = self.progress
                        document.body.style.setProperty('--bg-theme-2', 1);
                        document.body.style.setProperty('--bg-theme-3', progress);
                        camera.position.z = gsap.utils.interpolate(6, -7, progress);
                        camera.updateProjectionMatrix()
                        group.current.rotation.x = gsap.utils.interpolate(0, Math.PI / 3, progress);
                        group.current.rotation.y = gsap.utils.interpolate(0, Math.PI / 4, progress);
                        group.current.rotation.z = gsap.utils.interpolate(0, Math.PI / 10, progress);
                        group.current.position.x = gsap.utils.interpolate(0, 2, progress);
                    }
                })
            )

            // Section 3 & 4 & 5... (Remaining desktop triggers)
            triggers.push(
                ScrollTrigger.create({
                    trigger: document.body,
                    start: "30% center",
                    end: "50% center",
                    scrub: 1,
                    onUpdate: () => {
                        document.body.style.setProperty('--bg-theme-2', 1);
                        document.body.style.setProperty('--bg-theme-3', 1);
                    }
                })
            )

            triggers.push(
                ScrollTrigger.create({
                    trigger: document.body,
                    start: "50% center",
                    end: "85% center",
                    scrub: 2,
                    onUpdate: (self) => {
                        document.body.style.setProperty('--bg-theme-2', 1);
                        document.body.style.setProperty('--bg-theme-3', 1);
                        const progress = self.progress;
                        if (group.current) {
                            group.current.scale.setScalar(0.5 * (1 - progress));
                            group.current.visible = (progress < 0.9);
                        }
                    }
                })
            )

            triggers.push(
                ScrollTrigger.create({
                    trigger: document.body,
                    start: "85% center",
                    end: "bottom bottom",
                    scrub: 1,
                    onUpdate: () => {
                        document.body.style.setProperty('--bg-theme-2', 1);
                        document.body.style.setProperty('--bg-theme-3', 1);
                        if (group.current) group.current.visible = false;
                    }
                })
            )
        } else {
            // --- MOBILE VERSION (OPTIMIZED) ---
            // Use a single Timeline for better performance on mobile
            gsap.set(group.current.rotation, { x: Math.PI / 10, y: Math.PI / 6 })
            
            const mainTl = gsap.timeline({
                scrollTrigger: {
                    id: 'mobile-model-trigger',
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5, // Faster response on mobile
                    onEnter: () => { scrollStarted.current = true },
                    onLeaveBack: () => { scrollStarted.current = false },
                    onUpdate: () => { if (isMobile) invalidate() } // Force render on scroll
                }
            })

            // 0% -> 15% (Phase 1)
            mainTl.to(group.current.rotation, { x: 0, y: 0, duration: 0.15, ease: 'none' }, 0)
                   .to(group.current.position, { y: -1, duration: 0.15, ease: 'none' }, 0)
                   .to(action, { time: action.getClip().duration, duration: 0.15, ease: 'none' }, 0)

            // 15% -> 30% (Phase 2)
            mainTl.to(camera.position, { z: -7, duration: 0.15, ease: 'none' }, 0.15)
                   .to(group.current.rotation, { x: Math.PI / 3, y: Math.PI / 4, z: Math.PI / 10, duration: 0.15, ease: 'none' }, 0.15)
                   .to(group.current.position, { x: 2, duration: 0.15, ease: 'none' }, 0.15)

            // 30% -> 85% (Phase 3 & 4)
            mainTl.to(group.current.scale, { x: 0, y: 0, z: 0, duration: 0.55, ease: 'power1.in' }, 0.30)
                   .set(group.current, { visible: false }, 0.85) // Nuclear visibility cleanup
        }

        return () => {
            triggers.forEach(t => t.kill())
            ScrollTrigger.getById('mobile-model-trigger')?.kill()
        }

    }, [actions, camera, isMobile])

    // Floating animation
    useFrame((state) => {
        if (group.current && !isMobile) {
            if (!scrollStarted.current) {
                group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.2
            }
        }
    })

    return (
        <primitive
            ref={group}
            object={scene}
            scale={isMobile ? 0.3 : 0.5}
        />
    )
}

export default Model
  
