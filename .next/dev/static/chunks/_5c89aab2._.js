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
        videoUrl: 'https://www.youtube.com/watch?v=2OgkjKhz8Io',
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
        videoUrl: 'https://www.youtube.com/watch?v=TXtZ-GKO2i8',
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
        id: 'top-k-frequent-elements',
        title: 'Top K Frequent Elements',
        difficulty: 'Medium',
        topics: [
            'Arrays & Hashing'
        ],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
        explanation: `This solution uses a bucket sort approach to efficiently find the K most frequent elements.

**How it works:**
1. Count the frequency of each number using Counter, which creates a dictionary mapping each number to its count.
2. Create a frequency array (bucket) where the index represents the frequency count, and the value is a list of numbers with that frequency.
3. Iterate through the count dictionary and place each number into the appropriate frequency bucket.
4. Iterate backwards through the frequency array (from highest frequency to lowest) and collect numbers until we have K elements.

**Why this works:**
The bucket sort approach is optimal because:
- Counting frequencies: O(n) time
- Bucket creation: O(n) time and space
- Collecting top K: O(n) worst case, but typically much faster since we stop at K elements
- Overall: O(n) time complexity, which is better than sorting approaches that take O(n log n)

This approach leverages the fact that the maximum frequency cannot exceed the array length, making bucket sort perfect for this problem.`,
        code: `from collections import Counter
from typing import List

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count = Counter(nums)
        freq = [[] for _ in range(len(nums) + 1)]
        
        for num, cnt in count.items():
            freq[cnt].append(num)
        
        res = []
        for i in range(len(freq) - 1, 0, -1):    
            for n in freq[i]:                    
                res.append(n)
                if len(res) == k:
                    return res`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
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
                videoUrl: 'https://www.youtube.com/watch?v=2OgkjKhz8Io',
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
                videoUrl: 'https://www.youtube.com/watch?v=TXtZ-GKO2i8',
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
                id: 'top-k-frequent-elements',
                title: 'Top K Frequent Elements',
                difficulty: 'Medium',
                topics: [
                    'Arrays & Hashing'
                ],
                status: 'solved',
                leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
                explanation: `This solution uses a bucket sort approach to efficiently find the K most frequent elements.

**How it works:**
1. Count the frequency of each number using Counter, which creates a dictionary mapping each number to its count.
2. Create a frequency array (bucket) where the index represents the frequency count, and the value is a list of numbers with that frequency.
3. Iterate through the count dictionary and place each number into the appropriate frequency bucket.
4. Iterate backwards through the frequency array (from highest frequency to lowest) and collect numbers until we have K elements.

**Why this works:**
The bucket sort approach is optimal because:
- Counting frequencies: O(n) time
- Bucket creation: O(n) time and space
- Collecting top K: O(n) worst case, but typically much faster since we stop at K elements
- Overall: O(n) time complexity, which is better than sorting approaches that take O(n log n)

This approach leverages the fact that the maximum frequency cannot exceed the array length, making bucket sort perfect for this problem.`,
                code: `from collections import Counter
from typing import List

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count = Counter(nums)
        freq = [[] for _ in range(len(nums) + 1)]
        
        for num, cnt in count.items():
            freq[cnt].append(num)
        
        res = []
        for i in range(len(freq) - 1, 0, -1):    
            for n in freq[i]:                    
                res.append(n)
                if len(res) == k:
                    return res`,
                timeComplexity: 'O(n)',
                spaceComplexity: 'O(n)',
                starred: false
            },
            createProblem('Score of a String', 'Easy', 'Arrays & Hashing'),
            createProblem('Concatenation of Array', 'Easy', 'Arrays & Hashing'),
            createProblem('Replace Elements With Greatest Element On Right Side', 'Easy', 'Arrays & Hashing'),
            createProblem('Is Subsequence', 'Easy', 'Arrays & Hashing'),
            createProblem('Append Characters to String to Make Subsequence', 'Medium', 'Arrays & Hashing'),
            createProblem('Length of Last Word', 'Easy', 'Arrays & Hashing'),
            createProblem('Number of Senior Citizens', 'Easy', 'Arrays & Hashing'),
            createProblem('Max Consecutive Ones', 'Easy', 'Arrays & Hashing'),
            createProblem('Longest Common Prefix', 'Easy', 'Arrays & Hashing'),
            createProblem('String Matching in an Array', 'Easy', 'Arrays & Hashing'),
            createProblem('Pascals Triangle', 'Easy', 'Arrays & Hashing'),
            createProblem('Remove Element', 'Easy', 'Arrays & Hashing'),
            createProblem('Unique Email Addresses', 'Easy', 'Arrays & Hashing'),
            createProblem('Isomorphic Strings', 'Easy', 'Arrays & Hashing'),
            createProblem('Can Place Flowers', 'Easy', 'Arrays & Hashing'),
            createProblem('Majority Element', 'Easy', 'Arrays & Hashing'),
            createProblem('Maximum Difference Between Even and Odd Frequency I', 'Easy', 'Arrays & Hashing'),
            createProblem('Next Greater Element I', 'Easy', 'Arrays & Hashing'),
            createProblem('Longest Strictly Increasing or Strictly Decreasing Subarray', 'Easy', 'Arrays & Hashing'),
            createProblem('Maximum Ascending Subarray Sum', 'Easy', 'Arrays & Hashing'),
            createProblem('Find Pivot Index', 'Easy', 'Arrays & Hashing'),
            createProblem('Kth Distinct String in an Array', 'Easy', 'Arrays & Hashing'),
            createProblem('Range Sum Query - Immutable', 'Easy', 'Arrays & Hashing'),
            createProblem('Find All Numbers Disappeared in an Array', 'Easy', 'Arrays & Hashing'),
            createProblem('Find Missing and Repeated Values', 'Easy', 'Arrays & Hashing'),
            createProblem('Maximum Number of Balloons', 'Easy', 'Arrays & Hashing'),
            createProblem('Word Pattern', 'Easy', 'Arrays & Hashing'),
            createProblem('Design HashSet', 'Easy', 'Arrays & Hashing'),
            createProblem('Design HashMap', 'Easy', 'Arrays & Hashing'),
            createProblem('Height Checker', 'Easy', 'Arrays & Hashing'),
            createProblem('Find Lucky Integer in an Array', 'Easy', 'Arrays & Hashing'),
            createProblem('Special Array I', 'Easy', 'Arrays & Hashing'),
            createProblem('Check if Array Is Sorted and Rotated', 'Easy', 'Arrays & Hashing'),
            createProblem('Monotonic Array', 'Easy', 'Arrays & Hashing'),
            createProblem('Divide Array Into Equal Pairs', 'Easy', 'Arrays & Hashing'),
            createProblem('Number of Good Pairs', 'Easy', 'Arrays & Hashing'),
            createProblem('Pascal\'s Triangle II', 'Easy', 'Arrays & Hashing'),
            createProblem('Find Words That Can Be Formed by Characters', 'Easy', 'Arrays & Hashing'),
            createProblem('Count the Number of Consistent Strings', 'Easy', 'Arrays & Hashing'),
            createProblem('Ransom Note', 'Easy', 'Arrays & Hashing'),
            createProblem('Largest 3-Same-Digit Number in String', 'Easy', 'Arrays & Hashing'),
            createProblem('Destination City', 'Easy', 'Arrays & Hashing'),
            createProblem('Maximum Product Difference Between Two', 'Easy', 'Arrays & Hashing'),
            createProblem('Circular Sentence', 'Easy', 'Arrays & Hashing'),
            createProblem('Maximum Score After Splitting a String', 'Easy', 'Arrays & Hashing'),
            createProblem('Path Crossing', 'Easy', 'Arrays & Hashing'),
            createProblem('Minimum Changes To Make Alternating Binary String', 'Easy', 'Arrays & Hashing'),
            createProblem('Redistribute Characters to Make All Strings Equal', 'Easy', 'Arrays & Hashing'),
            createProblem('Longest Palindrome', 'Easy', 'Arrays & Hashing'),
            createProblem('Largest Substring Between Two Equal Characters', 'Easy', 'Arrays & Hashing'),
            createProblem('Set Mismatch', 'Easy', 'Arrays & Hashing'),
            createProblem('First Unique Character in a String', 'Easy', 'Arrays & Hashing'),
            createProblem('Intersection of Two Arrays', 'Easy', 'Arrays & Hashing'),
            createProblem('Find Common Characters', 'Easy', 'Arrays & Hashing'),
            createProblem('Number of Students Unable to Eat Lunch', 'Easy', 'Arrays & Hashing'),
            createProblem('Time Needed to Buy Tickets', 'Easy', 'Arrays & Hashing'),
            createProblem('Special Array with X Elements Greater than or Equal X', 'Medium', 'Arrays & Hashing'),
            createProblem('Count Vowel Strings in Ranges', 'Easy', 'Arrays & Hashing'),
            createProblem('Average Waiting Time', 'Medium', 'Arrays & Hashing'),
            createProblem('Sort an Array', 'Medium', 'Arrays & Hashing'),
            createProblem('Sort Colors', 'Medium', 'Arrays & Hashing'),
            createProblem('Relative Sort Array', 'Easy', 'Arrays & Hashing'),
            createProblem('Sort the People', 'Easy', 'Arrays & Hashing'),
            createProblem('Sort Array by Increasing Frequency', 'Easy', 'Arrays & Hashing'),
            createProblem('Custom Sort String', 'Medium', 'Arrays & Hashing'),
            createProblem('Encode and Decode Strings', 'Medium', 'Arrays & Hashing'),
            createProblem('Range Sum Query 2D Immutable', 'Medium', 'Arrays & Hashing'),
            createProblem('Analyze User Website Visit Pattern', 'Medium', 'Arrays & Hashing'),
            createProblem('Product of Array Except Self', 'Medium', 'Arrays & Hashing'),
            createProblem('Minimum Number of Operations to Move All Balls to Each Box', 'Medium', 'Arrays & Hashing'),
            createProblem('Valid Sudoku', 'Medium', 'Arrays & Hashing'),
            createProblem('Longest Consecutive Sequence', 'Medium', 'Arrays & Hashing'),
            createProblem('Encode and Decode TinyURL', 'Medium', 'Arrays & Hashing'),
            createProblem('Brick Wall', 'Medium', 'Arrays & Hashing'),
            createProblem('Best Time to Buy And Sell Stock II', 'Medium', 'Arrays & Hashing'),
            createProblem('Majority Element II', 'Medium', 'Arrays & Hashing'),
            createProblem('Minimum Index of a Valid Split', 'Medium', 'Arrays & Hashing'),
            createProblem('Subarray Sum Equals K', 'Medium', 'Arrays & Hashing'),
            createProblem('Subarray Sums Divisible by K', 'Medium', 'Arrays & Hashing'),
            createProblem('Make Sum Divisible by P', 'Medium', 'Arrays & Hashing'),
            createProblem('Unique Length 3 Palindromic Subsequences', 'Medium', 'Arrays & Hashing'),
            createProblem('Number of Sub-arrays With Odd Sum', 'Medium', 'Arrays & Hashing'),
            createProblem('Minimum Number of Swaps to Make The String Balanced', 'Medium', 'Arrays & Hashing'),
            createProblem('Number of Pairs of Interchangeable Rectangles', 'Medium', 'Arrays & Hashing'),
            createProblem('Maximum Product of The Length of Two Palindromic Subsequences', 'Medium', 'Arrays & Hashing'),
            createProblem('Grid Game', 'Medium', 'Arrays & Hashing'),
            createProblem('Find All Anagrams in a String', 'Medium', 'Arrays & Hashing'),
            createProblem('Find The Index of The First Occurrence in a String', 'Easy', 'Arrays & Hashing'),
            createProblem('Wiggle Sort', 'Medium', 'Arrays & Hashing'),
            createProblem('Largest Number', 'Medium', 'Arrays & Hashing'),
            createProblem('Continuous Subarray Sum', 'Medium', 'Arrays & Hashing'),
            createProblem('Push Dominoes', 'Medium', 'Arrays & Hashing'),
            createProblem('Repeated DNA Sequences', 'Medium', 'Arrays & Hashing'),
            createProblem('Insert Delete Get Random O(1)', 'Medium', 'Arrays & Hashing'),
            createProblem('Check if a String Contains all Binary Codes of Size K', 'Medium', 'Arrays & Hashing'),
            createProblem('Non Decreasing Array', 'Medium', 'Arrays & Hashing'),
            createProblem('Number of Ways to Split Array', 'Medium', 'Arrays & Hashing'),
            createProblem('Sign of An Array', 'Easy', 'Arrays & Hashing'),
            createProblem('Find the Difference of Two Arrays', 'Easy', 'Arrays & Hashing'),
            createProblem('Uncommon Words from Two Sentences', 'Easy', 'Arrays & Hashing'),
            createProblem('Design Parking System', 'Easy', 'Arrays & Hashing'),
            createProblem('Shifting Letters II', 'Medium', 'Arrays & Hashing'),
            createProblem('Number of Zero-Filled Subarrays', 'Medium', 'Arrays & Hashing'),
            createProblem('Word Subsets', 'Medium', 'Arrays & Hashing'),
            createProblem('Optimal Partition of String', 'Medium', 'Arrays & Hashing'),
            createProblem('Design Underground System', 'Medium', 'Arrays & Hashing'),
            createProblem('Minimum Penalty for a Shop', 'Medium', 'Arrays & Hashing'),
            createProblem('Champagne Tower', 'Medium', 'Arrays & Hashing'),
            createProblem('Sum of Absolute Differences in a Sorted Array', 'Medium', 'Arrays & Hashing'),
            createProblem('Design a Food Rating System', 'Medium', 'Arrays & Hashing'),
            createProblem('Convert an Array Into a 2D Array With Conditions', 'Medium', 'Arrays & Hashing'),
            createProblem('Minimum Numbers of Operations to Make Array Empty', 'Medium', 'Arrays & Hashing'),
            createProblem('Divide Array Into Arrays With Max Difference', 'Medium', 'Arrays & Hashing'),
            createProblem('Sequential Digits', 'Medium', 'Arrays & Hashing'),
            createProblem('Sort Characters By Frequency', 'Medium', 'Arrays & Hashing'),
            createProblem('Sort the Jumbled Numbers', 'Medium', 'Arrays & Hashing'),
            createProblem('Find Polygon with the Largest Perimeter', 'Medium', 'Arrays & Hashing'),
            createProblem('Minimum Remove to Make Valid Parentheses', 'Medium', 'Arrays & Hashing'),
            createProblem('Contiguous Array', 'Medium', 'Arrays & Hashing'),
            createProblem('Count Number of Bad Pairs', 'Medium', 'Arrays & Hashing'),
            createProblem('Find All Duplicates in an Array', 'Medium', 'Arrays & Hashing'),
            createProblem('Find the Length of the Longest Common Prefix', 'Medium', 'Arrays & Hashing'),
            createProblem('Count Unguarded Cells in the Grid', 'Medium', 'Arrays & Hashing'),
            createProblem('Text Justification', 'Hard', 'Arrays & Hashing'),
            createProblem('Naming a Company', 'Hard', 'Arrays & Hashing'),
            createProblem('Number of Submatrices that Sum to Target', 'Hard', 'Arrays & Hashing'),
            createProblem('First Missing Positive', 'Hard', 'Arrays & Hashing'),
            createProblem('Shortest Palindrome', 'Hard', 'Arrays & Hashing')
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
            createProblem('Reverse String', 'Easy', 'Two Pointers'),
            createProblem('Valid Palindrome II', 'Easy', 'Two Pointers'),
            createProblem('Valid Word Abbreviation', 'Easy', 'Two Pointers'),
            createProblem('Merge Strings Alternately', 'Easy', 'Two Pointers'),
            createProblem('Merge Sorted Array', 'Easy', 'Two Pointers'),
            createProblem('Merge Two 2D Arrays by Summing Values', 'Easy', 'Two Pointers'),
            createProblem('Move Zeroes', 'Easy', 'Two Pointers'),
            createProblem('Remove Duplicates From Sorted Array', 'Easy', 'Two Pointers'),
            createProblem('Squares of a Sorted Array', 'Easy', 'Two Pointers'),
            createProblem('Assign Cookies', 'Easy', 'Two Pointers'),
            createProblem('Find First Palindromic String in the Array', 'Easy', 'Two Pointers'),
            createProblem('Sort Array by Parity', 'Easy', 'Two Pointers'),
            createProblem('Reverse Words in a String III', 'Easy', 'Two Pointers'),
            createProblem('Backspace String Compare', 'Easy', 'Two Pointers'),
            createProblem('Check If Two String Arrays are Equivalent', 'Easy', 'Two Pointers'),
            createProblem('Apply Operations to an Array', 'Easy', 'Two Pointers'),
            createProblem('Adding Spaces to a String', 'Medium', 'Two Pointers'),
            createProblem('String Compression', 'Medium', 'Two Pointers'),
            createProblem('Remove Duplicates From Sorted Array II', 'Medium', 'Two Pointers'),
            createProblem('Partition Array According to Given Pivot', 'Medium', 'Two Pointers'),
            createProblem('3Sum', 'Medium', 'Two Pointers'),
            createProblem('4Sum', 'Medium', 'Two Pointers'),
            createProblem('Rotate Array', 'Medium', 'Two Pointers'),
            createProblem('Container With Most Water', 'Medium', 'Two Pointers'),
            createProblem('Number of Subsequences That Satisfy The Given Sum Condition', 'Medium', 'Two Pointers'),
            createProblem('Array With Elements Not Equal to Average of Neighbors', 'Medium', 'Two Pointers'),
            createProblem('Divide Players Into Teams of Equal Skill', 'Medium', 'Two Pointers'),
            createProblem('Boats to Save People', 'Medium', 'Two Pointers'),
            createProblem('K-th Symbol in Grammar', 'Medium', 'Two Pointers'),
            createProblem('Minimum Time To Make Rope Colorful', 'Medium', 'Two Pointers'),
            createProblem('Rearrange Array Elements by Sign', 'Medium', 'Two Pointers'),
            createProblem('Bag of Tokens', 'Medium', 'Two Pointers'),
            createProblem('Minimum Length of String after Deleting Similar Ends', 'Medium', 'Two Pointers'),
            createProblem('Sentence Similarity III', 'Medium', 'Two Pointers'),
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
            createProblem('Contains Duplicate II', 'Easy', 'Sliding Window'),
            createProblem('Best Time to Buy And Sell Stock', 'Easy', 'Sliding Window'),
            createProblem('Minimum Recolors to Get K Consecutive Black Blocks', 'Easy', 'Sliding Window'),
            createProblem('Minimum Difference Between Highest And Lowest of K Scores', 'Easy', 'Sliding Window'),
            createProblem('Number of Sub Arrays of Size K and Avg Greater than or Equal to Threshold', 'Medium', 'Sliding Window'),
            createProblem('Grumpy Bookstore Owner', 'Medium', 'Sliding Window'),
            createProblem('Alternating Groups II', 'Medium', 'Sliding Window'),
            createProblem('Longest Substring Without Repeating Characters', 'Medium', 'Sliding Window'),
            createProblem('Longest Substring with At Most Two Distinct Characters', 'Medium', 'Sliding Window'),
            createProblem('Longest Repeating Character Replacement', 'Medium', 'Sliding Window'),
            createProblem('Permutation In String', 'Medium', 'Sliding Window'),
            createProblem('Frequency of The Most Frequent Element', 'Medium', 'Sliding Window'),
            createProblem('Fruits into Basket', 'Medium', 'Sliding Window'),
            createProblem('Maximum Number of Vowels in a Substring of Given Length', 'Medium', 'Sliding Window'),
            createProblem('Minimum Number of Flips to Make The Binary String Alternating', 'Medium', 'Sliding Window'),
            createProblem('Defuse the Bomb', 'Easy', 'Sliding Window'),
            createProblem('Minimum Size Subarray Sum', 'Medium', 'Sliding Window'),
            createProblem('Find K Closest Elements', 'Medium', 'Sliding Window'),
            createProblem('Minimum Operations to Reduce X to Zero', 'Medium', 'Sliding Window'),
            createProblem('Get Equal Substrings Within Budget', 'Medium', 'Sliding Window'),
            createProblem('Number of Substrings Containing All Three Characters', 'Medium', 'Sliding Window'),
            createProblem('Binary Subarrays with Sum', 'Medium', 'Sliding Window'),
            createProblem('Count Number of Nice Subarrays', 'Medium', 'Sliding Window'),
            createProblem('Subarray Product Less Than K', 'Medium', 'Sliding Window'),
            createProblem('Max Consecutive Ones III', 'Medium', 'Sliding Window'),
            createProblem('Find the Power of K-Size Subarrays I', 'Medium', 'Sliding Window'),
            createProblem('Maximum Sum of Distinct Subarrays With Length K', 'Medium', 'Sliding Window'),
            createProblem('Length of Longest Subarray With at Most K Frequency', 'Medium', 'Sliding Window'),
            createProblem('Count Subarrays Where Max Element Appears at Least K Times', 'Medium', 'Sliding Window'),
            createProblem('Maximum Beauty of an Array After Applying Operation', 'Medium', 'Sliding Window'),
            createProblem('Take K of Each Character From Left and Right', 'Medium', 'Sliding Window'),
            createProblem('Count of Substrings Containing Every Vowel and K Consonants II', 'Medium', 'Sliding Window'),
            createProblem('Minimum Window Substring', 'Hard', 'Sliding Window'),
            createProblem('Sliding Window Maximum', 'Hard', 'Sliding Window'),
            createProblem('Subarrays with K Different Integers', 'Hard', 'Sliding Window'),
            createProblem('Minimum Number of Operations to Make Array Continuous', 'Hard', 'Sliding Window'),
            createProblem('Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit', 'Medium', 'Sliding Window'),
            createProblem('Smallest Range Covering Elements from K Lists', 'Hard', 'Sliding Window')
        ],
        prerequisites: [
            'arrays-hashing'
        ]
    },
    {
        id: 'stack',
        name: 'Stack',
        problems: [
            createProblem('Crawler Log Folder', 'Easy', 'Stack'),
            createProblem('Baseball Game', 'Easy', 'Stack'),
            createProblem('Valid Parentheses', 'Easy', 'Stack'),
            createProblem('Implement Stack Using Queues', 'Easy', 'Stack'),
            createProblem('Implement Queue using Stacks', 'Easy', 'Stack'),
            createProblem('Final Prices With a Special Discount in a Shop', 'Easy', 'Stack'),
            createProblem('Make The String Great', 'Easy', 'Stack'),
            createProblem('Min Stack', 'Medium', 'Stack'),
            createProblem('Evaluate Reverse Polish Notation', 'Medium', 'Stack'),
            createProblem('Removing Stars From a String', 'Medium', 'Stack'),
            createProblem('Validate Stack Sequences', 'Medium', 'Stack'),
            createProblem('Asteroid Collision', 'Medium', 'Stack'),
            createProblem('Daily Temperatures', 'Medium', 'Stack'),
            createProblem('Online Stock Span', 'Medium', 'Stack'),
            createProblem('Car Fleet', 'Medium', 'Stack'),
            createProblem('Simplify Path', 'Medium', 'Stack'),
            createProblem('Decode String', 'Medium', 'Stack'),
            createProblem('Remove K Digits', 'Medium', 'Stack'),
            createProblem('Remove All Adjacent Duplicates In String II', 'Medium', 'Stack'),
            createProblem('Reverse Substrings Between Each Pair of Parentheses', 'Medium', 'Stack'),
            createProblem('Minimum String Length After Removing Substrings', 'Easy', 'Stack'),
            createProblem('Clear Digits', 'Easy', 'Stack'),
            createProblem('Minimum Add to Make Parentheses Valid', 'Medium', 'Stack'),
            createProblem('Maximum Width Ramp', 'Medium', 'Stack'),
            createProblem('Basic Calculator II', 'Medium', 'Stack'),
            createProblem('132 Pattern', 'Medium', 'Stack'),
            createProblem('Flatten Nested List Iterator', 'Medium', 'Stack'),
            createProblem('Sum of Subarray Minimums', 'Medium', 'Stack'),
            createProblem('Maximum Frequency Stack', 'Hard', 'Stack'),
            createProblem('Robot Collisions', 'Hard', 'Stack'),
            createProblem('Number of Visible People in a Queue', 'Hard', 'Stack'),
            createProblem('Largest Rectangle In Histogram', 'Hard', 'Stack'),
            createProblem('Shortest Subarray with Sum at Least K', 'Hard', 'Stack'),
            createProblem('Parsing A Boolean Expression', 'Hard', 'Stack'),
            createProblem('Number of Atoms', 'Hard', 'Stack')
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
            createProblem('Search Insert Position', 'Easy', 'Binary Search'),
            createProblem('Guess Number Higher Or Lower', 'Easy', 'Binary Search'),
            createProblem('Arranging Coins', 'Easy', 'Binary Search'),
            createProblem('Valid Perfect Square', 'Easy', 'Binary Search'),
            createProblem('Sqrt(x)', 'Easy', 'Binary Search'),
            createProblem('Single Element in a Sorted Array', 'Medium', 'Binary Search'),
            createProblem('Find Peak Element', 'Medium', 'Binary Search'),
            createProblem('Successful Pairs of Spells and Potions', 'Medium', 'Binary Search'),
            createProblem('Search a 2D Matrix', 'Medium', 'Binary Search'),
            createProblem('Koko Eating Bananas', 'Medium', 'Binary Search'),
            createProblem('Capacity to Ship Packages Within D Days', 'Medium', 'Binary Search'),
            createProblem('Maximum Candies Allocated to K Children', 'Medium', 'Binary Search'),
            createProblem('House Robber IV', 'Medium', 'Binary Search'),
            createProblem('Minimize the Maximum Difference of Pairs', 'Medium', 'Binary Search'),
            createProblem('Minimized Maximum of Products Distributed to Any Store', 'Medium', 'Binary Search'),
            createProblem('Minimum Limit of Balls in a Bag', 'Medium', 'Binary Search'),
            createProblem('Minimum Time to Repair Cars', 'Medium', 'Binary Search'),
            createProblem('Find Minimum In Rotated Sorted Array', 'Medium', 'Binary Search'),
            createProblem('Search In Rotated Sorted Array', 'Medium', 'Binary Search'),
            createProblem('Search In Rotated Sorted Array II', 'Medium', 'Binary Search'),
            createProblem('Time Based Key Value Store', 'Medium', 'Binary Search'),
            createProblem('Find First And Last Position of Element In Sorted Array', 'Medium', 'Binary Search'),
            createProblem('Maximum Number of Removable Characters', 'Medium', 'Binary Search'),
            createProblem('Most Beautiful Item for Each Query', 'Medium', 'Binary Search'),
            createProblem('Random Pick with Weight', 'Medium', 'Binary Search'),
            createProblem('Search Suggestions System', 'Medium', 'Binary Search'),
            createProblem('Count the Number of Fair Pairs', 'Medium', 'Binary Search'),
            createProblem('Split Array Largest Sum', 'Hard', 'Binary Search'),
            createProblem('Find K-th Smallest Pair Distance', 'Hard', 'Binary Search'),
            createProblem('Median of Two Sorted Arrays', 'Hard', 'Binary Search'),
            createProblem('Find in Mountain Array', 'Hard', 'Binary Search'),
            createProblem('Kth Smallest Product of Two Sorted Arrays', 'Hard', 'Binary Search')
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
            createProblem('Palindrome Linked List', 'Easy', 'Linked List'),
            createProblem('Remove Linked List Elements', 'Easy', 'Linked List'),
            createProblem('Remove Duplicates From Sorted List', 'Easy', 'Linked List'),
            createProblem('Middle of the Linked List', 'Easy', 'Linked List'),
            createProblem('Intersection of Two Linked Lists', 'Easy', 'Linked List'),
            createProblem('Merge in Between Linked Lists', 'Medium', 'Linked List'),
            createProblem('Merge Nodes in Between Zeros', 'Medium', 'Linked List'),
            createProblem('Find the Minimum and Maximum Number of Nodes Between Critical Points', 'Medium', 'Linked List'),
            createProblem('Remove Nodes From Linked List', 'Medium', 'Linked List'),
            createProblem('Reorder List', 'Medium', 'Linked List'),
            createProblem('Maximum Twin Sum Of A Linked List', 'Medium', 'Linked List'),
            createProblem('Remove Nth Node From End of List', 'Medium', 'Linked List'),
            createProblem('Delete Nodes From Linked List Present in Array', 'Medium', 'Linked List'),
            createProblem('Swapping Nodes in a Linked List', 'Medium', 'Linked List'),
            createProblem('Copy List With Random Pointer', 'Medium', 'Linked List'),
            createProblem('Design Linked List', 'Medium', 'Linked List'),
            createProblem('Design Browser History', 'Medium', 'Linked List'),
            createProblem('Add Two Numbers', 'Medium', 'Linked List'),
            createProblem('Add Two Numbers II', 'Medium', 'Linked List'),
            createProblem('Find The Duplicate Number', 'Medium', 'Linked List'),
            createProblem('Rotate List', 'Medium', 'Linked List'),
            createProblem('Reverse Linked List II', 'Medium', 'Linked List'),
            createProblem('Design Circular Queue', 'Medium', 'Linked List'),
            createProblem('Insertion Sort List', 'Medium', 'Linked List'),
            createProblem('Split Linked List in Parts', 'Medium', 'Linked List'),
            createProblem('LRU Cache', 'Medium', 'Linked List'),
            createProblem('LFU Cache', 'Hard', 'Linked List'),
            createProblem('Swap Nodes In Pairs', 'Medium', 'Linked List'),
            createProblem('Sort List', 'Medium', 'Linked List'),
            createProblem('Partition List', 'Medium', 'Linked List'),
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
            createProblem('Binary Tree Inorder Traversal', 'Easy', 'Trees'),
            createProblem('Binary Tree Preorder Traversal', 'Easy', 'Trees'),
            createProblem('Binary Tree Postorder Traversal', 'Easy', 'Trees'),
            createProblem('N-ary Tree Postorder Traversal', 'Easy', 'Trees'),
            createProblem('Invert Binary Tree', 'Easy', 'Trees'),
            createProblem('Maximum Depth of Binary Tree', 'Easy', 'Trees'),
            createProblem('Diameter of Binary Tree', 'Easy', 'Trees'),
            createProblem('Balanced Binary Tree', 'Easy', 'Trees'),
            createProblem('Same Tree', 'Easy', 'Trees'),
            createProblem('Subtree of Another Tree', 'Easy', 'Trees'),
            createProblem('Convert Sorted Array to Binary Search Tree', 'Easy', 'Trees'),
            createProblem('Merge Two Binary Trees', 'Easy', 'Trees'),
            createProblem('Path Sum', 'Easy', 'Trees'),
            createProblem('Range Sum of BST', 'Easy', 'Trees'),
            createProblem('Leaf-Similar Trees', 'Easy', 'Trees'),
            createProblem('Evaluate Boolean Binary Tree', 'Easy', 'Trees'),
            createProblem('Create Binary Tree From Descriptions', 'Medium', 'Trees'),
            createProblem('Symmetric Tree', 'Easy', 'Trees'),
            createProblem('Minimum Distance between BST Nodes', 'Easy', 'Trees'),
            createProblem('Populating Next Right Pointers In Each Node', 'Medium', 'Trees'),
            createProblem('Binary Tree Vertical Order Traversal', 'Medium', 'Trees'),
            createProblem('Construct String From Binary Tree', 'Medium', 'Trees'),
            createProblem('Lowest Common Ancestor of a Binary Tree', 'Medium', 'Trees'),
            createProblem('Lowest Common Ancestor of a Binary Tree III', 'Medium', 'Trees'),
            createProblem('Lowest Common Ancestor of a Binary Search Tree', 'Medium', 'Trees'),
            createProblem('Insert into a Binary Search Tree', 'Medium', 'Trees'),
            createProblem('Delete Node in a BST', 'Medium', 'Trees'),
            createProblem('Binary Tree Level Order Traversal', 'Medium', 'Trees'),
            createProblem('Binary Tree Right Side View', 'Medium', 'Trees'),
            createProblem('Reverse Odd Levels of Binary Tree', 'Medium', 'Trees'),
            createProblem('Minimum Number of Operations to Sort a Binary Tree by Level', 'Medium', 'Trees'),
            createProblem('Kth Largest Sum in a Binary Tree', 'Medium', 'Trees'),
            createProblem('Cousins in Binary Tree II', 'Medium', 'Trees'),
            createProblem('Linked List in Binary Tree', 'Medium', 'Trees'),
            createProblem('Minimum Time to Collect All Apples in a Tree', 'Medium', 'Trees'),
            createProblem('Binary Tree Zigzag Level Order Traversal', 'Medium', 'Trees'),
            createProblem('Construct Quad Tree', 'Medium', 'Trees'),
            createProblem('Find Duplicate Subtrees', 'Medium', 'Trees'),
            createProblem('Check Completeness of a Binary Tree', 'Medium', 'Trees'),
            createProblem('Construct Binary Tree from Inorder and Postorder Traversal', 'Medium', 'Trees'),
            createProblem('Maximum Width of Binary Tree', 'Medium', 'Trees'),
            createProblem('Time Needed to Inform All Employees', 'Medium', 'Trees'),
            createProblem('Count Good Nodes In Binary Tree', 'Medium', 'Trees'),
            createProblem('Validate Binary Search Tree', 'Medium', 'Trees'),
            createProblem('Kth Smallest Element In a Bst', 'Medium', 'Trees'),
            createProblem('Recover Binary Search Tree', 'Medium', 'Trees'),
            createProblem('Construct Binary Tree From Preorder And Inorder Traversal', 'Medium', 'Trees'),
            createProblem('Construct Binary Tree from Preorder and Postorder Traversal', 'Medium', 'Trees'),
            createProblem('Unique Binary Search Trees', 'Medium', 'Trees'),
            createProblem('Unique Binary Search Trees II', 'Medium', 'Trees'),
            createProblem('Number of Good Leaf Nodes Pairs', 'Medium', 'Trees'),
            createProblem('Sum Root to Leaf Numbers', 'Medium', 'Trees'),
            createProblem('House Robber III', 'Medium', 'Trees'),
            createProblem('Flip Equivalent Binary Trees', 'Medium', 'Trees'),
            createProblem('Operations On Tree', 'Medium', 'Trees'),
            createProblem('All Possible Full Binary Trees', 'Medium', 'Trees'),
            createProblem('Find Bottom Left Tree Value', 'Medium', 'Trees'),
            createProblem('Trim a Binary Search Tree', 'Medium', 'Trees'),
            createProblem('Binary Search Tree Iterator', 'Medium', 'Trees'),
            createProblem('Validate Binary Tree Nodes', 'Medium', 'Trees'),
            createProblem('Find Largest Value in Tree Row', 'Medium', 'Trees'),
            createProblem('Pseudo-Palindromic Paths in a Binary Tree', 'Medium', 'Trees'),
            createProblem('Even Odd Tree', 'Medium', 'Trees'),
            createProblem('Smallest String Starting From Leaf', 'Medium', 'Trees'),
            createProblem('Delete Leaves With a Given Value', 'Medium', 'Trees'),
            createProblem('Delete Nodes And Return Forest', 'Medium', 'Trees'),
            createProblem('Distribute Coins in Binary Tree', 'Medium', 'Trees'),
            createProblem('Convert Bst to Greater Tree', 'Medium', 'Trees'),
            createProblem('Step-By-Step Directions From a Binary Tree Node to Another', 'Medium', 'Trees'),
            createProblem('Recover a Tree From Preorder Traversal', 'Hard', 'Trees'),
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
            createProblem('Count Prefix and Suffix Pairs I', 'Easy', 'Tries'),
            createProblem('Implement Trie Prefix Tree', 'Medium', 'Tries'),
            createProblem('Design Add And Search Words Data Structure', 'Medium', 'Tries'),
            createProblem('Counting Words With a Given Prefix', 'Easy', 'Tries'),
            createProblem('Remove Sub-Folders from the Filesystem', 'Medium', 'Tries'),
            createProblem('Extra Characters in a String', 'Medium', 'Tries'),
            createProblem('Word Search II', 'Hard', 'Tries'),
            createProblem('Sum of Prefix Scores of Strings', 'Hard', 'Tries'),
            createProblem('Count Prefix and Suffix Pairs II', 'Hard', 'Tries')
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
            createProblem('Take Gifts From the Richest Pile', 'Easy', 'Heap / Priority Queue'),
            createProblem('Final Array State After K Multiplication Operations I', 'Easy', 'Heap / Priority Queue'),
            createProblem('K Closest Points to Origin', 'Medium', 'Heap / Priority Queue'),
            createProblem('Kth Largest Element In An Array', 'Medium', 'Heap / Priority Queue'),
            createProblem('Task Scheduler', 'Medium', 'Heap / Priority Queue'),
            createProblem('Design Twitter', 'Medium', 'Heap / Priority Queue'),
            createProblem('Least Number of Unique Integers after K Removal', 'Medium', 'Heap / Priority Queue'),
            createProblem('Furthest Building You Can Reach', 'Medium', 'Heap / Priority Queue'),
            createProblem('Minimize Deviation in Array', 'Hard', 'Heap / Priority Queue'),
            createProblem('Maximum Subsequence Score', 'Medium', 'Heap / Priority Queue'),
            createProblem('Single Threaded CPU', 'Medium', 'Heap / Priority Queue'),
            createProblem('Seat Reservation Manager', 'Medium', 'Heap / Priority Queue'),
            createProblem('Process Tasks Using Servers', 'Medium', 'Heap / Priority Queue'),
            createProblem('Find The Kth Largest Integer In The Array', 'Medium', 'Heap / Priority Queue'),
            createProblem('Reorganize String', 'Medium', 'Heap / Priority Queue'),
            createProblem('Longest Happy String', 'Medium', 'Heap / Priority Queue'),
            createProblem('Car Pooling', 'Medium', 'Heap / Priority Queue'),
            createProblem('Range Sum of Sorted Subarray Sums', 'Medium', 'Heap / Priority Queue'),
            createProblem('Find Median From Data Stream', 'Hard', 'Heap / Priority Queue'),
            createProblem('Maximum Performance of a Team', 'Hard', 'Heap / Priority Queue'),
            createProblem('IPO', 'Hard', 'Heap / Priority Queue'),
            createProblem('Minimum Cost to Hire K Workers', 'Hard', 'Heap / Priority Queue'),
            createProblem('Number of Flowers in Full Bloom', 'Hard', 'Heap / Priority Queue'),
            createProblem('Constrained Subsequence Sum', 'Hard', 'Heap / Priority Queue'),
            createProblem('Find Building Where Alice and Bob Can Meet', 'Hard', 'Heap / Priority Queue')
        ],
        prerequisites: [
            'trees'
        ]
    },
    {
        id: 'backtracking',
        name: 'Backtracking',
        problems: [
            createProblem('Sum of All Subsets XOR Total', 'Easy', 'Backtracking'),
            createProblem('Subsets', 'Medium', 'Backtracking'),
            createProblem('Combination Sum', 'Medium', 'Backtracking'),
            createProblem('Combination Sum II', 'Medium', 'Backtracking'),
            createProblem('Combinations', 'Medium', 'Backtracking'),
            createProblem('Permutations', 'Medium', 'Backtracking'),
            createProblem('Subsets II', 'Medium', 'Backtracking'),
            createProblem('Permutations II', 'Medium', 'Backtracking'),
            createProblem('Generate Parentheses', 'Medium', 'Backtracking'),
            createProblem('Letter Tile Possibilities', 'Medium', 'Backtracking'),
            createProblem('Word Search', 'Medium', 'Backtracking'),
            createProblem('Palindrome Partitioning', 'Medium', 'Backtracking'),
            createProblem('Restore IP Addresses', 'Medium', 'Backtracking'),
            createProblem('Letter Combinations of a Phone Number', 'Medium', 'Backtracking'),
            createProblem('The k-th Lexicographical String of All Happy Strings of Length n', 'Medium', 'Backtracking'),
            createProblem('Matchsticks to Square', 'Medium', 'Backtracking'),
            createProblem('Splitting a String Into Descending Consecutive Values', 'Medium', 'Backtracking'),
            createProblem('Construct Smallest Number From DI String', 'Medium', 'Backtracking'),
            createProblem('Find Unique Binary String', 'Medium', 'Backtracking'),
            createProblem('Split a String Into the Max Number of Unique Substrings', 'Medium', 'Backtracking'),
            createProblem('Maximum Length of a Concatenated String With Unique Characters', 'Medium', 'Backtracking'),
            createProblem('Partition to K Equal Sum Subsets', 'Medium', 'Backtracking'),
            createProblem('The Number of Beautiful Subsets', 'Medium', 'Backtracking'),
            createProblem('Different Ways to Add Parentheses', 'Medium', 'Backtracking'),
            createProblem('Construct the Lexicographically Largest Valid Sequence', 'Medium', 'Backtracking'),
            createProblem('Count Number of Maximum Bitwise-OR Subsets', 'Medium', 'Backtracking'),
            createProblem('N Queens', 'Hard', 'Backtracking'),
            createProblem('N Queens II', 'Hard', 'Backtracking'),
            createProblem('Maximum Score Words Formed By Letters', 'Hard', 'Backtracking'),
            createProblem('Word Break II', 'Hard', 'Backtracking')
        ],
        prerequisites: [
            'trees'
        ]
    },
    {
        id: 'graphs',
        name: 'Graphs',
        problems: [
            createProblem('Island Perimeter', 'Easy', 'Graphs'),
            createProblem('Verifying An Alien Dictionary', 'Easy', 'Graphs'),
            createProblem('Find the Town Judge', 'Easy', 'Graphs'),
            createProblem('Flood Fill', 'Easy', 'Graphs'),
            createProblem('Count Servers that Communicate', 'Medium', 'Graphs'),
            createProblem('Find Champion II', 'Medium', 'Graphs'),
            createProblem('Number of Islands', 'Medium', 'Graphs'),
            createProblem('Max Area of Island', 'Medium', 'Graphs'),
            createProblem('Clone Graph', 'Medium', 'Graphs'),
            createProblem('Walls And Gates', 'Medium', 'Graphs'),
            createProblem('Rotting Oranges', 'Medium', 'Graphs'),
            createProblem('Count Sub Islands', 'Medium', 'Graphs'),
            createProblem('Pacific Atlantic Water Flow', 'Medium', 'Graphs'),
            createProblem('Surrounded Regions', 'Medium', 'Graphs'),
            createProblem('Reorder Routes to Make All Paths Lead to The City Zero', 'Medium', 'Graphs'),
            createProblem('Snakes And Ladders', 'Medium', 'Graphs'),
            createProblem('Open The Lock', 'Medium', 'Graphs'),
            createProblem('Find Eventual Safe States', 'Medium', 'Graphs'),
            createProblem('Course Schedule', 'Medium', 'Graphs'),
            createProblem('Course Schedule II', 'Medium', 'Graphs'),
            createProblem('Graph Valid Tree', 'Medium', 'Graphs'),
            createProblem('Course Schedule IV', 'Medium', 'Graphs'),
            createProblem('Check if Move Is Legal', 'Medium', 'Graphs'),
            createProblem('Shortest Bridge', 'Medium', 'Graphs'),
            createProblem('Shortest Path in Binary Matrix', 'Medium', 'Graphs'),
            createProblem('Number of Connected Components In An Undirected Graph', 'Medium', 'Graphs'),
            createProblem('Redundant Connection', 'Medium', 'Graphs'),
            createProblem('Accounts Merge', 'Medium', 'Graphs'),
            createProblem('Find Closest Node to Given Two Nodes', 'Medium', 'Graphs'),
            createProblem('As Far from Land as Possible', 'Medium', 'Graphs'),
            createProblem('Shortest Path with Alternating Colors', 'Medium', 'Graphs'),
            createProblem('Minimum Fuel Cost to Report to the Capital', 'Medium', 'Graphs'),
            createProblem('Minimum Score of a Path Between Two Cities', 'Medium', 'Graphs'),
            createProblem('Number of Closed Islands', 'Medium', 'Graphs'),
            createProblem('Number of Enclaves', 'Medium', 'Graphs'),
            createProblem('Number of Provinces', 'Medium', 'Graphs'),
            createProblem('Regions Cut By Slashes', 'Medium', 'Graphs'),
            createProblem('Minimum Number of Vertices to Reach all Nodes', 'Medium', 'Graphs'),
            createProblem('Is Graph Bipartite?', 'Medium', 'Graphs'),
            createProblem('Count the Number of Complete Components', 'Medium', 'Graphs'),
            createProblem('Evaluate Division', 'Medium', 'Graphs'),
            createProblem('Detonate the Maximum Bombs', 'Medium', 'Graphs'),
            createProblem('Find All Possible Recipes from Given Supplies', 'Medium', 'Graphs'),
            createProblem('Shortest Distance After Road Addition Queries I', 'Medium', 'Graphs'),
            createProblem('Minimum Height Trees', 'Medium', 'Graphs'),
            createProblem('Path with Maximum Gold', 'Medium', 'Graphs'),
            createProblem('Most Profitable Path in a Tree', 'Medium', 'Graphs'),
            createProblem('Maximum Number of Points From Grid Queries', 'Hard', 'Graphs'),
            createProblem('Maximum Number of K-Divisible Components', 'Hard', 'Graphs'),
            createProblem('Sliding Puzzle', 'Hard', 'Graphs'),
            createProblem('Largest Color Value in a Directed Graph', 'Hard', 'Graphs'),
            createProblem('Minimum Number of Days to Eat N Oranges', 'Hard', 'Graphs'),
            createProblem('Find All People With Secret', 'Hard', 'Graphs'),
            createProblem('Word Ladder', 'Hard', 'Graphs'),
            createProblem('Parallel Courses III', 'Hard', 'Graphs'),
            createProblem('Maximum Number of Fish in a Grid', 'Medium', 'Graphs')
        ],
        prerequisites: [
            'trees'
        ]
    },
    {
        id: 'advanced-graphs',
        name: 'Advanced Graphs',
        problems: [
            createProblem('Path with Minimum Effort', 'Medium', 'Advanced Graphs'),
            createProblem('Network Delay Time', 'Medium', 'Advanced Graphs'),
            createProblem('Reconstruct Itinerary', 'Hard', 'Advanced Graphs'),
            createProblem('Min Cost to Connect All Points', 'Medium', 'Advanced Graphs'),
            createProblem('Path with Maximum Probability', 'Medium', 'Advanced Graphs'),
            createProblem('Find the Safest Path in a Grid', 'Medium', 'Advanced Graphs'),
            createProblem('Swim In Rising Water', 'Hard', 'Advanced Graphs'),
            createProblem('Alien Dictionary', 'Hard', 'Advanced Graphs'),
            createProblem('Trapping Rain Water II', 'Hard', 'Advanced Graphs'),
            createProblem('Minimum Obstacle Removal to Reach Corner', 'Hard', 'Advanced Graphs'),
            createProblem('Minimum Cost to Make at Least One Valid Path in a Grid', 'Hard', 'Advanced Graphs'),
            createProblem('Minimum Time to Visit a Cell In a Grid', 'Hard', 'Advanced Graphs'),
            createProblem('Cheapest Flights Within K Stops', 'Medium', 'Advanced Graphs'),
            createProblem('Find the City With the Smallest Number of Neighbors at a Threshold Distance', 'Medium', 'Advanced Graphs'),
            createProblem('Minimum Cost to Convert String I', 'Medium', 'Advanced Graphs'),
            createProblem('Number of Ways to Arrive at Destination', 'Medium', 'Advanced Graphs'),
            createProblem('Making A Large Island', 'Hard', 'Advanced Graphs'),
            createProblem('Minimum Cost Walk in Weighted Graph', 'Hard', 'Advanced Graphs'),
            createProblem('Number of Good Paths', 'Hard', 'Advanced Graphs'),
            createProblem('Maximum Employees to Be Invited to a Meeting', 'Hard', 'Advanced Graphs'),
            createProblem('Remove Max Number of Edges to Keep Graph Fully Traversable', 'Hard', 'Advanced Graphs'),
            createProblem('Minimum Number of Days to Disconnect Island', 'Hard', 'Advanced Graphs'),
            createProblem('Second Minimum Time to Reach Destination', 'Hard', 'Advanced Graphs'),
            createProblem('Find Minimum Diameter After Merging Two Trees', 'Hard', 'Advanced Graphs'),
            createProblem('Find Critical and Pseudo Critical Edges in Minimum Spanning Tree', 'Hard', 'Advanced Graphs'),
            createProblem('Bus Routes', 'Hard', 'Advanced Graphs'),
            createProblem('Build a Matrix With Conditions', 'Hard', 'Advanced Graphs'),
            createProblem('Greatest Common Divisor Traversal', 'Hard', 'Advanced Graphs'),
            createProblem('Divide Nodes Into the Maximum Number of Groups', 'Hard', 'Advanced Graphs')
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
            createProblem('N-th Tribonacci Number', 'Easy', '1-D DP'),
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
            createProblem('Triangle', 'Medium', '1-D DP'),
            createProblem('Delete And Earn', 'Medium', '1-D DP'),
            createProblem('Paint House', 'Medium', '1-D DP'),
            createProblem('Filling Bookcase Shelves', 'Medium', '1-D DP'),
            createProblem('Combination Sum IV', 'Medium', '1-D DP'),
            createProblem('Perfect Squares', 'Medium', '1-D DP'),
            createProblem('Check if There is a Valid Partition For The Array', 'Medium', '1-D DP'),
            createProblem('Maximum Subarray Min Product', 'Medium', '1-D DP'),
            createProblem('Minimum Cost For Tickets', 'Medium', '1-D DP'),
            createProblem('Integer Break', 'Medium', '1-D DP'),
            createProblem('Number of Longest Increasing Subsequence', 'Medium', '1-D DP'),
            createProblem('Russian Doll Envelopes', 'Hard', '1-D DP'),
            createProblem('Stickers to Spell Word', 'Hard', '1-D DP'),
            createProblem('Uncrossed Lines', 'Medium', '1-D DP'),
            createProblem('Solving Questions With Brainpower', 'Medium', '1-D DP'),
            createProblem('Count Ways to Build Good Strings', 'Medium', '1-D DP'),
            createProblem('Ugly Number II', 'Medium', '1-D DP'),
            createProblem('New 21 Game', 'Medium', '1-D DP'),
            createProblem('Best Team with no Conflicts', 'Medium', '1-D DP'),
            createProblem('Longest String Chain', 'Medium', '1-D DP'),
            createProblem('Knight Dialer', 'Medium', '1-D DP'),
            createProblem('Partition Array for Maximum Sum', 'Medium', '1-D DP'),
            createProblem('Largest Divisible Subset', 'Medium', '1-D DP'),
            createProblem('Stone Game III', 'Hard', '1-D DP'),
            createProblem('Concatenated Words', 'Hard', '1-D DP'),
            createProblem('Maximize Score after N Operations', 'Hard', '1-D DP'),
            createProblem('Find the Longest Valid Obstacle Course at Each Position', 'Hard', '1-D DP'),
            createProblem('Minimum Number of Removals to Make Mountain Array', 'Hard', '1-D DP'),
            createProblem('Count all Valid Pickup and Delivery Options', 'Hard', '1-D DP'),
            createProblem('Number of Ways to Divide a Long Corridor', 'Hard', '1-D DP'),
            createProblem('Maximum Sum of 3 Non- Overlapping Subarrays', 'Hard', '1-D DP'),
            createProblem('Maximum Profit in Job Scheduling', 'Hard', '1-D DP'),
            createProblem('Student Attendance Record II', 'Hard', '1-D DP')
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
            createProblem('Unique Paths II', 'Medium', '2-D DP'),
            createProblem('Minimum Path Sum', 'Medium', '2-D DP'),
            createProblem('Maximum Number of Points with Cost', 'Medium', '2-D DP'),
            createProblem('Longest Common Subsequence', 'Medium', '2-D DP'),
            createProblem('Longest Palindromic Subsequence', 'Medium', '2-D DP'),
            createProblem('Length of Longest Fibonacci Subsequence', 'Medium', '2-D DP'),
            createProblem('Last Stone Weight II', 'Medium', '2-D DP'),
            createProblem('Best Time to Buy And Sell Stock With Cooldown', 'Medium', '2-D DP'),
            createProblem('Coin Change II', 'Medium', '2-D DP'),
            createProblem('Target Sum', 'Medium', '2-D DP'),
            createProblem('Interleaving String', 'Medium', '2-D DP'),
            createProblem('Stone Game', 'Medium', '2-D DP'),
            createProblem('Stone Game II', 'Medium', '2-D DP'),
            createProblem('Longest Increasing Path In a Matrix', 'Hard', '2-D DP'),
            createProblem('Maximal Square', 'Medium', '2-D DP'),
            createProblem('Count Square Submatrices with All Ones', 'Medium', '2-D DP'),
            createProblem('Ones and Zeroes', 'Medium', '2-D DP'),
            createProblem('2 Keys Keyboard', 'Medium', '2-D DP'),
            createProblem('Maximum Alternating Subsequence Sum', 'Medium', '2-D DP'),
            createProblem('Distinct Subsequences', 'Hard', '2-D DP'),
            createProblem('Edit Distance', 'Medium', '2-D DP'),
            createProblem('Number of Dice Rolls with Target Sum', 'Medium', '2-D DP'),
            createProblem('Minimum Falling Path Sum', 'Medium', '2-D DP'),
            createProblem('Out of Boundary Paths', 'Medium', '2-D DP'),
            createProblem('Longest Ideal Subsequence', 'Medium', '2-D DP'),
            createProblem('Count Number of Teams', 'Medium', '2-D DP'),
            createProblem('Burst Balloons', 'Hard', '2-D DP'),
            createProblem('Number of Ways to Rearrange Sticks With K Sticks Visible', 'Hard', '2-D DP'),
            createProblem('Regular Expression Matching', 'Hard', '2-D DP'),
            createProblem('Flip String to Monotone Increasing', 'Medium', '2-D DP'),
            createProblem('Maximum Value of K Coins from Piles', 'Hard', '2-D DP'),
            createProblem('Number of Music Playlists', 'Hard', '2-D DP'),
            createProblem('Number of Ways to Form a Target String Given a Dictionary', 'Hard', '2-D DP'),
            createProblem('Profitable Schemes', 'Hard', '2-D DP'),
            createProblem('Minimum Cost to Cut a Stick', 'Hard', '2-D DP'),
            createProblem('Painting the Walls', 'Hard', '2-D DP'),
            createProblem('Number of Ways to Stay in the Same Place After Some Steps', 'Hard', '2-D DP'),
            createProblem('String Compression II', 'Hard', '2-D DP'),
            createProblem('Minimum Difficulty of a Job Schedule', 'Hard', '2-D DP'),
            createProblem('Arithmetic Slices II', 'Hard', '2-D DP'),
            createProblem('K Inverse Pairs Array', 'Hard', '2-D DP'),
            createProblem('Cherry Pickup', 'Hard', '2-D DP'),
            createProblem('Cherry Pickup II', 'Hard', '2-D DP'),
            createProblem('Minimum Falling Path Sum II', 'Hard', '2-D DP'),
            createProblem('Freedom Trail', 'Hard', '2-D DP'),
            createProblem('Split Array With Same Average', 'Hard', '2-D DP'),
            createProblem('Shortest Common Supersequence', 'Hard', '2-D DP'),
            createProblem('Count Vowels Permutation', 'Hard', '2-D DP')
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
            createProblem('Buy Two Chocolates', 'Easy', 'Greedy'),
            createProblem('Lemonade Change', 'Easy', 'Greedy'),
            createProblem('Minimum Number of Moves to Seat Everyone', 'Easy', 'Greedy'),
            createProblem('Maximum Odd Binary Number', 'Easy', 'Greedy'),
            createProblem('Maximum Nesting Depth of the Parentheses', 'Easy', 'Greedy'),
            createProblem('Check if One String Swap Can Make Strings Equal', 'Easy', 'Greedy'),
            createProblem('Minimum Operations to Make Binary Array Elements Equal to One I', 'Easy', 'Greedy'),
            createProblem('Buildings With an Ocean View', 'Medium', 'Greedy'),
            createProblem('Minimum Length of String After Operations', 'Medium', 'Greedy'),
            createProblem('Construct K Palindrome Strings', 'Medium', 'Greedy'),
            createProblem('Separate Black and White Balls', 'Medium', 'Greedy'),
            createProblem('Minimum Increment to Make Array Unique', 'Medium', 'Greedy'),
            createProblem('Maximum Subarray', 'Medium', 'Greedy'),
            createProblem('Maximum Absolute Sum of Any Subarray', 'Medium', 'Greedy'),
            createProblem('Maximum Sum Circular Subarray', 'Medium', 'Greedy'),
            createProblem('Minimum Swaps to Group All 1\'s Together II', 'Medium', 'Greedy'),
            createProblem('Longest Turbulent Subarray', 'Medium', 'Greedy'),
            createProblem('Jump Game', 'Medium', 'Greedy'),
            createProblem('Jump Game II', 'Medium', 'Greedy'),
            createProblem('Jump Game VII', 'Medium', 'Greedy'),
            createProblem('Gas Station', 'Medium', 'Greedy'),
            createProblem('Hand of Straights', 'Medium', 'Greedy'),
            createProblem('Minimum Number of Changes to Make Binary String Beautiful', 'Medium', 'Greedy'),
            createProblem('Minimize Maximum of Array', 'Medium', 'Greedy'),
            createProblem('Maximize Y-Sum by Picking a Triplet of Distinct X-Values', 'Medium', 'Greedy'),
            createProblem('Maximum Total Importance of Roads', 'Medium', 'Greedy'),
            createProblem('Minimum Number of Pushes to Type Word II', 'Medium', 'Greedy'),
            createProblem('Dota2 Senate', 'Medium', 'Greedy'),
            createProblem('Maximum Points You Can Obtain From Cards', 'Medium', 'Greedy'),
            createProblem('Merge Triplets to Form Target Triplet', 'Medium', 'Greedy'),
            createProblem('Partition Labels', 'Medium', 'Greedy'),
            createProblem('Valid Parenthesis String', 'Medium', 'Greedy'),
            createProblem('Check if a Parentheses String Can Be Valid', 'Medium', 'Greedy'),
            createProblem('Eliminate Maximum Number of Monsters', 'Medium', 'Greedy'),
            createProblem('Two City Scheduling', 'Medium', 'Greedy'),
            createProblem('Maximum Length of Pair Chain', 'Medium', 'Greedy'),
            createProblem('Best Sightseeing Pair', 'Medium', 'Greedy'),
            createProblem('Make Lexicographically Smallest Array by Swapping Elements', 'Medium', 'Greedy'),
            createProblem('Minimum Deletions to Make Character Frequencies Unique', 'Medium', 'Greedy'),
            createProblem('Minimum Deletions to Make String Balanced', 'Medium', 'Greedy'),
            createProblem('Candy', 'Hard', 'Greedy'),
            createProblem('Remove Colored Pieces if Both Neighbors are the Same Color', 'Medium', 'Greedy'),
            createProblem('Maximum Score From Removing Substrings', 'Medium', 'Greedy'),
            createProblem('Maximum Element After Decreasing and Rearranging', 'Medium', 'Greedy'),
            createProblem('Number of Laser Beams in a Bank', 'Medium', 'Greedy'),
            createProblem('Maximum Distance in Arrays', 'Medium', 'Greedy'),
            createProblem('Reveal Cards In Increasing Order', 'Medium', 'Greedy'),
            createProblem('Construct String With Repeat Limit', 'Medium', 'Greedy'),
            createProblem('Find Valid Matrix Given Row and Column Sums', 'Medium', 'Greedy'),
            createProblem('Score After Flipping Matrix', 'Medium', 'Greedy'),
            createProblem('Flip Columns For Maximum Number of Equal Rows', 'Medium', 'Greedy'),
            createProblem('Maximum Matrix Sum', 'Medium', 'Greedy'),
            createProblem('Make Two Arrays Equal by Reversing Subarrays', 'Easy', 'Greedy'),
            createProblem('Shortest Subarray to be Removed to Make Array Sorted', 'Medium', 'Greedy'),
            createProblem('Max Chunks To Make Sorted', 'Medium', 'Greedy'),
            createProblem('Next Permutation', 'Medium', 'Greedy'),
            createProblem('Maximum Swap', 'Medium', 'Greedy'),
            createProblem('Maximum Frequency After Subarray Operation', 'Medium', 'Greedy'),
            createProblem('Put Marbles in Bags', 'Hard', 'Greedy'),
            createProblem('Minimum Number of Increments on Subarrays to Form a Target Array', 'Hard', 'Greedy'),
            createProblem('Apply Operations to Maximize Score', 'Hard', 'Greedy'),
            createProblem('Minimum Difference Between Largest and Smallest Value in Three Moves', 'Medium', 'Greedy'),
            createProblem('Maximal Score After Applying K Operations', 'Medium', 'Greedy'),
            createProblem('Minimum Number of K Consecutive Bit Flips', 'Hard', 'Greedy'),
            createProblem('Maximum Score of a Good Subarray', 'Hard', 'Greedy'),
            createProblem('Find the Maximum Sum of Node Values', 'Hard', 'Greedy')
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
            createProblem('Interval List Intersections', 'Medium', 'Intervals'),
            createProblem('Meeting Rooms', 'Easy', 'Intervals'),
            createProblem('Meeting Rooms II', 'Medium', 'Intervals'),
            createProblem('Meeting Rooms III', 'Hard', 'Intervals'),
            createProblem('Divide Intervals Into Minimum Number of Groups', 'Medium', 'Intervals'),
            createProblem('Remove Covered Intervals', 'Medium', 'Intervals'),
            createProblem('Minimum Number of Arrows to Burst Balloons', 'Medium', 'Intervals'),
            createProblem('The Number of the Smallest Unoccupied Chair', 'Medium', 'Intervals'),
            createProblem('Check if Grid can be Cut into Sections', 'Medium', 'Intervals'),
            createProblem('My Calendar I', 'Medium', 'Intervals'),
            createProblem('My Calendar II', 'Medium', 'Intervals'),
            createProblem('Count Days Without Meetings', 'Medium', 'Intervals'),
            createProblem('Minimum Interval to Include Each Query', 'Hard', 'Intervals'),
            createProblem('Data Stream as Disjoint Intervals', 'Hard', 'Intervals')
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
            createProblem('Single Number III', 'Medium', 'Bit Manipulation'),
            createProblem('Number of 1 Bits', 'Easy', 'Bit Manipulation'),
            createProblem('Counting Bits', 'Easy', 'Bit Manipulation'),
            createProblem('Add Binary', 'Easy', 'Bit Manipulation'),
            createProblem('Minimum Bit Flips to Convert Number', 'Easy', 'Bit Manipulation'),
            createProblem('Reverse Bits', 'Easy', 'Bit Manipulation'),
            createProblem('Missing Number', 'Easy', 'Bit Manipulation'),
            createProblem('Shuffle the Array', 'Easy', 'Bit Manipulation'),
            createProblem('Add to Array-Form of Integer', 'Easy', 'Bit Manipulation'),
            createProblem('Find the Difference', 'Easy', 'Bit Manipulation'),
            createProblem('Power of Two', 'Easy', 'Bit Manipulation'),
            createProblem('Sum of Two Integers', 'Medium', 'Bit Manipulation'),
            createProblem('Reverse Integer', 'Medium', 'Bit Manipulation'),
            createProblem('Bitwise XOR of All Pairings', 'Medium', 'Bit Manipulation'),
            createProblem('Largest Combination With Bitwise AND Greater Than Zero', 'Medium', 'Bit Manipulation'),
            createProblem('XOR Queries of a Subarray', 'Medium', 'Bit Manipulation'),
            createProblem('Maximum XOR for Each Query', 'Medium', 'Bit Manipulation'),
            createProblem('Neighboring Bitwise XOR', 'Medium', 'Bit Manipulation'),
            createProblem('Shortest Subarray With OR at Least K II', 'Medium', 'Bit Manipulation'),
            createProblem('Bitwise AND of Numbers Range', 'Medium', 'Bit Manipulation'),
            createProblem('Find Kth Bit in Nth Binary String', 'Medium', 'Bit Manipulation'),
            createProblem('Count Triplets That Can Form Two Arrays of Equal XOR', 'Medium', 'Bit Manipulation'),
            createProblem('Minimum Array End', 'Medium', 'Bit Manipulation'),
            createProblem('Find if Array Can Be Sorted', 'Medium', 'Bit Manipulation'),
            createProblem('Longest Subarray With Maximum Bitwise AND', 'Medium', 'Bit Manipulation'),
            createProblem('Longest Nice Subarray', 'Medium', 'Bit Manipulation'),
            createProblem('Find the Longest Substring Containing Vowels in Even Counts', 'Medium', 'Bit Manipulation'),
            createProblem('Minimize XOR', 'Medium', 'Bit Manipulation')
        ],
        prerequisites: [
            '1d-dp'
        ]
    },
    {
        id: 'math-geometry',
        name: 'Math & Geometry',
        problems: [
            createProblem('Excel Sheet Column Title', 'Easy', 'Math & Geometry'),
            createProblem('Greatest Common Divisor of Strings', 'Easy', 'Math & Geometry'),
            createProblem('Insert Greatest Common Divisors in Linked List', 'Medium', 'Math & Geometry'),
            createProblem('Count Odd Numbers in an Interval Range', 'Easy', 'Math & Geometry'),
            createProblem('Matrix Diagonal Sum', 'Easy', 'Math & Geometry'),
            createProblem('Calculate Money in Leetcode Bank', 'Easy', 'Math & Geometry'),
            createProblem('Largest Odd Number in String', 'Easy', 'Math & Geometry'),
            createProblem('Transpose Matrix', 'Easy', 'Math & Geometry'),
            createProblem('Image Smoother', 'Easy', 'Math & Geometry'),
            createProblem('Count of Matches in Tournament', 'Easy', 'Math & Geometry'),
            createProblem('Water Bottles', 'Easy', 'Math & Geometry'),
            createProblem('Largest Local Values in a Matrix', 'Easy', 'Math & Geometry'),
            createProblem('Power of Four', 'Easy', 'Math & Geometry'),
            createProblem('Lucky Numbers in a Matrix', 'Easy', 'Math & Geometry'),
            createProblem('Maximum Points on a Line', 'Hard', 'Math & Geometry'),
            createProblem('Magic Squares In Grid', 'Medium', 'Math & Geometry'),
            createProblem('Rotate Image', 'Medium', 'Math & Geometry'),
            createProblem('Spiral Matrix', 'Medium', 'Math & Geometry'),
            createProblem('Spiral Matrix II', 'Medium', 'Math & Geometry'),
            createProblem('Spiral Matrix III', 'Medium', 'Math & Geometry'),
            createProblem('Spiral Matrix IV', 'Medium', 'Math & Geometry'),
            createProblem('Set Matrix Zeroes', 'Medium', 'Math & Geometry'),
            createProblem('Happy Number', 'Easy', 'Math & Geometry'),
            createProblem('Plus One', 'Easy', 'Math & Geometry'),
            createProblem('Palindrome Number', 'Easy', 'Math & Geometry'),
            createProblem('Ugly Number', 'Easy', 'Math & Geometry'),
            createProblem('Convert 1D Array Into 2D Array', 'Easy', 'Math & Geometry'),
            createProblem('Shift 2D Grid', 'Easy', 'Math & Geometry'),
            createProblem('Roman to Integer', 'Easy', 'Math & Geometry'),
            createProblem('Integer to Roman', 'Medium', 'Math & Geometry'),
            createProblem('Pow(x, n)', 'Medium', 'Math & Geometry'),
            createProblem('Find the Punishment Number of an Integer', 'Medium', 'Math & Geometry'),
            createProblem('Check if Number is a Sum of Powers of Three', 'Medium', 'Math & Geometry'),
            createProblem('Multiply Strings', 'Medium', 'Math & Geometry'),
            createProblem('Detect Squares', 'Medium', 'Math & Geometry'),
            createProblem('Robot Bounded In Circle', 'Medium', 'Math & Geometry'),
            createProblem('Walking Robot Simulation', 'Medium', 'Math & Geometry'),
            createProblem('Zigzag Conversion', 'Medium', 'Math & Geometry'),
            createProblem('Rotating the Box', 'Medium', 'Math & Geometry'),
            createProblem('Sum of Square Numbers', 'Medium', 'Math & Geometry'),
            createProblem('Find Missing Observations', 'Medium', 'Math & Geometry'),
            createProblem('Minimum Time Difference', 'Medium', 'Math & Geometry'),
            createProblem('Largest Submatrix With Rearrangements', 'Medium', 'Math & Geometry'),
            createProblem('Count Primes', 'Medium', 'Math & Geometry'),
            createProblem('Distribute Candies Among Children II', 'Medium', 'Math & Geometry'),
            createProblem('K-th Smallest in Lexicographical Order', 'Hard', 'Math & Geometry'),
            createProblem('Minimum Operations to Make a Uni-Value Grid', 'Medium', 'Math & Geometry'),
            createProblem('Wildest Vertical Area Between Two Points Containing No Points', 'Easy', 'Math & Geometry'),
            createProblem('Tuple with Same Product', 'Medium', 'Math & Geometry'),
            createProblem('Lexicographical Numbers', 'Medium', 'Math & Geometry'),
            createProblem('Find the Winner of the Circular Game', 'Medium', 'Math & Geometry'),
            createProblem('Count Total Number of Colored Cells', 'Medium', 'Math & Geometry'),
            createProblem('Prime Subtraction Operation', 'Medium', 'Math & Geometry'),
            createProblem('Closest Prime Numbers in Range', 'Medium', 'Math & Geometry'),
            createProblem('Minimum Number of One Bit Operations to Make Integers Zero', 'Hard', 'Math & Geometry'),
            createProblem('Integer to English Words', 'Hard', 'Math & Geometry')
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
                    className: "container mx-auto px-4 sm:px-6 py-3 sm:py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-2 sm:mb-4 text-sm sm:text-base",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-3 h-3 sm:w-4 sm:h-4"
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
                className: "w-full flex justify-center py-6 sm:py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-7xl px-4 sm:px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        className: "flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6 sm:mb-8 w-full flex flex-col items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center",
                                        children: topic.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/topics/[id]/page.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this),
                                    totalCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full max-w-2xl mx-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-400 text-sm sm:text-base",
                                                        children: [
                                                            solvedCount,
                                                            " of ",
                                                            totalCount,
                                                            " problems solved"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/topics/[id]/page.tsx",
                                                        lineNumber: 55,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs sm:text-sm font-medium text-white",
                                                        children: [
                                                            "(",
                                                            Math.round(solvedCount / totalCount * 100),
                                                            "%)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/topics/[id]/page.tsx",
                                                        lineNumber: 58,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/topics/[id]/page.tsx",
                                                lineNumber: 54,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProgressBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                solved: solvedCount,
                                                total: totalCount
                                            }, void 0, false, {
                                                fileName: "[project]/app/topics/[id]/page.tsx",
                                                lineNumber: 62,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/topics/[id]/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/topics/[id]/page.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this),
                            topic.problems.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 gap-3 w-full max-w-5xl mx-auto",
                                children: topic.problems.map((problem, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProblemCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        problem: problem,
                                        index: index
                                    }, problem.id, false, {
                                        fileName: "[project]/app/topics/[id]/page.tsx",
                                        lineNumber: 71,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/topics/[id]/page.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-16",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-400 text-lg",
                                    children: "No problems in this topic yet. Add problems to get started!"
                                }, void 0, false, {
                                    fileName: "[project]/app/topics/[id]/page.tsx",
                                    lineNumber: 76,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/topics/[id]/page.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/topics/[id]/page.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
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