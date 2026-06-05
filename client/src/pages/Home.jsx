import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Navbar from '../components/Navbar';


const Home = () => {
  const navigate = useNavigate()

  return (
   <div className='min-h-screen bg-gray-100 flex flex-col'>
    <Navbar/> 
   </div>
  )
}

export default Home
