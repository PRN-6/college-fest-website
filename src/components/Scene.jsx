import { Canvas } from '@react-three/fiber'
import Model from './Model'

const Scene = () => {
  return (
    <Canvas 
      shadows 
      dpr={[1, 2]} 
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 45 }}
    >
      <ambientLight intensity={0.5}/>
      <directionalLight position={[10,10,5]} intensity={1}/>
      <Model/>
    </Canvas>
  )
}

export default Scene