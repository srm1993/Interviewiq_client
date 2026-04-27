import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
    FaRobot,
    FaClock,
    FaStar,
    FaArrowLeft,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
function Step1SetUp({ onStart }) {
    const {userData}= useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);


    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

            console.log(result.data)

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);

            setAnalyzing(false);

        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
           const result = await axios.post(ServerUrl + "/api/interview/generate-questions" , {role, experience, mode , resumeText, projects, skills } , {withCredentials:true}) 
           console.log(result.data)
           if(userData){
            dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
           }
           setLoading(false)
           onStart(result.data)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8 relative overflow-hidden text-gray-900'>

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className='absolute top-5 left-4 sm:left-6 z-20'>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(-1)}
                    className='flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-700 px-4 py-2.5 rounded-2xl shadow-lg hover:shadow-xl border border-slate-200/70 transition-all duration-300 font-semibold'
                >
                    <FaArrowLeft className='text-blue-600' />
                    <span>Back</span>
                </motion.button>
            </div>

            <div className='w-full max-w-7xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(59,130,246,0.12)] grid lg:grid-cols-2 overflow-hidden border border-blue-200/50 relative z-10'>
                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-12 lg:p-16 flex flex-col justify-center border-r border-blue-100/80'>

                    <div className="mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                        >
                            <FaRobot className="text-blue-600 text-2xl" />
                        </motion.div>

                        <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-6 leading-tight">
                            Start Your AI Interview
                        </h2>

                        <p className="text-slate-600 text-lg lg:text-xl leading-relaxed font-medium max-w-xl">
                            Practice real interview scenarios powered by AI.
                            Improve communication, technical skills, and confidence.
                        </p>
                    </div>

                    <div className='space-y-6'>
                        {[
                            {
                                icon: <FaUserTie className="text-blue-600 text-2xl" />,
                                text: "Choose Role & Experience",
                                desc: "Select your target position and experience level"
                            },
                            {
                                icon: <FaMicrophoneAlt className="text-blue-600 text-2xl" />,
                                text: "Smart Voice Interview",
                                desc: "Dynamic AI-powered conversation"
                            },
                            {
                                icon: <FaChartLine className="text-blue-600 text-2xl" />,
                                text: "Performance Analytics",
                                desc: "Detailed feedback and improvement insights"
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 + index * 0.15 }}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15)"
                                }}
                                className='flex items-start space-x-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 group cursor-pointer'
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-200/50">
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <span className='text-gray-900 font-bold text-lg block mb-1'>{item.text}</span>
                                    <span className='text-gray-600 text-sm leading-relaxed'>{item.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="p-12 lg:p-16 bg-white/95">

                    <div className="mb-8">
                        <h2 className='text-3xl lg:text-4xl font-black text-gray-900 mb-3'>
                            Interview Setup
                        </h2>
                        <p className="text-gray-600 text-lg">Configure your personalized interview experience</p>
                    </div>

                    <div className='space-y-8'>

                        {/* Role Input */}
                        <div className='relative group'>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-1 group-focus-within:border-blue-400 transition-colors duration-300">
                                <div className="flex items-center px-4 py-3">
                                    <FaUserTie className='text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300 mr-3' />
                                    <input
                                        type='text'
                                        placeholder='Enter your target role (e.g. Software Engineer)'
                                        className='w-full text-gray-900 placeholder-gray-500 focus:outline-none text-lg font-medium'
                                        onChange={(e) => setRole(e.target.value)}
                                        value={role}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Experience Input */}
                        <div className='relative group'>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-1 group-focus-within:border-blue-400 transition-colors duration-300">
                                <div className="flex items-center px-4 py-3">
                                    <FaBriefcase className='text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300 mr-3' />
                                    <input
                                        type='text'
                                        placeholder='Experience level (e.g. 2 years, Mid-level)'
                                        className='w-full text-gray-900 placeholder-gray-500 focus:outline-none text-lg font-medium'
                                        onChange={(e) => setExperience(e.target.value)}
                                        value={experience}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Interview Mode Selection */}
                        <div className='relative'>
                            <label className="block text-gray-700 font-bold text-lg mb-3">Interview Mode</label>
                            <div className="relative">
                                <select
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                    className='w-full py-4 px-6 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 outline-none transition-all duration-300 text-lg font-medium text-gray-900 appearance-none'
                                >
                                    <option value="Technical">🛠️ Technical Interview</option>
                                    <option value="HR">👥 HR Interview</option>
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Resume Upload Section */}
                        {!analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                whileHover={{ scale: 1.01 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='border-[3px] border-dashed border-gray-300 rounded-3xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group shadow-lg hover:shadow-xl'
                            >
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />

                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-blue-200/50">
                                    <FaFileUpload className='text-blue-600 text-2xl' />
                                </div>

                                <p className='text-gray-900 font-bold text-lg mb-2'>
                                    {resumeFile ? resumeFile.name : "Upload Your Resume"}
                                </p>

                                <p className='text-gray-600 text-base mb-4'>
                                    {resumeFile ? "Click analyze to extract your information" : "PDF files only (Optional)"}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume()
                                        }}
                                        disabled={analyzing}
                                        className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
                                    >
                                        {analyzing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Analyzing Resume...
                                            </div>
                                        ) : (
                                            "Analyze Resume"
                                        )}
                                    </motion.button>
                                )}
                            </motion.div>
                        )}

                        {/* Resume Analysis Results */}
                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-[2rem] p-8 space-y-6 shadow-lg'
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                                        <FaStar className="text-white text-lg" />
                                    </div>
                                    <h3 className='text-xl font-bold text-green-800'>
                                        Resume Analysis Complete
                                    </h3>
                                </div>

                                {projects.length > 0 && (
                                    <div className="bg-white/80 rounded-2xl p-4">
                                        <p className='font-bold text-gray-800 mb-3 text-lg'>
                                            📁 Projects Found:
                                        </p>
                                        <ul className='space-y-2'>
                                            {projects.map((p, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-blue-500 mt-1">•</span>
                                                    <span className='text-gray-700 leading-relaxed'>{p}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div className="bg-white/80 rounded-2xl p-4">
                                        <p className='font-bold text-gray-800 mb-3 text-lg'>
                                            🛠️ Skills Detected:
                                        </p>
                                        <div className='flex flex-wrap gap-3'>
                                            {skills.map((s, i) => (
                                                <span key={i} className='bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-200/50 shadow-sm'>
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Start Interview Button */}
                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full disabled:bg-gray-400 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-5 rounded-3xl text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden group'
                        >
                            <span className="relative z-10">
                                {loading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Starting Interview...
                                    </div>
                                ) : (
                                    "🚀 Start Interview"
                                )}
                            </span>
                            {!loading && (
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Step1SetUp
