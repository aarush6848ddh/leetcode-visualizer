'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  solved: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ solved, total, className = '' }: ProgressBarProps) {
  const progress = total > 0 ? (solved / total) * 100 : 0;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400/80 font-light">Progress</span>
        <span className="text-sm font-semibold text-white tracking-normal">
          {solved}/{total}
        </span>
      </div>
      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 rounded-full shadow-lg shadow-green-500/30 relative overflow-hidden"
        >
          <motion.div
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              backgroundSize: '200% 100%',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
