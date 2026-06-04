import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { getCurrentUser } from './services/userServices'


const App = () => {

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getCurrentUser();
        console.log(response?.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser();
  }, [])
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} /> 
    </Routes>
  )
}

export default App
