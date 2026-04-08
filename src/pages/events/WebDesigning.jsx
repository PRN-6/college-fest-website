import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import FooterNav from '../../components/FooterNav'

const WebDesigning = () => {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 overflow-hidden relative">
            <Header />
            
            {/* Background Aesthetic */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-10 blur-[150px] bg-white"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-5 blur-[120px] bg-white"></div>
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 md:py-40">
                <button onClick={() => navigate('/')} className="mb-12 font-mono text-sm text-zinc-300 hover:text-white transition-colors tracking-widest uppercase flex items-center gap-2 border-b border-white/20 pb-1 w-fit">
                    <span>&larr;</span> Back to Events
                </button>
                
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-white animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.7)]"></div>
                        <span className="font-mono tracking-[0.3em] text-white/50 text-sm">DEC 25</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 text-white drop-shadow-lg">
                        WEB DESIGNING
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-zinc-400 max-w-3xl leading-relaxed">
                        Design stunning and user-friendly websites. Showcase your creativity and front-end skills in this ultimate UI/UX challenge.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-b border-white/10 pb-20">
                    {/* Left Column: Rules & Info */}
                    <div className="lg:col-span-2 space-y-12 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md relative overflow-hidden">
                        {/* Decorative background element inside card */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

                        <section className="relative z-10">
                            <h2 className="text-3xl font-black tracking-tight mb-6 text-white">RULES</h2>
                            <ul className="space-y-4 text-zinc-300 font-mono text-sm leading-relaxed">
                                <li className="flex gap-4"><span className="text-white font-bold">[1]</span> Use of external templates is strictly prohibited.</li>
                                <li className="flex gap-4"><span className="text-white font-bold">[2]</span> Originality and responsive design will heavily influence scores.</li>
                                <li className="flex gap-4"><span className="text-white font-bold">[3]</span> Code must be written during the allotted timeframe.</li>
                                <li className="flex gap-4"><span className="text-white font-bold">[4]</span> Permitted languages/frameworks will be announced at the venue.</li>
                            </ul>
                        </section>

                        <section className="relative z-10">
                            <h2 className="text-3xl font-black tracking-tight mb-6 text-white">EVENT STRUCTURE</h2>
                            <div className="space-y-6">
                                <div className="border border-white/10 p-5 rounded-xl bg-black/40">
                                    <h3 className="font-bold text-lg mb-1 text-white">Stage 1: Wireframing</h3>
                                    <p className="text-zinc-500 text-sm font-mono">Create the low-fidelity layout based on the problem statement.</p>
                                </div>
                                <div className="border border-white/10 p-5 rounded-xl border-l-2 border-l-white/50 bg-black/40">
                                    <h3 className="font-bold text-lg mb-1 text-white">Stage 2: Prototyping & Code</h3>
                                    <p className="text-zinc-500 text-sm font-mono">Bring your wireframes to life dynamically using HTML/CSS/JS or approved frameworks.</p>
                                </div>
                                <div className="border border-white/10 p-5 rounded-xl border-l-4 border-l-white bg-white/5">
                                    <h3 className="font-bold text-lg mb-1 text-white">Stage 3: Deployment & Presentation</h3>
                                    <p className="text-zinc-500 text-sm font-mono">Host your site locally and pitch your UI/UX decisions to the judges.</p>
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
                                    <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-white/50 flex flex-shrink-0 items-center justify-center overflow-hidden">
                                        <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-white truncate">COORDINATOR 1</p>
                                        <p className="text-xs text-zinc-400 font-mono mt-1">Lead Developer</p>
                                        <p className="text-[10px] text-zinc-500 mt-1">Ph: [Hidden]</p>
                                    </div>
                                </div>

                                {/* Coordinator 2 */}
                                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 shrink-0 transition-transform hover:bg-white/10">
                                    <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-white/50 flex flex-shrink-0 items-center justify-center overflow-hidden">
                                        <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-white truncate">COORDINATOR 2</p>
                                        <p className="text-xs text-zinc-400 font-mono mt-1">Design Head</p>
                                        <p className="text-[10px] text-zinc-500 mt-1">Ph: [Hidden]</p>
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

export default WebDesigning
