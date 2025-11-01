import { Problem, Topic } from '@/types';

// Helper function to create a problem with default values
const createProblem = (
  title: string,
  difficulty: 'Easy' | 'Medium' | 'Hard',
  topicName: string,
  leetcodeUrl?: string
): Problem => {
  const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return {
    id,
    title,
    difficulty,
    topics: [topicName],
    status: 'unsolved',
    leetcodeUrl: leetcodeUrl || `https://leetcode.com/problems/${id}/`,
    starred: false,
  };
};

// This will be populated with your actual problems and solutions
export const problems: Problem[] = [
  // Contains Duplicate is already solved
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    topics: ['Arrays & Hashing'],
    status: 'solved',
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    explanation: `This solution efficiently checks for duplicates by leveraging the properties of a Python set.

**How it works:**
1. We first store the length of the original array in a variable.
2. We convert the array to a set, which automatically removes any duplicate elements since sets can only contain unique values.
3. We compare the original length with the set's length. If the original length is greater, it means duplicates were removed, indicating duplicates exist in the original array.

**Why this works:**
Sets in Python only store unique elements. When we convert an array with duplicates to a set, Python automatically discards the duplicate values. By comparing lengths, we can detect if any duplicates were present:
- If length > len(set): duplicates exist → return True
- If length == len(set): all elements unique → return False

This approach is elegant because it lets Python's built-in data structure handle the duplicate detection automatically.`,
    code: `class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        length = len(nums)
        my_set = set(nums)
        if length > len(my_set):
            return True
        return False`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starred: false,
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    topics: ['Arrays & Hashing'],
    status: 'solved',
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    explanation: `This solution checks if two strings are anagrams by sorting and comparing them.

**How it works:**
1. Convert both strings s and t into lists of characters.
2. Sort both lists lexicographically (alphabetically). When calling the sort function on a string converted to a list, Python sorts the characters in lexicographic (dictionary) order.
3. Compare the sorted lists. If they are identical, the strings are anagrams.

**Why this works:**
Anagrams contain the exact same characters, just in different orders. When sorted lexicographically, both strings will produce the same sequence of characters. By comparing the sorted versions, we can determine if they contain the same characters:
- If sorted lists are equal: strings are anagrams → return True
- If sorted lists differ: strings are not anagrams → return False

This approach is straightforward and leverages Python's built-in sorting functionality, which automatically sorts characters in lexicographic order.`,
    code: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        s_list = sorted(list(s))
        t_list = sorted(list(t))
        if s_list == t_list:
            return True
        return False`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    starred: false,
  },
];

export const topics: Topic[] = [
  {
    id: 'arrays-hashing',
    name: 'Arrays & Hashing',
    problems: [
      {
        id: 'contains-duplicate',
        title: 'Contains Duplicate',
        difficulty: 'Easy',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
        explanation: `This solution efficiently checks for duplicates by leveraging the properties of a Python set.

**How it works:**
1. We first store the length of the original array in a variable.
2. We convert the array to a set, which automatically removes any duplicate elements since sets can only contain unique values.
3. We compare the original length with the set's length. If the original length is greater, it means duplicates were removed, indicating duplicates exist in the original array.

**Why this works:**
Sets in Python only store unique elements. When we convert an array with duplicates to a set, Python automatically discards the duplicate values. By comparing lengths, we can detect if any duplicates were present:
- If length > len(set): duplicates exist → return True
- If length == len(set): all elements unique → return False

This approach is elegant because it lets Python's built-in data structure handle the duplicate detection automatically.`,
        code: `class Solution:
    def hasDuplicate(self, nums: List[int]) -> bool:
        length = len(nums)
        my_set = set(nums)
        if length > len(my_set):
            return True
        return False`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        starred: false,
      },
      {
        id: 'valid-anagram',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
        explanation: `This solution checks if two strings are anagrams by sorting and comparing them.

**How it works:**
1. Convert both strings s and t into lists of characters.
2. Sort both lists lexicographically (alphabetically). When calling the sort function on a string converted to a list, Python sorts the characters in lexicographic (dictionary) order.
3. Compare the sorted lists. If they are identical, the strings are anagrams.

**Why this works:**
Anagrams contain the exact same characters, just in different orders. When sorted lexicographically, both strings will produce the same sequence of characters. By comparing the sorted versions, we can determine if they contain the same characters:
- If sorted lists are equal: strings are anagrams → return True
- If sorted lists differ: strings are not anagrams → return False

This approach is straightforward and leverages Python's built-in sorting functionality, which automatically sorts characters in lexicographic order.`,
        code: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        s_list = sorted(list(s))
        t_list = sorted(list(t))
        if s_list == t_list:
            return True
        return False`,
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        starred: false,
      },
      createProblem('Two Sum', 'Easy', 'Arrays & Hashing'),
      createProblem('Group Anagrams', 'Medium', 'Arrays & Hashing'),
      createProblem('Top K Frequent Elements', 'Medium', 'Arrays & Hashing'),
      createProblem('Encode and Decode Strings', 'Medium', 'Arrays & Hashing'),
      createProblem('Product of Array Except Self', 'Medium', 'Arrays & Hashing'),
      createProblem('Valid Sudoku', 'Medium', 'Arrays & Hashing'),
      createProblem('Longest Consecutive Sequence', 'Medium', 'Arrays & Hashing'),
    ],
    prerequisites: [],
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    problems: [
      createProblem('Valid Palindrome', 'Easy', 'Two Pointers'),
      createProblem('Two Sum II Input Array Is Sorted', 'Medium', 'Two Pointers'),
      createProblem('3Sum', 'Medium', 'Two Pointers'),
      createProblem('Container With Most Water', 'Medium', 'Two Pointers'),
      createProblem('Trapping Rain Water', 'Hard', 'Two Pointers'),
    ],
    prerequisites: ['arrays-hashing'],
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    problems: [
      createProblem('Best Time to Buy And Sell Stock', 'Easy', 'Sliding Window'),
      createProblem('Longest Substring Without Repeating Characters', 'Medium', 'Sliding Window'),
      createProblem('Longest Repeating Character Replacement', 'Medium', 'Sliding Window'),
      createProblem('Permutation In String', 'Medium', 'Sliding Window'),
      createProblem('Minimum Window Substring', 'Hard', 'Sliding Window'),
      createProblem('Sliding Window Maximum', 'Hard', 'Sliding Window'),
    ],
    prerequisites: ['arrays-hashing'],
  },
  {
    id: 'stack',
    name: 'Stack',
    problems: [
      createProblem('Valid Parentheses', 'Easy', 'Stack'),
      createProblem('Min Stack', 'Medium', 'Stack'),
      createProblem('Evaluate Reverse Polish Notation', 'Medium', 'Stack'),
      createProblem('Daily Temperatures', 'Medium', 'Stack'),
      createProblem('Car Fleet', 'Medium', 'Stack'),
      createProblem('Largest Rectangle In Histogram', 'Hard', 'Stack'),
    ],
    prerequisites: ['arrays-hashing'],
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    problems: [
      createProblem('Binary Search', 'Easy', 'Binary Search'),
      createProblem('Search a 2D Matrix', 'Medium', 'Binary Search'),
      createProblem('Koko Eating Bananas', 'Medium', 'Binary Search'),
      createProblem('Find Minimum In Rotated Sorted Array', 'Medium', 'Binary Search'),
      createProblem('Search In Rotated Sorted Array', 'Medium', 'Binary Search'),
      createProblem('Time Based Key Value Store', 'Medium', 'Binary Search'),
      createProblem('Median of Two Sorted Arrays', 'Hard', 'Binary Search'),
    ],
    prerequisites: ['two-pointers'],
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    problems: [
      createProblem('Reverse Linked List', 'Easy', 'Linked List'),
      createProblem('Merge Two Sorted Lists', 'Easy', 'Linked List'),
      createProblem('Linked List Cycle', 'Easy', 'Linked List'),
      createProblem('Reorder List', 'Medium', 'Linked List'),
      createProblem('Remove Nth Node From End of List', 'Medium', 'Linked List'),
      createProblem('Copy List With Random Pointer', 'Medium', 'Linked List'),
      createProblem('Add Two Numbers', 'Medium', 'Linked List'),
      createProblem('Find The Duplicate Number', 'Medium', 'Linked List'),
      createProblem('LRU Cache', 'Medium', 'Linked List'),
      createProblem('Merge K Sorted Lists', 'Hard', 'Linked List'),
      createProblem('Reverse Nodes In K Group', 'Hard', 'Linked List'),
    ],
    prerequisites: ['stack'],
  },
  {
    id: 'trees',
    name: 'Trees',
    problems: [
      createProblem('Invert Binary Tree', 'Easy', 'Trees'),
      createProblem('Maximum Depth of Binary Tree', 'Easy', 'Trees'),
      createProblem('Diameter of Binary Tree', 'Easy', 'Trees'),
      createProblem('Balanced Binary Tree', 'Easy', 'Trees'),
      createProblem('Same Tree', 'Easy', 'Trees'),
      createProblem('Subtree of Another Tree', 'Easy', 'Trees'),
      createProblem('Lowest Common Ancestor of a Binary Search Tree', 'Easy', 'Trees'),
      createProblem('Binary Tree Level Order Traversal', 'Medium', 'Trees'),
      createProblem('Binary Tree Right Side View', 'Medium', 'Trees'),
      createProblem('Count Good Nodes In Binary Tree', 'Medium', 'Trees'),
      createProblem('Validate Binary Search Tree', 'Medium', 'Trees'),
      createProblem('Kth Smallest Element In a Bst', 'Medium', 'Trees'),
      createProblem('Construct Binary Tree From Preorder And Inorder Traversal', 'Medium', 'Trees'),
      createProblem('Binary Tree Maximum Path Sum', 'Hard', 'Trees'),
      createProblem('Serialize And Deserialize Binary Tree', 'Hard', 'Trees'),
    ],
    prerequisites: ['binary-search', 'sliding-window', 'linked-list'],
  },
  {
    id: 'tries',
    name: 'Tries',
    problems: [
      createProblem('Implement Trie Prefix Tree', 'Medium', 'Tries'),
      createProblem('Design Add And Search Words Data Structure', 'Medium', 'Tries'),
      createProblem('Word Search II', 'Hard', 'Tries'),
    ],
    prerequisites: ['trees'],
  },
  {
    id: 'heap-priority-queue',
    name: 'Heap / Priority Queue',
    problems: [
      createProblem('Kth Largest Element In a Stream', 'Easy', 'Heap / Priority Queue'),
      createProblem('Last Stone Weight', 'Easy', 'Heap / Priority Queue'),
      createProblem('K Closest Points to Origin', 'Medium', 'Heap / Priority Queue'),
      createProblem('Kth Largest Element In An Array', 'Medium', 'Heap / Priority Queue'),
      createProblem('Task Scheduler', 'Medium', 'Heap / Priority Queue'),
      createProblem('Design Twitter', 'Medium', 'Heap / Priority Queue'),
      createProblem('Find Median From Data Stream', 'Hard', 'Heap / Priority Queue'),
    ],
    prerequisites: ['trees'],
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    problems: [
      createProblem('Subsets', 'Medium', 'Backtracking'),
      createProblem('Combination Sum', 'Medium', 'Backtracking'),
      createProblem('Combination Sum II', 'Medium', 'Backtracking'),
      createProblem('Permutations', 'Medium', 'Backtracking'),
      createProblem('Subsets II', 'Medium', 'Backtracking'),
      createProblem('Generate Parentheses', 'Medium', 'Backtracking'),
      createProblem('Word Search', 'Medium', 'Backtracking'),
      createProblem('Palindrome Partitioning', 'Medium', 'Backtracking'),
      createProblem('Letter Combinations of a Phone Number', 'Medium', 'Backtracking'),
      createProblem('N Queens', 'Hard', 'Backtracking'),
    ],
    prerequisites: ['trees'],
  },
  {
    id: 'graphs',
    name: 'Graphs',
    problems: [
      createProblem('Number of Islands', 'Medium', 'Graphs'),
      createProblem('Max Area of Island', 'Medium', 'Graphs'),
      createProblem('Clone Graph', 'Medium', 'Graphs'),
      createProblem('Walls And Gates', 'Medium', 'Graphs'),
      createProblem('Rotting Oranges', 'Medium', 'Graphs'),
      createProblem('Pacific Atlantic Water Flow', 'Medium', 'Graphs'),
      createProblem('Surrounded Regions', 'Medium', 'Graphs'),
      createProblem('Course Schedule', 'Medium', 'Graphs'),
      createProblem('Course Schedule II', 'Medium', 'Graphs'),
      createProblem('Graph Valid Tree', 'Medium', 'Graphs'),
      createProblem('Number of Connected Components In An Undirected Graph', 'Medium', 'Graphs'),
      createProblem('Redundant Connection', 'Medium', 'Graphs'),
      createProblem('Word Ladder', 'Hard', 'Graphs'),
    ],
    prerequisites: ['trees'],
  },
  {
    id: 'advanced-graphs',
    name: 'Advanced Graphs',
    problems: [
      createProblem('Network Delay Time', 'Medium', 'Advanced Graphs'),
      createProblem('Reconstruct Itinerary', 'Hard', 'Advanced Graphs'),
      createProblem('Min Cost to Connect All Points', 'Medium', 'Advanced Graphs'),
      createProblem('Swim In Rising Water', 'Hard', 'Advanced Graphs'),
      createProblem('Alien Dictionary', 'Hard', 'Advanced Graphs'),
      createProblem('Cheapest Flights Within K Stops', 'Medium', 'Advanced Graphs'),
    ],
    prerequisites: ['graphs'],
  },
  {
    id: '1d-dp',
    name: '1-D DP',
    problems: [
      createProblem('Climbing Stairs', 'Easy', '1-D DP'),
      createProblem('Min Cost Climbing Stairs', 'Easy', '1-D DP'),
      createProblem('House Robber', 'Medium', '1-D DP'),
      createProblem('House Robber II', 'Medium', '1-D DP'),
      createProblem('Longest Palindromic Substring', 'Medium', '1-D DP'),
      createProblem('Palindromic Substrings', 'Medium', '1-D DP'),
      createProblem('Decode Ways', 'Medium', '1-D DP'),
      createProblem('Coin Change', 'Medium', '1-D DP'),
      createProblem('Maximum Product Subarray', 'Medium', '1-D DP'),
      createProblem('Word Break', 'Medium', '1-D DP'),
      createProblem('Longest Increasing Subsequence', 'Medium', '1-D DP'),
      createProblem('Partition Equal Subset Sum', 'Medium', '1-D DP'),
    ],
    prerequisites: ['trees'],
  },
  {
    id: '2d-dp',
    name: '2-D DP',
    problems: [
      createProblem('Unique Paths', 'Medium', '2-D DP'),
      createProblem('Longest Common Subsequence', 'Medium', '2-D DP'),
      createProblem('Best Time to Buy And Sell Stock With Cooldown', 'Medium', '2-D DP'),
      createProblem('Coin Change II', 'Medium', '2-D DP'),
      createProblem('Target Sum', 'Medium', '2-D DP'),
      createProblem('Interleaving String', 'Medium', '2-D DP'),
      createProblem('Longest Increasing Path In a Matrix', 'Hard', '2-D DP'),
      createProblem('Distinct Subsequences', 'Hard', '2-D DP'),
      createProblem('Edit Distance', 'Medium', '2-D DP'),
      createProblem('Burst Balloons', 'Hard', '2-D DP'),
      createProblem('Regular Expression Matching', 'Hard', '2-D DP'),
    ],
    prerequisites: ['graphs', '1d-dp'],
  },
  {
    id: 'greedy',
    name: 'Greedy',
    problems: [
      createProblem('Maximum Subarray', 'Medium', 'Greedy'),
      createProblem('Jump Game', 'Medium', 'Greedy'),
      createProblem('Jump Game II', 'Medium', 'Greedy'),
      createProblem('Gas Station', 'Medium', 'Greedy'),
      createProblem('Hand of Straights', 'Medium', 'Greedy'),
      createProblem('Merge Triplets to Form Target Triplet', 'Medium', 'Greedy'),
      createProblem('Partition Labels', 'Medium', 'Greedy'),
      createProblem('Valid Parenthesis String', 'Medium', 'Greedy'),
    ],
    prerequisites: ['heap-priority-queue'],
  },
  {
    id: 'intervals',
    name: 'Intervals',
    problems: [
      createProblem('Insert Interval', 'Medium', 'Intervals'),
      createProblem('Merge Intervals', 'Medium', 'Intervals'),
      createProblem('Non Overlapping Intervals', 'Medium', 'Intervals'),
      createProblem('Meeting Rooms', 'Easy', 'Intervals'),
      createProblem('Meeting Rooms II', 'Medium', 'Intervals'),
      createProblem('Minimum Interval to Include Each Query', 'Hard', 'Intervals'),
    ],
    prerequisites: ['heap-priority-queue'],
  },
  {
    id: 'bit-manipulation',
    name: 'Bit Manipulation',
    problems: [
      createProblem('Single Number', 'Easy', 'Bit Manipulation'),
      createProblem('Number of 1 Bits', 'Easy', 'Bit Manipulation'),
      createProblem('Counting Bits', 'Easy', 'Bit Manipulation'),
      createProblem('Reverse Bits', 'Easy', 'Bit Manipulation'),
      createProblem('Missing Number', 'Easy', 'Bit Manipulation'),
      createProblem('Sum of Two Integers', 'Medium', 'Bit Manipulation'),
      createProblem('Reverse Integer', 'Medium', 'Bit Manipulation'),
    ],
    prerequisites: ['1d-dp'],
  },
  {
    id: 'math-geometry',
    name: 'Math & Geometry',
    problems: [
      createProblem('Rotate Image', 'Medium', 'Math & Geometry'),
      createProblem('Spiral Matrix', 'Medium', 'Math & Geometry'),
      createProblem('Set Matrix Zeroes', 'Medium', 'Math & Geometry'),
      createProblem('Happy Number', 'Easy', 'Math & Geometry'),
      createProblem('Plus One', 'Easy', 'Math & Geometry'),
      createProblem('Pow(x, n)', 'Medium', 'Math & Geometry'),
      createProblem('Multiply Strings', 'Medium', 'Math & Geometry'),
      createProblem('Detect Squares', 'Medium', 'Math & Geometry'),
    ],
    prerequisites: ['2d-dp', 'bit-manipulation'],
  },
];

export const getAllProblems = (): Problem[] => {
  return topics.flatMap(topic => topic.problems);
};

export const getProblemById = (id: string): Problem | undefined => {
  return getAllProblems().find(problem => problem.id === id);
};

export const getProblemsByTopic = (topicId: string): Problem[] => {
  const topic = topics.find(t => t.id === topicId);
  return topic?.problems || [];
};

export const getTopicById = (topicId: string): Topic | undefined => {
  return topics.find(t => t.id === topicId);
};
