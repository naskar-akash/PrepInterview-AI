import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import AuthModel from "../components/AuthModel";
import { stepsArray } from "../assets/stepsArray";
import { HiSparkles } from "react-icons/hi";
import { aiArray, modesArray } from "../assets/imageArray";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-1 py-20 px-6">
        <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
            <HiSparkles size={16} className="bg-green-50 text-green-500" />
            AI Powered Smart Interview Platform
          </div>
        </div>
        <div className="text-center mb-28">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto"
          >
            Prepare Yourself with
            <span className="relative inline-block mt-4">
              <span className="bg-green-100 text-green-600 rounded-full px-5 py-1">
                Artificial Intelligence
              </span>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg"
          >
            Role-based mock interview with smart follow-ups, adaptive difficulty
            and real-time performance analysis.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <motion.button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                navigate("/interview");
              }}
              whileHover={{ opacity: 0.95, scale: 1.03 }}
              whileTap={{ opacity: 1, scale: 0.98 }}
              transition={{ duration: 0.1 }}
              className="bg-mauve-700 text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md"
            >
              Start Interview
            </motion.button>
            <motion.button
              onClick={() => {
                if (!userData) {
                  setShowAuth(true);
                  return;
                }
                navigate("/history");
              }}
              whileHover={{ opacity: 0.95, scale: 1.03 }}
              whileTap={{ opacity: 1, scale: 0.98 }}
              transition={{ duration: 0.1 }}
              className="bg-teal-800 text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md"
            >
              View History
            </motion.button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28">
          {
            stepsArray.map((step, index) => (
              <motion.div key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 + index * 0.2 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
              
               className={`relative bg-amber-100 rounded-3xl border-2 border-amber-300 hover:border-amber-500 p-10 w-80 max-w-[90%] shadow-md hover:shadow-2xl transition-all duration-300
              ${index === 0 ? "-rotate-6" : ""}
              ${index === 1 ? "rotate-3 md:-mt-6 shadow-xl" : ""}
              ${index === 2 ? "-rotate-6" : ""}
              `}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-orange-500 text-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  {step.icon}
                </div>
                <div className="pt-6 text-center">
                <h3 className="text-xl font-bold mb-2 text-red-500">{step.step}</h3>
                <h4 className="text-lg font-medium mb-2 bg-blue-50 text-cyan-600 rounded-full px-4 py-1">{step.title}</h4>
                <p className="text-gray-500 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))
          }
        </div>
        <div className="mb-32">
          <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
           className="text-4xl font-semibold text-center mb-16">Advanced AI {" "}
           <span className="text-emerald-600">
             Capabilities
           </span>
           </motion.h2>
           <div className="grid md:grid-cols-2 gap-10">
            {
              aiArray.map((item,index)=>(
                <motion.div 
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: index * 0.2}}
                whileHover={{scale: 1.02}}
                key={index} 
                className="bg-white border border-gray-200 rounded-3xl p-8 shado-sm hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 flex justify-center">
                    <img src={item.image} alt={item.title} className="w-full h-auto object-contain max-h-64"/>
                    </div>
                    <div className="w-full md:w-1/2">
                    <div className="bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold mb-3 text-xl">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            }
            </div>
        </div>
        <div className="mb-32">
          <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
           className="text-4xl text-cyan-900 font-semibold text-center mb-16">Multiple Interview {" "}
           <span className="text-indigo-600">
             Modes
           </span>
           </motion.h2>
           <div className="grid md:grid-cols-2 gap-10">
            {
              modesArray.map((item,index)=>(
                <motion.div 
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: index * 0.2}}
                whileHover={{y: -6}}
                key={index} 
                className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex justify-between items-center">
                    <div className="w-1/2">
                    <h3 className="font-semibold mb-3 text-xl">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <div className="w-1/2 flex justify-end">
                    <img src={item.image} alt={item.title} className="w-28 h-28 object-contain"/>
                    </div>
                    </div>
                  </div>
                </motion.div>
              ))
            }
            </div>
        </div>
        </div>
      </div>
      {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
        <Footer />
    </div>
  );
};

export default Home;
