import { clsx } from 'clsx';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return clsx(inputs);
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'text-green-400';
    case 'Medium':
      return 'text-yellow-400';
    case 'Hard':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
}

export function getDifficultyBgColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500/10 border-green-500/20';
    case 'Medium':
      return 'bg-yellow-500/10 border-yellow-500/20';
    case 'Hard':
      return 'bg-red-500/10 border-red-500/20';
    default:
      return 'bg-gray-500/10 border-gray-500/20';
  }
}
