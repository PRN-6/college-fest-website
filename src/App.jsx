import Scene from './components/Scene'
import Background from './components/Background'
import Header from './components/Header'

const App = () => {

  return (
    <div className='w-full h-[400vh] relative'>
      <Background /> 
      <Header/>  
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen">
        <Scene/>
      </div>

  
    </div>
  )
}
export default App

