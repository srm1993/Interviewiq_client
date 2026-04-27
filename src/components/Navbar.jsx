import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';
function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = () => {
        setShowUserPopup(false)
        setShowCreditPopup(false)
        dispatch(setUserData(null))
        navigate("/")
        // Clear backend cookie and Firebase session in background
        axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true }).catch(() => { })
        signOut(auth).catch(() => { })
    }
    return (
        <div className='relative z-20 bg-gradient-to-br from-slate-50 to-blue-50 flex justify-center px-6 py-8'>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className='w-full max-w-7xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 px-8 py-6 flex justify-between items-center relative hover:shadow-2xl transition-all duration-300'>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className='flex items-center gap-4 cursor-pointer group'
                    onClick={() => navigate('/')}
                >
                    <div className='bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300'>
                        <BsRobot size={20} />
                    </div>
                    <h1 className='font-bold text-xl text-slate-800 hidden md:block group-hover:text-blue-600 transition-colors duration-300'>NextHire</h1>
                </motion.div>

                {/* Navigation Links */}
                <div className='hidden md:flex items-center gap-8'>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className='text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group'
                    >
                        Home
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/roadmap')}
                        className='text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group'
                    >
                        Roadmap
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/interview')}
                        className='text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group'
                    >
                        Interview
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/history')}
                        className='text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group'
                    >
                        History
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/pricing')}
                        className='text-slate-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group'
                    >
                        Pricing
                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300'></span>
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className='md:hidden flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl text-slate-700 shadow-md hover:shadow-lg border border-blue-200/50 transition-all duration-300'
                >
                    {showMobileMenu ? <HiX size={20} /> : <HiMenu size={20} />}
                </motion.button>

                <div className='flex items-center gap-6 relative'>
                    <motion.div className='relative'>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowCreditPopup(!showCreditPopup);
                                setShowUserPopup(false)
                            }}
                            className='flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 px-5 py-3 rounded-xl text-slate-700 font-medium shadow-md hover:shadow-lg border border-blue-200/50 transition-all duration-300 hover:border-blue-300'>
                            <BsCoin size={20} className='text-blue-600' />
                            <span className='text-lg font-semibold'>{userData?.credits || 0}</span>
                        </motion.button>

                        {showCreditPopup && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className='absolute right-0 mt-4 w-72 bg-white/95 backdrop-blur-sm shadow-2xl border border-slate-200/50 rounded-2xl p-6 z-50'
                            >
                                <p className='text-slate-600 mb-5 leading-relaxed'>Need more credits to continue your interview practice sessions?</p>
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowCreditPopup(false);
                                        navigate("/pricing");
                                    }}
                                    className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300'
                                >
                                    Buy more credits
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div className='relative'>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                if (!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowUserPopup(!showUserPopup);
                                setShowCreditPopup(false)
                            }}
                            className='w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300'
                        >
                            {userData ? userData?.name.slice(0, 1).toUpperCase() : <FaUserAstronaut size={18} />}
                        </motion.button>

                        {showUserPopup && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className='absolute right-0 mt-4 w-64 bg-white/95 backdrop-blur-sm shadow-2xl border border-slate-200/50 rounded-2xl p-5 z-50'
                            >
                                <p className='text-lg text-slate-800 font-semibold mb-2'>{userData?.name}</p>
                                <div className='border-t border-slate-200 my-3'></div>
                                <motion.button
                                    whileHover={{ x: 4 }}
                                    onClick={() => navigate("/history")}
                                    className='w-full text-left text-slate-600 hover:text-blue-600 py-3 px-2 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium flex items-center'
                                >
                                    Interview History
                                </motion.button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleLogout();
                                    }}
                                    className='w-full text-left text-red-500 hover:text-red-600 py-3 px-2 rounded-lg hover:bg-red-50 transition-all duration-300 font-medium flex items-center gap-2'
                                >
                                    <HiOutlineLogout size={18} />
                                    Log out
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className='md:hidden absolute top-full left-0 right-0 mt-4 mx-8 bg-white/95 backdrop-blur-sm shadow-2xl border border-slate-200/50 rounded-2xl p-6 z-50'
                    >
                        <div className='flex flex-col gap-4'>
                            <motion.button
                                whileHover={{ x: 4 }}
                                onClick={() => {
                                    navigate('/');
                                    setShowMobileMenu(false);
                                }}
                                className='text-left text-slate-700 hover:text-blue-600 py-3 px-2 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium'
                            >
                                Home
                            </motion.button>

                            <motion.button
                                whileHover={{ x: 4 }}
                                onClick={() => {
                                    navigate('/roadmap');
                                    setShowMobileMenu(false);
                                }}
                                className='text-left text-slate-700 hover:text-blue-600 py-3 px-2 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium'
                            >
                                Career Roadmap
                            </motion.button>

                            <motion.button
                                whileHover={{ x: 4 }}
                                onClick={() => {
                                    navigate('/interview');
                                    setShowMobileMenu(false);
                                }}
                                className='text-left text-slate-700 hover:text-blue-600 py-3 px-2 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium'
                            >
                                Start Interview
                            </motion.button>

                            <motion.button
                                whileHover={{ x: 4 }}
                                onClick={() => {
                                    navigate('/history');
                                    setShowMobileMenu(false);
                                }}
                                className='text-left text-slate-700 hover:text-blue-600 py-3 px-2 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium'
                            >
                                Interview History
                            </motion.button>

                            <motion.button
                                whileHover={{ x: 4 }}
                                onClick={() => {
                                    navigate('/pricing');
                                    setShowMobileMenu(false);
                                }}
                                className='text-left text-slate-700 hover:text-blue-600 py-3 px-2 rounded-lg hover:bg-blue-50 transition-all duration-300 font-medium'
                            >
                                Pricing
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}

        </div>
    )
}

export default Navbar
