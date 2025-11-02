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
            createProblem('Group Anagrams', 'Medium', 'Arrays & Hashing'),
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
            createProblem('Valid Palindrome', 'Easy', 'Two Pointers'),
            createProblem('Two Sum II Input Array Is Sorted', 'Medium', 'Two Pointers'),
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
"[project]/components/AlgorithmVisualizer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AlgorithmVisualizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skip$2d$forward$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SkipForward$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/skip-forward.js [app-client] (ecmascript) <export default as SkipForward>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function AlgorithmVisualizer({ steps, speed = 1000, title = 'Algorithm Execution' }) {
    _s();
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isComplete, setIsComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AlgorithmVisualizer.useEffect": ()=>{
            if (isPlaying && !isComplete) {
                const timer = setTimeout({
                    "AlgorithmVisualizer.useEffect.timer": ()=>{
                        if (currentStep < steps.length - 1) {
                            setCurrentStep({
                                "AlgorithmVisualizer.useEffect.timer": (prev)=>prev + 1
                            }["AlgorithmVisualizer.useEffect.timer"]);
                        } else {
                            setIsPlaying(false);
                            setIsComplete(true);
                        }
                    }
                }["AlgorithmVisualizer.useEffect.timer"], speed);
                return ({
                    "AlgorithmVisualizer.useEffect": ()=>clearTimeout(timer)
                })["AlgorithmVisualizer.useEffect"];
            }
        }
    }["AlgorithmVisualizer.useEffect"], [
        isPlaying,
        currentStep,
        steps.length,
        speed,
        isComplete
    ]);
    const handlePlay = ()=>{
        if (isComplete) {
            reset();
        }
        setIsPlaying(!isPlaying);
    };
    const handleNext = ()=>{
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev)=>prev + 1);
            setIsComplete(false);
        }
    };
    const reset = ()=>{
        setCurrentStep(0);
        setIsPlaying(false);
        setIsComplete(false);
    };
    const currentStepData = steps[currentStep];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full rounded-xl border border-gray-800 bg-gray-900/50 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-semibold text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/AlgorithmVisualizer.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: reset,
                                className: "p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors",
                                title: "Reset",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handlePlay,
                                className: "p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors",
                                title: isPlaying ? 'Pause' : 'Play',
                                children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleNext,
                                disabled: currentStep >= steps.length - 1,
                                className: "p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                title: "Next Step",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$skip$2d$forward$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SkipForward$3e$__["SkipForward"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AlgorithmVisualizer.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AlgorithmVisualizer.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-sm text-gray-400 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "Step ",
                                    currentStep + 1,
                                    " of ",
                                    steps.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    Math.round((currentStep + 1) / steps.length * 100),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AlgorithmVisualizer.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-1 bg-gray-800 rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                width: 0
                            },
                            animate: {
                                width: `${(currentStep + 1) / steps.length * 100}%`
                            },
                            className: "h-full bg-green-500 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/components/AlgorithmVisualizer.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/AlgorithmVisualizer.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AlgorithmVisualizer.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 10
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -10
                    },
                    transition: {
                        duration: 0.3
                    },
                    className: "mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-300 text-lg",
                        children: currentStepData.description
                    }, void 0, false, {
                        fileName: "[project]/components/AlgorithmVisualizer.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this)
                }, currentStep, false, {
                    fileName: "[project]/components/AlgorithmVisualizer.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AlgorithmVisualizer.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            currentStepData.variables && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 p-4 rounded-lg bg-gray-800/50 border border-gray-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-sm font-semibold text-gray-400 mb-3",
                        children: "Variables"
                    }, void 0, false, {
                        fileName: "[project]/components/AlgorithmVisualizer.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-4 gap-3",
                        children: Object.entries(currentStepData.variables).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-500 mb-1",
                                        children: key
                                    }, void 0, false, {
                                        fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-mono font-bold text-green-400",
                                        children: String(value)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                        lineNumber: 137,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/components/AlgorithmVisualizer.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/AlgorithmVisualizer.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AlgorithmVisualizer.tsx",
                lineNumber: 131,
                columnNumber: 9
            }, this),
            currentStepData.data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 p-6 rounded-lg bg-gray-800/30 border border-gray-700 min-h-[200px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-gray-400 text-sm",
                    children: "Visualization area - Will display algorithm-specific animations"
                }, void 0, false, {
                    fileName: "[project]/components/AlgorithmVisualizer.tsx",
                    lineNumber: 149,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AlgorithmVisualizer.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AlgorithmVisualizer.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(AlgorithmVisualizer, "i2R1Ajfn1B4M+8tJutjwWTvqtCg=");
_c = AlgorithmVisualizer;
var _c;
__turbopack_context__.k.register(_c, "AlgorithmVisualizer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ContainsDuplicateVisualizer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContainsDuplicateVisualizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$LayoutGroup$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/LayoutGroup/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const Button = ({ children, onClick, disabled, variant = "default" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: `px-4 py-2 rounded-lg text-sm font-medium transition border
      ${variant === "default" ? "bg-white/10 border-white/10 text-white hover:bg-white/15 disabled:opacity-50" : variant === "accent" ? "bg-emerald-500/90 border-emerald-400/20 text-white hover:bg-emerald-500" : "bg-transparent border-white/10 text-white hover:bg-white/10"}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
        lineNumber: 7,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = Button;
const Chip = ({ id, value, active, duplicate, inSet, unprocessed, current })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        layoutId: `chip-${id}`,
        className: `rounded-full px-12 py-4 text-base font-bold tracking-wide shadow-lg min-w-[60px] flex items-center justify-center
      ${duplicate ? "bg-purple-600 shadow-purple-600/50" : inSet ? "bg-emerald-600 shadow-emerald-600/50" : unprocessed ? "bg-blue-600 shadow-blue-600/50" : current ? "bg-indigo-600 shadow-indigo-600/50" : "bg-emerald-600 shadow-emerald-600/50"}
      text-white`,
        initial: {
            opacity: 0,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            scale: active ? 1.05 : 1
        },
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 28
        },
        children: value
    }, void 0, false, {
        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = Chip;
function useInterval(cb, delay) {
    _s();
    const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(cb);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInterval.useEffect": ()=>{
            saved.current = cb;
        }
    }["useInterval.useEffect"], [
        cb
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInterval.useEffect": ()=>{
            if (delay == null) return;
            const t = setInterval({
                "useInterval.useEffect.t": ()=>saved.current()
            }["useInterval.useEffect.t"], delay);
            return ({
                "useInterval.useEffect": ()=>clearInterval(t)
            })["useInterval.useEffect"];
        }
    }["useInterval.useEffect"], [
        delay
    ]);
}
_s(useInterval, "LZ8WGMrg0U579+atvxqXb8kViZ0=");
function ContainsDuplicateVisualizer() {
    _s1();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("[1,2,3,1,2,4,5,3]");
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ContainsDuplicateVisualizer.useMemo[parsed]": ()=>{
            try {
                const v = JSON.parse(input);
                return Array.isArray(v) ? v : [];
            } catch  {
                return [];
            }
        }
    }["ContainsDuplicateVisualizer.useMemo[parsed]"], [
        input
    ]);
    // simulation state
    const [i, setI] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [seen, setSeen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]); // set contents (unique)
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const speed = 800; // Fixed animation speed
    const AUTO_LOOP = true;
    const reset = ()=>{
        setI(0);
        setSeen([]);
        setResult(null);
    };
    // step: convert array to set - duplicates are automatically discarded
    const step = ()=>{
        if (result !== null) return; // finished
        if (i >= parsed.length) {
            // Finished processing - compare lengths
            setResult(seen.length < parsed.length);
            return;
        }
        const val = parsed[i];
        // Add to set only if not already present (set automatically discards duplicates)
        if (!seen.includes(val)) {
            setSeen((s)=>[
                    ...s,
                    val
                ]);
        }
        // Move to next element
        setI((k)=>k + 1);
    };
    useInterval({
        "ContainsDuplicateVisualizer.useInterval": ()=>step()
    }["ContainsDuplicateVisualizer.useInterval"], result === null ? speed : null);
    // auto-loop after a short pause
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContainsDuplicateVisualizer.useEffect": ()=>{
            if (result === null || !AUTO_LOOP) return;
            const t = setTimeout({
                "ContainsDuplicateVisualizer.useEffect.t": ()=>reset()
            }["ContainsDuplicateVisualizer.useEffect.t"], 1500);
            return ({
                "ContainsDuplicateVisualizer.useEffect": ()=>clearTimeout(t)
            })["ContainsDuplicateVisualizer.useEffect"];
        }
    }["ContainsDuplicateVisualizer.useEffect"], [
        result
    ]);
    const arrayItems = parsed.map((v, idx)=>({
            id: `arr-${idx}`,
            v,
            idx
        }));
    const setItems = seen.map((v, idx)=>({
            id: `set-${idx}-${v}`,
            v,
            idx
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full bg-[#0c0f14] text-white rounded-xl border border-gray-800 p-8 shadow-xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl font-bold mb-2",
                        children: "Contains Duplicate — Visualizer"
                    }, void 0, false, {
                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white/70 text-sm",
                        children: "Algorithm: compare len(nums) to len(set(nums)) conceptually; here we simulate the set-building."
                    }, void 0, false, {
                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8 flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "text-sm text-white/70 font-medium",
                        children: "Input:"
                    }, void 0, false, {
                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "flex-1 rounded-lg bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 font-mono",
                        value: input,
                        onChange: (e)=>{
                            setInput(e.target.value);
                            reset();
                        },
                        onKeyPress: (e)=>{
                            if (e.key === 'Enter') reset();
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$LayoutGroup$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayoutGroup"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm uppercase tracking-widest text-white/80 font-semibold",
                                        children: "ARRAY"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/70 text-sm font-mono",
                                        children: [
                                            "i = ",
                                            Math.min(i, parsed.length)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3 items-center min-h-[60px]",
                                children: arrayItems.map(({ id, v, idx })=>{
                                    const active = result === null && idx === i;
                                    const alreadyProcessed = idx < i;
                                    const alreadyInSet = seen.includes(v);
                                    const unprocessed = idx > i;
                                    // Color logic based on conversion process:
                                    // - Green: Element was processed and added to set (unique element)
                                    // - Purple: Element is a duplicate (already in set when we try to add it)
                                    // - Blue: Not yet processed
                                    // - Indigo: Currently being processed (checking if it's in set)
                                    let chipState = 'unprocessed';
                                    if (alreadyProcessed && alreadyInSet) {
                                        // Check if this was the first occurrence (green) or duplicate (purple)
                                        const firstOccurrence = parsed.indexOf(v) === idx;
                                        chipState = firstOccurrence ? 'inSet' : 'duplicate';
                                    } else if (active) {
                                        chipState = alreadyInSet ? 'duplicate' : 'current';
                                    }
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        layout: true,
                                        className: "relative",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                            id: id,
                                            value: v,
                                            active: active,
                                            duplicate: chipState === 'duplicate',
                                            inSet: chipState === 'inSet',
                                            unprocessed: chipState === 'unprocessed',
                                            current: chipState === 'current'
                                        }, void 0, false, {
                                            fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                            lineNumber: 165,
                                            columnNumber: 19
                                        }, this)
                                    }, id, false, {
                                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center my-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: -6
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "text-white/60 text-lg",
                            children: "▼"
                        }, void 0, false, {
                            fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm uppercase tracking-widest text-emerald-300 font-semibold",
                                        children: "SET"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white/70 text-sm font-mono",
                                        children: [
                                            "size = ",
                                            seen.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                        lineNumber: 195,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border-2 border-emerald-400/30 bg-emerald-500/5 p-6 min-h-[100px] flex flex-wrap gap-3 items-center",
                                children: setItems.length > 0 ? setItems.map(({ id, v })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                                        id: id,
                                        value: v,
                                        active: false,
                                        duplicate: false,
                                        inSet: true
                                    }, id, false, {
                                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                        lineNumber: 200,
                                        columnNumber: 17
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white/30 text-sm italic",
                                    children: "Empty set - unique elements will appear here"
                                }, void 0, false, {
                                    fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: result !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        y: 20,
                        opacity: 0
                    },
                    animate: {
                        y: 0,
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: `mt-6 rounded-xl border-2 p-4 text-center text-base font-semibold ${result ? "bg-rose-500/10 border-rose-400/30 text-rose-200" : "bg-emerald-500/10 border-emerald-400/30 text-emerald-200"}`,
                    children: result ? "Set size (" + seen.length + ") < Array size (" + parsed.length + ") → duplicates existed → True" : "Set size (" + seen.length + ") = Array size (" + parsed.length + ") → all unique → False"
                }, void 0, false, {
                    fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                    lineNumber: 212,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 pt-6 border-t border-white/10 space-y-2 text-sm text-white/60 leading-relaxed",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-white/80",
                                children: "Visualization logic"
                            }, void 0, false, {
                                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            " mirrors the Python set approach: iterate through the entire array from left to right, adding unique elements to the Set (duplicates are automatically discarded). After processing all elements, compare the set size to the array size. If set size < array size, duplicates existed."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-white/80",
                                children: "Tip:"
                            }, void 0, false, {
                                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            " try inputs like ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                className: "bg-white/10 px-1.5 py-0.5 rounded font-mono",
                                children: "[1,2,3,4]"
                            }, void 0, false, {
                                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                lineNumber: 235,
                                columnNumber: 85
                            }, this),
                            " (all unique) or ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                className: "bg-white/10 px-1.5 py-0.5 rounded font-mono",
                                children: "[9,9,9]"
                            }, void 0, false, {
                                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                                lineNumber: 235,
                                columnNumber: 180
                            }, this),
                            " (all duplicates) to see different outcomes."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ContainsDuplicateVisualizer.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_s1(ContainsDuplicateVisualizer, "g3eDQbgJO4X5XqeO4Sdyxs2ZaPg=", false, function() {
    return [
        useInterval
    ];
});
_c2 = ContainsDuplicateVisualizer;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Button");
__turbopack_context__.k.register(_c1, "Chip");
__turbopack_context__.k.register(_c2, "ContainsDuplicateVisualizer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AnagramSortVisualizer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnagramSortVisualizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$LayoutGroup$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/LayoutGroup/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
/** VISUAL IDEA
 * 1) Raw strings -> list(list(s)), list(list(t))
 * 2) Animated sort of both lists
 * 3) Compare arrays -> banner TRUE / FALSE
 */ const Button = ({ children, onClick, disabled, variant = "default" })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled,
        className: `px-3 py-1.5 rounded-lg text-sm font-medium transition border
      ${variant === "accent" ? "bg-indigo-500/90 border-indigo-400/20 text-white hover:bg-indigo-500" : variant === "ghost" ? "bg-transparent border-white/10 text-white hover:bg-white/10" : "bg-white/10 border-white/10 text-white hover:bg-white/15 disabled:opacity-50"}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/AnagramSortVisualizer.tsx",
        lineNumber: 13,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = Button;
function useInterval(cb, delay) {
    _s();
    const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(cb);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInterval.useEffect": ()=>void (saved.current = cb)
    }["useInterval.useEffect"], [
        cb
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInterval.useEffect": ()=>{
            if (delay == null) return;
            const id = setInterval({
                "useInterval.useEffect.id": ()=>saved.current()
            }["useInterval.useEffect.id"], delay);
            return ({
                "useInterval.useEffect": ()=>clearInterval(id)
            })["useInterval.useEffect"];
        }
    }["useInterval.useEffect"], [
        delay
    ]);
}
_s(useInterval, "LZ8WGMrg0U579+atvxqXb8kViZ0=");
const Chip = ({ id, ch, active })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        layout: true,
        layoutId: id,
        className: `rounded-md px-4 py-2 text-sm font-semibold shadow min-w-[48px] flex items-center justify-center
                ${active ? "bg-amber-500" : "bg-slate-700"} text-white`,
        initial: {
            opacity: 0,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            scale: active ? 1.06 : 1
        },
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 30
        },
        children: ch
    }, void 0, false, {
        fileName: "[project]/components/AnagramSortVisualizer.tsx",
        lineNumber: 40,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = Chip;
function AnagramSortVisualizer() {
    _s1();
    // inputs
    const [s, setS] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("racecar");
    const [t, setT] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("carrace");
    const [speed, setSpeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(800);
    // derived
    const sChars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnagramSortVisualizer.useMemo[sChars]": ()=>s.split("")
    }["AnagramSortVisualizer.useMemo[sChars]"], [
        s
    ]);
    const tChars = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnagramSortVisualizer.useMemo[tChars]": ()=>t.split("")
    }["AnagramSortVisualizer.useMemo[tChars]"], [
        t
    ]);
    // viz state
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [i, setI] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0); // step inside sorting
    const [sArr, setSArr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tArr, setTArr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [playing, setPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const AUTO_LOOP = true;
    const reset = ()=>{
        setPhase("idle");
        setI(0);
        setSArr([]);
        setTArr([]);
        setResult(null);
        setPlaying(true);
    };
    // step machine
    const step = ()=>{
        if (phase === "idle") {
            setPhase("split");
            setSArr([
                ...sChars
            ]);
            setTArr([
                ...tChars
            ]);
            return;
        }
        if (phase === "split") {
            setPhase("sorting");
            setI(0);
            return;
        }
        if (phase === "sorting") {
            // "sorted(list(s)) / sorted(list(t))" — animate by doing one insertion per tick
            const nextI = i + 1;
            const sSorted = [
                ...sArr
            ].slice(0, nextI).sort();
            const tSorted = [
                ...tArr
            ].slice(0, nextI).sort();
            setSArr((prev)=>[
                    ...sSorted,
                    ...prev.slice(nextI)
                ]);
            setTArr((prev)=>[
                    ...tSorted,
                    ...prev.slice(nextI)
                ]);
            setI(nextI);
            if (nextI >= Math.max(sArr.length, tArr.length)) {
                // final sort
                setSArr((prev)=>[
                        ...prev
                    ].sort());
                setTArr((prev)=>[
                        ...prev
                    ].sort());
                setPhase("compare");
            }
            return;
        }
        if (phase === "compare") {
            const ok = sArr.length === tArr.length && sArr.every((c, k)=>c === tArr[k]);
            setResult(ok);
            setPhase("done");
            return;
        }
    };
    useInterval({
        "AnagramSortVisualizer.useInterval": ()=>step()
    }["AnagramSortVisualizer.useInterval"], playing ? speed : null);
    // Auto-start on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnagramSortVisualizer.useEffect": ()=>{
            if (phase === "idle" && s && t) {
                step();
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["AnagramSortVisualizer.useEffect"], []);
    // Reset when inputs change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnagramSortVisualizer.useEffect": ()=>{
            if (s && t) {
                reset();
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["AnagramSortVisualizer.useEffect"], [
        s,
        t
    ]);
    // auto-loop after finish
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnagramSortVisualizer.useEffect": ()=>{
            if (phase !== "done" || !AUTO_LOOP) return;
            const t = setTimeout(reset, 1400);
            return ({
                "AnagramSortVisualizer.useEffect": ()=>clearTimeout(t)
            })["AnagramSortVisualizer.useEffect"];
        }
    }["AnagramSortVisualizer.useEffect"], [
        phase
    ]);
    // render helpers
    const renderRow = (label, arr, highlightIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "rounded-xl border border-white/10 bg-white/5 p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-2 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-sm uppercase tracking-widest text-white/60",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 154,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-white/60",
                            children: phase === "sorting" ? "sorting…" : phase === "split" ? "list(s)" : ""
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 155,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                    lineNumber: 153,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2 min-h-[48px]",
                    children: arr.map((ch, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chip, {
                            id: `${label}-${idx}-${ch}`,
                            ch: ch,
                            active: idx === highlightIndex
                        }, `${label}-${idx}-${ch}`, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                    lineNumber: 159,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AnagramSortVisualizer.tsx",
            lineNumber: 152,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full bg-[#0b0e13] text-white p-6 rounded-xl border border-gray-800",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-5xl space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex items-center justify-between flex-wrap gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold",
                                    children: "Valid Anagram — Sorting Visualizer"
                                }, void 0, false, {
                                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/60 text-sm mt-1",
                                    children: [
                                        "Algorithm shown: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            className: "bg-white/10 px-2 py-1 rounded",
                                            children: "sorted(list(s)) == sorted(list(t))"
                                        }, void 0, false, {
                                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                            lineNumber: 174,
                                            columnNumber: 32
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                    onClick: ()=>setPlaying((p)=>!p),
                                    variant: "accent",
                                    children: playing ? "Pause" : "Play"
                                }, void 0, false, {
                                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                    onClick: step,
                                    disabled: phase === "done",
                                    children: "Step"
                                }, void 0, false, {
                                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                    onClick: reset,
                                    variant: "ghost",
                                    children: "Reset"
                                }, void 0, false, {
                                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-3 items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-sm text-white/70",
                            children: "s:"
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: s,
                            onChange: (e)=>setS(e.target.value),
                            className: "rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-sm text-white/70",
                            children: "t:"
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: t,
                            onChange: (e)=>setT(e.target.value),
                            className: "rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 195,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-sm text-white/70",
                            children: "Speed"
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 200,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "range",
                            min: 200,
                            max: 1500,
                            step: 100,
                            value: speed,
                            onChange: (e)=>setSpeed(parseInt(e.target.value)),
                            className: "w-32"
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 201,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$LayoutGroup$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayoutGroup"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "rounded-xl border border-white/10 bg-transparent p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-white/60 mb-1",
                                                children: "s (string)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                                lineNumber: 217,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg bg-slate-800/80 px-3 py-2 font-mono",
                                                children: s
                                            }, void 0, false, {
                                                fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                                lineNumber: 218,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                        lineNumber: 216,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-white/60 mb-1",
                                                children: "t (string)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                                lineNumber: 221,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-lg bg-slate-800/80 px-3 py-2 font-mono",
                                                children: t
                                            }, void 0, false, {
                                                fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                                lineNumber: 222,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                        lineNumber: 220,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center my-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: -6
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "text-white/60 text-sm",
                                children: [
                                    "▼ convert with ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        children: "list()"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                        lineNumber: 234,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                lineNumber: 229,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                renderRow("list(s)", sArr, phase === "sorting" ? i : undefined),
                                renderRow("list(t)", tArr, phase === "sorting" ? i : undefined)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center my-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: -6
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "text-white/60 text-sm",
                                children: [
                                    "▼ apply ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        children: "sorted()"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                        lineNumber: 251,
                                        columnNumber: 23
                                    }, this),
                                    " to both"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            children: phase === "done" && result !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    y: 20,
                                    opacity: 0
                                },
                                animate: {
                                    y: 0,
                                    opacity: 1
                                },
                                exit: {
                                    opacity: 0
                                },
                                className: `mt-2 rounded-xl border p-4 text-center text-lg font-semibold ${result ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-200" : "bg-rose-500/10 border-rose-400/20 text-rose-200"}`,
                                children: result ? "sorted(list(s)) == sorted(list(t)) → True (anagram)" : "Not equal → False (not an anagram)"
                            }, void 0, false, {
                                fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 256,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "text-xs text-white/60 mt-4 grid gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "Time:"
                                }, void 0, false, {
                                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                    lineNumber: 276,
                                    columnNumber: 14
                                }, this),
                                " O(n log n) for the sorts. ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "Space:"
                                }, void 0, false, {
                                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                    lineNumber: 276,
                                    columnNumber: 53
                                }, this),
                                " O(n)."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Try examples: s=",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    children: '"jar"'
                                }, void 0, false, {
                                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                    lineNumber: 277,
                                    columnNumber: 30
                                }, this),
                                ", t=",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    children: '"jam"'
                                }, void 0, false, {
                                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                    lineNumber: 277,
                                    columnNumber: 52
                                }, this),
                                " or s=",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    children: '"anagram"'
                                }, void 0, false, {
                                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                    lineNumber: 277,
                                    columnNumber: 76
                                }, this),
                                ", t=",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    children: '"nagaram"'
                                }, void 0, false, {
                                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                                    lineNumber: 277,
                                    columnNumber: 102
                                }, this),
                                "."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AnagramSortVisualizer.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AnagramSortVisualizer.tsx",
                    lineNumber: 275,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AnagramSortVisualizer.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AnagramSortVisualizer.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_s1(AnagramSortVisualizer, "Fz6sJlU2JXAP7lHPW62k8bYAIzw=", false, function() {
    return [
        useInterval
    ];
});
_c2 = AnagramSortVisualizer;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Button");
__turbopack_context__.k.register(_c1, "Chip");
__turbopack_context__.k.register(_c2, "AnagramSortVisualizer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/problems/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProblemPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$problems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/problems.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AlgorithmVisualizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AlgorithmVisualizer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContainsDuplicateVisualizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ContainsDuplicateVisualizer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnagramSortVisualizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AnagramSortVisualizer.tsx [app-client] (ecmascript)");
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
;
;
function ProblemPage({ params }) {
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["use"])(params);
    const problem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$problems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProblemById"])(id);
    if (!problem) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notFound"])();
    }
    // Placeholder steps for visualization - will be customized per problem
    const visualizationSteps = [
        {
            description: 'Initialize variables',
            variables: {
                i: 0,
                result: 0
            }
        },
        {
            description: 'Process first element',
            variables: {
                i: 1,
                result: 1
            }
        },
        {
            description: 'Continue processing',
            variables: {
                i: 2,
                result: 2
            }
        },
        {
            description: 'Algorithm complete',
            variables: {
                i: 3,
                result: 3
            }
        }
    ];
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
                                fileName: "[project]/app/problems/[id]/page.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            "Back to Gallery"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/problems/[id]/page.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/problems/[id]/page.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/problems/[id]/page.tsx",
                lineNumber: 50,
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
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-4 mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-4xl font-bold mb-4",
                                            children: problem.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                            lineNumber: 72,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4 flex-wrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `px-3 py-1 rounded-lg text-sm font-medium border ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDifficultyBgColor"])(problem.difficulty)} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDifficultyColor"])(problem.difficulty)}`,
                                                    children: problem.difficulty
                                                }, void 0, false, {
                                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 19
                                                }, this),
                                                problem.topics.map((topic)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-3 py-1 rounded-lg text-sm text-gray-300 bg-gray-800 border border-gray-700",
                                                        children: topic
                                                    }, topic, false, {
                                                        fileName: "[project]/app/problems/[id]/page.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 21
                                                    }, this)),
                                                problem.leetcodeUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: problem.leetcodeUrl,
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    className: "inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                            lineNumber: 96,
                                                            columnNumber: 23
                                                        }, this),
                                                        "View on LeetCode"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                            lineNumber: 73,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/problems/[id]/page.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/problems/[id]/page.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-12 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-5 space-y-8",
                                    children: [
                                        problem.explanation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: 20
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            transition: {
                                                delay: 0.1
                                            },
                                            className: "rounded-xl border border-gray-800 bg-gray-900/50 p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                            className: "w-5 h-5 text-green-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-2xl font-bold",
                                                            children: "Explanation"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                            lineNumber: 118,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "prose prose-invert max-w-none",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-300 leading-relaxed space-y-4",
                                                        children: problem.explanation.split('\n\n').map((paragraph, pIdx)=>{
                                                            // Handle bold headings
                                                            if (paragraph.includes('**') && paragraph.split('\n').length === 1) {
                                                                const text = paragraph.replace(/\*\*/g, '');
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-semibold text-white text-lg",
                                                                    children: text
                                                                }, pIdx, false, {
                                                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                                                    lineNumber: 127,
                                                                    columnNumber: 29
                                                                }, this);
                                                            }
                                                            // Split into lines for this paragraph
                                                            const lines = paragraph.split('\n').filter((l)=>l.trim());
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: lines.map((line, lIdx)=>{
                                                                    // Handle numbered list items
                                                                    if (line.match(/^\d+\./)) {
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "ml-4",
                                                                            children: line
                                                                        }, lIdx, false, {
                                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                                            lineNumber: 142,
                                                                            columnNumber: 35
                                                                        }, this);
                                                                    }
                                                                    // Handle bullet points
                                                                    if (line.trim().startsWith('-')) {
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "ml-4",
                                                                            children: line
                                                                        }, lIdx, false, {
                                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                                            lineNumber: 150,
                                                                            columnNumber: 35
                                                                        }, this);
                                                                    }
                                                                    // Regular line
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        children: line
                                                                    }, lIdx, false, {
                                                                        fileName: "[project]/app/problems/[id]/page.tsx",
                                                                        lineNumber: 157,
                                                                        columnNumber: 33
                                                                    }, this);
                                                                })
                                                            }, pIdx, false, {
                                                                fileName: "[project]/app/problems/[id]/page.tsx",
                                                                lineNumber: 137,
                                                                columnNumber: 27
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/problems/[id]/page.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                            lineNumber: 110,
                                            columnNumber: 17
                                        }, this),
                                        problem.code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: 20
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            transition: {
                                                delay: 0.3
                                            },
                                            className: "rounded-xl border border-gray-800 bg-gray-900/50 p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
                                                            className: "w-5 h-5 text-green-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                            lineNumber: 179,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-2xl font-bold",
                                                            children: "Solution"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                    className: "overflow-x-auto",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                        className: "text-sm text-gray-300 font-mono",
                                                        children: problem.code
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/problems/[id]/page.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4",
                                            children: [
                                                (problem.timeComplexity || problem.spaceComplexity) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: 20
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0
                                                    },
                                                    transition: {
                                                        delay: 0.4
                                                    },
                                                    className: "rounded-xl border border-gray-800 bg-gray-900/50 p-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-bold mb-4",
                                                            children: "Complexity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-3",
                                                            children: [
                                                                problem.timeComplexity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm text-gray-400 mb-1",
                                                                            children: "Time Complexity"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                                            lineNumber: 204,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-green-400 font-mono font-bold",
                                                                            children: problem.timeComplexity
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                                            lineNumber: 207,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                                                    lineNumber: 203,
                                                                    columnNumber: 25
                                                                }, this),
                                                                problem.spaceComplexity && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-sm text-gray-400 mb-1",
                                                                            children: "Space Complexity"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                                            lineNumber: 214,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-green-400 font-mono font-bold",
                                                                            children: problem.spaceComplexity
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                                            lineNumber: 217,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                                                    lineNumber: 213,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                            lineNumber: 201,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    initial: {
                                                        opacity: 0,
                                                        y: 20
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0
                                                    },
                                                    transition: {
                                                        delay: 0.5
                                                    },
                                                    className: "rounded-xl border border-gray-800 bg-gray-900/50 p-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-bold mb-4",
                                                            children: "Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                            lineNumber: 233,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: problem.status === 'solved' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-4 h-4 rounded bg-green-500 flex items-center justify-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-white text-xs",
                                                                            children: "✓"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                                            lineNumber: 238,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/problems/[id]/page.tsx",
                                                                        lineNumber: 237,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-green-400 font-medium",
                                                                        children: "Solved"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/problems/[id]/page.tsx",
                                                                        lineNumber: 240,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-4 h-4 border-2 border-gray-600 rounded"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/problems/[id]/page.tsx",
                                                                        lineNumber: 244,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-400",
                                                                        children: "Not Solved"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/problems/[id]/page.tsx",
                                                                        lineNumber: 245,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                                            lineNumber: 234,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                            lineNumber: 191,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-7",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: 0.2
                                        },
                                        className: "lg:sticky lg:top-24",
                                        children: problem.id === 'contains-duplicate' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ContainsDuplicateVisualizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                            lineNumber: 262,
                                            columnNumber: 19
                                        }, this) : problem.id === 'valid-anagram' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnagramSortVisualizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                            lineNumber: 264,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AlgorithmVisualizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            steps: visualizationSteps,
                                            title: "Algorithm Execution"
                                        }, void 0, false, {
                                            fileName: "[project]/app/problems/[id]/page.tsx",
                                            lineNumber: 266,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/problems/[id]/page.tsx",
                                        lineNumber: 255,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/problems/[id]/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/problems/[id]/page.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/problems/[id]/page.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/problems/[id]/page.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/problems/[id]/page.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_c = ProblemPage;
var _c;
__turbopack_context__.k.register(_c, "ProblemPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_7c746066._.js.map