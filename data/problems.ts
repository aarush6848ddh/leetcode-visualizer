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
    starred: false,
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    topics: ['Arrays & Hashing'],
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
    starred: false,
  },
  {
    id: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    topics: ['Arrays & Hashing'],
    status: 'solved',
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
    videoUrl: 'https://www.youtube.com/watch?v=X2azb5oiplg',
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
  {
    id: 'is-subsequence',
    title: 'Is Subsequence',
    difficulty: 'Easy',
    topics: ['Two Pointers'],
    status: 'solved',
    leetcodeUrl: 'https://leetcode.com/problems/is-subsequence/',
    videoUrl: 'https://www.youtube.com/watch?v=V7B5CeB20Ow',
    explanation: `This solution uses two pointers to check if string s is a subsequence of string t.

**How it works:**
1. Initialize two pointers i and j to 0, pointing to the start of strings s and t respectively.
2. While both pointers are within their string bounds:
   - If s[i] matches t[j], increment i (we found a matching character in order).
   - Always increment j to continue searching through string t.
3. After the loop, check if i equals the length of s. If it does, all characters of s were found in order in t → return True. Otherwise, return False.

**Why this works:**
A subsequence means characters appear in the same relative order, but not necessarily consecutively. By using two pointers:
- Pointer i tracks our progress through s (the subsequence we're looking for).
- Pointer j scans through t (the string we're searching in).
- When we find a match, we advance i, meaning we've found that character of s in t.
- We always advance j to continue searching.
- If i reaches the end of s, we've found all characters in order → True.

This approach efficiently checks for subsequence in O(n) time where n is the length of t.`,
    code: `class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = j = 0
        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
            j += 1
        return i == len(s)`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
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
        starred: false,
      },
      {
        id: 'group-anagrams',
        title: 'Group Anagrams',
        difficulty: 'Medium',
        topics: ['Arrays & Hashing'],
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
        starred: false,
      },
      {
        id: 'top-k-frequent-elements',
        title: 'Top K Frequent Elements',
        difficulty: 'Medium',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
        videoUrl: 'https://www.youtube.com/watch?v=X2azb5oiplg',
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
        starred: false,
      },
      {
        id: 'score-of-a-string',
        title: 'Score of a String',
        difficulty: 'Easy',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/score-of-a-string/',
        videoUrl: 'https://www.youtube.com/watch?v=Hhvgr0SBkso',
        explanation: `This solution calculates the score of a string by summing the absolute differences between ASCII values of adjacent characters.

**How it works:**
1. Convert the string to a list of characters for easier iteration.
2. Initialize a result variable to 0.
3. Iterate through the string from the first character to the second-to-last character.
4. For each pair of adjacent characters, calculate the absolute difference between their ASCII values using ord().
5. Add this difference to the result.
6. Return the accumulated result.

**Why this works:**
The score is defined as the sum of absolute differences between ASCII values of adjacent characters. By iterating through the string and comparing each character with its neighbor, we can calculate all the required differences and sum them up. The absolute value ensures we always get a positive difference regardless of which character has a higher ASCII value.

Example: For "code", we calculate |'o' - 'c'| + |'d' - 'o'| + |'e' - 'd'| = |111 - 99| + |100 - 111| + |101 - 100| = 12 + 11 + 1 = 24.`,
        code: `class Solution:
    def scoreOfString(self, s: str) -> int:
        s_list = list(s)
        res = 0
        for i in range(len(s_list) - 1):
            res += abs(ord(s_list[i]) - ord(s_list[i + 1]))
        return res`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        starred: false,
      },
      {
        id: 'concatenation-of-array',
        title: 'Concatenation of Array',
        difficulty: 'Easy',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/concatenation-of-array/',
        videoUrl: 'https://www.youtube.com/watch?v=yLD4c8pJDac',
        explanation: `This solution creates a new array by concatenating the input array with itself.

**How it works:**
1. Initialize an empty result array ans.
2. Iterate twice (using range(2)) to duplicate the array.
3. For each iteration, loop through all elements in nums and append them to ans.
4. After both iterations, ans contains all elements from nums followed by all elements from nums again.
5. Return the concatenated array.

**Why this works:**
The problem requires creating an array of length 2n where the first n elements are the original array and the next n elements are the same array again. By iterating twice and appending all elements in each iteration, we effectively duplicate the entire array, creating the concatenation [nums[0], nums[1], ..., nums[n-1], nums[0], nums[1], ..., nums[n-1]].

Example: For nums = [1,4,1,2], after the first iteration ans = [1,4,1,2], and after the second iteration ans = [1,4,1,2,1,4,1,2].`,
        code: `class Solution:
    def getConcatenation(self, nums: List[int]) -> List[int]:
        ans = []
        for i in range(2):
            for n in nums:
                ans.append(n)
        return ans`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        starred: false,
      },
      {
        id: 'replace-elements-with-greatest-element-on-right-side',
        title: 'Replace Elements With Greatest Element On Right Side',
        difficulty: 'Easy',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/',
        videoUrl: 'https://www.youtube.com/watch?v=P_1CJ14VVwA',
        explanation: `This solution efficiently replaces each element with the greatest element to its right by traversing the array from right to left.

**How it works:**
1. Initialize right_max to -1 (since the last element should be replaced with -1).
2. Traverse the array from right to left (from the last index to the first).
3. For each position i:
   - Store the current value of arr[i] before replacing it.
   - Replace arr[i] with the current right_max value.
   - Update right_max to be the maximum of the old right_max and the original arr[i] value.
4. Return the modified array.

**Why this works:**
By traversing from right to left, we can maintain the maximum element seen so far in right_max. At each position:
- We know all elements to the right have already been processed.
- The right_max contains the maximum of all elements to the right of the current position.
- We replace the current element with right_max, then update right_max to include the current element's original value.

This approach is efficient because:
- Single pass through the array: O(n) time complexity
- In-place modification: O(1) space complexity (excluding the output array)

The last element is correctly replaced with -1 because right_max starts at -1 and no elements exist to its right.`,
        code: `class Solution:
    def replaceElements(self, arr: List[int]) -> List[int]:
        right_max = -1
        for i in range(len(arr) - 1, -1, -1):
            new_max = max(right_max, arr[i])
            arr[i] = right_max
            right_max = new_max
        return arr`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        starred: false,
      },
      createProblem('Is Subsequence', 'Easy', 'Arrays & Hashing'),
      createProblem('Append Characters to String to Make Subsequence', 'Medium', 'Arrays & Hashing'),
      {
        id: 'length-of-last-word',
        title: 'Length of Last Word',
        difficulty: 'Easy',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/length-of-last-word/',
        explanation: `This solution finds the length of the last word in a string by traversing from right to left.

**How it works:**
1. We iterate through the string from right to left (from the end to the beginning).
2. For each character, we check if it's alphanumeric (part of a word).
3. If we encounter an alphanumeric character, we increment our length counter.
4. Once we've started counting (length > 0) and encounter a non-alphanumeric character (space), we've found the end of the last word, so we return the length.
5. If we reach the beginning of the string while counting, we return the accumulated length.

**Why this works:**
By starting from the right, we skip any trailing spaces and immediately start counting characters of the last word. The algorithm efficiently handles:
- Trailing spaces: ignored until we find the first character
- Multiple spaces: once we start counting, encountering a space means we've finished the last word
- Single word strings: we count all characters until the beginning

This approach is optimal because we only traverse the string once from right to left, stopping as soon as we've processed the last word.`,
        code: `class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        length = 0
        for i in range(len(s) - 1, -1, -1):
            if s[i].isalnum():
                length += 1
            if length > 0:
                if not s[i].isalnum():
                    return length
        return length`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        starred: false,
      },
      {
        id: 'number-of-senior-citizens',
        title: 'Number of Senior Citizens',
        difficulty: 'Easy',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/number-of-senior-citizens/',
        videoUrl: 'https://www.youtube.com/watch?v=e8P2kq1435o',
        explanation: `This solution counts passengers who are strictly older than 60 years by extracting and checking the age from each passenger's details string.

**How it works:**
1. Initialize a counter to 0.
2. Iterate through each passenger detail string in the array.
3. For each string, extract the age substring from indices 11 to 13 (characters at positions 11 and 12).
4. Convert the age substring to an integer.
5. If the age is greater than 60, increment the counter.
6. Return the total count.

**String Format:**
Each detail string has a fixed length of 15 characters:
- Indices 0-9: Phone number (10 digits)
- Index 10: Gender ('M', 'F', or '0')
- Indices 11-12: Age (2 digits)
- Indices 13-14: Seat number (2 characters)

**Why this works:**
By using string slicing s[11:13], we directly access the age portion of each passenger's compressed information. Converting to an integer allows us to perform numeric comparison with 60. This approach is efficient because it processes each passenger exactly once.`,
        code: `class Solution:
    def countSeniors(self, details: List[str]) -> int:
        count = 0
        for s in details:
            if int(s[11:13]) > 60:
                count += 1
        return count`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        starred: false,
      },
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
      {
        id: 'encode-and-decode-strings',
        title: 'Encode and Decode Strings',
        difficulty: 'Medium',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings/',
        videoUrl: 'https://www.youtube.com/watch?v=CgyPe-FaFsE',
        explanation: `This solution uses a length-prefix encoding scheme to encode and decode a list of strings.

**How it works (Encode):**
1. Iterate through each string in the input list.
2. For each string, prepend its length followed by a "#" delimiter.
3. Concatenate all encoded strings together.
4. Example: ["neet", "code"] becomes "4#neet4#code"

**How it works (Decode):**
1. Initialize a result list and a pointer i at the start of the encoded string.
2. While i is within the string length:
   - Find the position j where the "#" delimiter appears (this marks the end of the length prefix).
   - Extract the length by converting the substring from i to j to an integer.
   - Extract the actual string by reading length characters after the "#".
   - Add the decoded string to the result list.
   - Move the pointer i to the start of the next encoded string.
3. Return the decoded list of strings.

**Why this works:**
The "#" delimiter ensures we can distinguish between the length prefix and the actual string content. By storing the length before each string, we know exactly how many characters to read, which handles edge cases like strings containing numbers or special characters. This encoding scheme is unambiguous and allows perfect reconstruction of the original string list.`,
        code: `class Solution:
    def encode(self, strs: List[str]) -> str:
        res = ""
        for s in strs:
            res += str(len(s)) + "#" + s
        return res

    def decode(self, s: str) -> List[str]:
        res = []
        i = 0

        while i < len(s):
            j = i
            while s[j] != "#":
                j += 1
            length = int(s[i:j])
            res.append(s[j + 1 : j + 1 + length])
            i = j + 1 + length
        return res`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        starred: false,
      },
      createProblem('Range Sum Query 2D Immutable', 'Medium', 'Arrays & Hashing'),
      createProblem('Analyze User Website Visit Pattern', 'Medium', 'Arrays & Hashing'),
      {
        id: 'product-of-array-except-self',
        title: 'Product of Array Except Self',
        difficulty: 'Medium',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
        videoUrl: 'https://www.youtube.com/watch?v=H08rq3Wd2uY&t=581s',
        explanation: `This solution efficiently computes the product of all elements except self using two passes: one for prefix products and one for postfix products.

**How it works:**
1. Initialize result array with all 1s (same length as input).
2. **First pass (left to right):** Calculate prefix products:
   - For each index i, store the product of all elements to the left of i in res[i].
   - Update prefix by multiplying it with nums[i] for the next iteration.
3. **Second pass (right to left):** Multiply by postfix products:
   - For each index i, multiply res[i] by the product of all elements to the right of i.
   - Update postfix by multiplying it with nums[i] for the next iteration.
4. Return the result array.

**Why this works:**
- The first pass stores prefix products (product of all elements to the left) in each position.
- The second pass multiplies each position by the postfix product (product of all elements to the right).
- Combining prefix and postfix gives us the product of all elements except the current one.

This approach is efficient because:
- Two passes through the array: O(n) time complexity
- Only uses the result array: O(1) space complexity (excluding output array)
- No division operation needed, avoiding division by zero issues`,
        code: `class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        res = [1] * (len(nums))

        prefix = 1
        for i in range(len(nums)):
            res[i] = prefix
            prefix *= nums[i]

        postfix = 1
        for i in range(len(nums) - 1, -1, -1):
            res[i] *= postfix
            postfix *= nums[i]
        return res`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        starred: false,
      },
      createProblem('Minimum Number of Operations to Move All Balls to Each Box', 'Medium', 'Arrays & Hashing'),
      {
        id: 'valid-sudoku',
        title: 'Valid Sudoku',
        difficulty: 'Medium',
        topics: ['Arrays & Hashing'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/valid-sudoku/',
        explanation: `This solution validates a Sudoku board by checking rows, columns, and 3x3 sub-boxes for duplicates using hash sets.

**How it works:**
1. We maintain three separate data structures: one for rows, one for columns, and one for 3x3 sub-boxes.
2. We iterate through each cell in the 9x9 board.
3. For each non-empty cell (not "."), we check if the number already exists in:
   - The current row (rows[r])
   - The current column (cols[c])
   - The current 3x3 sub-box (squares[(r // 3, c // 3)])
4. If the number is found in any of these sets, the board is invalid → return False.
5. If the number is not found, we add it to all three sets.
6. If we complete the iteration without finding duplicates, the board is valid → return True.

**Why this works:**
Sudoku rules require that each number (1-9) appears exactly once in:
- Each row
- Each column
- Each 3x3 sub-box

By using sets to track seen numbers in each row, column, and sub-box, we can detect duplicates in O(1) time. The sub-box index is calculated as (r // 3, c // 3), which groups cells into 9 distinct 3x3 boxes:
- Box (0,0): rows 0-2, cols 0-2
- Box (0,1): rows 0-2, cols 3-5
- Box (0,2): rows 0-2, cols 6-8
- And so on...

This approach efficiently validates the entire board in a single pass.`,
        code: `class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        cols = defaultdict(set)
        rows = defaultdict(set)
        squares = defaultdict(set)
        
        for r in range(9):
            for c in range(9):
                if board[r][c] == ".":
                    continue
                if (board[r][c] in rows[r] or 
                    board[r][c] in cols[c] or 
                    board[r][c] in squares[(r // 3, c // 3)]):
                    return False
                cols[c].add(board[r][c])
                rows[r].add(board[r][c])
                squares[(r // 3, c // 3)].add(board[r][c])
        return True`,
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        starred: false,
      },
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
      createProblem('Shortest Palindrome', 'Hard', 'Arrays & Hashing'),
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
      {
        id: 'is-subsequence',
        title: 'Is Subsequence',
        difficulty: 'Easy',
        topics: ['Two Pointers'],
        status: 'solved',
        leetcodeUrl: 'https://leetcode.com/problems/is-subsequence/',
        videoUrl: 'https://www.youtube.com/watch?v=V7B5CeB20Ow',
        explanation: `This solution uses two pointers to check if string s is a subsequence of string t.

**How it works:**
1. Initialize two pointers i and j to 0, pointing to the start of strings s and t respectively.
2. While both pointers are within their string bounds:
   - If s[i] matches t[j], increment i (we found a matching character in order).
   - Always increment j to continue searching through string t.
3. After the loop, check if i equals the length of s. If it does, all characters of s were found in order in t → return True. Otherwise, return False.

**Why this works:**
A subsequence means characters appear in the same relative order, but not necessarily consecutively. By using two pointers:
- Pointer i tracks our progress through s (the subsequence we're looking for).
- Pointer j scans through t (the string we're searching in).
- When we find a match, we advance i, meaning we've found that character of s in t.
- We always advance j to continue searching.
- If i reaches the end of s, we've found all characters in order → True.

This approach efficiently checks for subsequence in O(n) time where n is the length of t.`,
        code: `class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = j = 0
        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
            j += 1
        return i == len(s)`,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        starred: false,
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
      createProblem('Trapping Rain Water', 'Hard', 'Two Pointers'),
    ],
    prerequisites: ['arrays-hashing'],
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
      createProblem('Smallest Range Covering Elements from K Lists', 'Hard', 'Sliding Window'),
    ],
    prerequisites: ['arrays-hashing'],
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
      createProblem('Number of Atoms', 'Hard', 'Stack'),
    ],
    prerequisites: ['arrays-hashing'],
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
      createProblem('Kth Smallest Product of Two Sorted Arrays', 'Hard', 'Binary Search'),
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
      createProblem('Reverse Nodes In K Group', 'Hard', 'Linked List'),
    ],
    prerequisites: ['stack'],
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
      createProblem('Serialize And Deserialize Binary Tree', 'Hard', 'Trees'),
    ],
    prerequisites: ['binary-search', 'sliding-window', 'linked-list'],
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
      createProblem('Count Prefix and Suffix Pairs II', 'Hard', 'Tries'),
    ],
    prerequisites: ['trees'],
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
      createProblem('Find Building Where Alice and Bob Can Meet', 'Hard', 'Heap / Priority Queue'),
    ],
    prerequisites: ['trees'],
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
      createProblem('Word Break II', 'Hard', 'Backtracking'),
    ],
    prerequisites: ['trees'],
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
      createProblem('Maximum Number of Fish in a Grid', 'Medium', 'Graphs'),
    ],
    prerequisites: ['trees'],
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
      createProblem('Divide Nodes Into the Maximum Number of Groups', 'Hard', 'Advanced Graphs'),
    ],
    prerequisites: ['graphs'],
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
      createProblem('Student Attendance Record II', 'Hard', '1-D DP'),
    ],
    prerequisites: ['trees'],
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
      createProblem('Count Vowels Permutation', 'Hard', '2-D DP'),
    ],
    prerequisites: ['graphs', '1d-dp'],
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
      createProblem('Find the Maximum Sum of Node Values', 'Hard', 'Greedy'),
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
      createProblem('Data Stream as Disjoint Intervals', 'Hard', 'Intervals'),
    ],
    prerequisites: ['heap-priority-queue'],
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
      createProblem('Minimize XOR', 'Medium', 'Bit Manipulation'),
    ],
    prerequisites: ['1d-dp'],
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
      createProblem('Integer to English Words', 'Hard', 'Math & Geometry'),
    ],
    prerequisites: ['2d-dp', 'bit-manipulation'],
  },
];

export const getAllProblems = (): Problem[] => {
  // Merge problems from both arrays, with topics array taking precedence
  const topicsProblems = topics.flatMap(topic => topic.problems);
  const problemsMap = new Map<string, Problem>();
  
  // First, add all problems from the problems array
  problems.forEach(p => problemsMap.set(p.id, p));
  
  // Then, override with problems from topics array (these have priority)
  topicsProblems.forEach(p => problemsMap.set(p.id, p));
  
  return Array.from(problemsMap.values());
};

export const getProblemById = (id: string): Problem | undefined => {
  const allProblems = getAllProblems();
  const problem = allProblems.find(problem => problem.id === id);
  if (id === 'is-subsequence' && problem) {
    console.log('[getProblemById] Found problem:', {
      hasExplanation: !!problem.explanation,
      hasVideoUrl: !!problem.videoUrl,
      explanationLength: problem.explanation?.length,
      videoUrl: problem.videoUrl,
      source: 'merged'
    });
  }
  return problem;
};

export const getProblemsByTopic = (topicId: string): Problem[] => {
  const topic = topics.find(t => t.id === topicId);
  return topic?.problems || [];
};

export const getTopicById = (topicId: string): Topic | undefined => {
  return topics.find(t => t.id === topicId);
};
