import { useGLTF } from '@react-three/drei'

const Model = () => {
    const { scene } = useGLTF('/models/animated-laptop.glb')
    
    return (
        <primitive 
            object={scene}
            position={[0, 0, 0]}
            scale={0.05}
        />
    )
}

export default Model