import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import FooterNav from '../../components/FooterNav'

const ItManager = () => {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Header />

            {/* Background Aesthetic */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[150px] bg-pink-500"></div>
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 md:py-40">
                <button onClick={() => navigate('/')} className="mb-12 font-mono text-sm text-pink-500 hover:text-white transition-colors tracking-widest uppercase flex items-center gap-2 border-b border-pink-500/30 pb-1">
                    <span>&larr;</span> Back to Events
                </button>

                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
                        <span className="font-mono tracking-[0.3em] text-white/50 text-sm">DEC 22</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-pink-200 drop-shadow-lg">
                        IT MANAGER
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-white/70 max-w-3xl leading-relaxed">
                        Manage, optimize, and secure digital systems while solving real-world tech challenges. Step into the role of an IT leader and prove you have what it takes to run the matrix.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Rules & Info */}
                    <div className="lg:col-span-2 space-y-12 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md">
                        <section>
                            <h2 className="text-3xl font-black tracking-tight mb-6 text-pink-400">RULES</h2>
                            <ul className="space-y-4 text-white/80 font-mono text-sm leading-relaxed">
                                <li className="flex gap-4"><span className="text-pink-500 font-bold">[1]</span> This is strictly an individual event.</li>
                                <li className="flex gap-4"><span className="text-pink-500 font-bold">[2]</span> Participants must carry their college ID cards.</li>
                                <li className="flex gap-4"><span className="text-pink-500 font-bold">[3]</span> Usage of mobile phones during technical rounds is prohibited unless specified.</li>
                                <li className="flex gap-4"><span className="text-pink-500 font-bold">[4]</span> Decisions made by the judges and event coordinators are final.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-3xl font-black tracking-tight mb-6 text-pink-400">EVENT STRUCTURE</h2>
                            <div className="space-y-6">
                                <div className="border border-white/10 p-4 rounded-xl">
                                    <h3 className="font-bold text-lg mb-1">Round 1: Aptitude & Logic</h3>
                                    <p className="text-white/60 text-xs font-mono">A written/digital test evaluating your core logical reasoning and basic technical knowledge.</p>
                                </div>
                                <div className="border border-white/10 p-4 rounded-xl border-l-2 border-l-pink-500/50">
                                    <h3 className="font-bold text-lg mb-1">Round 2: Crisis Management</h3>
                                    <p className="text-white/60 text-xs font-mono">Participants will be given a corporate IT crisis scenario. You have 15 minutes to propose a solution.</p>
                                </div>
                                <div className="border border-white/10 p-4 rounded-xl border-l-4 border-l-pink-500">
                                    <h3 className="font-bold text-lg mb-1">Round 3: Stress Interview</h3>
                                    <p className="text-white/60 text-xs font-mono">The final showdown. Defend your technical decisions in a high-pressure mock board meeting.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Coordinators */}
                    <div className="space-y-8">
                        {/* <div className="bg-pink-500/10 p-8 rounded-3xl border border-pink-500/20 text-center">
                            <h3 className="font-black text-2xl mb-2 text-pink-400">REGISTRATION</h3>
                            <p className="text-white/60 text-xs font-mono mb-6">Spots are limited. Secure your entry now.</p>
                            <button className="w-full py-4 bg-pink-500 text-white font-black tracking-widest hover:bg-white hover:text-black transition-colors rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                                REGISTER HERE
                            </button>
                        </div> */}

                        <section>
                            <h2 className="text-xl font-black tracking-tight mb-6 opacity-80 uppercase">Event Co-ordinators</h2>
                            <div className="space-y-4">
                                {/* Coordinator 1 */}
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 shadow-lg">
                                    <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-pink-500/30 flex items-center justify-center overflow-hidden">
                                        <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Alex Mercer</p>
                                        <p className="text-xs text-pink-400 font-mono mt-1">Student Head</p>
                                        <p className="text-[10px] text-white/40 mt-1">Ph: +91 98765 43210</p>
                                    </div>
                                </div>

                                {/* Coordinator 2 */}
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 shadow-lg">
                                    <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-pink-500/30 flex items-center justify-center overflow-hidden">
                                        <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Sarah Chen</p>
                                        <p className="text-xs text-pink-400 font-mono mt-1">Faculty Coordinator</p>
                                        <p className="text-[10px] text-white/40 mt-1">Ph: +91 91234 56789</p>
                                    </div>
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

export default ItManager
