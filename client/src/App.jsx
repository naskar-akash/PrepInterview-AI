import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { getCurrentUser } from './services/userServices'
import {useDispatch} from 'react-redux' 
import { setUserData } from './redux/userSlice'
import InterviewPage from "./pages/InterviewPage"
import InterviewHistory from './pages/InterviewHistory'
import InterviewReport from './pages/InterviewReport'
import Pricing from './pages/Pricing'


const App = ({isModel = false}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getCurrentUser();
        dispatch(setUserData(response.data.user))
      } catch (error) {
        if (error.response?.status === 401) {
        dispatch(setUserData(null));
      } else {
        console.error(error);
      }
    }
  }
    getUser();
  }, [dispatch])
  

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} /> 
      <Route path="/interview" element={<InterviewPage />} /> 
      <Route path="/history" element={<InterviewHistory />} /> 
      <Route path="/report/:id" element={<InterviewReport />} /> 
      <Route path="/pricing" element={<Pricing />} /> 
    </Routes>
  )
}

export default App
