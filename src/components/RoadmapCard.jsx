import React, { useState } from 'react';

const RoadmapCard = ({ roadmapSteps }) => {
  const [completedTopics, setCompletedTopics] = useState({});

  const handleTopicToggle = (stepIndex, topicIndex) => {
    const key = `${stepIndex}-${topicIndex}`;
    setCompletedTopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Calculate overall progress
  const calculateOverallProgress = () => {
    let totalTopics = 0;
    let completedCount = 0;

    roadmapSteps.forEach((step, stepIndex) => {
      if (step.topics && step.topics.length > 0) {
        totalTopics += step.topics.length;
        step.topics.forEach((_, topicIndex) => {
          const topicKey = `${stepIndex}-${topicIndex}`;
          if (completedTopics[topicKey]) {
            completedCount++;
          }
        });
      }
    });

    return { totalTopics, completedCount };
  };

  const { totalTopics, completedCount } = calculateOverallProgress();
  const progressPercentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  if (!roadmapSteps || roadmapSteps.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-6 text-center">
        Your Personalized Roadmap
      </h2>

      {/* Overall Progress Bar */}
      <div className="bg-slate-900/45 border border-slate-400/30 rounded-3xl shadow-lg backdrop-blur-xl p-6 mb-8 transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Overall Progress</h3>
          <span className="text-sm sm:text-base font-medium text-slate-200">
            {completedCount} of {totalTopics} topics completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-700">{progressPercentage}% Complete</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roadmapSteps.map((step, stepIndex) => (
          <div
            key={stepIndex}
            className="bg-slate-900/40 border border-slate-400/30 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6"
          >
            {/* Step Title */}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-200 mb-2">
                Step {stepIndex + 1}: {step.title}
              </h3>
              {step.description && (
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>

            {/* Topics List */}
            {step.topics && step.topics.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm sm:text-base font-medium text-cyan-200 mb-3">
                  Topics to Learn:
                </h4>
                {step.topics.map((topic, topicIndex) => {
                  const topicKey = `${stepIndex}-${topicIndex}`;
                  const isCompleted = completedTopics[topicKey];

                  return (
                    <div
                      key={topicIndex}
                      className="flex items-start space-x-3 p-3 rounded-xl border border-slate-300/10 bg-slate-900/40 hover:bg-slate-800/50 transition-all duration-200"
                    >
                      <input
                        type="checkbox"
                        id={`topic-${stepIndex}-${topicIndex}`}
                        checked={isCompleted || false}
                        onChange={() => handleTopicToggle(stepIndex, topicIndex)}
                        className="mt-1 h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-slate-500 rounded"
                      />
                      <label
                        htmlFor={`topic-${stepIndex}-${topicIndex}`}
                        className={`text-sm sm:text-base cursor-pointer flex-1 ${
                          isCompleted
                            ? 'line-through text-slate-400'
                            : 'text-slate-100'
                        }`}
                      >
                        {topic}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Progress Indicator */}
            {step.topics && step.topics.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-500/30">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-slate-300">Progress</span>
                  <span className="font-semibold text-white">
                    {Object.keys(completedTopics).filter(key =>
                      key.startsWith(`${stepIndex}-`) && completedTopics[key]
                    ).length} / {step.topics.length}
                  </span>
                </div>
                <div className="mt-2 bg-slate-700/40 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(Object.keys(completedTopics).filter(key =>
                        key.startsWith(`${stepIndex}-`) && completedTopics[key]
                      ).length / step.topics.length) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapCard;
