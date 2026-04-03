import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './components/Model'
import Scene from './components/Scene'

const App = () => {
  return (
    <div className='w-full h-[200vh] relative'>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen">
        <Scene/>
      </div>
    </div>
  )
}

export default App  