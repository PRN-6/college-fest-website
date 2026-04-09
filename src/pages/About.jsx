import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import FooterNav from '../components/FooterNav'

const About = () => {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
            <Header />

            {/* Background Aesthetic */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-15 blur-[150px] bg-white"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px] bg-white"></div>
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 md:py-40">
                <button onClick={() => navigate('/')} className="mb-12 font-mono text-sm text-white/50 hover:text-white transition-colors tracking-widest uppercase flex items-center gap-2 border-b border-white/20 pb-1 w-fit">
                    <span>&larr;</span> Back
                </button>

                {/* Hero */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-white animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.7)]"></div>
                        <span className="font-mono tracking-[0.3em] text-white/50 text-sm">COLLAGE FEST 2026</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 text-white drop-shadow-lg">
                        ABOUT
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-white/70 max-w-3xl leading-relaxed">
                        A celebration of creativity, code, and culture. Collage Fest is our college's flagship annual tech and cultural extravaganza — where ideas collide and legends are made.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-b border-white/10 pb-20">
                    {/* Left: Main Info */}
                    <div className="lg:col-span-2 space-y-12 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

                        <section className="relative z-10">
                            <h2 className="text-3xl font-black tracking-tight mb-6 text-white">WHAT IS COLLAGE FEST?</h2>
                            <p className="text-white/70 font-mono text-sm leading-relaxed mb-4">
                                Collage Fest is an annual inter-college competition hosted by our department, bringing together the brightest minds from across institutions to compete, collaborate, and celebrate.
                            </p>
                            <p className="text-white/70 font-mono text-sm leading-relaxed">
                                From high-voltage hackathons and gaming tournaments to creative reel making and web design battles — every event is designed to push participants to their limits and beyond.
                            </p>
                        </section>

                        <section className="relative z-10">
                            <h2 className="text-3xl font-black tracking-tight mb-6 text-white">THE VISION</h2>
                            <div className="space-y-6">
                                <div className="border border-white/10 p-5 rounded-xl bg-black/20">
                                    <h3 className="font-bold text-lg mb-1 text-white">Inspire Innovation</h3>
                                    <p className="text-white/60 text-sm font-mono">Create a platform where students break boundaries, experiment boldly, and build things that matter.</p>
                                </div>
                                <div className="border border-white/10 p-5 rounded-xl border-l-2 border-l-white/50 bg-black/20">
                                    <h3 className="font-bold text-lg mb-1 text-white">Foster Community</h3>
                                    <p className="text-white/60 text-sm font-mono">Connect passionate learners across colleges through shared challenges and collaborative spirit.</p>
                                </div>
                                <div className="border border-white/10 p-5 rounded-xl border-l-4 border-l-white bg-white/5">
                                    <h3 className="font-bold text-lg mb-1 text-white">Celebrate Excellence</h3>
                                    <p className="text-white/60 text-sm font-mono">Recognise, reward, and amplify the talent that defines the next generation of creators and engineers.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Quick Facts */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-black tracking-tight mb-6 opacity-80 uppercase text-white">Quick Facts</h2>
                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                    <p className="text-4xl font-black text-white mb-1">8+</p>
                                    <p className="text-xs font-mono text-white/50 uppercase tracking-widest">Events</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                    <p className="text-4xl font-black text-white mb-1">DEC</p>
                                    <p className="text-xs font-mono text-white/50 uppercase tracking-widest">22 – 29, 2026</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                    <p className="text-4xl font-black text-white mb-1">∞</p>
                                    <p className="text-xs font-mono text-white/50 uppercase tracking-widest">Possibilities</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <FooterNav />
        </div>
    )
}

export default About
