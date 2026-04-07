import { Canvas } from '@react-three/fiber'
import Model from './Model'

const Scene = () => {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ powerPreference: "high-performance" }}>
      <ambientLight intensity={0.5}/>
      <directionalLight position={[10,10,5]} intensity={1}/>
      <Model/>
    </Canvas>
  )
}

export default Scene