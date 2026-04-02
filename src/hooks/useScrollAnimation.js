import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = (actions) => {
    useEffect(() => {
        if (!actions || Object.keys(actions).length === 0) return

        const action = actions[Object.keys(actions)[0]]
        action.play()
        action.paused = true

        gsap.to(action, {
            time: action.getClip().duration,
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [actions])
}
