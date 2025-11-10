'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Code } from 'lucide-react';

interface HeroSectionProps {
  solvedCount: number;
  totalCount: number;
}

export default function HeroSection({ solvedCount, totalCount }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate icon
      if (iconRef.current) {
        gsap.from(iconRef.current, {
          opacity: 0,
          scale: 0.8,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        });

        // Floating animation
        gsap.to(iconRef.current, {
          y: -10,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      // Animate title
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
        });
      }

      // Animate description
      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.4,
          ease: 'power3.out',
        });
      }

      // Animate stats
      if (statsRef.current && statsRef.current.children.length > 0) {
        gsap.from(statsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const progressPercentage = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  return (
    <div 
      ref={heroRef}
      className="w-full flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center space-y-12">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative" ref={iconRef}>
            <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
            <Code className="relative w-24 h-24 sm:w-28 sm:h-28 text-green-400" />
          </div>
        </div>
        
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-6xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent leading-tight"
        >
          LeetCode Visualizer
        </h1>
        
        {/* Description */}
        <p 
          ref={descriptionRef}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed"
        >
          A comprehensive collection of all LeetCode problems I've solved, featuring interactive algorithm visualizations, 
          detailed explanations, and step-by-step solutions. Explore my journey through data structures and algorithms.
        </p>

        {/* Stats */}
        <div 
          ref={statsRef}
          className="flex flex-wrap items-center justify-center gap-6 w-full max-w-3xl mt-16"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 min-w-[160px] hover:bg-white/10 transition-colors">
            <div className="text-4xl font-bold text-green-400 mb-1">
              {solvedCount}
            </div>
            <div className="text-sm text-gray-400">Problems Solved</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 min-w-[160px] hover:bg-white/10 transition-colors">
            <div className="text-4xl font-bold text-emerald-400 mb-1">
              {totalCount}
            </div>
            <div className="text-sm text-gray-400">Total Problems</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 min-w-[160px] hover:bg-white/10 transition-colors">
            <div className="text-4xl font-bold text-teal-400 mb-1">
              {progressPercentage}%
            </div>
            <div className="text-sm text-gray-400">Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
}

