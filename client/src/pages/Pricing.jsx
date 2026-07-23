import React,{ useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { plansArray } from '../assets/arrays/plansArray';
import { motion } from "motion/react";

const Pricing = () => {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");


  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-pink-50 py-16 px-6'>
      <div className="max-w-6xl mx-auto mb-14 flex items-start gap-4">
        <button onClick={()=>navigate("/")} className='p-3 mt-2 rounded-full bg-white shadow hover:shadow-md transition'>
          <FaArrowLeft className='text-gray-600' />
        </button>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-800'>Choose your plan</h1>
          <p className='text-gray-500 mt-3 text-lg'>Flexible pricing to match your interview preparation goals.</p>
        </div>
      </div>
      {/* cards */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
        {
          plansArray.map((plan)=>{
            const isSelected = selectedPlan === plan.id
            return(
              <motion.div
              key={plan.id}
              whileHover={!plan.default && {scale: 1.05}}
              onClick={()=>!plan.default && setSelectedPlan(plan.id)}
              className={`relative rounded-3xl p-8 transition-all duration-300 border
                ${
                  isSelected 
                  ? "border-emerald-600 shadow-2xl bg-white"
                  : "border-gray-200 bg-white shadow-md"
                }
                ${plan.default ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className='absolute top-6 right-6 bg-emerald-600 text-white text-xs px-4 py-1 rounded-full shadow'>{plan.badge}</div>
                )}
                {/* Default tag */}
                {plan.default && (
                  <div className="absolute top-6 right-6 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">Default</div>
                )}
                {/* Plan name */}
                <h3 className='text-xl font-semibold text-gray-800 text-shadow-md'>{plan.name}</h3>
                {/* Price */}
                <div className='mt-4'>
                  <span className='text-3xl font-bold text-emerald-600'>{plan.price}</span>
                  <p className='text-gray-500 mt-1'>{plan.credits} Credits</p>
                </div>
                {/* Description */}
                <p className='text-gray-500 mt-4 text-sm leading-relaxed'>{plan.description}</p>
                {/* Features */}
                <div className='mt-6 space-y-3 text-left'>
                  {plan.features.map((feature,i)=>(
                    <div key={i} className='flex items-center gap-3'>
                      <FaCheckCircle className='text-emerald-500 text-sm' />
                      <span className='text-gray-700 text-sm'>{feature}</span>
                    </div>
                  ))}
                </div>
                {!plan.default && 
                <button className={`w-full mt-8 py-3 rounded-xl font-semibold transition ${
                  isSelected ? "bg-emerald-600 text-white hover:opacity-90" : "bg-gray-100 text-gray-700 hover:bg-emerald-50"
                }`}>
                  {isSelected ? "Proceed to Pay" : "Select Plan"}
                </button>
                }
              </motion.div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Pricing
