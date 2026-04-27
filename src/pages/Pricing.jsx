import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];



  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =
        plan.id === "basic" ? 100 :
          plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order", {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      }, { withCredentials: true })


      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "InterviewIQ.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (response) {
          const verifypay = await axios.post(ServerUrl + "/api/payment/verify", response, { withCredentials: true })
          dispatch(setUserData(verifypay.data.user))

          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")

        },
        theme: {
          color: "#10b981",
        },

      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setLoadingPlan(null);
    } catch (error) {
      console.log(error)
      setLoadingPlan(null);
    }
  }



  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800 text-white py-20 px-6'>
      <div className='max-w-7xl mx-auto bg-slate-900/50 border border-slate-100/20 rounded-3xl shadow-2xl backdrop-blur-xl p-8'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <button 
            onClick={() => navigate("/")} 
            className='mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 text-cyan-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-cyan-300/30 hover:border-cyan-200'
          >
            <FaArrowLeft className='text-gray-100' />
            <span className='text-gray-300 font-medium'>Back to Home</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className='text-4xl md:text-5xl font-bold text-gray-300 mb-4'>
              Choose Your Plan
            </h1>
            
            <motion.div
              animate={{ scale: [0, 1, 0] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className='w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full'
            />

            <p className='text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed'>
              Flexible pricing to match your interview preparation goals. Select the perfect plan for your journey.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id

            return (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={!plan.default ? { y: -8, scale: 1.02 } : {}}
                onClick={() => !plan.default && setSelectedPlan(plan.id)}
                className={`relative rounded-3xl p-8 transition-all duration-300 border-2 bg-slate-900/60 shadow-lg hover:shadow-2xl backdrop-blur-lg
                  ${isSelected
                    ? "border-cyan-400 shadow-cyan-700/40 bg-cyan-500/20"
                    : "border-slate-500/30 hover:border-cyan-300"
                  }
                  ${plan.default ? "cursor-default" : "cursor-pointer"}
                `}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm px-6 py-2 rounded-full shadow-lg font-semibold">
                    {plan.badge}
                  </div>
                )}

                {/* Default Tag */}
                {plan.default && (
                  <div className="absolute top-6 right-6 bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium border border-gray-200">
                    Default
                  </div>
                )}

                {/* Plan Content */}
                <div className="text-center">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-blue-600">
                        {plan.price}
                      </span>
                      {plan.id !== "free" && (
                        <span className="text-gray-500 text-lg">/one-time</span>
                      )}
                    </div>
                    <p className="text-gray-300 mt-2 font-medium">
                      {plan.credits} Interview Credits
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-4 mb-8 text-left">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <FaCheckCircle className="text-blue-500 text-lg mt-0.5 flex-shrink-0" />
                        <span className="text-gray-500 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  {!plan.default && (
                    <button
                      disabled={loadingPlan === plan.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isSelected) {
                          setSelectedPlan(plan.id)
                        } else {
                          handlePayment(plan)
                        }
                      }}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                        isSelected
                          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                          : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200"
                      }`}
                    >
                      {loadingPlan === plan.id
                        ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </div>
                        )
                        : isSelected
                          ? "Proceed to Payment"
                          : "Select Plan"}
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm">
            All plans include secure payment processing and instant credit activation.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Pricing
