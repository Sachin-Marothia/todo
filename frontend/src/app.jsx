import { useState } from 'preact/hooks'
import Navbar from './components/Navbar'
import './app.css'
import Mid from './components/mid'
export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Mid/>
       <div className="bg-red-6 00"></div>
      
      
      
    </>
  )
}
