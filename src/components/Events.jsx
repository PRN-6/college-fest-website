import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Events = () => {
    const cardsRef = useRef([])
    const navigate = useNavigate()

    const eventData = [
        { title: 'IT MANAGER', date: 'DEC 22', color: 'border-pink-500' },
        { title: 'TREASURE HUNT', date: 'DEC 23', color: 'border-cyan-400' },
        { title: 'SURPRISE EVENT', date: 'DEC 24', color: 'border-purple-500' },
        { title: 'WEB DESIGNING', date: 'DEC 25', color: 'border-white' },
        { title: 'HACKATHON', date: 'DEC 26', color: 'border-yellow-400' },
        { title: 'REEL MAKING', date: 'DEC 27', color: 'border-blue-500' },
        { title: 'GAMING', date: 'DEC 28', color: 'border-lime-400' },
        { title: 'PRODUCT LAUNCH', date: 'DEC 29', color: 'border-orange-500' },
        // { title: 'UPDATING..', date: 'DEC 30', color: 'border-red-500' },
    ]

    const description = [
        { description: "Manage, optimize, and secure digital systems while solving real-world tech challenges. Step into the role of an IT leader." },
        { description: "Follow clues, solve puzzles, and race against time to uncover the hidden treasure. Adventure meets intelligence." },
        { description: "Expect the unexpected! A mystery-filled event packed with fun, excitement, and unforgettable moments." },
        { description: "Design stunning and user-friendly websites. Showcase your creativity and front-end skills in this design challenge." },
        { description: "Code. Build. Innovate. Turn your ideas into reality in an intense battle of creativity and problem-solving." },
        { description: "Create engaging short videos that tell a story. Show your creativity, editing skills, and viral potential." },
        { description: "Compete, strategize, and dominate the arena. Prove your skills in high-energy competitive gaming battles." },
        { description: "Pitch and present innovative product ideas. Blend creativity, business strategy, and execution like a true entrepreneur." },
    ]

    useEffect(() => {
        // 1. Initial State
        gsap.set(cardsRef.current, {
            opacity: 0,
            y: 50,
            scale: 0.95
        })

        // 2. Entrance Animation (Reveal cards as they enter viewport)
        cardsRef.current.forEach((card, i) => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            })
        })

        // 3. Floating Animation (Persistent)
        cardsRef.current.forEach((card, i) => {
            gsap.to(card, {
                y: '+=15',
                x: '+=5',
                rotation: 'random(-3, 3)',
                duration: 3 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.1
            })
        })

    }, [])

    return (
        <div className="events-section relative w-full z-20 py-24 flex flex-col items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
                <div className="text-center mb-20 md:mb-24">
                    <h2 className="text-white text-4xl md:text-6xl font-black italic tracking-tighter opacity-80 mb-4">
                        UPCOMING EVENTS
                    </h2>
                    <p className="text-white/40 font-mono text-xs md:text-sm tracking-widest">
                        EXPLORE THE VORTEX OF CREATIVITY
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full">
                    {eventData.map((event, i) => (
                        <div
                            key={i}
                            ref={el => cardsRef.current[i] = el}
                            onClick={() => {
                                if (event.title === 'IT MANAGER') navigate('/it-manager')
                                if (event.title === 'TREASURE HUNT') navigate('/treasure-hunt')
                            }}
                            className={`backdrop-blur-none bg-zinc-900/90 md:backdrop-blur-xl md:bg-white/5 border-2 ${event.color} rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/10 group ${(event.title === 'IT MANAGER' || event.title === 'TREASURE HUNT') ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[10px] md:text-xs font-black tracking-[0.3em] text-white/30 group-hover:text-white/60 transition-colors uppercase">{event.date}</span>
                                <div className={`w-3 h-3 rounded-full ${event.color.replace('border-', 'bg-')} animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.2)]`}></div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-4 italic group-hover:translate-x-2 transition-transform leading-none">
                                {event.title}
                            </h3>
                            <p className="text-white/40 text-xs md:text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                                {description[i].description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Events
