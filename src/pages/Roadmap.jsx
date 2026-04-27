import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RoadmapCard from '../components/RoadmapCard';
import { ServerUrl } from '../App';

const Roadmap = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [roadmapSteps, setRoadmapSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRoadmap = async () => {
    if (!role || !level) {
      setError('Please select both role and level');
      return;
    }

    setIsLoading(true);
    setError('');
    setRoadmapSteps([]);

    try {
      const response = await axios.post(`${ServerUrl}/api/generate-roadmap`, {
        role,
        level,
        company: targetCompany || null
      });

      setRoadmapSteps(response.data.steps || []);
    } catch (err) {
      console.error('Error generating roadmap:', err);
      setError(
        err.response?.data?.message ||
        'Failed to generate roadmap. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800 text-white">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-cyan-200 bg-slate-800/70 border border-cyan-300/40 rounded-xl px-4 py-2 hover:bg-slate-700/70 hover:shadow-lg transition-all duration-300"
        >
          ← Back to Home
        </button>
      </div>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-slate-900/60 border border-slate-100/20 rounded-3xl shadow-2xl backdrop-blur-xl p-6 sm:p-10">        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
            AI Career Roadmap
          </h1>
          <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
            Get personalized career guidance powered by AI to help you reach your professional goals
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/80 border border-cyan-400/20 rounded-3xl shadow-xl p-8 sm:p-10 animate-fade-in hover:shadow-2xl transition-shadow duration-300">
          <div className="max-w-md mx-auto space-y-6">
            {/* Role Selection */}
            <div className="group">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                Select Your Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-slate-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 bg-slate-900 text-white hover:border-cyan-300 focus:outline-none"
              >
                <option value="">Choose a role...</option>
                <option value="frontend">Frontend Developer</option>
                <option value="backend">Backend Developer</option>
                <option value="ai">AI Engineer</option>
              </select>
            </div>

            {/* Level Selection */}
            <div className="group">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                Your Current Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 border border-slate-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 bg-slate-900 text-white hover:border-cyan-300 focus:outline-none"
              >
                <option value="">Choose your level...</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
              </select>
            </div>

            {/* Target Company Input */}
            <div className="group">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                Target Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g., Google, Meta, Netflix"
                className="w-full px-4 py-3 border border-slate-500/50 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 bg-slate-900 text-white placeholder-cyan-200/80 hover:border-cyan-300 focus:outline-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateRoadmap}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-cyan-400 hover:to-blue-500 transform hover:-translate-y-0.5 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_14px_30px_rgba(14,165,233,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating Roadmap...</span>
                </div>
              ) : (
                'Generate Roadmap'
              )}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* No Roadmap Message */}
        {!isLoading && roadmapSteps.length === 0 && !error && (
          <div className="mt-8 text-center animate-fade-in">
            <div className="bg-white rounded-2xl shadow-md p-8 max-w-md mx-auto hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Start Your Journey?</h3>
              <p className="text-gray-600 text-sm">
                Fill out the form above and click "Generate Roadmap" to get your personalized AI-powered career roadmap.
              </p>
            </div>
          </div>
        )}

        {/* Roadmap Cards */}
        <RoadmapCard roadmapSteps={roadmapSteps} />
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
