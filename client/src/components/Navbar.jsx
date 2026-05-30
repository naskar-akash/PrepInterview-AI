import React from 'react'
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
    <div></div>
  )
}

export default Navbar
