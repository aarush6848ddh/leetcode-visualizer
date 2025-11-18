'use client';

import { use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ExternalLink, Code, BookOpen, Play } from 'lucide-react';
import { FloatingHeader } from '@/components/ui/floating-header';
import { getProblemById } from '@/data/problems';
import { getDifficultyColor, getDifficultyBgColor } from '@/lib/utils';
import AlgorithmVisualizer from '@/components/AlgorithmVisualizer';
import ContainsDuplicateVisualizer from '@/components/ContainsDuplicateVisualizer';
import AnagramSortVisualizer from '@/components/AnagramSortVisualizer';
import TwoSumVisualizer from '@/components/TwoSumVisualizer';
import GroupAnagramsVisualizer from '@/components/GroupAnagramsVisualizer';
import ValidPalindromeVisualizer from '@/components/ValidPalindromeVisualizer';
import TwoIntegerSumIIVisualizer from '@/components/TwoIntegerSumIIVisualizer';
import TopKFrequentVisualizer from '@/components/TopKFrequentVisualizer';
import ScoreOfStringVisualizer from '@/components/ScoreOfStringVisualizer';
import ConcatenationOfArrayVisualizer from '@/components/ConcatenationOfArrayVisualizer';
import EncodeDecodeStringsVisualizer from '@/components/EncodeDecodeStringsVisualizer';
import IsSubsequenceVisualizer from '@/components/IsSubsequenceVisualizer';
import ReplaceElementsVisualizer from '@/components/ReplaceElementsVisualizer';
import ProductOfArrayExceptSelfVisualizer from '@/components/ProductOfArrayExceptSelfVisualizer';

interface ProblemPageProps {
  params: Promise<{ id: string }>;
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const { id } = use(params);
  const problem = getProblemById(id);
  const router = useRouter();

  if (!problem) {
    notFound();
  }

  // Debug: Log problem data to verify explanation and videoUrl are present
  if (typeof window !== 'undefined' && problem.id === 'is-subsequence') {
    console.log('Problem data:', {
      hasExplanation: !!problem.explanation,
      hasVideoUrl: !!problem.videoUrl,
      explanationLength: problem.explanation?.length,
      videoUrl: problem.videoUrl
    });
  }

  const handleViewChange = (view: 'hero' | 'topics' | 'problems') => {
    router.push(`/?view=${view}`);
  };

  // Placeholder steps for visualization - will be customized per problem
  const visualizationSteps = [
    {
      description: 'Initialize variables',
      variables: { i: 0, result: 0 },
    },
    {
      description: 'Process first element',
      variables: { i: 1, result: 1 },
    },
    {
      description: 'Continue processing',
      variables: { i: 2, result: 2 },
    },
    {
      description: 'Algorithm complete',
      variables: { i: 3, result: 3 },
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Navigation Header */}
      <div className="w-full flex justify-center px-4 pt-5">
        <FloatingHeader view="problems" setView={handleViewChange} />
      </div>

      <main className="w-full flex justify-center py-6 sm:py-8">
        <div className="w-full max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            {/* Problem Header */}
            <div className="mb-6 sm:mb-8 w-full flex flex-col items-center">
              <div className="w-full max-w-7xl mx-auto">
                <div className="flex items-start justify-center gap-4 mb-4">
                  <div className="flex-1 flex flex-col items-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center">{problem.title}</h1>
                    <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium border ${getDifficultyBgColor(
                          problem.difficulty
                        )} ${getDifficultyColor(problem.difficulty)}`}
                      >
                        {problem.difficulty}
                      </span>
                      {problem.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm text-gray-300 bg-gray-800 border border-gray-700"
                        >
                          {topic}
                        </span>
                      ))}
                      {problem.leetcodeUrl && (
                        <a
                          href={problem.leetcodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">View on LeetCode</span>
                          <span className="sm:hidden">LeetCode</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8 flex flex-col items-center">
              {/* Explanation */}
              {problem.explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 sm:p-6 w-full max-w-full"
                >
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    <h2 className="text-xl sm:text-2xl font-bold">Explanation</h2>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-300 leading-relaxed space-y-4">
                      {problem.explanation.split('\n\n').map((paragraph, pIdx) => {
                        // Handle bold headings
                        if (paragraph.includes('**') && paragraph.split('\n').length === 1) {
                          const text = paragraph.replace(/\*\*/g, '');
                          return (
                            <p key={pIdx} className="font-semibold text-white text-lg">
                              {text}
                            </p>
                          );
                        }
                        
                        // Split into lines for this paragraph
                        const lines = paragraph.split('\n').filter(l => l.trim());
                        
                        return (
                          <div key={pIdx} className="space-y-2">
                            {lines.map((line, lIdx) => {
                              // Handle numbered list items
                              if (line.match(/^\d+\./)) {
                                return (
                                  <p key={lIdx} className="ml-4">
                                    {line}
                                  </p>
                                );
                              }
                              // Handle bullet points
                              if (line.trim().startsWith('-')) {
                                return (
                                  <p key={lIdx} className="ml-4">
                                    {line}
                                  </p>
                                );
                              }
                              // Regular line
                              return (
                                <p key={lIdx}>
                                  {line}
                                </p>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Solution Code */}
              {problem.code && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 sm:p-6 w-full max-w-full"
                >
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    <h2 className="text-xl sm:text-2xl font-bold">Solution</h2>
                  </div>
                  <pre className="overflow-x-auto">
                    <code className="text-xs sm:text-sm text-gray-300 font-mono">
                      {problem.code}
                    </code>
                  </pre>
                </motion.div>
              )}

              {/* Complexity and Status - Moved here but separate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-full">
                {/* Complexity */}
                {(problem.timeComplexity || problem.spaceComplexity) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 sm:p-6"
                  >
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Complexity</h3>
                    <div className="space-y-3">
                      {problem.timeComplexity && (
                        <div>
                          <div className="text-sm text-gray-400 mb-1">
                            Time Complexity
                          </div>
                          <div className="text-green-400 font-mono font-bold">
                            {problem.timeComplexity}
                          </div>
                        </div>
                      )}
                      {problem.spaceComplexity && (
                        <div>
                          <div className="text-sm text-gray-400 mb-1">
                            Space Complexity
                          </div>
                          <div className="text-green-400 font-mono font-bold">
                            {problem.spaceComplexity}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 sm:p-6"
                >
                  <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Status</h3>
                  <div className="flex items-center gap-2">
                    {problem.status === 'solved' ? (
                      <>
                        <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-green-400 font-medium">Solved</span>
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-600 rounded" />
                        <span className="text-gray-400">Not Solved</span>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Sidebar - Algorithm Visualization */}
            <div className="lg:col-span-7 flex flex-col items-center space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full -mx-4 sm:mx-0"
              >
                {problem.id === 'contains-duplicate' ? (
                  <ContainsDuplicateVisualizer />
                ) : problem.id === 'valid-anagram' ? (
                  <AnagramSortVisualizer />
                ) : problem.id === 'two-sum' ? (
                  <TwoSumVisualizer />
                ) : problem.id === 'group-anagrams' ? (
                  <GroupAnagramsVisualizer />
                ) : problem.id === 'valid-palindrome' ? (
                  <ValidPalindromeVisualizer />
                ) : problem.id === 'two-integer-sum-ii' ? (
                  <TwoIntegerSumIIVisualizer />
                ) : problem.id === 'top-k-frequent-elements' ? (
                  <TopKFrequentVisualizer />
                ) : problem.id === 'score-of-a-string' ? (
                  <ScoreOfStringVisualizer />
                ) : problem.id === 'concatenation-of-array' ? (
                  <ConcatenationOfArrayVisualizer />
                ) : problem.id === 'encode-and-decode-strings' ? (
                  <EncodeDecodeStringsVisualizer />
                ) : problem.id === 'is-subsequence' ? (
                  <IsSubsequenceVisualizer />
                ) : problem.id === 'replace-elements-with-greatest-element-on-right-side' ? (
                  <ReplaceElementsVisualizer />
                ) : problem.id === 'product-of-array-except-self' ? (
                  <ProductOfArrayExceptSelfVisualizer />
                ) : (
                  <AlgorithmVisualizer
                    steps={visualizationSteps}
                    title="Algorithm Execution"
                  />
                )}
              </motion.div>

              {/* Video */}
              {problem.videoUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl border border-gray-800 bg-gray-900/50 p-4 sm:p-6 lg:p-8 w-full -mx-4 sm:mx-0"
                >
                  <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Video Explanation</h2>
                  </div>
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                    <iframe
                      src={(() => {
                        const url = problem.videoUrl;
                        let videoId = '';
                        if (url.includes('youtube.com/watch?v=')) {
                          videoId = url.split('v=')[1]?.split('&')[0] || '';
                        } else if (url.includes('youtu.be/')) {
                          videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
                        } else if (url.includes('youtube.com/embed/')) {
                          videoId = url.split('embed/')[1]?.split('?')[0] || '';
                        }
                        return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&modestbranding=1&rel=0`;
                      })()}
                      title="Video Explanation"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                      frameBorder="0"
                      style={{ border: 'none' }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

