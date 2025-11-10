'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getTopicById } from '@/data/problems';
import ProblemCard from '@/components/ProblemCard';
import ProgressBar from '@/components/ProgressBar';

interface TopicPageProps {
  params: Promise<{ id: string }>;
}

export default function TopicPage({ params }: TopicPageProps) {
  const { id } = use(params);
  const topic = getTopicById(id);

  if (!topic) {
    notFound();
  }

  const solvedCount = topic.problems.filter(p => p.status === 'solved').length;
  const totalCount = topic.problems.length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-2 sm:mb-4 text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Back to Gallery
          </Link>
        </div>
      </header>

      <main className="w-full flex justify-center py-6 sm:py-8">
        <div className="w-full max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            {/* Topic Header */}
            <div className="mb-6 sm:mb-8 w-full flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center">{topic.name}</h1>
              {totalCount > 0 && (
                <div className="w-full max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm sm:text-base">
                      {solvedCount} of {totalCount} problems solved
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white">
                      ({Math.round((solvedCount / totalCount) * 100)}%)
                    </span>
                  </div>
                  <ProgressBar solved={solvedCount} total={totalCount} />
                </div>
              )}
            </div>

            {/* Problems List */}
            {topic.problems.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 w-full max-w-5xl mx-auto">
                {topic.problems.map((problem, index) => (
                  <ProblemCard key={problem.id} problem={problem} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">
                  No problems in this topic yet. Add problems to get started!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

