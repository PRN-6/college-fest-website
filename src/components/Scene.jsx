import { Canvas } from '@react-three/fiber'
import Model from './Model'
import Background from './Background'

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5}/>
      <directionalLight position={[10,10,5]} intensity={1}/>
      <pointLight position={[-10,-10,-5]} intensity={0.5}/>
      <Background/>
      <Model/>
    </Canvas>
  )
}

export default Scene