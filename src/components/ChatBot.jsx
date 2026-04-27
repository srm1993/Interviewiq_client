import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BsRobot, BsX } from 'react-icons/bs'
import { MdRefresh } from 'react-icons/md'

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: 'Hi there! I can answer both interview-related and unrelated questions. Ask away.' }])
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [chatError, setChatError] = useState('')

  const sendChat = async (event) => {
    event.preventDefault()
    setChatError('')

    const trimmedInput = chatInput.trim()
    if (!trimmedInput) return

    const userMessage = { role: 'user', text: trimmedInput }
    setChatMessages((prev) => [...prev, userMessage])
    setChatInput('')
    setIsChatLoading(true)

    try {
      const response = await fetch('/api/openrouter/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful assistant that can answer both interview-related and unrelated questions.' },
            ...chatMessages.map((msg) => ({ role: msg.role, content: msg.text })),
            { role: 'user', content: trimmedInput }
          ]
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      const newText = data?.message || 'Sorry, I could not generate a response at this time.'
      setChatMessages((prev) => [...prev, { role: 'assistant', text: newText }])
    } catch (err) {
      console.error('Chat error:', err)
      setChatMessages((prev) => [...prev, { role: 'assistant', text: 'Oops! Something went wrong. Please try again.' }])
      setChatError(err.message || 'Failed to fetch response')
    } finally {
      setIsChatLoading(false)
    }
  }

  const restartChat = () => {
    setChatMessages([{ role: 'assistant', text: 'Hi there! I can answer both interview-related and unrelated questions. Ask away.' }])
    setChatInput('')
    setChatError('')
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className='fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 z-40'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div
              key='close'
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <BsX size={28} />
            </motion.div>
          ) : (
            <motion.div
              key='open'
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <BsRobot size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className='fixed bottom-24 right-6 w-96 h-[500px] bg-slate-900/50 backdrop-blur-[28px] border border-slate-200/10 backdrop-saturate-150 rounded-[2rem] shadow-[0_16px_56px_rgba(0,0,0,0.65)] ring-1 ring-slate-100/20 flex flex-col z-40'
          >
            {/* Header */}
            <div className='bg-slate-900/35 text-white px-6 py-4 rounded-t-3xl flex items-center justify-between border-b border-slate-200/20 backdrop-blur-xl'>
              <div className='flex items-center gap-2'>
                <BsRobot size={20} />
                <h3 className='font-bold text-lg text-cyan-200'>AI Assistant</h3>
              </div>
              <motion.button
                onClick={restartChat}
                className='p-2 hover:bg-white/15 rounded-lg transition-all duration-200 text-white'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title='Restart conversation'
              >
                <MdRefresh size={18} />
              </motion.button>
            </div>

            {/* Chat Messages */}
            <div className='flex-1 overflow-y-auto p-4 bg-slate-900/40 backdrop-blur-[20px] space-y-3 border border-slate-200/15 rounded-b-2xl'>
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={`${msg.role}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-xl ${
                      msg.role === 'user'
                        ? 'bg-cyan-500/80 text-white rounded-br-none backdrop-blur-sm shadow-[0_8px_20px_rgba(56,189,248,0.4)] border border-cyan-300/30'
                        : 'bg-slate-850/35 text-slate-100 border border-slate-300/30 rounded-bl-none backdrop-blur-sm shadow-[0_8px_20px_rgba(15,23,42,0.4)]'
                    }`}
                  >
                    <p className='text-sm whitespace-pre-wrap'>{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {isChatLoading && (
                <div className='flex justify-start'>
                  <div className='bg-white text-gray-900 px-4 py-3 rounded-xl border border-gray-200 rounded-bl-none'>
                    <div className='flex gap-1'>
                      <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                      <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
                      <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {chatError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='px-4 py-2 bg-rose-900/70 border-t border-rose-500/50 text-white'
              >
                <p className='text-xs text-red-600'>{chatError}</p>
              </motion.div>
            )}

            {/* Input Form */}
            <form onSubmit={sendChat} className='border-t border-white/20 p-4 flex gap-2 bg-slate-900/30'>
              <input
                type='text'
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder='Type your question...'
                className='flex-1 rounded-lg border border-cyan-400/40 bg-slate-900/40 text-white placeholder-cyan-200/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-cyan-300/70 backdrop-blur-sm shadow-[inset_0_0_12px_rgba(0,0,0,0.35)]'
              />
              <motion.button
                type='submit'
                disabled={isChatLoading}
                className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 transition-all text-sm shadow-lg'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
