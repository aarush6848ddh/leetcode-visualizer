'use client';

import { motion } from 'framer-motion';
import { topics, getAllProblems } from '@/data/problems';
import TopicCard from '@/components/TopicCard';
import ProblemCard from '@/components/ProblemCard';
import ProgressBar from '@/components/ProgressBar';
import HeroSection from '@/components/HeroSection';
import { FloatingHeader } from '@/components/ui/floating-header';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const allProblems = getAllProblems();
  const solvedCount = allProblems.filter(p => p.status === 'solved').length;
  const totalCount = allProblems.length;
  const searchParams = useSearchParams();
  
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [view, setView] = useState<'hero' | 'topics' | 'problems'>(() => {
    const viewParam = searchParams.get('view');
    if (viewParam === 'topics' || viewParam === 'problems' || viewParam === 'hero') {
      return viewParam;
    }
    return 'hero';
  });

  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam === 'topics' || viewParam === 'problems' || viewParam === 'hero') {
      setView(viewParam);
    }
  }, [searchParams]);

  const filteredProblems = useMemo(() => {
    if (!selectedTopic) return allProblems;
    return allProblems.filter(p => p.topics.includes(selectedTopic));
  }, [selectedTopic, allProblems]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Navigation Header */}
      <div className="w-full flex justify-center px-4 pt-5">
        <FloatingHeader view={view} setView={setView} />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero View */}
        {view === 'hero' && (
          <HeroSection solvedCount={solvedCount} totalCount={totalCount} />
        )}

        {/* Topics View */}
        {view === 'topics' && (
          <>
            {totalCount > 0 && (
              <div className="w-full flex justify-center py-8 sm:py-12">
                <div className="w-full max-w-2xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="text-center mb-4 sm:mb-6 w-full">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Overall Progress
                      </h2>
                      <p className="text-gray-400 text-base sm:text-lg">
                        {solvedCount} of {totalCount} problems solved
                      </p>
                    </div>
                    <div className="w-full">
                      <ProgressBar solved={solvedCount} total={totalCount} />
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
            <div className="w-full flex justify-center pb-8 sm:pb-12">
              <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-center">
                    Topics
                  </h2>
                  
                  {topics.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                      {topics.map((topic, index) => (
                        <TopicCard key={topic.id} topic={topic} index={index} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-gray-400 text-lg">
                        No topics available yet.
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </>
        )}

        {/* Problems View */}
        {view === 'problems' && (
          <>
            {totalCount > 0 && (
              <div className="w-full flex justify-center py-8 sm:py-12">
                <div className="w-full max-w-2xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full flex flex-col items-center"
                  >
                    <div className="text-center mb-4 sm:mb-6 w-full">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Overall Progress
                      </h2>
                      <p className="text-gray-400 text-base sm:text-lg">
                        {solvedCount} of {totalCount} problems solved
                      </p>
                    </div>
                    <div className="w-full">
                      <ProgressBar solved={solvedCount} total={totalCount} />
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
            <div className="w-full flex justify-center pb-8 sm:pb-12">
              <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-full max-w-5xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 mb-6 relative">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-center">
                        {selectedTopic ? `Problems: ${selectedTopic}` : 'All Problems'}
                      </h2>
                      {selectedTopic && (
                        <button
                          onClick={() => setSelectedTopic(null)}
                          className="absolute right-0 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
                        >
                          Clear Filter
                        </button>
                      )}
                    </div>

                    {filteredProblems.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3">
                        {filteredProblems.map((problem, index) => (
                          <ProblemCard key={problem.id} problem={problem} index={index} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <p className="text-gray-400 text-lg">
                          {selectedTopic
                            ? 'No problems found for this topic.'
                            : 'No problems available yet.'}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
