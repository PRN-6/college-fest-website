// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export const createScrollAnimations = (scene) => {
//     // Initial position
//     scene.rotation.set(0.3, -0.8, 0.1)
//     scene.position.set(0, 0, 0)
    
//     // Rotation animation
//     gsap.to(scene.rotation, {
//         x: Math.PI / 6,
//         y: Math.PI * 1.5,
//         z: Math.PI / 12,
//         scrollTrigger: {
//             trigger: document.body,
//             start: 'top top',
//             end: 'bottom bottom',
//             scrub: 1,
//         }
//     })
    
//     // Scale animation
//     gsap.to(scene.scale, {
//         x: 3,
//         y: 3,
//         z: 3,
//         scrollTrigger: {
//             trigger: document.body,
//             start: 'top top',
//             end: 'bottom bottom',
//             scrub: 1,
//         }
//     })
    
//     // Position animation
//     gsap.to(scene.position, {
//         x: -1,
//         y: 0.5,
//         z: 1,
//         scrollTrigger: {
//             trigger: document.body,
//             start: 'top top',
//             end: 'bottom bottom',
//             scrub: 1,
//         }
//     })
// }