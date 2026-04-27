import React from 'react'
import { BsRobot } from 'react-icons/bs'
import { motion } from "motion/react"

function Footer() {
  return (
    <div className='bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center px-6 pb-12 py-6 pt-12'>
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className='w-full max-w-7xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 py-12 px-8 text-center hover:shadow-2xl transition-all duration-500'
      >
        <motion.div
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className='flex justify-center items-center gap-4 mb-6'
        >
            <div className='bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-4 rounded-2xl shadow-lg'>
                <BsRobot size={24}/>
            </div>
            <h2 className='font-bold text-2xl text-slate-800'>NextHire</h2>
        </motion.div>

        <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className='text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed font-medium'
        >
          AI-powered interview preparation platform designed to improve
          communication skills, technical depth and professional confidence.
        </motion.p>

        <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className='mt-8 pt-8 border-t border-slate-200/50'
        >
          <p className='text-slate-500 text-sm font-medium'>
            © 2024 NextHire. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Footer
