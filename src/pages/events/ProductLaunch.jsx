import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import FooterNav from '../../components/FooterNav'

const ProductLaunch = () => {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
            <Header />

            {/* Background Aesthetic */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[150px] bg-orange-500"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[120px] bg-orange-500"></div>
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 md:py-40">
                <button onClick={() => navigate('/')} className="mb-12 font-mono text-sm text-orange-400 hover:text-white transition-colors tracking-widest uppercase flex items-center gap-2 border-b border-orange-500/30 pb-1 w-fit">
                    <span>&larr;</span> Back to Events
                </button>

                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse shadow-[0_0_15px_rgba(251,146,60,0.5)]"></div>
                        <span className="font-mono tracking-[0.3em] text-white/50 text-sm">DEC 29</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-orange-200 drop-shadow-lg">
                        PRODUCT LAUNCH
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-white/70 max-w-3xl leading-relaxed">
                        Pitch bold ideas, craft a compelling narrative, and launch your vision to the world. Blend innovation, strategy, and showmanship like a true entrepreneur.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-b border-white/10 pb-20">
                    {/* Left Column: Rules & Info */}
                    <div className="lg:col-span-2 space-y-12 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md relative overflow-hidden">
                        {/* Decorative background element inside card */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

                        <section className="relative z-10">
                            <h2 className="text-3xl font-black tracking-tight mb-6 text-orange-400">RULES</h2>
                            <ul className="space-y-4 text-white/80 font-mono text-sm leading-relaxed">
                                <li className="flex gap-4"><span className="text-orange-400 font-bold">[1]</span> Teams of 2 to 4 members are allowed; solo entries are not permitted.</li>
                                <li className="flex gap-4"><span className="text-orange-400 font-bold">[2]</span> The product must be original — plagiarised ideas or re-branded existing products will be disqualified.</li>
                                <li className="flex gap-4"><span className="text-orange-400 font-bold">[3]</span> Each team gets a strict 7-minute pitch followed by a 3-minute Q&A from the judges.</li>
                                <li className="flex gap-4"><span className="text-orange-400 font-bold">[4]</span> A working prototype or detailed mockup must be presented — concepts alone are insufficient.</li>
                            </ul>
                        </section>

                        <section className="relative z-10">
                            <h2 className="text-3xl font-black tracking-tight mb-6 text-orange-400">EVENT STRUCTURE</h2>
                            <div className="space-y-6">
                                <div className="border border-white/10 p-5 rounded-xl bg-black/20">
                                    <h3 className="font-bold text-lg mb-1 text-white">Stage 1: Idea Submission</h3>
                                    <p className="text-white/60 text-sm font-mono">Submit a one-page brief describing your product concept, target audience, and core value proposition before the event day.</p>
                                </div>
                                <div className="border border-white/10 p-5 rounded-xl border-l-2 border-l-orange-400/50 bg-black/20">
                                    <h3 className="font-bold text-lg mb-1 text-white">Stage 2: Prototype & Pitch Prep</h3>
                                    <p className="text-white/60 text-sm font-mono">Develop your prototype or visual mockup. Prepare slides, a live demo, and your pitch deck for the main presentation.</p>
                                </div>
                                <div className="border border-white/10 p-5 rounded-xl border-l-4 border-l-orange-400 bg-orange-900/10">
                                    <h3 className="font-bold text-lg mb-1 text-white">Stage 3: Live Launch Pitch</h3>
                                    <p className="text-white/60 text-sm font-mono">Present your product on stage to the judges. Field tough questions and defend your vision with data and confidence.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Coordinators */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-black tracking-tight mb-6 opacity-80 uppercase text-white">Event Co-ordinators</h2>
                            <div className="space-y-4">
                                {/* Coordinator 1 */}
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 shrink-0 transition-transform hover:bg-white/10">
                                    <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-orange-400/50 flex flex-shrink-0 items-center justify-center overflow-hidden">
                                        <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-white truncate">COORDINATOR 1</p>
                                        <p className="text-xs text-orange-400 font-mono mt-1">Tejang</p>
                                        <p className="text-[10px] text-white/40 mt-1">Ph: [Hidden]</p>
                                    </div>
                                </div>

                                {/* Coordinator 2 */}
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 shrink-0 transition-transform hover:bg-white/10">
                                    <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-orange-400/50 flex flex-shrink-0 items-center justify-center overflow-hidden">
                                        <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-white truncate">COORDINATOR 2</p>
                                        <p className="text-xs text-orange-400 font-mono mt-1">Swathi</p>
                                        <p className="text-[10px] text-white/40 mt-1">Ph: [Hidden]</p>
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

export default ProductLaunch
