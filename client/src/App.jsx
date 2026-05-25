import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<div>About</div>} />  
      <Route path="/signup" element={<Signup />} /> 
    </Routes>
  )
}

export default App
