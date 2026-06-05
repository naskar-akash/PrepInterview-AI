import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { getCurrentUser } from './services/userServices'
import {useDispatch} from 'react-redux' 
import { setUserData } from './redux/userSlice'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getCurrentUser();
        dispatch(setUserData(response.data.user))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    getUser();
  }, [dispatch])
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} /> 
    </Routes>
  )
}

export default App
