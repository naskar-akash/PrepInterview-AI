import React from 'react'
import { RiRobot3Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/AuthServices';

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const response = await logoutUser()
            alert(response?.data.message)
            if (response?.status === 200){
                navigate("/")
            }
        } catch (error) {
            alert("Error logging out")
        }
    }
  return (
    <nav className='w-full bg-slate-950 text-white shadow-lg shadow-slate-800'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6'>
        <div className='flex items-center gap-3'>
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-800'>
            <RiRobot3Fill size={22} />
          </div>
          <div>
            <p className='text-lg font-semibold tracking-tight'>PrepInterview-AI</p>
            <p className='text-xs text-slate-400'>Smart interview prep in one place</p>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <button onClick={()=>navigate("/")} className='rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700'>Home</button>
          <button onClick={()=>navigate("/signup")} className='rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700'>Signup</button>
          <button onClick={()=>navigate("/login")} className='rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700'>Login</button>
          <button onClick={handleLogout} className='rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-red-500'>Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
