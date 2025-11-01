'use client';

import { motion } from 'framer-motion';
import { topics, getAllProblems } from '@/data/problems';
import TopicCard from '@/components/TopicCard';
import ProblemCard from '@/components/ProblemCard';
import ProgressBar from '@/components/ProgressBar';
import RoadmapTree from '@/components/RoadmapTree';
import { useState, useMemo } from 'react';

export default function Home() {
  const allProblems = getAllProblems();
  const solvedCount = allProblems.filter(p => p.status === 'solved').length;
  const totalCount = allProblems.length;
  
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [view, setView] = useState<'roadmap' | 'topics' | 'problems'>('roadmap');

  const filteredProblems = useMemo(() => {
    if (!selectedTopic) return allProblems;
    return allProblems.filter(p => p.topics.includes(selectedTopic));
  }, [selectedTopic, allProblems]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-2xl font-semibold tracking-normal text-green-600 mb-0.5">
                LeetCode Journey
              </h1>
              <p className="text-sm text-white/80 font-normal">
                Documenting solutions with visualizations
              </p>
            </div>
            <nav className="flex items-center gap-6">
              <button
                onClick={() => setView('roadmap')}
                className={`font-medium text-sm transition-colors ${
                  view === 'roadmap'
                    ? 'bg-green-800 text-white px-3 py-1.5 rounded'
                    : 'text-white hover:text-green-600'
                }`}
              >
                Roadmap
              </button>
              <button
                onClick={() => setView('topics')}
                className={`font-medium text-sm transition-colors ${
                  view === 'topics'
                    ? 'bg-green-800 text-white px-3 py-1.5 rounded'
                    : 'text-white hover:text-green-600'
                }`}
              >
                Topics
              </button>
              <button
                onClick={() => setView('problems')}
                className={`font-medium text-sm transition-colors ${
                  view === 'problems'
                    ? 'bg-green-800 text-white px-3 py-1.5 rounded'
                    : 'text-white hover:text-green-600'
                }`}
              >
                Problems
              </button>
            </nav>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className={view === 'roadmap' ? '' : 'container mx-auto px-6 py-8'}>
        {/* Roadmap View */}
        {view === 'roadmap' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="h-[calc(100vh-80px)]"
          >
            <RoadmapTree topics={topics} />
          </motion.div>
        )}

        {/* Overall Progress for other views */}
        {view !== 'roadmap' && totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-semibold tracking-normal mb-3 gradient-text">Overall Progress</h2>
                <p className="text-gray-400/80 text-lg font-light">
                  {solvedCount} of {totalCount} problems solved
                </p>
              </div>
              <ProgressBar solved={solvedCount} total={totalCount} />
            </div>
          </motion.div>
        )}

            {/* Topics View */}
            {view === 'topics' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <h2 className="text-3xl font-semibold tracking-normal mb-8 gradient-text text-center">Topics</h2>
                {topics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
                    {topics.map((topic, index) => (
                      <TopicCard key={topic.id} topic={topic} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-gray-400 text-lg">
                      No topics available yet. Problems will be organized by topic.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Problems View */}
            {view === 'problems' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center justify-between mb-6 w-full max-w-4xl">
                  <h2 className="text-3xl font-semibold tracking-normal gradient-text text-center">
                    {selectedTopic ? `Problems: ${selectedTopic}` : 'All Problems'}
                  </h2>
                  {selectedTopic && (
                    <button
                      onClick={() => setSelectedTopic(null)}
                      className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
                {filteredProblems.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 max-w-5xl mx-auto w-full">
                    {filteredProblems.map((problem, index) => (
                      <ProblemCard key={problem.id} problem={problem} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-gray-400 text-lg">
                      {selectedTopic
                        ? 'No problems found for this topic.'
                        : 'No problems available yet. Add your solutions to get started!'}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
      </main>
    </div>
  );
}

