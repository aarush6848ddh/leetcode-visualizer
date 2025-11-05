(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/data/problems.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllProblems",
    ()=>getAllProblems,
    "getProblemById",
    ()=>getProblemById,
    "getProblemsByTopic",
    ()=>getProblemsByTopic,
    "getTopicById",
    ()=>getTopicById,
    "problems",
    ()=>problems,
    "topics",
    ()=>topics
]);
// Helper function to create a problem with default values
const createProblem = (title, difficulty, topicName, leetcodeUrl)=>{
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return {
        id,
        title,
        difficulty,
        topics: [
            topicName
        ],
        status: 'unsolved',
        leetcodeUrl: leetcodeUrl || `https://leetcode.com/problems/${id}/`,
        starred: false
    };
};
const problems = [
    // Contains Duplicate is already solved
    {
        id: 'contains-duplicate',
        title: 'Contains Duplicate',
        difficulty: 'Easy',
        topics: [
            'Arrays & Hashing'
        ],
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
        starred: false
    },
    {
        id: 'valid-anagram',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        topics: [
            'Arrays & Hashing'
        ],
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
        starred: false
    },
    {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        topics: [
            'Arrays & Hashing'
        ],
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
        starred: false
    },
    {
        id: 'group-anagrams',
        title: 'Group Anagrams',
        difficulty: 'Medium',
        topics: [
            'Arrays & Hashing'
        ],
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
        starred: false
    },
    {
        id: 'valid-palindrome',
        title: 'Valid Palindrome',
        difficulty: 'Easy',
        topics: [
            'Two Pointers'
        ],
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
        starred: false
    }
];
const topics = [
    {
        id: 'arrays-hashing',
        name: 'Arrays & Hashing',
        problems: [
            {
                id: 'contains-duplicate',
                title: 'Contains Duplicate',
                difficulty: 'Easy',
                topics: [
                    'Arrays & Hashing'
                ],
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
                starred: false
            },
            {
                id: 'valid-anagram',
                title: 'Valid Anagram',
                difficulty: 'Easy',
                topics: [
                    'Arrays & Hashing'
                ],
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
                starred: false
            },
            {
                id: 'two-sum',
                title: 'Two Sum',
                difficulty: 'Easy',
                topics: [
                    'Arrays & Hashing'
                ],
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
                starred: false
            },
            {
                id: 'group-anagrams',
                title: 'Group Anagrams',
                difficulty: 'Medium',
                topics: [
                    'Arrays & Hashing'
                ],
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
                starred: false
            },
            createProblem('Top K Frequent Elements', 'Medium', 'Arrays & Hashing'),
            createProblem('Encode and Decode Strings', 'Medium', 'Arrays & Hashing'),
            createProblem('Product of Array Except Self', 'Medium', 'Arrays & Hashing'),
            createProblem('Valid Sudoku', 'Medium', 'Arrays & Hashing'),
            createProblem('Longest Consecutive Sequence', 'Medium', 'Arrays & Hashing')
        ],
        prerequisites: []
    },
    {
        id: 'two-pointers',
        name: 'Two Pointers',
        problems: [
            {
                id: 'valid-palindrome',
                title: 'Valid Palindrome',
                difficulty: 'Easy',
                topics: [
                    'Two Pointers'
                ],
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
                starred: false
            },
            {
                id: 'two-integer-sum-ii',
                title: 'Two Integer Sum II',
                difficulty: 'Medium',
                topics: [
                    'Two Pointers'
                ],
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
                starred: false
            },
            createProblem('3Sum', 'Medium', 'Two Pointers'),
            createProblem('Container With Most Water', 'Medium', 'Two Pointers'),
            createProblem('Trapping Rain Water', 'Hard', 'Two Pointers')
        ],
        prerequisites: [
            'arrays-hashing'
        ]
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
            createProblem('Sliding Window Maximum', 'Hard', 'Sliding Window')
        ],
        prerequisites: [
            'arrays-hashing'
        ]
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
            createProblem('Largest Rectangle In Histogram', 'Hard', 'Stack')
        ],
        prerequisites: [
            'arrays-hashing'
        ]
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
            createProblem('Median of Two Sorted Arrays', 'Hard', 'Binary Search')
        ],
        prerequisites: [
            'two-pointers'
        ]
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
            createProblem('Reverse Nodes In K Group', 'Hard', 'Linked List')
        ],
        prerequisites: [
            'stack'
        ]
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
            createProblem('Serialize And Deserialize Binary Tree', 'Hard', 'Trees')
        ],
        prerequisites: [
            'binary-search',
            'sliding-window',
            'linked-list'
        ]
    },
    {
        id: 'tries',
        name: 'Tries',
        problems: [
            createProblem('Implement Trie Prefix Tree', 'Medium', 'Tries'),
            createProblem('Design Add And Search Words Data Structure', 'Medium', 'Tries'),
            createProblem('Word Search II', 'Hard', 'Tries')
        ],
        prerequisites: [
            'trees'
        ]
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
            createProblem('Find Median From Data Stream', 'Hard', 'Heap / Priority Queue')
        ],
        prerequisites: [
            'trees'
        ]
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
            createProblem('N Queens', 'Hard', 'Backtracking')
        ],
        prerequisites: [
            'trees'
        ]
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
            createProblem('Word Ladder', 'Hard', 'Graphs')
        ],
        prerequisites: [
            'trees'
        ]
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
            createProblem('Cheapest Flights Within K Stops', 'Medium', 'Advanced Graphs')
        ],
        prerequisites: [
            'graphs'
        ]
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
            createProblem('Partition Equal Subset Sum', 'Medium', '1-D DP')
        ],
        prerequisites: [
            'trees'
        ]
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
            createProblem('Regular Expression Matching', 'Hard', '2-D DP')
        ],
        prerequisites: [
            'graphs',
            '1d-dp'
        ]
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
            createProblem('Valid Parenthesis String', 'Medium', 'Greedy')
        ],
        prerequisites: [
            'heap-priority-queue'
        ]
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
            createProblem('Minimum Interval to Include Each Query', 'Hard', 'Intervals')
        ],
        prerequisites: [
            'heap-priority-queue'
        ]
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
            createProblem('Reverse Integer', 'Medium', 'Bit Manipulation')
        ],
        prerequisites: [
            '1d-dp'
        ]
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
            createProblem('Detect Squares', 'Medium', 'Math & Geometry')
        ],
        prerequisites: [
            '2d-dp',
            'bit-manipulation'
        ]
    }
];
const getAllProblems = ()=>{
    return topics.flatMap((topic)=>topic.problems);
};
const getProblemById = (id)=>{
    return getAllProblems().find((problem)=>problem.id === id);
};
const getProblemsByTopic = (topicId)=>{
    const topic = topics.find((t)=>t.id === topicId);
    return topic?.problems || [];
};
const getTopicById = (topicId)=>{
    return topics.find((t)=>t.id === topicId);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "getDifficultyBgColor",
    ()=>getDifficultyBgColor,
    "getDifficultyColor",
    ()=>getDifficultyColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs);
}
function getDifficultyColor(difficulty) {
    switch(difficulty){
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
function getDifficultyBgColor(difficulty) {
    switch(difficulty){
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ProblemCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProblemCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
function ProblemCard({ problem, index }) {
    const isSolved = problem.status === 'solved';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            delay: index * 0.03,
            duration: 0.4,
            ease: [
                0.16,
                1,
                0.3,
                1
            ]
        },
        whileHover: {
            scale: 1.01,
            y: -4
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('group relative overflow-hidden rounded-2xl border transition-all duration-300', isSolved ? 'bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border-green-500/20 hover:border-green-500/30 glow-hover' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm'),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: `/problems/${problem.id}`,
            className: "block p-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0",
                                children: isSolved ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        scale: 0
                                    },
                                    animate: {
                                        scale: 1
                                    },
                                    transition: {
                                        type: "spring",
                                        stiffness: 200
                                    },
                                    className: "w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-5 h-5 text-white",
                                        strokeWidth: 3
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProblemCard.tsx",
                                        lineNumber: 43,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/ProblemCard.tsx",
                                    lineNumber: 37,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-lg border-2 border-white/20 bg-white/5"
                                }, void 0, false, {
                                    fileName: "[project]/components/ProblemCard.tsx",
                                    lineNumber: 46,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ProblemCard.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2 flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold text-white group-hover:text-green-400 transition-colors tracking-normal break-words",
                                                children: problem.title
                                            }, void 0, false, {
                                                fileName: "[project]/components/ProblemCard.tsx",
                                                lineNumber: 53,
                                                columnNumber: 17
                                            }, this),
                                            problem.leetcodeUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                className: "w-4 h-4 text-gray-400/60 flex-shrink-0 group-hover:text-gray-300 transition-colors"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ProblemCard.tsx",
                                                lineNumber: 57,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ProblemCard.tsx",
                                        lineNumber: 52,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-3 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm', (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDifficultyBgColor"])(problem.difficulty), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDifficultyColor"])(problem.difficulty)),
                                                children: problem.difficulty
                                            }, void 0, false, {
                                                fileName: "[project]/components/ProblemCard.tsx",
                                                lineNumber: 62,
                                                columnNumber: 17
                                            }, this),
                                            problem.topics.slice(0, 2).map((topic)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-3 py-1 rounded-lg text-xs text-gray-300/80 bg-white/5 border border-white/10 backdrop-blur-sm",
                                                    children: topic
                                                }, topic, false, {
                                                    fileName: "[project]/components/ProblemCard.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ProblemCard.tsx",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ProblemCard.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ProblemCard.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-5 h-5 transition-all duration-200', problem.starred ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]' : 'text-gray-400/60 group-hover:text-yellow-400/60 group-hover:scale-110')
                        }, void 0, false, {
                            fileName: "[project]/components/ProblemCard.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ProblemCard.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ProblemCard.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ProblemCard.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ProblemCard.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = ProblemCard;
var _c;
__turbopack_context__.k.register(_c, "ProblemCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ProgressBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProgressBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
function ProgressBar({ solved, total, className = '' }) {
    const progress = total > 0 ? solved / total * 100 : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `w-full ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-400/80 font-light",
                        children: "Progress"
                    }, void 0, false, {
                        fileName: "[project]/components/ProgressBar.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold text-white tracking-normal",
                        children: [
                            solved,
                            "/",
                            total
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ProgressBar.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ProgressBar.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        width: 0
                    },
                    animate: {
                        width: `${progress}%`
                    },
                    transition: {
                        duration: 1,
                        ease: [
                            0.16,
                            1,
                            0.3,
                            1
                        ]
                    },
                    className: "h-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 rounded-full shadow-lg shadow-green-500/30 relative overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            backgroundPosition: [
                                '0% 50%',
                                '100% 50%',
                                '0% 50%'
                            ]
                        },
                        transition: {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear'
                        },
                        className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
                        style: {
                            backgroundSize: '200% 100%'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/ProgressBar.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ProgressBar.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ProgressBar.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ProgressBar.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = ProgressBar;
var _c;
__turbopack_context__.k.register(_c, "ProgressBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/topics/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopicPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$problems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/problems.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProblemCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ProblemCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProgressBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ProgressBar.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
function TopicPage({ params }) {
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const topic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$problems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTopicById"])(id);
    if (!topic) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const solvedCount = topic.problems.filter((p)=>p.status === 'solved').length;
    const totalCount = topic.problems.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-black text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-6 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/app/topics/[id]/page.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            "Back to Gallery"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/topics/[id]/page.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/topics/[id]/page.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/topics/[id]/page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "container mx-auto px-6 py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    className: "max-w-6xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-bold mb-4",
                                    children: topic.name
                                }, void 0, false, {
                                    fileName: "[project]/app/topics/[id]/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                totalCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "max-w-2xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-gray-400",
                                                    children: [
                                                        solvedCount,
                                                        " of ",
                                                        totalCount,
                                                        " problems solved"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/topics/[id]/page.tsx",
                                                    lineNumber: 54,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium text-white",
                                                    children: [
                                                        "(",
                                                        Math.round(solvedCount / totalCount * 100),
                                                        "%)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/topics/[id]/page.tsx",
                                                    lineNumber: 57,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/topics/[id]/page.tsx",
                                            lineNumber: 53,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProgressBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            solved: solvedCount,
                                            total: totalCount
                                        }, void 0, false, {
                                            fileName: "[project]/app/topics/[id]/page.tsx",
                                            lineNumber: 61,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/topics/[id]/page.tsx",
                                    lineNumber: 52,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/topics/[id]/page.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        topic.problems.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-3 max-w-5xl mx-auto",
                            children: topic.problems.map((problem, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProblemCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    problem: problem,
                                    index: index
                                }, problem.id, false, {
                                    fileName: "[project]/app/topics/[id]/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/topics/[id]/page.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-16",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400 text-lg",
                                children: "No problems in this topic yet. Add problems to get started!"
                            }, void 0, false, {
                                fileName: "[project]/app/topics/[id]/page.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/topics/[id]/page.tsx",
                            lineNumber: 74,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/topics/[id]/page.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/topics/[id]/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/topics/[id]/page.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = TopicPage;
var _c;
__turbopack_context__.k.register(_c, "TopicPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_5c89aab2._.js.map