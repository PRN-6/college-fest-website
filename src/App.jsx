import Scene from './components/Scene'
import Background from './components/Background'
import Header from './components/Header'
import Timeline from './components/Timeline'
import Events from './components/Events'
import Footer from './components/Footer'
import FooterNav from './components/FooterNav'
import './styles/hide-scrollbar.css'

import gsap from 'gsap'

gsap.config({ force3D: true, autoSleep: 60 })

const App = () => {

  return (
    <div className='w-full min-h-[650vh] relative overflow-x-hidden'>
      <Background /> 
      <Header/>  
      {/* Fixed 3D Scene Container: Move to background layer and prevent blocking events */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen z-0 pointer-events-none">
        <Scene/>
      </div>
      
      <Timeline />
      
      {/* Spacer to push relative Events section to the 50% mark of 650vh */}
      <div className="h-[325vh] pointer-events-none"></div>
      <Events />
      
      {/* Spacer to reach the Footer at 85% mark. 
          Since Events has its own height, we adjust this. 
          Actually, a simple 100vh spacer is often enough to transition. */}
      <div className="h-[100vh] pointer-events-none"></div>
      
      <Footer />
      <FooterNav />
    </div>
  )
}
export default App

