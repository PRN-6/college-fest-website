import { Canvas } from '@react-three/fiber'
import Model from './components/Model'
import { OrbitControls } from '@react-three/drei'

const App = () => {
  return (
    <div className='relative'>
      {/* Fixed 3D background */}
      <div className='fixed w-screen h-screen overflow-hidden'>
        <Canvas camera={{ position: [0,0,5]}}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5,5,5]} />
          <Model />
        </Canvas>
      </div>
      
      {/* Scrollable content - this creates the scroll! */}
      <div className='relative z-10' style={{ height: '300vh' }}>
        <div className='p-8 text-white'>
          <div className='bg-black bg-opacity-50 p-8 rounded-lg'>
            <h1 className='text-4xl font-bold mb-4'>Scroll to animate!</h1>
            <p className='text-xl mb-8'>Keep scrolling to see the 3D model rotate and scale</p>
          </div>
          
          <div className='h-screen flex items-center justify-center'>
            <div className='bg-white bg-opacity-10 p-8 rounded-lg max-w-md'>
              <h2 className='text-2xl font-bold mb-4'>Section 1</h2>
              <p>The model should be rotating and scaling as you scroll...</p>
            </div>
          </div>
          
          <div className='h-screen flex items-center justify-center'>
            <div className='bg-white bg-opacity-10 p-8 rounded-lg max-w-md'>
              <h2 className='text-2xl font-bold mb-4'>Section 2</h2>
              <p>Keep scrolling to see more animations!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App