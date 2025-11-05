export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type ProblemStatus = 'solved' | 'unsolved';

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  topics: string[];
  status: ProblemStatus;
  leetcodeUrl?: string;
  videoUrl?: string;
  solution?: string;
  explanation?: string;
  code?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  starred?: boolean;
}

export interface Topic {
  id: string;
  name: string;
  problems: Problem[];
  prerequisites?: string[]; // IDs of prerequisite topics
}
