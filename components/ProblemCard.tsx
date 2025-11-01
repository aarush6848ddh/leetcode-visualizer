'use client';

import { motion } from 'framer-motion';
import { Check, Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Problem } from '@/types';
import { getDifficultyColor, getDifficultyBgColor, cn } from '@/lib/utils';

interface ProblemCardProps {
  problem: Problem;
  index: number;
}

export default function ProblemCard({ problem, index }: ProblemCardProps) {
  const isSolved = problem.status === 'solved';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.01, y: -4 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border transition-all duration-300',
        isSolved
          ? 'bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border-green-500/20 hover:border-green-500/30 glow-hover'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm'
      )}
    >
      <Link href={`/problems/${problem.id}`} className="block p-6">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Status & Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Status Checkbox */}
            <div className="flex-shrink-0">
              {isSolved ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30"
                >
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </motion.div>
              ) : (
                <div className="w-8 h-8 rounded-lg border-2 border-white/20 bg-white/5" />
              )}
            </div>

            {/* Problem Info */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors tracking-normal break-words">
                  {problem.title}
                </h3>
                {problem.leetcodeUrl && (
                  <ExternalLink className="w-4 h-4 text-gray-400/60 flex-shrink-0 group-hover:text-gray-300 transition-colors" />
                )}
              </div>
              
              <div className="flex items-center gap-2.5 flex-wrap">
                <span
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm',
                    getDifficultyBgColor(problem.difficulty),
                    getDifficultyColor(problem.difficulty)
                  )}
                >
                  {problem.difficulty}
                </span>
                {problem.topics.slice(0, 2).map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 rounded-lg text-xs text-gray-300/80 bg-white/5 border border-white/10 backdrop-blur-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Star */}
          <div className="flex-shrink-0">
            <Star
              className={cn(
                'w-5 h-5 transition-all duration-200',
                problem.starred
                  ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]'
                  : 'text-gray-400/60 group-hover:text-yellow-400/60 group-hover:scale-110'
              )}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
