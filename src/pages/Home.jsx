import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import ChatBot from '../components/ChatBot';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';


function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()


  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      <div className='flex-1 px-4 sm:px-6 py-16 sm:py-20 md:py-24 relative z-10'>
        <div className='max-w-7xl mx-auto'>

          {/* Hero Badge */}
          <div className='flex justify-center mb-10'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='bg-white/80 backdrop-blur-sm border border-blue-200/50 text-blue-700 text-sm px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/90'
            >
              <HiSparkles size={20} className="text-blue-500 animate-pulse" />
              <span className="font-medium">AI Powered Smart Interview Platform</span>
            </motion.div>
          </div>

          {/* Hero Section */}
          <div className='text-center mb-20 md:mb-40'>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight max-w-6xl mx-auto mb-6 md:mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent'
            >
              Ace Your Next Job Interview with{" "}
              <span className='relative inline-block'>
                <span className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px- md:px-5 py-2 sm:py-3 rounded-2xl md:rounded-3xl shadow-2xl font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl transform hover:scale-105 transition-transform duration-300'>
                  AI Interviewer
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl md:rounded-3xl blur-lg opacity-30 -z-10"></div>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='text-lg sm:text-xl md:text-2xl text-gray-700 mt-6 md:mt-10 max-w-4xl mx-auto leading-relaxed font-light px-4'
            >
              Experience a realistic interview simulation with dynamic AI-generated questions, real-time feedback, and performance analytics to boost your confidence and land your dream job.
            </motion.p>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8 mt-12 md:mt-16 px-4'>
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className='bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 sm:px-12 md:px-16 py-4 md:py-5 rounded-2xl md:rounded-3xl font-bold text-lg md:text-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden group w-full sm:w-auto'
              >
                <span className="relative z-10">Start Interview</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{
                  scale: 1.08,
                  y: -5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.95 }}
                className='border-3 border-gray-300 text-gray-800 px-8 sm:px-12 md:px-16 py-4 md:py-5 rounded-2xl md:rounded-3xl font-bold text-lg md:text-xl hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50/50 transition-all duration-300 shadow-2xl hover:shadow-xl bg-white/80 backdrop-blur-sm w-full sm:w-auto'
              >
                View History
              </motion.button>
            </div>
          </div>

          {/* Features Section */}
          <motion.div className='mb-32 md:mb-48'>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 md:mb-24 text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent px-4'
            >
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Features</span>
            
            </motion.h2>

            <div className='flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16'>
              {[
                {
                  icon: <BsRobot size={32} />,
                  step: "STEP 1",
                  title: "Role & Experience Selection",
                  desc: "AI adjusts difficulty based on selected job role."
                },
                {
                  icon: <BsMic size={32} />,
                  step: "STEP 2",
                  title: "Smart Voice Interview",
                  desc: "Dynamic follow-up questions based on your answers."
                },
                {
                  icon: <BsClock size={32} />,
                  step: "STEP 3",
                  title: "Timer Based Simulation",
                  desc: "Real interview pressure with time tracking."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80, rotate: index === 0 ? -3 : index === 1 ? 2 : -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 0.8 + index * 0.2, type: "spring", stiffness: 100 }}
                  whileHover={{
                    y: -20,
                    scale: 1.08,
                    rotate: index === 0 ? -1 : index === 1 ? 1 : -1,
                    boxShadow: "0 35px 70px rgba(59, 130, 246, 0.2)"
                  }}
                  className={`
                    relative bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl border-2 border-gray-100/50
                    hover:border-blue-300/50 p-6 sm:p-8 md:p-12 w-full max-w-sm md:w-96 shadow-2xl hover:shadow-blue-500/10
                    transition-all duration-500 cursor-pointer group overflow-hidden
                    ${index === 0 ? "lg:rotate-[-1deg]" : ""}
                    ${index === 1 ? "lg:-mt-12 lg:rotate-[0.5deg] shadow-blue-500/5" : ""}
                    ${index === 2 ? "lg:rotate-[0.5deg]" : ""}
                  `}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-500 rounded-2xl md:rounded-3xl"></div>

                  <div className='absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white group-hover:scale-110 transition-transform duration-300'>
                    {item.icon}
                  </div>
                  <div className='pt-12 sm:pt-16 md:pt-16 text-center relative z-10'>
                    <div className='text-xs sm:text-sm text-blue-700 font-black mb-4 sm:mb-6 tracking-widest bg-blue-100/80 px-4 sm:px-6 py-2 sm:py-3 rounded-xl md:rounded-2xl inline-block border border-blue-200/50 shadow-lg'>
                      {item.step}
                    </div>
                    <h3 className='font-black mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl text-gray-900 group-hover:text-blue-900 transition-colors duration-300 px-2'>{item.title}</h3>
                    <p className='text-gray-700 leading-relaxed text-base sm:text-lg md:text-lg font-medium group-hover:text-gray-800 transition-colors duration-300 px-2'>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Advanced AI Capabilities */}
          <div className='mb-32 md:mb-48'>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 md:mb-24 text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent px-4'
            >
              Advanced AI{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Capabilities</span>
            </motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16'>
              {[
                {
                  image: evalImg,
                  icon: <BsBarChart size={28} />,
                  title: "AI Answer Evaluation",
                  desc: "Scores communication, technical accuracy and confidence."
                },
                {
                  image: resumeImg,
                  icon: <BsFileEarmarkText size={28} />,
                  title: "Resume Based Interview",
                  desc: "Project-specific questions based on uploaded resume."
                },
                {
                  image: pdfImg,
                  icon: <BsFileEarmarkText size={28} />,
                  title: "Downloadable PDF Report",
                  desc: "Detailed strengths, weaknesses and improvement insights."
                },
                {
                  image: analyticsImg,
                  icon: <BsBarChart size={28} />,
                  title: "History & Analytics",
                  desc: "Track progress with performance graphs and topic analysis."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    boxShadow: "0 30px 60px rgba(59, 130, 246, 0.15)"
                  }}
                  className='bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-300/50 group overflow-hidden relative'
                >
                  {/* Subtle background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/30 group-hover:to-indigo-50/30 transition-all duration-500 rounded-2xl md:rounded-3xl"></div>

                  <div className='flex flex-col md:flex-row items-center gap-6 md:gap-10 relative z-10'>
                    <div className='w-full md:w-1/2 flex justify-center'>
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className='w-full h-auto object-contain max-h-32 sm:max-h-40 md:max-h-56 rounded-xl md:rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300'
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    <div className='w-full md:w-1/2'>
                      <div className='bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 md:mb-8 shadow-xl border border-blue-200/50 group-hover:scale-110 transition-transform duration-300'>
                        {item.icon}
                      </div>
                      <h3 className='font-black mb-3 sm:mb-4 md:mb-6 text-xl sm:text-2xl md:text-3xl text-gray-900 group-hover:text-blue-900 transition-colors duration-300'>{item.title}</h3>
                      <p className='text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-300'>{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interview Modes */}
          <div className='mb-24 md:mb-40'>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 md:mb-24 text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent px-4'
            >
              Multiple Interview{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Modes</span>
            </motion.h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16'>
              {[
                {
                  img: hrImg,
                  title: "HR Interview Mode",
                  desc: "Behavioral and communication based evaluation."
                },
                {
                  img: techImg,
                  title: "Technical Mode",
                  desc: "Deep technical questioning based on selected role."
                },
                {
                  img: confidenceImg,
                  title: "Confidence Detection",
                  desc: "Basic tone and voice analysis insights."
                },
                {
                  img: creditImg,
                  title: "Credits System",
                  desc: "Unlock premium interview sessions easily."
                }
              ].map((mode, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    boxShadow: "0 30px 60px rgba(59, 130, 246, 0.15)"
                  }}
                  className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-300/50 group overflow-hidden relative"
                >
                  {/* Subtle background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/30 group-hover:to-purple-50/30 transition-all duration-500 rounded-2xl md:rounded-3xl"></div>

                  <div className='flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 relative z-10'>
                    <div className="flex-1">
                      <h3 className="font-black text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 md:mb-6 text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                        {mode.title}
                      </h3>
                      <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-300">
                        {mode.desc}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain rounded-2xl md:rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

      <ChatBot />

      <Footer />
    </div>
  )
}

export default Home
