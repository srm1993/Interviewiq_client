import React from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { ServerUrl } from '../App'
import { BsArrowRight } from 'react-icons/bs'

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");


  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];


  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      // Try known female voices first
      const femaleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female")
        );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      // Try known male voices
      const maleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male")
        );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      // Fallback: first voice (assume female)
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

  }, [])

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;


  /* ---------------- SPEAK FUNCTION ---------------- */
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      // Add natural pauses after commas and periods
      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      // Human-like pacing
      utterance.rate = 0.92;     // slightly slower than normal
      utterance.pitch = 1.05;    // small warmth
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic()
        videoRef.current?.play();
      };


      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);



        if (isMicOn) {
          startMic();
        }
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };


      setSubtitle(text);

      window.speechSynthesis.speak(utterance);
    });
  };


  useEffect(() => {
    if (!selectedVoice) {
      return;
    }
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );

        setIsIntroPhase(false)
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 800));

        // If last question (hard level)
        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.");
        }

        await speakText(currentQuestion.question);

        if (isMicOn) {
          startMic();
        }
      }

    }

    runIntro()


  }, [selectedVoice, isIntroPhase, currentIndex])



  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0;
        }
        return prev - 1

      })
    }, 1000);

    return () => clearInterval(timer)

  }, [isIntroPhase, currentIndex])

  useEffect(() => {
  if (!isIntroPhase && currentQuestion) {
    setTimeLeft(currentQuestion.timeLimit || 60);
  }
}, [currentIndex]);


  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;

  }, []);


  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
      } catch { }
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };
  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMicOn);
  };


  const submitAnswer = async () => {
    if (isSubmitting) return;
    stopMic()
    setIsSubmitting(true)

    try {
      const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken:
          currentQuestion.timeLimit - timeLeft,
      } , {withCredentials:true})

      setFeedback(result.data.feedback)
      speakText(result.data.feedback)
      setIsSubmitting(false)
    } catch (error) {
console.log(error)
setIsSubmitting(false)
    }
  }

  const handleNext =async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");

    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);

   
  }

  const finishInterview = async () => {
    stopMic()
    setIsMicOn(false)
    try {
      const result = await axios.post(ServerUrl+ "/api/interview/finish" , { interviewId} , {withCredentials:true})

      console.log(result.data)
      onFinish(result.data)
    } catch (error) {
      console.log(error)
    }
  }


   useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer()
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }

      window.speechSynthesis.cancel();
    };
  }, []);







  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className='w-full max-w-7xl min-h-[85vh] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 flex flex-col lg:flex-row overflow-hidden relative z-10'>

        {/* Video Section */}
        <div className='w-full lg:w-[35%] bg-gradient-to-br from-blue-50/50 to-indigo-50/50 flex flex-col items-center p-8 space-y-8 border-r border-gray-200/50'>
          {/* AI Avatar Video */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50'
          >
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Subtitle */}
          {subtitle && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className='w-full max-w-md bg-white/90 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-6 shadow-xl'
            >
              <p className='text-gray-800 text-base font-medium text-center leading-relaxed'>
                {subtitle}
              </p>
            </motion.div>
          )}

          {/* Status & Timer Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='w-full max-w-md bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-xl p-8 space-y-6'
          >
            {/* Status Indicator */}
            <div className='flex justify-between items-center'>
              <span className='text-sm font-semibold text-gray-600'>
                Interview Status
              </span>
              {isAIPlaying && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className='flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold'
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  AI Speaking
                </motion.div>
              )}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Timer */}
            <div className='flex justify-center'>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Progress Stats */}
            <div className='grid grid-cols-2 gap-6 text-center'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200/50'
              >
                <div className='text-3xl font-black text-blue-600 mb-1'>{currentIndex + 1}</div>
                <div className='text-xs font-semibold text-gray-600 uppercase tracking-wider'>Current</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className='bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-4 border border-gray-200/50'
              >
                <div className='text-3xl font-black text-gray-600 mb-1'>{questions.length}</div>
                <div className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Total</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Section */}
        <div className='flex-1 flex flex-col p-8 lg:p-12 relative'>
          {/* Header */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='mb-8'
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FaMicrophone className="text-white text-lg" />
              </div>
              <h2 className='text-2xl lg:text-3xl font-black text-gray-900'>
                AI Smart Interview
              </h2>
            </div>
            <p className="text-gray-600 text-lg">Answer naturally and confidently</p>
          </motion.div>

          {/* Question Card */}
          {!isIntroPhase && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300'
            >
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center'>
                  <span className='text-white font-bold text-sm'>Q</span>
                </div>
                <p className='text-sm font-bold text-blue-700 uppercase tracking-wider'>
                  Question {currentIndex + 1} of {questions.length}
                </p>
              </div>

              <div className='text-xl lg:text-2xl font-bold text-gray-900 leading-relaxed'>
                {currentQuestion?.question}
              </div>
            </motion.div>
          )}

          {/* Answer Input */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className='flex-1 mb-8'
          >
            <textarea
              placeholder="Type your answer here or use voice input..."
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="w-full h-full min-h-[200px] bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-3xl p-8 resize-none outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300 text-gray-900 text-lg leading-relaxed shadow-xl placeholder-gray-500"
            />
          </motion.div>

          {/* Action Buttons */}
          {!feedback ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className='flex items-center gap-6'
            >
              {/* Microphone Toggle */}
              <motion.button
                onClick={toggleMic}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-3xl shadow-2xl transition-all duration-300 ${
                  isMicOn
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/50'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
              >
                {isMicOn ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
              </motion.button>

              {/* Submit Button */}
              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 lg:py-6 rounded-3xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-bold text-lg lg:text-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group'
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing Answer...
                    </div>
                  ) : (
                    "Submit Answer"
                  )}
                </span>
                {!isSubmitting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                )}
              </motion.button>
            </motion.div>
          ) : (
            /* Feedback Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className='bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300/50 p-8 rounded-3xl shadow-2xl'
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <h3 className='text-xl font-bold text-green-800'>AI Feedback</h3>
              </div>

              <p className='text-green-700 font-medium text-lg leading-relaxed mb-8'>
                {feedback}
              </p>

              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 rounded-3xl shadow-xl hover:shadow-green-500/50 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 group'
              >
                {currentIndex + 1 >= questions.length ? "Finish Interview" : "Next Question"}
                <BsArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Step2Interview
