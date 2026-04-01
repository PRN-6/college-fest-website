import { Canvas } from '@react-three/fiber'
import Model from './components/Model'
import { OrbitControls } from '@react-three/drei'

const App = () => {
  return (
    <div className='relative'>
      <div className='fixed w-screen h-screen overflow-hidden'>
        <Canvas camera={{ position: [0,0,5]}}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5,10,5]} />
          
          <Model />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}

export default App