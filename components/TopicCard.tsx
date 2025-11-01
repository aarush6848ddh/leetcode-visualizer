'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { Topic } from '@/types';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  topic: Topic;
  index: number;
}

export default function TopicCard({ topic, index }: TopicCardProps) {
  const solvedCount = topic.problems.filter(p => p.status === 'solved').length;
  const totalCount = topic.problems.length;
  const progress = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;
  const isComplete = totalCount > 0 && solvedCount === totalCount;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-white/[0.02] backdrop-blur-sm hover:from-white/10 hover:via-white/8 hover:to-white/5 hover:border-green-800/30 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-green-900/20"
    >
      <Link href={`/topics/${topic.id}`} className="block p-10 h-full flex flex-col items-center justify-center text-center">
        {isComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-600/40 mb-4"
          >
            <Check className="w-6 h-6 text-white" strokeWidth={3} />
          </motion.div>
        )}
        
        <div className="flex flex-col items-center gap-4 mb-6 w-full">
          <h3 className="text-3xl font-semibold text-white group-hover:text-green-400 transition-colors tracking-normal break-words">
            {topic.name}
          </h3>
          <p className="text-lg text-gray-400/80 font-normal break-words">
            {solvedCount}/{totalCount} problems solved
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-full shadow-inner shadow-green-600/30"
          />
        </div>
      </Link>
    </motion.div>
  );
}
