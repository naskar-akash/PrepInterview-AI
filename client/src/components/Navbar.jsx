import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/AuthServices";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative"
      >
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-black p-2 text-white rounded-lg">
            <BsRobot size={18} />
          </div>
          <h1 className="hidden md:block font-semibold text-lg">
            PrepInterview-AI
          </h1>
        </div>
        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition">
              <BsCoin size={20} /> {userData?.credits || 0}
            </button>
          </div>
          <div className="relative">
            <button className="w-9 h-9 bg-gray-400 text-white rounded-full flex items-center justify-center font-semibold">
              {userData ? (
                <div className="w-9 h-9 rounded-full overflow-hidden">
                  <img
                    src={userData?.profile_pic}
                    alt="profile_pic"
                    className="object-cover"
                  />
                </div>
              ) : (
                <FaUserAstronaut size={16} />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
