import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { googleAuthUser } from "../services/AuthServices";
import { useNavigate } from "react-router-dom";
import { RiRobot3Fill } from "react-icons/ri";
import { IoSparklesSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase"

const Auth = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
    const googleResponse = await signInWithPopup(auth, provider);
    // console.log(googleResponse.user.photoURL)

    const data = {
      name: googleResponse.user.displayName,
      email: googleResponse.user.email,
      profile_pic: googleResponse.user.photoURL,
    };
    const response = await googleAuthUser(data);
    console.log(response.data);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-stone-200 px-6 py-20">
      <motion.div
      initial={{opacity:0 , y: -40}}
      animate={{opacity:1 , y: 0}}
      transition={{duration: 1.05}}
       className="w-full max-w-md p-8 rounded-2xl bg-white shadow-2xl border border-gray-300">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-neutral-900 text-white p-2 rounded-lg">
            <RiRobot3Fill size={16} />
          </div>
          <h2 className="font-semibold text-lg">PrepInterview-AI</h2>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4">
          Start Your Preparation with{" "}
          <span className="bg-emerald-300 text-emerald-600 px-3 py-2 rounded-full inline-flex items-center gap-2 mt-2">
            <IoSparklesSharp size={16} /> Smart AI Assistance
          </span>
        </h1>
        <p className="text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8">
          Sign in to start smart preparation for your dream job, analyse CV, AI
          powered interview and detailed performance insights.
        </p>
        <motion.button
        whileHover={{opacity:0.95 , scale:1.03}}
        whileTap={{opacity:1 , scale:0.98}}
        transition={{duration: 0.2}}
        onClick={handleGoogleSignIn}
         className="w-full flex items-center justify-center gap-3 py-3 bg-olive-950 text-white font-semibold rounded-full shadow-md">
           <FcGoogle size={20}/> Sign up with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Auth;
