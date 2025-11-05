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
    videoUrl: 'https://www.youtube.com/watch?v=e_gugWmMt6U',
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
    videoUrl: 'https://www.youtube.com/watch?v=N_yShHLVskk',
    explanation: `This solution checks if two strings are anagrams by first verifying their lengths, then sorting and comparing them.

**How it works:**
1. First, check if the lengths of strings s and t are equal. If they're not, they cannot be anagrams, so return False immediately.
2. If the lengths are equal, sort both strings and compare them directly. In Python, sorted() can be called directly on strings, which returns a sorted list of characters.
3. If the sorted strings are equal, the strings are anagrams → return True. Otherwise, return False.

**Why this works:**
Anagrams must have the same length and contain the exact same characters, just in different orders. By sorting both strings, we normalize their character order, allowing for a direct comparison:
- If lengths differ: cannot be anagrams → return False
- If sorted strings are equal: strings are anagrams → return True
- If sorted strings differ: strings are not anagrams → return False

The early length check is an optimization that avoids unnecessary sorting when the strings clearly cannot be anagrams.`,
    code: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        return sorted(s) == sorted(t)`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    starred: false,
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Arrays & Hashing'],
    status: 'solved',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    explanation: `This solution uses a hashmap (dictionary) to efficiently find two numbers that add up to the target.

**How it works:**
1. Initialize an empty hashmap to store numbers and their indices as we iterate through the array.
2. For each number at index i, calculate the difference (diff = target - n) needed to reach the target.
3. Check if this difference already exists in the hashmap. If it does, we've found our pair - return the stored index of the difference and the current index.
4. If the difference doesn't exist in the hashmap, store the current number and its index in the hashmap for future lookups.

**Why this works:**
By storing each number we've seen along with its index, we can check in constant time O(1) if its complement (the number needed to reach the target) has already been encountered. This eliminates the need for nested loops:
- Without hashmap: O(n²) time complexity (checking all pairs)
- With hashmap: O(n) time complexity (single pass through array)

The hashmap allows us to "remember" previous numbers and their positions, making it possible to find the solution in a single iteration through the array.`,
    code: `class Solution:
    def twoSum(self, nums, target):
        my_hashmap = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in my_hashmap:
                return [my_hashmap[diff], i]
            my_hashmap[n] = i`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starred: false,
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    topics: ['Arrays & Hashing'],
    status: 'solved',
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
    explanation: `This solution groups anagrams together using a hashmap with sorted character keys.

**How it works:**
1. Initialize an empty hashmap to store groups of anagrams.
2. For each string in the input array, sort its characters to create a canonical key. Anagrams will produce the same sorted key.
3. If the sorted key already exists in the hashmap, append the current string to that group.
4. If the sorted key doesn't exist, create a new entry in the hashmap with the sorted key as the key and a list containing the current string as the value.
5. Return all the groups (values) from the hashmap.

**Why this works:**
Anagrams contain the same characters in different orders. By sorting each string's characters, we create a unique identifier that all anagrams share. This allows us to group them efficiently:
- Same sorted key = anagrams → group together
- Different sorted key = not anagrams → separate groups

The hashmap enables O(1) lookup and insertion, making the grouping process efficient.`,
    code: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        my_hashmap = {}
        for i, s in enumerate(strs):
            s_sort = "".join(sorted(s))
            if s_sort in my_hashmap:
                my_hashmap[s_sort].append(s)
            else:
                my_hashmap[s_sort] = [s]
        
        return list(my_hashmap.values())`,
    timeComplexity: 'O(n * k log k)',
    spaceComplexity: 'O(n * k)',
    starred: false,
  },
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    topics: ['Two Pointers'],
    status: 'solved',
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
    explanation: `This solution checks if a string is a palindrome by filtering to alphanumeric characters, converting to lowercase, and comparing with its reversed version.

**How it works:**
1. Filter the string to keep only alphanumeric characters (letters and numbers), removing spaces, punctuation, and special characters.
2. Convert the filtered string to lowercase to ignore case differences.
3. Compare the lowercase string with its reversed version. If they are identical, the string is a palindrome.

**Why this works:**
A palindrome reads the same forwards and backwards, ignoring case and non-alphanumeric characters. By filtering and normalizing the string, we can directly compare it with its reverse:
- If string == reversed: palindrome → return True
- If string != reversed: not a palindrome → return False

This approach is straightforward and leverages Python's string manipulation capabilities.`,
    code: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        new_s = "".join([char for char in s if char.isalnum()])
        lower_s = new_s.lower()
        print(lower_s)
        if lower_s[::-1] == lower_s:
            return True
        return False`,
    timeComplexity: 'O(n)',
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
        videoUrl: 'https://www.youtube.com/watch?v=e_gugWmMt6U',
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
        videoUrl: 'https://www.youtube.com/watch?v=N_yShHLVskk',
        explanation: `This solution checks if two strings are anagrams by first verifying their lengths, then sorting and comparing them.

**How it works:**
1. First, check if the lengths of strings s and t are equal. If they're not, they cannot be anagrams, so return False immediately.
2. If the lengths are equal, sort both strings and compare them directly. In Python, sorted() can be called directly on strings, which returns a sorted list of characters.
3. If the sorted strings are equal, the strings are anagrams → return True. Otherwise, return False.

**Why this works:**
Anagrams must have the same length and contain the exact same characters, just in different orders. By sorting both strings, we normalize their character order, allowing for a direct comparison:
- If lengths differ: cannot be anagrams → return False
- If sorted strings are equal: strings are anagrams → return True
- If sorted strings differ: strings are not anagrams → return False

The early length check is an optimization that avoids unnecessary sorting when the strings clearly cannot be anagrams.`,
        code: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        return sorted(s) == sorted(t)`,
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        starred: false,
      },
      {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
        explanation: `This solution uses a hashmap (dictionary) to efficiently find two numbers that add up to the target.

**How it works:**
1. Initialize an empty hashmap to store numbers and their indices as we iterate through the array.
2. For each number at index i, calculate the difference (diff = target - n) needed to reach the target.
3. Check if this difference already exists in the hashmap. If it does, we've found our pair - return the stored index of the difference and the current index.
4. If the difference doesn't exist in the hashmap, store the current number and its index in the hashmap for future lookups.

**Why this works:**
By storing each number we've seen along with its index, we can check in constant time O(1) if its complement (the number needed to reach the target) has already been encountered. This eliminates the need for nested loops:
- Without hashmap: O(n²) time complexity (checking all pairs)
- With hashmap: O(n) time complexity (single pass through array)

The hashmap allows us to "remember" previous numbers and their positions, making it possible to find the solution in a single iteration through the array.`,
        code: `class Solution:
    def twoSum(self, nums, target):
        my_hashmap = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in my_hashmap:
                return [my_hashmap[diff], i]
            my_hashmap[n] = i`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        starred: false,
      },
      {
        id: 'group-anagrams',
        title: 'Group Anagrams',
        difficulty: 'Medium',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
        explanation: `This solution groups anagrams together using a hashmap with sorted character keys.

**How it works:**
1. Initialize an empty hashmap to store groups of anagrams.
2. For each string in the input array, sort its characters to create a canonical key. Anagrams will produce the same sorted key.
3. If the sorted key already exists in the hashmap, append the current string to that group.
4. If the sorted key doesn't exist, create a new entry in the hashmap with the sorted key as the key and a list containing the current string as the value.
5. Return all the groups (values) from the hashmap.

**Why this works:**
Anagrams contain the same characters in different orders. By sorting each string's characters, we create a unique identifier that all anagrams share. This allows us to group them efficiently:
- Same sorted key = anagrams → group together
- Different sorted key = not anagrams → separate groups

The hashmap enables O(1) lookup and insertion, making the grouping process efficient.`,
        code: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        my_hashmap = {}
        for i, s in enumerate(strs):
            s_sort = "".join(sorted(s))
            if s_sort in my_hashmap:
                my_hashmap[s_sort].append(s)
            else:
                my_hashmap[s_sort] = [s]
        
        return list(my_hashmap.values())`,
        timeComplexity: 'O(n * k log k)',
        spaceComplexity: 'O(n * k)',
        starred: false,
      },
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
      {
        id: 'valid-palindrome',
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        topics: ['Two Pointers'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
        explanation: `This solution checks if a string is a palindrome by filtering to alphanumeric characters, converting to lowercase, and comparing with its reversed version.

**How it works:**
1. Filter the string to keep only alphanumeric characters (letters and numbers), removing spaces, punctuation, and special characters.
2. Convert the filtered string to lowercase to ignore case differences.
3. Compare the lowercase string with its reversed version. If they are identical, the string is a palindrome.

**Why this works:**
A palindrome reads the same forwards and backwards, ignoring case and non-alphanumeric characters. By filtering and normalizing the string, we can directly compare it with its reverse:
- If string == reversed: palindrome → return True
- If string != reversed: not a palindrome → return False

This approach is straightforward and leverages Python's string manipulation capabilities.`,
        code: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        new_s = "".join([char for char in s if char.isalnum()])
        lower_s = new_s.lower()
        print(lower_s)
        if lower_s[::-1] == lower_s:
            return True
        return False`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        starred: false,
      },
      {
        id: 'two-integer-sum-ii',
        title: 'Two Integer Sum II',
        difficulty: 'Medium',
        topics: ['Two Pointers'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
        explanation: `This solution uses a hashmap (dictionary) to efficiently find two numbers that add up to the target in a sorted array.

**How it works:**
1. Initialize an empty hashmap to store numbers and their indices as we iterate through the array.
2. For each number at index i, calculate the difference (diff = target - n) needed to reach the target.
3. Check if this difference already exists in the hashmap. If it does, we've found our pair - return the stored index of the difference and the current index, both incremented by 1 for 1-indexing.
4. If the difference doesn't exist in the hashmap, store the current number and its index in the hashmap for future lookups.

**Why this works:**
By storing each number we've seen along with its index, we can check in constant time O(1) if its complement (the number needed to reach the target) has already been encountered. Since the array is sorted, we can efficiently find pairs:
- Without hashmap: O(n²) time complexity (checking all pairs)
- With hashmap: O(n) time complexity (single pass through array)

The solution returns 1-indexed positions as required by the problem.`,
        code: `class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        my_hashmap = {}
        for i, n in enumerate(numbers):
            diff = target - n
            if diff in my_hashmap:
                return [my_hashmap[diff] + 1, i + 1]
            my_hashmap[n] = i`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        starred: false,
      },
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
