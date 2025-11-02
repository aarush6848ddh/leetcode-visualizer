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
"[project]/components/TopicCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopicCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
;
;
function TopicCard({ topic, index }) {
    const solvedCount = topic.problems.filter((p)=>p.status === 'solved').length;
    const totalCount = topic.problems.length;
    const progress = totalCount > 0 ? solvedCount / totalCount * 100 : 0;
    const isComplete = totalCount > 0 && solvedCount === totalCount;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.95,
            y: 20
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0
        },
        transition: {
            delay: index * 0.05,
            duration: 0.4,
            ease: [
                0.16,
                1,
                0.3,
                1
            ]
        },
        whileHover: {
            scale: 1.03,
            y: -8
        },
        className: "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/5 to-white/[0.02] backdrop-blur-sm hover:from-white/10 hover:via-white/8 hover:to-white/5 hover:border-green-800/30 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-green-900/20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: `/topics/${topic.id}`,
            className: "block p-10 h-full flex flex-col items-center justify-center text-center",
            children: [
                isComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        scale: 0
                    },
                    animate: {
                        scale: 1
                    },
                    transition: {
                        delay: 0.3,
                        type: "spring"
                    },
                    className: "flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-600/40 mb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "w-6 h-6 text-white",
                        strokeWidth: 3
                    }, void 0, false, {
                        fileName: "[project]/components/TopicCard.tsx",
                        lineNumber: 36,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/TopicCard.tsx",
                    lineNumber: 30,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-4 mb-6 w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-3xl font-semibold text-white group-hover:text-green-400 transition-colors tracking-normal break-words",
                            children: topic.name
                        }, void 0, false, {
                            fileName: "[project]/components/TopicCard.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-gray-400/80 font-normal break-words",
                            children: [
                                solvedCount,
                                "/",
                                totalCount,
                                " problems solved"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/TopicCard.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/TopicCard.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md h-4 bg-white/5 rounded-full overflow-hidden border border-white/10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            width: 0
                        },
                        animate: {
                            width: `${progress}%`
                        },
                        transition: {
                            delay: index * 0.05 + 0.3,
                            duration: 0.8,
                            ease: [
                                0.16,
                                1,
                                0.3,
                                1
                            ]
                        },
                        className: "h-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-full shadow-inner shadow-green-600/30"
                    }, void 0, false, {
                        fileName: "[project]/components/TopicCard.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/TopicCard.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/TopicCard.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/TopicCard.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = TopicCard;
var _c;
__turbopack_context__.k.register(_c, "TopicCard");
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
"[project]/lib/layout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "layoutNodesEdges",
    ()=>layoutNodesEdges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dagre$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dagre/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
;
;
const nodeWidth = 200; // your card min width ~ matches Tailwind min-w-[180px]
const nodeHeight = 64; // card height (tweak if you change padding)
function layoutNodesEdges(nodes, edges, { baseRankSep = 120, deepBoost = 60 } = {}) {
    const g = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dagre$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].graphlib.Graph();
    g.setGraph({
        rankdir: 'TB',
        nodesep: 30,
        ranksep: baseRankSep,
        edgesep: 30
    });
    g.setDefaultEdgeLabel(()=>({}));
    // Needed so dagre knows each node's box
    nodes.forEach((n)=>{
        g.setNode(n.id, {
            width: nodeWidth,
            height: nodeHeight
        });
    });
    edges.forEach((e)=>{
        // Only add edge if both nodes exist
        if (g.hasNode(e.source) && g.hasNode(e.target)) {
            g.setEdge(e.source, e.target);
        }
    });
    // Only layout if we have nodes and edges
    if (nodes.length > 0) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dagre$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].layout(g);
    }
    // find deepest rank so we can pad the bottom rows a bit more
    const ranks = new Map();
    g.nodes().forEach((id)=>{
        const n = g.node(id);
        if (n && typeof n.rank === 'number') {
            ranks.set(id, n.rank);
        } else {
            ranks.set(id, 0);
        }
    });
    const rankValues = Array.from(ranks.values());
    const maxRank = rankValues.length > 0 ? Math.max(...rankValues) : 0;
    const laidOutNodes = nodes.map((n, index)=>{
        const dn = g.node(n.id);
        const rank = ranks.get(n.id) ?? 0;
        // add extra spacing to deeper levels so the bottom isn't crowded
        const extra = Math.max(0, rank - (maxRank - 2)) * deepBoost; // boost last 2 ranks
        // Ensure we have valid positions from dagre
        // If dagre didn't provide positions (e.g., isolated nodes), use fallback spacing
        let x = 0;
        let y = 0;
        if (dn && typeof dn.x === 'number' && typeof dn.y === 'number' && !isNaN(dn.x) && !isNaN(dn.y)) {
            x = dn.x - nodeWidth / 2;
            y = dn.y - nodeHeight / 2 + extra;
        } else {
            // Fallback: arrange isolated nodes in a simple grid
            x = index % 5 * (nodeWidth + 40);
            y = Math.floor(index / 5) * (nodeHeight + baseRankSep);
        }
        return {
            ...n,
            position: {
                x,
                y
            },
            sourcePosition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Bottom,
            targetPosition: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Top,
            draggable: false
        };
    });
    return {
        nodes: laidOutNodes,
        edges
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/RoadmapTree.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoadmapTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript) <export ReactFlow as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/background/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/controls/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/minimap/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/layout.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// NeetCode-style node component
function RoadmapNode({ data }) {
    const { topic, progress, solvedCount, totalCount } = data;
    const isComplete = totalCount > 0 && solvedCount === totalCount;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: `/topics/${topic.id}`,
        className: "block",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative select-none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: " bg-green-800 text-white font-semibold px-6 py-2 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center min-w-[180px] hover:brightness-110 transition cursor-pointer ",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-base",
                            children: topic.name
                        }, void 0, false, {
                            fileName: "[project]/components/RoadmapTree.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        totalCount > 0 && progress > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 h-[10px] w-[85%] rounded-full bg-[#d9d9d9] overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `h-full rounded-full ${isComplete ? 'bg-green-500' : 'bg-green-500/80'}`,
                                style: {
                                    width: `${progress}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/RoadmapTree.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/RoadmapTree.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 h-[10px] w-[85%] rounded-full bg-[#d9d9d9]"
                        }, void 0, false, {
                            fileName: "[project]/components/RoadmapTree.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RoadmapTree.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
                    type: "target",
                    position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Top,
                    className: "!bg-white w-2 h-2 -mt-1"
                }, void 0, false, {
                    fileName: "[project]/components/RoadmapTree.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
                    type: "source",
                    position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Bottom,
                    className: "!bg-white w-2 h-2 -mb-1"
                }, void 0, false, {
                    fileName: "[project]/components/RoadmapTree.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/RoadmapTree.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/RoadmapTree.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = RoadmapNode;
const nodeTypes = {
    roadmap: RoadmapNode
};
// Helper to create a node quickly
const createNode = (id, topic, solvedCount, totalCount)=>({
        id,
        type: 'roadmap',
        data: {
            topic,
            progress: totalCount > 0 ? solvedCount / totalCount * 100 : 0,
            solvedCount,
            totalCount
        },
        position: {
            x: 0,
            y: 0
        },
        draggable: false
    });
// Edges helper
const createEdge = (id, from, to)=>({
        id,
        source: from,
        target: to,
        type: 'smoothstep',
        animated: false,
        style: {
            stroke: '#ffffff88',
            strokeWidth: 1
        }
    });
function RoadmapTree({ topics }) {
    _s();
    // Build topic map and progress map
    const topicMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoadmapTree.useMemo[topicMap]": ()=>{
            const map = new Map();
            topics.forEach({
                "RoadmapTree.useMemo[topicMap]": (topic)=>map.set(topic.id, topic)
            }["RoadmapTree.useMemo[topicMap]"]);
            return map;
        }
    }["RoadmapTree.useMemo[topicMap]"], [
        topics
    ]);
    const progressMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoadmapTree.useMemo[progressMap]": ()=>{
            const map = new Map();
            topics.forEach({
                "RoadmapTree.useMemo[progressMap]": (topic)=>{
                    const solved = topic.problems.filter({
                        "RoadmapTree.useMemo[progressMap]": (p)=>p.status === 'solved'
                    }["RoadmapTree.useMemo[progressMap]"]).length;
                    const total = topic.problems.length;
                    map.set(topic.id, {
                        solved,
                        total
                    });
                }
            }["RoadmapTree.useMemo[progressMap]"]);
            return map;
        }
    }["RoadmapTree.useMemo[progressMap]"], [
        topics
    ]);
    // Create base nodes and edges, then apply dagre layout
    const initialNodesAndEdges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoadmapTree.useMemo[initialNodesAndEdges]": ()=>{
            const createdNodes = [];
            topics.forEach({
                "RoadmapTree.useMemo[initialNodesAndEdges]": (topic)=>{
                    const progress = progressMap.get(topic.id) || {
                        solved: 0,
                        total: 0
                    };
                    createdNodes.push(createNode(topic.id, topic, progress.solved, progress.total));
                }
            }["RoadmapTree.useMemo[initialNodesAndEdges]"]);
            // Create edges based on prerequisites
            const createdEdges = [];
            topics.forEach({
                "RoadmapTree.useMemo[initialNodesAndEdges]": (topic)=>{
                    if (topic.prerequisites && topic.prerequisites.length > 0) {
                        topic.prerequisites.forEach({
                            "RoadmapTree.useMemo[initialNodesAndEdges]": (prereq)=>{
                                // Check if both nodes exist
                                const sourceExists = topics.some({
                                    "RoadmapTree.useMemo[initialNodesAndEdges].sourceExists": (t)=>t.id === prereq
                                }["RoadmapTree.useMemo[initialNodesAndEdges].sourceExists"]);
                                const targetExists = topics.some({
                                    "RoadmapTree.useMemo[initialNodesAndEdges].targetExists": (t)=>t.id === topic.id
                                }["RoadmapTree.useMemo[initialNodesAndEdges].targetExists"]);
                                if (sourceExists && targetExists) {
                                    createdEdges.push(createEdge(`${prereq}-${topic.id}`, prereq, topic.id));
                                }
                            }
                        }["RoadmapTree.useMemo[initialNodesAndEdges]"]);
                    }
                }
            }["RoadmapTree.useMemo[initialNodesAndEdges]"]);
            // Apply dagre layout to automatically space nodes
            const { nodes: laidOutNodes, edges: laidOutEdges } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["layoutNodesEdges"])(createdNodes, createdEdges, {
                baseRankSep: 90,
                deepBoost: 40
            });
            return {
                nodes: laidOutNodes,
                edges: laidOutEdges
            };
        }
    }["RoadmapTree.useMemo[initialNodesAndEdges]"], [
        topics,
        progressMap
    ]);
    const [reactFlowNodes, setNodes, onNodesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodesState"])(initialNodesAndEdges.nodes);
    const [reactFlowEdges, setEdges, onEdgesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEdgesState"])(initialNodesAndEdges.edges);
    // Update nodes and edges when topics change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoadmapTree.useEffect": ()=>{
            setNodes(initialNodesAndEdges.nodes);
            setEdges(initialNodesAndEdges.edges);
        }
    }["RoadmapTree.useEffect"], [
        initialNodesAndEdges,
        setNodes,
        setEdges
    ]);
    const allProblems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoadmapTree.useMemo[allProblems]": ()=>{
            return topics.flatMap({
                "RoadmapTree.useMemo[allProblems]": (topic)=>topic.problems
            }["RoadmapTree.useMemo[allProblems]"]);
        }
    }["RoadmapTree.useMemo[allProblems]"], [
        topics
    ]);
    const solvedCount = allProblems.filter((p)=>p.status === 'solved').length;
    const totalCount = allProblems.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactFlowProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full bg-[#0F1115] overflow-hidden",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__["default"], {
                    nodes: reactFlowNodes,
                    edges: reactFlowEdges,
                    onNodesChange: onNodesChange,
                    onEdgesChange: onEdgesChange,
                    nodeTypes: nodeTypes,
                    fitView: true,
                    fitViewOptions: {
                        padding: 0.2
                    },
                    defaultEdgeOptions: {
                        type: 'smoothstep'
                    },
                    panOnScroll: true,
                    zoomOnDoubleClick: false,
                    className: "bg-[#0F1115]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniMap"], {
                            pannable: true,
                            zoomable: true,
                            className: "!bg-transparent border border-white/10 rounded-lg",
                            nodeColor: "#15803d",
                            maskColor: "rgba(0, 0, 0, 0.6)"
                        }, void 0, false, {
                            fileName: "[project]/components/RoadmapTree.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controls"], {
                            className: "bg-white/5 border border-white/10 rounded-lg"
                        }, void 0, false, {
                            fileName: "[project]/components/RoadmapTree.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Background"], {
                            id: "dots",
                            variant: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackgroundVariant"].Dots,
                            gap: 24,
                            size: 1,
                            color: "#1f2430"
                        }, void 0, false, {
                            fileName: "[project]/components/RoadmapTree.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RoadmapTree.tsx",
                    lineNumber: 183,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/RoadmapTree.tsx",
                lineNumber: 182,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/RoadmapTree.tsx",
            lineNumber: 181,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/RoadmapTree.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
_s(RoadmapTree, "HzAmmaHsw3PIxdY6G88NfvnK9fo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodesState"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEdgesState"]
    ];
});
_c1 = RoadmapTree;
var _c, _c1;
__turbopack_context__.k.register(_c, "RoadmapNode");
__turbopack_context__.k.register(_c1, "RoadmapTree");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$problems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/problems.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TopicCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TopicCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProblemCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ProblemCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProgressBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ProgressBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoadmapTree$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RoadmapTree.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function Home() {
    _s();
    const allProblems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$problems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllProblems"])();
    const solvedCount = allProblems.filter((p)=>p.status === 'solved').length;
    const totalCount = allProblems.length;
    const [selectedTopic, setSelectedTopic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('roadmap');
    const filteredProblems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[filteredProblems]": ()=>{
            if (!selectedTopic) return allProblems;
            return allProblems.filter({
                "Home.useMemo[filteredProblems]": (p)=>p.topics.includes(selectedTopic)
            }["Home.useMemo[filteredProblems]"]);
        }
    }["Home.useMemo[filteredProblems]"], [
        selectedTopic,
        allProblems
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#0a0a0a] text-[#fafafa]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-50 bg-[#0a0a0a] border-b border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-6 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: -20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-semibold tracking-normal text-green-600 mb-0.5",
                                        children: "LeetCode Journey"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-white/80 font-normal",
                                        children: "Documenting solutions with visualizations"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "flex items-center gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setView('roadmap'),
                                        className: `font-medium text-sm transition-colors ${view === 'roadmap' ? 'bg-green-800 text-white px-3 py-1.5 rounded' : 'text-white hover:text-green-600'}`,
                                        children: "Roadmap"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 43,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setView('topics'),
                                        className: `font-medium text-sm transition-colors ${view === 'topics' ? 'bg-green-800 text-white px-3 py-1.5 rounded' : 'text-white hover:text-green-600'}`,
                                        children: "Topics"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setView('problems'),
                                        className: `font-medium text-sm transition-colors ${view === 'problems' ? 'bg-green-800 text-white px-3 py-1.5 rounded' : 'text-white hover:text-green-600'}`,
                                        children: "Problems"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: view === 'roadmap' ? '' : 'container mx-auto px-6 py-8',
                children: [
                    view === 'roadmap' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 0.1
                        },
                        className: "h-[calc(100vh-80px)]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RoadmapTree$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            topics: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$problems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["topics"]
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 88,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    view !== 'roadmap' && totalCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        className: "mb-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl font-semibold tracking-normal mb-3 gradient-text",
                                            children: "Overall Progress"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 101,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400/80 text-lg font-light",
                                            children: [
                                                solvedCount,
                                                " of ",
                                                totalCount,
                                                " problems solved"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProgressBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    solved: solvedCount,
                                    total: totalCount
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this),
                    view === 'topics' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 0.2
                        },
                        className: "flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-semibold tracking-normal mb-8 gradient-text text-center",
                                children: "Topics"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 119,
                                columnNumber: 17
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$problems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["topics"].length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$problems$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["topics"].map((topic, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TopicCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        topic: topic,
                                        index: index
                                    }, topic.id, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 23
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 121,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-16",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-lg",
                                    children: "No topics available yet. Problems will be organized by topic."
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 127,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 113,
                        columnNumber: 15
                    }, this),
                    view === 'problems' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 0.2
                        },
                        className: "flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-6 w-full max-w-4xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-semibold tracking-normal gradient-text text-center",
                                        children: selectedTopic ? `Problems: ${selectedTopic}` : 'All Problems'
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 19
                                    }, this),
                                    selectedTopic && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSelectedTopic(null),
                                        className: "px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10",
                                        children: "Clear Filter"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 144,
                                columnNumber: 17
                            }, this),
                            filteredProblems.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 gap-3 max-w-5xl mx-auto w-full",
                                children: filteredProblems.map((problem, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProblemCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        problem: problem,
                                        index: index
                                    }, problem.id, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 160,
                                        columnNumber: 23
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 158,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-16",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-lg",
                                    children: selectedTopic ? 'No problems found for this topic.' : 'No problems available yet. Add your solutions to get started!'
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 165,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 164,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 138,
                        columnNumber: 15
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(Home, "Y6xXjvLr5Z8vTKH6KW4qf4BWrJI=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_512c351a._.js.map