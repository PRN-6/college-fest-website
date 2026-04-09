import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ItManager from './pages/events/ItManager'
import TreasureHunt from './pages/events/TreasureHunt'
import SurpriseEvent from './pages/events/SurpriseEvent'
import WebDesigning from './pages/events/WebDesigning'
import Hackathon from './pages/events/Hackathon'
import ReelMaking from './pages/events/ReelMaking'
import Gaming from './pages/events/Gaming'
import ProductLaunch from './pages/events/ProductLaunch'
import Scene from './components/Scene'
import About from './pages/About'
import Team from './pages/Team'
import Background from './components/Background'
import Header from './components/Header'
import Timeline from './components/Timeline'
import Events from './components/Events'
import Footer from './components/Footer'
import FooterNav from './components/FooterNav'
import Loader from './components/Loader'
import './styles/hide-scrollbar.css'

import gsap from 'gsap'

gsap.config({ force3D: true, autoSleep: 60 })

const AppContent = () => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div className='w-full min-h-[650vh] relative overflow-x-hidden'>
            <Loader onFinished={() => setLoaded(true)} />

            <Background />
            <Header />

            {/* Fixed 3D Scene Container */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen z-0 pointer-events-none">
                <Scene />
            </div>

            <Timeline />

            {/* Spacer to push relative Events section to the 50% mark of 650vh */}
            <div className="h-[325vh] pointer-events-none"></div>
            <Events />

            {/* Final Spacer */}
            <div className="h-[100vh] pointer-events-none"></div>

            <Footer />
            <FooterNav />
        </div>
    )
}

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/it-manager" element={<ItManager />} />
            <Route path="/treasure-hunt" element={<TreasureHunt />} />
            <Route path="/surprise-event" element={<SurpriseEvent />} />
            <Route path="/web-designing" element={<WebDesigning />} />
            <Route path="/hackathon" element={<Hackathon />} />
            <Route path="/reel-making" element={<ReelMaking />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/product-launch" element={<ProductLaunch />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
        </Routes>
    )
}

export default App
