import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/AuthServices";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import AuthModel from "./AuthModel";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [showCreditPopup, setShowCreditPopup] = useState(false)
  const [showUserPopup, setShowUserPopup] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const dispatch = useDispatch()


  const handleLogout = async () => {
    try {
      const response = await logoutUser()
      dispatch(setUserData(null))
      setShowUserPopup(false)
      setShowCreditPopup(false)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex justify-center px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative"
      >
        <div onClick={()=>{
          if (!userData) {
                setShowAuth(true)
                return;
              }
        }} className="flex items-center gap-3 cursor-pointer">
          <div className="bg-black p-2 text-white rounded-lg">
            <BsRobot size={18} />
          </div>
          <h1 className="hidden md:block font-semibold text-lg">
            PrepInterview-AI
          </h1>
        </div>
        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <button
            onClick={()=>{
              if (!userData) {
                setShowAuth(true)
                return;
              }
              setShowCreditPopup(!showCreditPopup); 
              setShowUserPopup(false)}}
             className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition">
              <BsCoin size={20} /> {userData?.credits || 0}
            </button>
            { showCreditPopup && (
              <div className="absolute -right-12.5 mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50">
                <p className="text-sm text-gray-600 mb-4">Need more credit to continue?</p>
                <button onClick={()=>navigate('/pricing')} className="w-full bg-black text-white py-2 rounded-lg text-sm">Buy more credits</button>
              </div>
            )}
          </div>
          <div className="relative">
            <button 
            onClick={()=>{
              if (!userData) {
                setShowAuth(true)
                return;
              }
              setShowCreditPopup(false); 
              setShowUserPopup(!showUserPopup)}}
            className="w-9 h-9 bg-gray-400 text-white rounded-full flex items-center justify-center font-semibold">
              {userData ? (
                <div className="w-9 h-9 rounded-full overflow-hidden">
                  <img
                    src={userData?.profile_pic}
                    alt="profile_pic"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <FaUserAstronaut size={16} />
              )}
            </button>
            { showUserPopup && (
              <div className="absolute right-0 mt-3 w-50 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50">
                <p className="text-md text-blue-600 font-medium mb-2">Hi, {(userData?.name).split(" ")[0]}</p>
                <button onClick={()=>navigate('/history')} className="w-full text-left text-sm py-2 hover:text-black text-gray-600 hover:font-semibold">Interview History</button>
                <button onClick={handleLogout} className="w-full text-left text-sm py-2 flex items-center gap-2 text-red-500 hover:font-semibold"><HiOutlineLogout size={16}/> Logout</button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
    </div>
  );
};

export default Navbar;
