import { Canvas } from '@react-three/fiber'
import Model from './components/Model'

import { OrbitControls } from '@react-three/drei'



const App = () => {

  return (

    <div className='section h-[200vh]'>

      <div className='fixed top-0 left-0 w-screen h-screen '>

        <Canvas camera={{ position: [0,0,5]}}>

          <ambientLight intensity={0.5} />

          <directionalLight position={[5,8,5]} intensity={2}/>

          

          
          <Model />

          {/* <OrbitControls /> */}

        </Canvas>

        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold pointer-events-none z-10'>
          CENTER
        </div>

      </div>

    </div>

  )


}



export default App