import { Canvas } from '@react-three/fiber'
import Model from './Model'
import useIsMobile from '../hooks/useIsMobile'

const Scene = () => {
  const isMobile = useIsMobile()

  return (
    <Canvas
      shadows={!isMobile}
      dpr={isMobile ? 1 : [1, 2]}
      frameloop={isMobile ? 'demand' : 'always'}
      gl={{
        antialias: !isMobile,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true
      }}
      camera={{ fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Model />
    </Canvas>
  )
}

export default Scene