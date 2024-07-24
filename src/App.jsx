import { useState } from 'react'


import MyComponent from './MyComponent'

import './App.css'
import Dashboard from './pages/dashboard/Dashboard'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    <Dashboard/> 

      {/* <MyComponent/>    */}
      
    </>
  )
}

export default App
