import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'
import { motion } from "motion/react"
function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })

                setInterviews(result.data)

            } catch (error) {
                console.log(error)
            }

        }

        getMyInterviews()

    }, [])


    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4' >
            <div className='w-full max-w-7xl mx-auto'>

                <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='mb-12 w-full flex items-start gap-6 flex-wrap'
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/")}
                        className='mt-1 p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50'
                    >
                        <FaArrowLeft className='text-slate-600' size={20} />
                    </motion.button>

                    <div>
                        <h1 className='text-4xl font-bold text-slate-800 mb-2'>
                            Interview History
                        </h1>
                        <p className='text-slate-600 text-lg leading-relaxed'>
                            Track your past interviews and performance reports
                        </p>
                    </div>
                </motion.div>


                {interviews.length === 0 ?
                    <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className='bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-xl text-center border border-slate-200/50'
                    >
                        <div className='max-w-md mx-auto'>
                            <div className='w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                                <span className='text-2xl'>📋</span>
                            </div>
                            <h3 className='text-xl font-semibold text-slate-800 mb-3'>No interviews yet</h3>
                            <p className='text-slate-600 leading-relaxed'>
                                Start your first interview to see your progress and performance reports here.
                            </p>
                        </div>
                    </motion.div>

                    :

                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className='grid gap-6'
                    >
                        {interviews.map((item, index) => (
                            <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -4, scale: 1.01 }}
                            onClick={()=>navigate(`/report/${item._id}`)}
                            className='bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-200/50 group'
                            >
                                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
                                    <div className='flex-1'>
                                        <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                                            {item.role}
                                        </h3>

                                        <div className='flex items-center gap-4 text-slate-600 mb-3'>
                                            <span className="font-medium">{item.experience}</span>
                                            <span className='w-1 h-1 bg-slate-400 rounded-full'></span>
                                            <span className="font-medium">{item.mode}</span>
                                        </div>

                                        <p className="text-sm text-slate-500 font-medium">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-8'>

                                        {/* SCORE */}
                                        <div className="text-center">
                                            <div className='flex items-center gap-2 mb-1'>
                                                <div className='w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full'></div>
                                                <p className="text-3xl font-bold text-slate-800">
                                                    {item.finalScore || 0}
                                                </p>
                                                <span className="text-lg text-slate-600 font-medium">/10</span>
                                            </div>
                                            <p className="text-sm text-slate-500 font-medium">
                                                Overall Score
                                            </p>
                                        </div>

                                        {/* STATUS BADGE */}
                                        <div className='flex flex-col items-end gap-2'>
                                            <span
                                                className={`px-6 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                                                    item.status === "completed"
                                                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
                                                        : "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200"
                                                }`}
                                            >
                                                {item.status === "completed" ? "✓ Completed" : "⏳ In Progress"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                        }
                    </motion.div>
                }
            </div>
        </div>
    )
}

export default InterviewHistory
