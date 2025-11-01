'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';

interface Step {
  description: string;
  data?: any;
  highlight?: number[];
  variables?: Record<string, any>;
}

interface AlgorithmVisualizerProps {
  steps: Step[];
  speed?: number;
  title?: string;
}

export default function AlgorithmVisualizer({
  steps,
  speed = 1000,
  title = 'Algorithm Execution',
}: AlgorithmVisualizerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isPlaying && !isComplete) {
      const timer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setIsPlaying(false);
          setIsComplete(true);
        }
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, steps.length, speed, isComplete]);

  const handlePlay = () => {
    if (isComplete) {
      reset();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setIsComplete(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsComplete(false);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="w-full rounded-xl border border-gray-800 bg-gray-900/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handlePlay}
            className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= steps.length - 1}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Next Step"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            className="h-full bg-green-500 rounded-full"
          />
        </div>
      </div>

      {/* Step Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <p className="text-gray-300 text-lg">{currentStepData.description}</p>
        </motion.div>
      </AnimatePresence>

      {/* Variables Display */}
      {currentStepData.variables && (
        <div className="mb-6 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Variables</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(currentStepData.variables).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{key}</div>
                <div className="text-lg font-mono font-bold text-green-400">
                  {String(value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visualization Area - This will be customized per problem */}
      {currentStepData.data && (
        <div className="mt-6 p-6 rounded-lg bg-gray-800/30 border border-gray-700 min-h-[200px]">
          <div className="text-gray-400 text-sm">
            Visualization area - Will display algorithm-specific animations
          </div>
          {/* Custom visualizations will be rendered here based on problem type */}
        </div>
      )}
    </div>
  );
}

