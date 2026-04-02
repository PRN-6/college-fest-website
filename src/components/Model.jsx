import { useGLTF , useAnimations } from '@react-three/drei'
import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Model = () => {
    const group = useRef()
    const modelRef = useRef()
    const { scene , animations } = useGLTF('/models/animated-laptop-proper.glb')

    const { actions } = useAnimations(animations , group)
    
    useScrollAnimation(actions)
    
    return (
        <primitive 
            ref={group}
            object={scene}
            position={[0, 0, 0]}
            scale={0.03}
            rotation={[-5,8,5]}
        />
    )
}

export default Model