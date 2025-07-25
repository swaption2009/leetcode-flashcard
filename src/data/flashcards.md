### **1. Two Sum**

#### **Question**
**Description:**
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

**Examples:**
- **Input:** `nums = [2, 7, 11, 15]`, `target = 9`
- **Output:** `[0, 1]`
- **Explanation:** Because `nums[0] + nums[1] == 9`, we return `[0, 1]`.

- **Input:** `nums = [3, 2, 4]`, `target = 6`
- **Output:** `[1, 2]`

#### **Answer**
**Algorithm:**
The most efficient approach uses a hash map (a dictionary in Python).
1.  Initialize an empty hash map `num_map` to store `number: index`.
2.  Iterate through the `nums` array, getting both the index `i` and the value `num`.
3.  For each element `num`, calculate its complement: `complement = target - num`.
4.  Check if `complement` exists as a key in `num_map`.
    -   If it does, you have found the pair. Return the index of the complement (`num_map[complement]`) and the current index `i`.
    -   If it does not, add the current number and its index to the map: `num_map[num] = i`.

**Big O:**
-   **Time Complexity:** O(n), because we iterate through the list of `n` elements only once. Each hash map lookup and insertion is an average O(1) operation.
-   **Space Complexity:** O(n), because in the worst case, we might store all `n` elements in the hash map.

**Python Code:**
```python
from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        num_map = {}  # To store {number: index}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_map:
                return [num_map[complement], i]
            num_map[num] = i
        return [] # Should not be reached based on problem description
```

---

### **121. Best Time to Buy and Sell Stock**

#### **Question**
**Description:**
You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

**Examples:**
- **Input:** `prices = [7, 1, 5, 3, 6, 4]`
- **Output:** `5`
- **Explanation:** Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

- **Input:** `prices = [7, 6, 4, 3, 1]`
- **Output:** `0`
- **Explanation:** In this case, no transaction is done, so the max profit is 0.

#### **Answer**
**Algorithm:**
This can be solved in a single pass using two variables.
1.  Initialize `min_price` to a very large number (or the first element of `prices`).
2.  Initialize `max_profit` to 0.
3.  Iterate through the `prices` array.
4.  For each `price`:
    -   If the current `price` is less than `min_price`, update `min_price` to the current `price`.
    -   Otherwise, calculate the potential profit: `profit = price - min_price`.
    -   If this `profit` is greater than `max_profit`, update `max_profit`.
5.  After the loop, return `max_profit`.

**Big O:**
-   **Time Complexity:** O(n), as we iterate through the `prices` array once.
-   **Space Complexity:** O(1), as we only use a few variables to store state.

**Python Code:**
```python
import math
from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = math.inf
        max_profit = 0
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price
        return max_profit
```

---

### **217. Contains Duplicate**

#### **Question**
**Description:**
Given an integer array `nums`, return `true` if any value appears at least twice in the array, and `false` if every element is distinct.

**Examples:**
- **Input:** `nums = [1, 2, 3, 1]`
- **Output:** `true`

- **Input:** `nums = [1, 2, 3, 4]`
- **Output:** `false`

#### **Answer**
**Algorithm:**
The optimal solution uses a hash set for its O(1) average time complexity for additions and lookups.
1.  Initialize an empty hash set called `seen`.
2.  Iterate through each number `num` in the `nums` array.
3.  For each `num`:
    -   Check if `num` is already in the `seen` set. If it is, a duplicate has been found, so return `True`.
    -   If `num` is not in the set, add it to `seen`.
4.  If the loop completes without finding any duplicates, return `False`.

**Big O:**
-   **Time Complexity:** O(n), because we iterate through the array once.
-   **Space Complexity:** O(n), because in the worst case (all elements are unique), the hash set will store all `n` elements.

**Python Code:**
```python
from typing import List

class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False
```

---

### **242. Valid Anagram**

#### **Question**
**Description:**
Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Examples:**
- **Input:** `s = "anagram"`, `t = "nagaram"`
- **Output:** `true`

- **Input:** `s = "rat"`, `t = "car"`
- **Output:** `false`

#### **Answer**
**Algorithm:**
A common approach is to use a hash map (or an array of size 26 for lowercase English letters) to count character frequencies.
1.  First, check if the lengths of `s` and `t` are different. If so, they cannot be anagrams, so return `False`.
2.  Create a hash map `char_counts` to store the frequency of each character in string `s`.
3.  Iterate through string `s` and populate `char_counts`.
4.  Iterate through string `t`. For each character, decrement its count in `char_counts`.
5.  If a character from `t` is not in `char_counts` or its count is already zero, it means `t` has an extra character or a higher frequency of a character, so return `False`.
6.  If the loop completes, it means both strings are anagrams. Return `True`.

**Big O:**
-   **Time Complexity:** O(n), where n is the length of the strings. We iterate through both strings once.
-   **Space Complexity:** O(k), where k is the number of unique characters (at most 26 for lowercase English letters). This can be considered O(1).

**Python Code:**
```python
import collections

class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        # Using collections.Counter simplifies the counting
        s_counts = collections.Counter(s)
        t_counts = collections.Counter(t)
        
        return s_counts == t_counts

# Alternative implementation without Counter
class Solution_Manual:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        char_counts = {}
        for char in s:
            char_counts[char] = char_counts.get(char, 0) + 1
        
        for char in t:
            if char not in char_counts or char_counts[char] == 0:
                return False
            char_counts[char] -= 1
            
        return True
```

---

### **733. Flood Fill**

#### **Question**
**Description:**
An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value of the image. You are also given three integers `sr`, `sc`, and `color`. You should perform a flood fill on the image starting from the pixel `image[sr][sc]`. To perform a flood fill, consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with `color`. Return the modified image.

**Examples:**
- **Input:** `image = [[1,1,1],[1,1,0],[1,0,1]]`, `sr = 1`, `sc = 1`, `color = 2`
- **Output:** `[[2,2,2],[2,2,0],[2,0,1]]`
- **Explanation:** From the center (1,1) with value 1, all pixels connected 4-directionally with value 1 are filled with 2.

#### **Answer**
**Algorithm:**
This is a classic graph traversal problem, best solved with Depth-First Search (DFS) or Breadth-First Search (BFS). The DFS approach is often more concise to implement recursively.
1.  Get the `start_color` from `image[sr][sc]`.
2.  If `start_color` is already the new `color`, no work is needed, so return the image.
3.  Define a recursive helper function, `dfs(r, c)`.
4.  Inside `dfs(r, c)`:
    -   Check for boundary conditions: if `r` or `c` is out of bounds, or if `image[r][c]` is not the `start_color`, then return.
    -   Change the color of the current pixel: `image[r][c] = color`.
    -   Recursively call `dfs` for all 4-directional neighbors: `(r+1, c)`, `(r-1, c)`, `(r, c+1)`, `(r, c-1)`.
5.  Initiate the process by calling `dfs(sr, sc)`.
6.  Return the modified `image`.

**Big O:**
-   **Time Complexity:** O(N), where N is the total number of pixels in the image (m * n). In the worst case, we visit every pixel once.
-   **Space Complexity:** O(N) in the worst case for the recursion stack depth. If the entire grid is the same color, the recursion could go N levels deep.

**Python Code:**
```python
from typing import List

class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        rows, cols = len(image), len(image[0])
        start_color = image[sr][sc]

        if start_color == color:
            return image

        def dfs(r, c):
            # Check boundaries and if the pixel has the correct start color
            if r < 0 or r >= rows or c < 0 or c >= cols or image[r][c] != start_color:
                return

            # Change the color
            image[r][c] = color

            # Recursively call for 4-directional neighbors
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        dfs(sr, sc)
        return image
```

### **20. Valid Parentheses**

#### **Question**
**Description:**
Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.
An input string is valid if:
1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

**Examples:**
-   **Input:** `s = "()"`
-   **Output:** `true`

-   **Input:** `s = "()[]{}"`
-   **Output:** `true`

-   **Input:** `s = "(]"`
-   **Output:** `false`

#### **Answer**
**Algorithm:**
This problem is a perfect use case for a stack data structure.
1.  Create a hash map to store the matching pairs of brackets, e.g., `mapping = {")": "(", "}": "{", "]": "["}`.
2.  Initialize an empty stack.
3.  Iterate through each character `char` in the string `s`.
4.  If `char` is a closing bracket (i.e., it's a key in our `mapping`):
    -   Check if the stack is empty. If it is, there's no opening bracket to match, so it's invalid.
    -   Pop the top element from the stack.
    -   If the popped element is not the corresponding opening bracket for `char` (i.e., `mapping[char]`), the string is invalid.
5.  If `char` is an opening bracket, push it onto the stack.
6.  After the loop finishes, the string is valid only if the stack is empty. If there are any remaining opening brackets on the stack, it's invalid.

**Big O:**
-   **Time Complexity:** O(n), because we iterate through the string once.
-   **Space Complexity:** O(n) in the worst case, where the entire string consists of opening brackets.

**Python Code:**
```python
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}

        for char in s:
            if char in mapping:  # It's a closing bracket
                # Pop the top element if stack is not empty, otherwise use a dummy value
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:  # It's an opening bracket
                stack.append(char)

        # The string is valid only if the stack is empty at the end
        return not stack
```

---

### **21. Merge Two Sorted Lists**

#### **Question**
**Description:**
You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

**Examples:**
-   **Input:** `list1 = [1,2,4]`, `list2 = [1,3,4]`
-   **Output:** `[1,1,2,3,4,4]`

-   **Input:** `list1 = []`, `list2 = [0]`
-   **Output:** `[0]`

#### **Answer**
**Algorithm:**
The iterative approach with a dummy node is clean and efficient.
1.  Create a `dummy` node to act as a placeholder for the head of the new merged list.
2.  Create a `tail` pointer, initially pointing to `dummy`. This pointer will always point to the last node in the merged list.
3.  While both `list1` and `list2` are not null:
    -   Compare the values of the nodes at the heads of `list1` and `list2`.
    -   Append the smaller node to `tail.next`.
    -   Advance the pointer of the list from which the node was taken.
    -   Advance the `tail` pointer to the newly added node.
4.  After the loop, one of the lists might still have remaining nodes. Append the non-null list to `tail.next`.
5.  The merged list starts at `dummy.next`. Return it.

**Big O:**
-   **Time Complexity:** O(n + m), where `n` and `m` are the number of nodes in `list1` and `list2`, respectively. We visit each node once.
-   **Space Complexity:** O(1), as we are just rearranging pointers and not using extra space proportional to the input size.

**Python Code:**
```python
from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        tail = dummy

        while list1 and list2:
            if list1.val < list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next

        # Append the remaining part of the non-empty list
        if list1:
            tail.next = list1
        elif list2:
            tail.next = list2

        return dummy.next
```

---

### **125. Valid Palindrome**

#### **Question**
**Description:**
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

**Examples:**
-   **Input:** `s = "A man, a plan, a canal: Panama"`
-   **Output:** `true`
-   **Explanation:** "amanaplanacanalpanama" is a palindrome.

-   **Input:** `s = "race a car"`
-   **Output:** `false`
-   **Explanation:** "raceacar" is not a palindrome.

#### **Answer**
**Algorithm:**
The two-pointer approach is highly efficient.
1.  Initialize two pointers: `left` at the beginning of the string (index 0) and `right` at the end (index `len(s) - 1`).
2.  While `left` is less than `right`:
    -   Move the `left` pointer forward until it points to an alphanumeric character.
    -   Move the `right` pointer backward until it points to an alphanumeric character.
    -   If `left` is still less than `right`, compare the characters at these pointers (after converting them to lowercase).
    -   If the characters do not match, the string is not a palindrome, so return `False`.
    -   If they match, move both pointers inward: `left += 1`, `right -= 1`.
3.  If the loop completes without returning `False`, the string is a palindrome. Return `True`.

**Big O:**
-   **Time Complexity:** O(n), where n is the length of the string. Each pointer traverses the string at most once.
-   **Space Complexity:** O(1), as we only use a few variables for the pointers.

**Python Code:**
```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1

        while left < right:
            # Move left pointer past non-alphanumeric characters
            while left < right and not s[left].isalnum():
                left += 1
            # Move right pointer past non-alphanumeric characters
            while left < right and not s[right].isalnum():
                right -= 1
            
            # Compare the characters (case-insensitive)
            if s[left].lower() != s[right].lower():
                return False
            
            # Move pointers inward
            left += 1
            right -= 1
            
        return True
```

---

### **226. Invert Binary Tree**

#### **Question**
**Description:**
Given the `root` of a binary tree, invert the tree, and return its root.

**Examples:**
-   **Input:** `root = [4,2,7,1,3,6,9]`
-   **Output:** `[4,7,2,9,6,3,1]`
-   **Input:** `root = [2,1,3]`
-   **Output:** `[2,3,1]`

#### **Answer**
**Algorithm:**
This can be solved elegantly using recursion (Depth-First Search).
1.  The base case for the recursion is an empty node (a `None` root). If the root is `None`, just return `None`.
2.  For a given node, swap its left and right children. A temporary variable can be used: `temp = root.left`, `root.left = root.right`, `root.right = temp`.
3.  Recursively call the invert function on the new left child (`root.left`).
4.  Recursively call the invert function on the new right child (`root.right`).
5.  Return the `root` of the current subtree. The initial call will return the root of the fully inverted tree.

**Big O:**
-   **Time Complexity:** O(n), where n is the number of nodes in the tree, because we visit each node exactly once.
-   **Space Complexity:** O(h), where h is the height of the tree. This is for the recursion call stack. In the worst case (a skewed tree), this can be O(n). For a balanced tree, it's O(log n).

**Python Code:**
```python
from typing import Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # Base case: if the node is None, do nothing.
        if not root:
            return None
        
        # Swap the left and right children
        root.left, root.right = root.right, root.left
        
        # Recursively invert the left and right subtrees
        self.invertTree(root.left)
        self.invertTree(root.right)
        
        return root
```

---

### **104. Maximum Depth of Binary Tree**

#### **Question**
**Description:**
Given the `root` of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Examples:**
-   **Input:** `root = [3,9,20,null,null,15,7]`
-   **Output:** `3`
-   **Input:** `root = [1,null,2]`
-   **Output:** `2`

#### **Answer**
**Algorithm:**
This is another classic recursive tree problem.
1.  The base case: if the `root` is `None`, the depth is 0.
2.  If the root is not `None`, the depth of the tree is `1` (for the current node) plus the maximum of the depths of its left and right subtrees.
3.  Recursively calculate the depth of the left subtree: `left_depth = maxDepth(root.left)`.
4.  Recursively calculate the depth of the right subtree: `right_depth = maxDepth(root.right)`.
5.  Return `1 + max(left_depth, right_depth)`.

**Big O:**
-   **Time Complexity:** O(n), as we must visit every node to determine the maximum depth.
-   **Space Complexity:** O(h), where h is the height of the tree, for the recursion stack. In the worst case (skewed tree), this is O(n). In the best case (balanced tree), it's O(log n).

**Python Code:**
```python
from typing import Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # Base case: an empty tree has a depth of 0.
        if not root:
            return 0
        
        # Recursively find the depth of the left and right subtrees.
        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)
        
        # The depth of the tree is 1 + the max of the subtrees' depths.
        return 1 + max(left_depth, right_depth)
```

Excellent! Let's complete the "Easy" category flashcards.

---

### **383. Ransom Note**

#### **Question**
**Description:**
Given two strings `ransomNote` and `magazine`, return `true` if `ransomNote` can be constructed by using the letters from `magazine` and `false` otherwise. Each letter in `magazine` can only be used once in `ransomNote`.

**Examples:**
-   **Input:** `ransomNote = "a"`, `magazine = "b"`
-   **Output:** `false`

-   **Input:** `ransomNote = "aa"`, `magazine = "ab"`
-   **Output:** `false`

-   **Input:** `ransomNote = "aa"`, `magazine = "aab"`
-   **Output:** `true`

#### **Answer**
**Algorithm:**
This is a frequency counting problem. We need to ensure that `magazine` has enough of each required character for `ransomNote`.
1.  Create a frequency map (or a `Counter`) of all characters in the `magazine`.
2.  Iterate through each character in the `ransomNote`.
3.  For each character, check its count in the frequency map.
    -   If the character is not in the map or its count is zero, it means the `magazine` doesn't have this character available. Return `False`.
    -   If the character is available, decrement its count in the map to "use it up".
4.  If the loop completes successfully, it means all characters in `ransomNote` were found in `magazine`. Return `True`.

**Big O:**
-   **Time Complexity:** O(m + n), where `m` is the length of `magazine` and `n` is the length of `ransomNote`.
-   **Space Complexity:** O(k), where `k` is the number of unique characters in the `magazine`. For lowercase English letters, this is O(26), which is constant O(1).

**Python Code:**
```python
import collections

class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        # Count the frequency of each character in the magazine.
        magazine_counts = collections.Counter(magazine)
        
        # Check if the ransom note can be constructed.
        for char in ransomNote:
            if magazine_counts[char] > 0:
                magazine_counts[char] -= 1
            else:
                return False
        
        return True
```

---

### **141. Linked List Cycle**

#### **Question**
**Description:**
Given `head`, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Return `true` if there is a cycle, otherwise return `false`.

**Examples:**
-   **Input:** `head = [3,2,0,-4]`, `pos = 1` (tail connects to node at index 1)
-   **Output:** `true`

-   **Input:** `head = [1]`, `pos = -1` (no cycle)
-   **Output:** `false`

#### **Answer**
**Algorithm:**
The classic solution is **Floyd's Tortoise and Hare Algorithm**.
1.  Initialize two pointers, `slow` and `fast`, both starting at the `head` of the list.
2.  Check for edge cases: if the list is empty or has only one node, there can't be a cycle, so return `False`.
3.  Enter a loop that continues as long as `fast` and `fast.next` are not `None`.
4.  Inside the loop, move `slow` one step forward (`slow = slow.next`) and `fast` two steps forward (`fast = fast.next.next`).
5.  If at any point `slow` and `fast` point to the same node (`slow == fast`), a cycle has been detected. Return `True`.
6.  If the loop finishes (meaning `fast` reached the end of the list), there is no cycle. Return `False`.

**Big O:**
-   **Time Complexity:** O(n), where `n` is the number of nodes. In a cyclic list, the fast pointer laps the slow pointer; in an acyclic list, it reaches the end.
-   **Space Complexity:** O(1), as we only use two pointers.

**Python Code:**
```python
from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return False
            
        slow = head
        fast = head.next
        
        while fast and fast.next:
            if slow == fast:
                return True
            slow = slow.next
            fast = fast.next.next
            
        return False
```

---

### **876. Middle of the Linked List**

#### **Question**
**Description:**
Given the `head` of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.

**Examples:**
-   **Input:** `head = [1,2,3,4,5]`
-   **Output:** `[3,4,5]` (Node with value 3)

-   **Input:** `head = [1,2,3,4,5,6]`
-   **Output:** `[4,5,6]` (Node with value 4)

#### **Answer**
**Algorithm:**
This is another application of the **two-pointer (slow and fast)** technique.
1.  Initialize two pointers, `slow` and `fast`, both at the `head` of the list.
2.  Iterate through the list while `fast` and `fast.next` are not `None`.
3.  In each iteration, move `slow` one step forward (`slow = slow.next`) and `fast` two steps forward (`fast = fast.next.next`).
4.  When the loop terminates, the `fast` pointer will have reached the end of the list. By this time, the `slow` pointer will be positioned at the middle node.
    -   For an odd number of nodes, `fast` will be at the last node.
    -   For an even number of nodes, `fast` will be `None`.
    -   In both cases, `slow` points to the correct middle node as per the problem's definition.
5.  Return the `slow` pointer.

**Big O:**
-   **Time Complexity:** O(n), as we traverse about half the list.
-   **Space Complexity:** O(1).

**Python Code:**
```python
from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = head
        fast = head
        
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            
        return slow
```

---

### **206. Reverse Linked List**

#### **Question**
**Description:**
Given the `head` of a singly linked list, reverse the list, and return the reversed list's head.

**Examples:**
-   **Input:** `head = [1,2,3,4,5]`
-   **Output:** `[5,4,3,2,1]`

-   **Input:** `head = [1,2]`
-   **Output:** `[2,1]`

#### **Answer**
**Algorithm:**
The iterative approach is very common and efficient.
1.  Initialize two pointers: `prev_node` to `None` and `curr_node` to `head`.
2.  Iterate while `curr_node` is not `None`.
3.  Inside the loop, for the `curr_node`:
    -   Store the next node in a temporary variable: `next_node = curr_node.next`.
    -   Reverse the pointer of the `curr_node`: `curr_node.next = prev_node`.
    -   Move the pointers one step forward for the next iteration: `prev_node = curr_node` and `curr_node = next_node`.
4.  When the loop ends, `curr_node` will be `None`, and `prev_node` will be the new head of the reversed list. Return `prev_node`.

**Big O:**
-   **Time Complexity:** O(n), as we visit each node once.
-   **Space Complexity:** O(1).

**Python Code:**
```python
from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev_node = None
        curr_node = head
        
        while curr_node:
            next_node = curr_node.next  # Store the next node
            curr_node.next = prev_node  # Reverse the current node's pointer
            
            # Move pointers one position ahead
            prev_node = curr_node
            curr_node = next_node
            
        return prev_node # prev_node is the new head
```

### **704. Binary Search**

#### **Question**
**Description:**
Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search for `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.

**Examples:**
-   **Input:** `nums = [-1,0,3,5,9,12]`, `target = 9`
-   **Output:** `4`

-   **Input:** `nums = [-1,0,3,5,9,12]`, `target = 2`
-   **Output:** `-1`

#### **Answer**
**Algorithm:**
The standard iterative binary search algorithm.
1.  Initialize two pointers, `left = 0` and `right = len(nums) - 1`.
2.  While `left` is less than or equal to `right`:
    -   Calculate the middle index: `mid = left + (right - left) // 2` (this avoids potential overflow in other languages).
    -   Compare the element at `nums[mid]` with the `target`.
    -   If `nums[mid] == target`, the element is found. Return `mid`.
    -   If `nums[mid] < target`, the target must be in the right half of the search space. Update `left = mid + 1`.
    -   If `nums[mid] > target`, the target must be in the left half. Update `right = mid - 1`.
3.  If the loop finishes without finding the target, it means the target is not in the array. Return `-1`.

**Big O:**
-   **Time Complexity:** O(log n), because we halve the search space in each iteration.
-   **Space Complexity:** O(1).

**Python Code:**
```python
from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        
        while left <= right:
            mid = left + (right - left) // 2
            
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
                
        return -1
```

---

### **70. Climbing Stairs**

#### **Question**
**Description:**
You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Examples:**
-   **Input:** `n = 2`
-   **Output:** `2`
-   **Explanation:** `1. 1 step + 1 step`, `2. 2 steps`

-   **Input:** `n = 3`
-   **Output:** `3`
-   **Explanation:** `1. 1 + 1 + 1`, `2. 1 + 2`, `3. 2 + 1`

#### **Answer**
**Algorithm:**
This is a classic Dynamic Programming problem. The number of ways to get to step `n`, let's call it `dp[n]`, is the sum of the ways to get to step `n-1` (and taking one step) and the ways to get to step `n-2` (and taking two steps).
This leads to the Fibonacci sequence: `dp[n] = dp[n-1] + dp[n-2]`.
1.  Base cases: `dp[1] = 1`, `dp[2] = 2`.
2.  We can optimize the space by not using a full DP array. We only need the previous two values.
3.  Initialize `one_step_back = 1` and `two_steps_back = 1`. (These correspond to `dp[n-1]` and `dp[n-2]`, starting from `n=2`).
4.  Iterate from `i = 2` to `n`.
5.  In each step, calculate `current = one_step_back + two_steps_back`.
6.  Update the pointers: `two_steps_back = one_step_back`, `one_step_back = current`.
7.  The final result is `one_step_back`.

**Big O:**
-   **Time Complexity:** O(n), because we iterate from 2 to n.
-   **Space Complexity:** O(1), using the space-optimized approach.

**Python Code:**
```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 1:
            return 1
            
        # We only need to store the last two results
        one_step_back = 1 # ways to reach step i-1
        two_steps_back = 1 # ways to reach step i-2
        
        for _ in range(2, n + 1):
            current_ways = one_step_back + two_steps_back
            two_steps_back = one_step_back
            one_step_back = current_ways
            
        return one_step_back
```

Excellent choice. The Medium category is where a lot of core interview concepts are tested. Here is the first batch of flashcards for the "Medium" questions.


### **3. Longest Substring Without Repeating Characters**

#### **Question**
**Description:**
Given a string `s`, find the length of the longest substring without repeating characters.

**Examples:**
-   **Input:** `s = "abcabcbb"`
-   **Output:** `3`
-   **Explanation:** The answer is "abc", with the length of 3.

-   **Input:** `s = "bbbbb"`
-   **Output:** `1`
-   **Explanation:** The answer is "b", with the length of 1.

-   **Input:** `s = "pwwkew"`
-   **Output:** `3`
-   **Explanation:** The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

#### **Answer**
**Algorithm:**
This problem can be solved efficiently using the **sliding window** technique with a hash set (or a hash map).
1.  Initialize a hash set `char_set` to store characters in the current window.
2.  Initialize two pointers, `left = 0` and `right = 0`, representing the window `[left, right]`.
3.  Initialize `max_length = 0`.
4.  Iterate with the `right` pointer from the beginning to the end of the string.
5.  Inside the loop, for the character `s[right]`:
    -   While `s[right]` is already in `char_set`, it means we have a repeating character. Shrink the window from the left by removing `s[left]` from the set and incrementing `left`.
    -   Once `s[right]` is no longer a duplicate in the window, add it to `char_set`.
    -   Update `max_length = max(max_length, right - left + 1)`.
6.  After the loop finishes, return `max_length`.

**Big O:**
-   **Time Complexity:** O(n). Although there is a nested `while` loop, each character is added and removed from the set at most once, so both `left` and `right` pointers traverse the string only once.
-   **Space Complexity:** O(k), where `k` is the number of unique characters in the string (or the size of the character set, e.g., 256 for ASCII). This can be considered O(1) if the character set is fixed.

**Python Code:**
```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_set = set()
        left = 0
        max_length = 0
        
        for right in range(len(s)):
            # If char is already in the window, shrink the window from the left
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1
            
            # Add the new character to the window
            char_set.add(s[right])
            
            # Update the max length
            max_length = max(max_length, right - left + 1)
            
        return max_length
```

---

### **5. Longest Palindromic Substring**

#### **Question**
**Description:**
Given a string `s`, return the longest palindromic substring in `s`.

**Examples:**
-   **Input:** `s = "babad"`
-   **Output:** `"bab"` (Note: `"aba"` is also a valid answer).

-   **Input:** `s = "cbbd"`
-   **Output:** `"bb"`

#### **Answer**
**Algorithm:**
The **"Expand From Center"** approach is intuitive and efficient enough for most interviews.
1.  A palindrome reads the same forwards and backward. It can be centered around one character (like "racecar") or two characters (like "aabbaa").
2.  Iterate through every character `i` in the string `s`.
3.  For each character `i`, treat it as a potential center of a palindrome and expand outwards.
    -   **Odd length:** Call a helper function `expand(i, i)` to find the longest palindrome centered at `i`.
    -   **Even length:** Call the same helper function `expand(i, i + 1)` to find the longest palindrome centered between `i` and `i+1`.
4.  Keep track of the longest palindrome found so far. The `expand` function will take two pointers, `left` and `right`, and expand them as long as they are in bounds and `s[left] == s[right]`.
5.  Return the longest palindrome string recorded.

**Big O:**
-   **Time Complexity:** O(n²). We iterate through `n` centers, and the expansion from each center can take up to O(n) time.
-   **Space Complexity:** O(1). We only use a few variables to store pointers and the result string.

**Python Code:**
```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s or len(s) < 1:
            return ""
        
        start, end = 0, 0
        
        for i in range(len(s)):
            # Odd length palindromes (center is one character)
            len1 = self.expand_from_center(s, i, i)
            # Even length palindromes (center is between two characters)
            len2 = self.expand_from_center(s, i, i + 1)
            
            current_max_len = max(len1, len2)
            
            if current_max_len > (end - start):
                # Calculate the new start and end indices
                start = i - (current_max_len - 1) // 2
                end = i + current_max_len // 2

        return s[start:end+1]

    def expand_from_center(self, s: str, left: int, right: int) -> int:
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        # The length is right - left - 1 because the loop stops *after* the condition fails.
        return right - left - 1
```

---

### **11. Container With Most Water**

#### **Question**
**Description:**
You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.

**Examples:**
-   **Input:** `height = [1,8,6,2,5,4,8,3,7]`
-   **Output:** `49`
-   **Explanation:** The container with max area is formed by lines at index 1 (height 8) and index 8 (height 7). Area = `min(8, 7) * (8 - 1) = 7 * 7 = 49`.

#### **Answer**
**Algorithm:**
The optimal solution uses the **two-pointer** technique.
1.  Initialize two pointers, `left = 0` and `right = len(height) - 1`.
2.  Initialize `max_area = 0`.
3.  Loop as long as `left < right`.
4.  Inside the loop:
    -   Calculate the current area: `width = right - left`, `h = min(height[left], height[right])`, `area = h * width`.
    -   Update `max_area = max(max_area, area)`.
    -   To potentially find a larger area, we must increase the width or the height. The width is always decreasing. Therefore, we must try to find a taller line.
    -   Move the pointer corresponding to the shorter line inward. If `height[left] < height[right]`, increment `left`. Otherwise, decrement `right`. This is because moving the taller line's pointer inward will never increase the area (it will be limited by the same shorter line but with less width).
5.  Return `max_area`.

**Big O:**
-   **Time Complexity:** O(n), because the `left` and `right` pointers traverse the array only once.
-   **Space Complexity:** O(1).

**Python Code:**
```python
from typing import List

class Solution:
    def maxArea(self, height: List[int]) -> int:
        max_area = 0
        left, right = 0, len(height) - 1
        
        while left < right:
            # Calculate the area
            h = min(height[left], height[right])
            width = right - left
            current_area = h * width
            max_area = max(max_area, current_area)
            
            # Move the pointer pointing to the shorter line
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
                
        return max_area
```

### **15. 3Sum**

#### **Question**
**Description:**
Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.

**Examples:**
-   **Input:** `nums = [-1,0,1,2,-1,-4]`
-   **Output:** `[[-1,-1,2],[-1,0,1]]`

-   **Input:** `nums = [0,0,0]`
-   **Output:** `[[0,0,0]]`

#### **Answer**
**Algorithm:**
This problem builds on the Two Sum pattern. The most common solution is **Sort + Two Pointers**.
1.  Sort the input array `nums`. This makes it easy to handle duplicates and use the two-pointer approach.
2.  Iterate through the sorted array with a pointer `i` from `0` to `n-3`.
3.  **Handle Duplicates:** If `i > 0` and `nums[i] == nums[i-1]`, `continue` to the next iteration to avoid duplicate triplets.
4.  For each `nums[i]`, use the two-pointer approach on the rest of the array. Initialize `left = i + 1` and `right = len(nums) - 1`.
5.  While `left < right`:
    -   Calculate `current_sum = nums[i] + nums[left] + nums[right]`.
    -   If `current_sum == 0`, a triplet is found. Add `[nums[i], nums[left], nums[right]]` to the result list. Then, move both pointers (`left += 1`, `right -= 1`).
    -   **Handle Duplicates:** After finding a valid triplet, move `left` forward past any duplicates of `nums[left]` and move `right` backward past any duplicates of `nums[right]`.
    -   If `current_sum < 0`, we need a larger sum, so move the left pointer: `left += 1`.
    -   If `current_sum > 0`, we need a smaller sum, so move the right pointer: `right -= 1`.
6.  Return the list of unique triplets.

**Big O:**
-   **Time Complexity:** O(n²). Sorting takes O(n log n), and the nested loops (the main `for` loop and the inner `while` loop) take O(n²) time.
-   **Space Complexity:** O(n) or O(log n) depending on the implementation of the sorting algorithm. The space for the result list is not counted.

**Python Code:**
```python
from typing import List

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []
        nums.sort()
        
        for i, a in enumerate(nums):
            # Skip positive integers for the first element
            if a > 0:
                break
            # Skip duplicates for the first element
            if i > 0 and a == nums[i - 1]:
                continue
            
            left, right = i + 1, len(nums) - 1
            while left < right:
                three_sum = a + nums[left] + nums[right]
                if three_sum > 0:
                    right -= 1
                elif three_sum < 0:
                    left += 1
                else: # Found a triplet
                    res.append([a, nums[left], nums[right]])
                    left += 1
                    right -= 1
                    # Skip duplicates for the second element
                    while left < right and nums[left] == nums[left - 1]:
                        left += 1
                        
        return res
```

---

### **133. Clone Graph**

#### **Question**
**Description:**
Given a reference of a node in a **connected undirected graph**. Return a **deep copy (clone)** of the graph. Each node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.

**Example:**
-   **Input:** `adjList = [[2,4],[1,3],[2,4],[1,3]]` (Node 1 is connected to 2 & 4, Node 2 to 1 & 3, etc.)
-   **Output:** `adjList = [[2,4],[1,3],[2,4],[1,3]]` (A new graph with the same structure, but all new nodes).

**Node Definition:**
```python
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
```

#### **Answer**
**Algorithm:**
The key is to handle cycles and ensure each node is cloned only once. A hash map is perfect for this, mapping original nodes to their new clones (`old_to_new`). We can use either DFS or BFS. The DFS recursive approach is very clean.

1.  Initialize a hash map `old_to_new = {}`. This map will store visited nodes and their corresponding clones.
2.  Define a recursive `dfs(node)` function.
3.  **Base Case:** If the input `node` is `None`, return `None`.
4.  **Memoization:** If `node` is already in `old_to_new`, it means we have already cloned it. Return the clone from the map: `old_to_new[node]`.
5.  **Clone Node:** If not in the map, create a new clone: `clone_node = Node(node.val)`.
6.  **Add to Map:** Add the mapping to prevent re-cloning and infinite loops: `old_to_new[node] = clone_node`.
7.  **Clone Neighbors:** Iterate through the `neighbors` of the original `node`. For each `neighbor`, recursively call `dfs(neighbor)`. Append the result of this call to the `clone_node.neighbors` list.
8.  Return the `clone_node`.
9.  Start the process by calling `dfs(node)`.

**Big O:**
-   **Time Complexity:** O(N + E), where N is the number of nodes and E is the number of edges. We visit each node and edge once.
-   **Space Complexity:** O(N) for the hash map and the recursion stack.

**Python Code:**
```python
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None
        
        old_to_new = {}

        def dfs(original_node):
            # If we have already cloned this node, return the clone
            if original_node in old_to_new:
                return old_to_new[original_node]
            
            # Create the clone and add it to the map
            clone_node = Node(original_node.val)
            old_to_new[original_node] = clone_node
            
            # Recursively clone all neighbors
            for neighbor in original_node.neighbors:
                clone_node.neighbors.append(dfs(neighbor))
                
            return clone_node

        return dfs(node)
```

---

### **994. Rotting Oranges**

#### **Question**
**Description:**
You are given an `m x n` grid where each cell can have one of three values:
-   `0` representing an empty cell,
-   `1` representing a fresh orange, or
-   `2` representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return `-1`.

**Examples:**
-   **Input:** `grid = [[2,1,1],[1,1,0],[0,1,1]]`
-   **Output:** `4`

-   **Input:** `grid = [[2,1,1],[0,1,1],[1,0,1]]`
-   **Output:** `-1` (The orange at (2,0) is unreachable).

#### **Answer**
**Algorithm:**
This is a classic **Multi-Source Breadth-First Search (BFS)** problem. We can think of the rotting process happening in "layers" or "levels," which is exactly what BFS explores.

1.  Initialize a queue, `minutes = 0`, and `fresh_oranges = 0`.
2.  Iterate through the grid to:
    -   Add the coordinates of all initially rotten oranges (`2`) to the queue.
    -   Count the number of `fresh_oranges` (`1`).
3.  If `fresh_oranges == 0`, no time is needed, so return 0.
4.  Start the BFS loop, which runs as long as the queue is not empty.
5.  In each iteration of the main loop, increment `minutes`. Process one full level of the queue (all oranges that became rotten in the previous minute).
6.  To process a level, get the current `size` of the queue. Loop `size` times, dequeuing one rotten orange at a time.
7.  For each rotten orange, check its four neighbors (`up`, `down`, `left`, `right`).
8.  If a neighbor is a fresh orange (`1`):
    -   Mark it as rotten (`grid[r][c] = 2`).
    -   Decrement the `fresh_oranges` count.
    -   Enqueue the neighbor's coordinates.
9.  After the BFS loop finishes, if `fresh_oranges` is still greater than 0, it means some were unreachable. Return `-1`.
10. Otherwise, return `minutes - 1` (since the last increment happens after the last oranges are infected).

**Big O:**
-   **Time Complexity:** O(m * n). Every cell is visited at most once.
-   **Space Complexity:** O(m * n). In the worst case, the queue could hold all the cells.

**Python Code:**
```python
import collections
from typing import List

class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        q = collections.deque()
        fresh_oranges = 0
        minutes = 0

        # Initial scan to populate queue and count fresh oranges
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 1:
                    fresh_oranges += 1
                elif grid[r][c] == 2:
                    q.append((r, c))

        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        
        # BFS loop
        while q and fresh_oranges > 0:
            # Process one level (one minute) at a time
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in directions:
                    row, col = r + dr, c + dc
                    # Check if neighbor is in-bounds and is a fresh orange
                    if 0 <= row < rows and 0 <= col < cols and grid[row][col] == 1:
                        grid[row][col] = 2
                        fresh_oranges -= 1
                        q.append((row, col))
            minutes += 1

        return minutes if fresh_oranges == 0 else -1
```

---

### **17. Letter Combinations of a Phone Number**

#### **Question**
**Description:**
Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. A mapping of digits to letters (just like on the telephone buttons) is given. Note that 1 does not map to any letters.

**Examples:**
-   **Input:** `digits = "23"`
-   **Output:** `["ad","ae","af","bd","be","bf","cd","ce","cf"]`

-   **Input:** `digits = ""`
-   **Output:** `[]`

#### **Answer**
**Algorithm:**
This is a classic **backtracking** problem. We build the combinations character by character, exploring all possibilities at each step.

1.  Create a mapping of digits to letters (e.g., a hash map `digit_map = {'2': "abc", ...}`).
2.  Initialize an empty list `result` to store the final combinations.
3.  If the input `digits` string is empty, return the empty `result` list.
4.  Define a recursive `backtrack(index, current_path)` function:
    -   `index`: The current digit we are processing in the `digits` string.
    -   `current_path`: The combination of letters built so far.
5.  **Base Case:** If `len(current_path)` equals the length of `digits`, we have a complete combination. Add it to `result` and return.
6.  **Recursive Step:**
    -   Get the current digit: `digit = digits[index]`.
    -   Get the letters for that digit: `letters = digit_map[digit]`.
    -   Iterate through each `letter` in `letters`.
    -   For each `letter`, make a recursive call to explore the next level: `backtrack(index + 1, current_path + letter)`.
7.  Start the process by calling `backtrack(0, "")`.

**Big O:**
-   **Time Complexity:** O(N * 4^N), where N is the length of the `digits` string. In the worst case, each of the N digits corresponds to 4 letters. We have to explore all `4^N` combinations, and each combination has length `N`, so forming it takes `N` operations.
-   **Space Complexity:** O(N) for the recursion stack depth.

**Python Code:**
```python
from typing import List

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []
            
        digit_map = {
            '2': "abc", '3': "def", '4': "ghi", '5': "jkl", 
            '6': "mno", '7': "pqrs", '8': "tuv", '9': "wxyz"
        }
        
        result = []

        def backtrack(index, current_path):
            # Base case: we have a complete combination
            if len(current_path) == len(digits):
                result.append(current_path)
                return
            
            # Get letters for the current digit
            possible_letters = digit_map[digits[index]]
            for letter in possible_letters:
                # Explore by appending the letter and moving to the next digit
                backtrack(index + 1, current_path + letter)

        backtrack(0, "")
        return result
```

---

### **208. Implement Trie (Prefix Tree)**

#### **Question**
**Description:**
A trie (pronounced "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class with these methods:
-   `insert(word)`: Inserts the string `word` into the trie.
-   `search(word)`: Returns `true` if the string `word` is in the trie.
-   `startsWith(prefix)`: Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`.

**Example:**
```
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");
trie.search("app");     // returns true
```

#### **Answer**
**Algorithm:**
The core idea is to use a nested dictionary structure within a `TrieNode` class.
1.  **TrieNode Class:** Create a helper class `TrieNode`. Each instance will have:
    -   `children`: A dictionary mapping a character to another `TrieNode`.
    -   `is_end_of_word`: A boolean flag, `True` if a word ends at this node.
2.  **Trie Class (`__init__`)**: The `Trie` class itself will have a `root` member, initialized as a `TrieNode()`.
3.  **`insert(word)`**:
    -   Start with `curr = self.root`.
    -   For each `char` in `word`, check if `char` is in `curr.children`.
    -   If not, create a new `TrieNode` and add it: `curr.children[char] = TrieNode()`.
    -   Move to the next node: `curr = curr.children[char]`.
    -   After the loop, mark the end of the word: `curr.is_end_of_word = True`.
4.  **`search(word)` and `startsWith(prefix)`**:
    -   These methods share a common helper function to traverse the trie. Let's call it `_find_node(prefix)`. This function traverses the trie and returns the final node for the prefix, or `None` if the path doesn't exist.
    -   **`search`**: Call `_find_node(word)`. If it returns a node, check if `node.is_end_of_word` is `True`.
    -   **`startsWith`**: Call `_find_node(prefix)`. If it returns any node (not `None`), it means the prefix exists.

**Big O:**
Let `L` be the length of the word or prefix being processed.
-   **Time Complexity:**
    -   `insert`: O(L)
    -   `search`: O(L)
    -   `startsWith`: O(L)
-   **Space Complexity:** O(M), where M is the total number of characters in all words inserted into the trie.

**Python Code:**
```python
class TrieNode:
    def __init__(self):
        self.children = {}  # mapping char -> TrieNode
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_end_of_word = True

    def _find_node(self, prefix: str) -> TrieNode | None:
        curr = self.root
        for char in prefix:
            if char not in curr.children:
                return None
            curr = curr.children[char]
        return curr

    def search(self, word: str) -> bool:
        node = self._find_node(word)
        return node is not None and node.is_end_of_word

    def startsWith(self, prefix: str) -> bool:
        node = self._find_node(prefix)
        return node is not None
```

---

### **146. LRU Cache**

#### **Question**
**Description:**
Design a data structure that follows the constraints of a **Least Recently Used (LRU) Cache**.
Implement the `LRUCache` class:
-   `LRUCache(int capacity)`: Initializes the LRU cache with positive size `capacity`.
-   `int get(int key)`: Returns the value of the `key` if it exists, otherwise return -1. Accessing a key makes it the most recently used.
-   `void put(int key, int value)`: Updates the value of the `key` if it exists. Otherwise, adds the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, evict the least recently used key.

**Follow-up:** Could you do both operations in **O(1)** time complexity?

**Example:**
```
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1, cache is {2=2, 1=1}
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // return -1 (not found)
```

#### **Answer**
**Algorithm:**
The O(1) requirement for both `get` and `put` suggests a combination of two data structures:
1.  **Hash Map (Dictionary):** For O(1) lookup of keys. The map will store `key -> Node`.
2.  **Doubly Linked List:** For O(1) addition/removal of nodes to track recency. The most recently used items will be at one end (e.g., the head), and the least recently used at the other (e.g., the tail).

**Implementation Details:**
-   **Node:** Create a `DLinkedNode` class with `key`, `val`, `prev`, and `next` pointers.
-   **Cache Structure:** The `LRUCache` class will have a `capacity`, a `cache` dictionary, and two sentinel nodes `head` and `tail` for the doubly linked list.
-   **`_remove_node(node)`:** A helper to remove a node from the list.
-   **`_add_to_head(node)`:** A helper to add a node to the front of the list (making it most recent).
-   **`get(key)`:**
    1.  Check if `key` is in the `cache`. If not, return -1.
    2.  If it exists, get the `node` from the cache.
    3.  Move this `node` to the head of the list to mark it as most recently used (`_remove_node` then `_add_to_head`).
    4.  Return `node.val`.
-   **`put(key, value)`:**
    1.  Check if `key` is in the `cache`.
    2.  If it exists, update the `node.val` and move it to the head.
    3.  If it doesn't exist:
        a. Create a new `DLinkedNode`.
        b. Add it to the cache and to the head of the list.
        c. Check if the cache size exceeds `capacity`. If so, get the node at the tail (`tail.prev`), remove it from the list, and delete it from the cache.

**Big O:**
-   **Time Complexity:** O(1) for both `get` and `put`. Hash map lookups and linked list additions/removals are all O(1).
-   **Space Complexity:** O(capacity), as we store up to `capacity` key-value pairs.

**Python Code:**
```python
class DLinkedNode:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> DLinkedNode
        self.head = DLinkedNode() # Dummy head
        self.tail = DLinkedNode() # Dummy tail
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove_node(self, node):
        prev_node, next_node = node.prev, node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    def _add_to_head(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        
        node = self.cache[key]
        self._remove_node(node)
        self._add_to_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._remove_node(node)
            self._add_to_head(node)
        else:
            if len(self.cache) >= self.capacity:
                lru_node = self.tail.prev
                self._remove_node(lru_node)
                del self.cache[lru_node.key]
            
            new_node = DLinkedNode(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)
```

---

### **150. Evaluate Reverse Polish Notation**

#### **Question**
**Description:**
Evaluate the value of an arithmetic expression in **Reverse Polish Notation (RPN)**. Valid operators are `+`, `-`, `*`, `/`. Each operand may be an integer or another expression. Division between two integers should truncate toward zero.

**Examples:**
-   **Input:** `tokens = ["2","1","+","3","*"]`
-   **Output:** `9`
-   **Explanation:** `((2 + 1) * 3) = 9`

-   **Input:** `tokens = ["4","13","5","/","+"]`
-   **Output:** `6`
-   **Explanation:** `(4 + (13 / 5)) = 4 + 2 = 6`

#### **Answer**
**Algorithm:**
Reverse Polish Notation is perfectly suited for evaluation using a **stack**.
1.  Initialize an empty stack.
2.  Iterate through each `token` in the input list.
3.  If the `token` is a number:
    -   Convert it to an integer and `push` it onto the stack.
4.  If the `token` is an operator (`+`, `-`, `*`, `/`):
    -   `Pop` the top two operands from the stack. Let the first popped be `b` and the second be `a`. The order is important for subtraction and division.
    -   Perform the operation `a operator b`.
    -   `Push` the result back onto the stack.
5.  After the loop, the stack will contain exactly one number, which is the final result. Return this number.

**Note on Division:** Python's `int(a / b)` correctly truncates toward zero, which matches the problem's requirement (e.g., `int(-1 / 2)` is `0`, `int(5 / 2)` is `2`).

**Big O:**
-   **Time Complexity:** O(n), where `n` is the number of tokens. We process each token once.
-   **Space Complexity:** O(n). In the worst case, all tokens could be numbers, filling up the stack.

**Python Code:**
```python
from typing import List

class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        operators = {"+", "-", "*", "/"}

        for token in tokens:
            if token in operators:
                b = stack.pop()
                a = stack.pop()
                if token == '+':
                    stack.append(a + b)
                elif token == '-':
                    stack.append(a - b)
                elif token == '*':
                    stack.append(a * b)
                elif token == '/':
                    # Truncates toward zero, e.g., int(6 / -132) = 0
                    stack.append(int(a / b))
            else:
                stack.append(int(token))
        
        return stack[0]
```

---

### **155. Min Stack**

#### **Question**
**Description:**
Design a stack that supports `push`, `pop`, `top`, and `getMin` in constant time.
Implement the `MinStack` class:
-   `MinStack()` initializes the stack object.
-   `void push(int val)` pushes the element `val` onto the stack.
-   `void pop()` removes the element on the top of the stack.
-   `int top()` gets the top element of the stack.
-   `int getMin()` retrieves the minimum element in the stack.

**Example:**
```
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

#### **Answer**
**Algorithm:**
To achieve O(1) for `getMin`, we need to store the minimum value at each state of the stack. A simple way to do this is to have the stack store pairs of `(value, current_minimum)` instead of just the value.

1.  Initialize an empty list `self.stack`.
2.  **`push(val)`:**
    -   If the stack is empty, the new minimum is `val` itself. Push `(val, val)` onto the stack.
    -   If the stack is not empty, get the current minimum from the top of the stack: `current_min = self.stack[-1][1]`.
    -   The new minimum will be `min(val, current_min)`.
    -   Push the pair `(val, new_min)` onto the stack.
3.  **`pop()`:**
    -   Simply pop the top element from the stack. The minimum value is automatically adjusted because the previous state's minimum is now at the top.
4.  **`top()`:**
    -   Return the value part of the top element: `self.stack[-1][0]`.
5.  **`getMin()`:**
    -   Return the minimum part of the top element: `self.stack[-1][1]`.

**Big O:**
-   **Time Complexity:** O(1) for all operations (`push`, `pop`, `top`, `getMin`).
-   **Space Complexity:** O(n), where `n` is the number of elements in the stack. We store two integers for each element pushed.

**Python Code:**
```python
class MinStack:
    def __init__(self):
        # The stack will store tuples: (value, current_min)
        self.stack = []

    def push(self, val: int) -> None:
        if not self.stack:
            # If stack is empty, the min is the value itself
            self.stack.append((val, val))
        else:
            # The new min is the smaller of the val and the current min
            current_min = self.stack[-1][1]
            new_min = min(val, current_min)
            self.stack.append((val, new_min))

    def pop(self) -> None:
        if self.stack:
            self.stack.pop()

    def top(self) -> int:
        if self.stack:
            return self.stack[-1][0]
        return None

    def getMin(self) -> int:
        if self.stack:
            return self.stack[-1][1]
        return None
```

---

### **981. Time Based Key-Value Store**

#### **Question**
**Description:**
Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.
Implement the `TimeMap` class:
-   `TimeMap()` Initializes the object.
-   `void set(String key, String value, int timestamp)` Stores the key `key` with the value `value` at the given `timestamp`.
-   `String get(String key, int timestamp)` Returns a value. If there are multiple values, it returns the value associated with the largest `timestamp_prev` such that `timestamp_prev <= timestamp`. If there are no such values, it returns `""`.

**Example:**
```
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar"
timeMap.set("foo", "bar2", 4);
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"
```

#### **Answer**
**Algorithm:**
This problem requires storing values for each key in a time-ordered way and then searching efficiently.
1.  **Data Structure:** Use a hash map (`dict`) where each `key` maps to a list of `(timestamp, value)` pairs.
2.  **`set(key, value, timestamp)`:**
    -   If the `key` is not in the map, initialize it with an empty list.
    -   Append the new `(timestamp, value)` pair to the list associated with the `key`. The problem guarantees that timestamps are strictly increasing, so this list will automatically be sorted by timestamp.
3.  **`get(key, timestamp)`:**
    -   If `key` is not in the map, return `""`.
    -   Otherwise, retrieve the list of `(timestamp, value)` pairs.
    -   We need to find the rightmost element in this list whose timestamp is less than or equal to the given `timestamp`. This is a perfect use case for **Binary Search**.
    -   Perform a binary search on the list. The goal is to find the largest index `mid` where `values[mid][0] <= timestamp`.
    -   If the binary search doesn't find any valid timestamp (e.g., the smallest timestamp in the list is greater than the target `timestamp`), return `""`.
    -   Otherwise, return the value at the found index.

**Big O:**
-   **`set` Time Complexity:** O(1) on average.
-   **`get` Time Complexity:** O(log N), where N is the number of entries for a specific key, due to the binary search.
-   **Space Complexity:** O(M), where M is the total number of key-value pairs stored.

**Python Code:**
```python
import collections

class TimeMap:
    def __init__(self):
        # key -> list of [timestamp, value]
        self.store = collections.defaultdict(list)

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.store[key].append([timestamp, value])

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.store:
            return ""
        
        values = self.store[key]
        res = ""
        # Binary search to find the correct value
        left, right = 0, len(values) - 1
        
        while left <= right:
            mid = left + (right - left) // 2
            ts_mid, val_mid = values[mid]
            
            if ts_mid <= timestamp:
                # This is a potential candidate, store it and
                # try to find a better one (with a larger timestamp)
                # in the right half.
                res = val_mid
                left = mid + 1
            else:
                # Timestamp is too large, search in the left half
                right = mid - 1
                
        return res
```

---

### **322. Coin Change**

#### **Question**
**Description:**
You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`. You may assume that you have an infinite number of each kind of coin.

**Examples:**
-   **Input:** `coins = [1,2,5]`, `amount = 11`
-   **Output:** `3`
-   **Explanation:** `11 = 5 + 5 + 1`

-   **Input:** `coins = [2]`, `amount = 3`
-   **Output:** `-1`

#### **Answer**
**Algorithm:**
This is a classic **Dynamic Programming** problem. We can solve it using a bottom-up approach.

1.  Create a DP array, `dp`, of size `amount + 1`. `dp[i]` will store the minimum number of coins needed to make amount `i`.
2.  Initialize the array with a value larger than any possible answer, like `amount + 1` (or infinity). This represents that the amount is currently unreachable.
3.  Set the base case: `dp[0] = 0`, because 0 coins are needed to make an amount of 0.
4.  Iterate through each amount `a` from 1 to `amount`.
5.  For each amount `a`, iterate through each `coin` in the `coins` array.
6.  If `a - coin >= 0`, it means we can use this `coin`. The number of coins to make amount `a` would be `1 + dp[a - coin]` (1 for the current coin, plus the minimum coins for the remaining amount).
7.  Update `dp[a]` to be the minimum of its current value and this new value: `dp[a] = min(dp[a], 1 + dp[a - coin])`.
8.  After the loops, `dp[amount]` will hold the minimum coins for the target amount. If `dp[amount]` is still `amount + 1`, it means the amount was unreachable.

**Big O:**
-   **Time Complexity:** O(S * C), where S is the `amount` and C is the number of `coins`. This is due to the nested loops.
-   **Space Complexity:** O(S) for the DP array.

**Python Code:**
```python
import math
from typing import List

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # dp[i] will be the minimum coins to make amount i
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0
        
        for a in range(1, amount + 1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], 1 + dp[a - c])
                    
        if dp[amount] == amount + 1:
            return -1 # Amount cannot be made up
        else:
            return dp[amount]
```

---

### **33. Search in Rotated Sorted Array**

#### **Question**
**Description:**
There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k`. For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index 3 and become `[4,5,6,7,0,1,2]`.
Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`. You must write an algorithm with `O(log n)` runtime complexity.

**Examples:**
-   **Input:** `nums = [4,5,6,7,0,1,2]`, `target = 0`
-   **Output:** `4`

-   **Input:** `nums = [4,5,6,7,0,1,2]`, `target = 3`
-   **Output:** `-1`

#### **Answer**
**Algorithm:**
This requires a **Modified Binary Search**. The key is to determine which half of the current search space (`[left...right]`) is sorted and then check if the target lies within that sorted half.

1.  Initialize pointers `left = 0` and `right = len(nums) - 1`.
2.  While `left <= right`:
    -   Calculate `mid = left + (right - left) // 2`.
    -   If `nums[mid] == target`, return `mid`.
    -   **Check if the left half (`[left...mid]`) is sorted:** `if nums[left] <= nums[mid]`.
        -   If it is, check if the `target` is within the range of this sorted half (`nums[left] <= target < nums[mid]`).
        -   If yes, search in the left half: `right = mid - 1`.
        -   If no, search in the right half: `left = mid + 1`.
    -   **Otherwise, the right half (`[mid...right]`) must be sorted.**
        -   Check if the `target` is within the range of this sorted half (`nums[mid] < target <= nums[right]`).
        -   If yes, search in the right half: `left = mid + 1`.
        -   If no, search in the left half: `right = mid - 1`.
3.  If the loop finishes, the target was not found. Return `-1`.

**Big O:**
-   **Time Complexity:** O(log n), as we discard half of the search space in each step.
-   **Space Complexity:** O(1).

**Python Code:**
```python
from typing import List

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1

        while left <= right:
            mid = left + (right - left) // 2
            
            if nums[mid] == target:
                return mid
            
            # Check if left half is sorted
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1 # Target is in the sorted left half
                else:
                    left = mid + 1  # Target is in the right half
            # Otherwise, right half is sorted
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1  # Target is in the sorted right half
                else:
                    right = mid - 1 # Target is in the left half
                    
        return -1
```

---

### **543. Diameter of Binary Tree**

#### **Question**
**Description:**
Given the `root` of a binary tree, return the length of the **diameter** of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path is the number of edges between them.

**Examples:**
-   **Input:** `root = [1,2,3,4,5]`
-   **Output:** `3`
-   **Explanation:** The path `[4,2,1,3]` or `[5,2,1,3]` has length 3.

#### **Answer**
**Algorithm:**
This problem is solved using **Depth-First Search (DFS)** with a twist. For any node, the longest path that passes *through it* is the sum of the depths of its left and right subtrees. However, the overall longest path (the diameter) might not pass through the root of the entire tree.

1.  Initialize a variable `max_diameter = 0` outside the recursive function (as a class member or a non-local variable). This will store the maximum diameter found so far.
2.  Create a recursive helper function `dfs(node)`. This function will do two things:
    -   **Return:** The depth (longest path from the node down to a leaf) of the tree rooted at `node`.
    -   **Update:** The global `max_diameter`.
3.  Inside `dfs(node)`:
    -   **Base Case:** If `node` is `None`, its depth is 0. Return 0.
    -   Recursively call `dfs` on the left and right children to get their depths: `left_depth = dfs(node.left)` and `right_depth = dfs(node.right)`.
    -   Calculate the diameter passing through the current `node`: `current_diameter = left_depth + right_depth`.
    -   Update the global maximum: `max_diameter = max(max_diameter, current_diameter)`.
    -   **Return the depth** of the current node's subtree, which is `1 + max(left_depth, right_depth)`.
4.  Start the process by calling `dfs(root)` and then return `max_diameter`.

**Big O:**
-   **Time Complexity:** O(N), where N is the number of nodes, as we visit each node once.
-   **Space Complexity:** O(H), where H is the height of the tree, for the recursion stack. This can be O(N) in the worst case (a skewed tree).

**Python Code:**
```python
from typing import Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.max_diameter = 0

        def dfs(node):
            if not node:
                return 0 # Depth of a null node is 0
            
            left_depth = dfs(node.left)
            right_depth = dfs(node.right)
            
            # The diameter at this node is the sum of left and right depths
            current_diameter = left_depth + right_depth
            self.max_diameter = max(self.max_diameter, current_diameter)
            
            # Return the depth of this subtree
            return 1 + max(left_depth, right_depth)

        dfs(root)
        return self.max_diameter
```

---

### **56. Merge Intervals**

#### **Question**
**Description:**
Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Examples:**
-   **Input:** `intervals = [[1,3],[2,6],[8,10],[15,18]]`
-   **Output:** `[[1,6],[8,10],[15,18]]`
-   **Explanation:** Since intervals `[1,3]` and `[2,6]` overlap, merge them into `[1,6]`.

-   **Input:** `intervals = [[1,4],[4,5]]`
-   **Output:** `[[1,5]]`
-   **Explanation:** Intervals `[1,4]` and `[4,5]` are considered overlapping.

#### **Answer**
**Algorithm:**
The core idea is to sort the intervals and then iterate through them, merging as we go.

1.  **Sort:** Sort the `intervals` array based on the start time of each interval. This is the most critical step.
2.  Initialize a `result` list with the first interval from the sorted list.
3.  Iterate through the rest of the sorted intervals, starting from the second one.
4.  For each `current_interval`:
    -   Get the `last_merged_interval` from the end of the `result` list.
    -   **Check for overlap:** If the `current_interval`'s start is less than or equal to the `last_merged_interval`'s end, they overlap.
    -   **Merge:** If they overlap, update the `end` of the `last_merged_interval` to be the maximum of its current end and the `current_interval`'s end.
    -   **No Overlap:** If they don't overlap, it means we've finished with the last merged group. Simply append the `current_interval` to the `result` list.
5.  Return the `result` list.

**Big O:**
-   **Time Complexity:** O(N log N), dominated by the sorting step. The subsequent merge pass is O(N).
-   **Space Complexity:** O(N) or O(log N), depending on the space complexity of the sorting algorithm used. The `result` list can also take up to O(N) space.

**Python Code:**
```python
from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if not intervals:
            return []
        
        # 1. Sort intervals based on the start time
        intervals.sort(key=lambda x: x[0])
        
        merged = [intervals[0]]
        
        for i in range(1, len(intervals)):
            current_start, current_end = intervals[i]
            last_merged_end = merged[-1][1]
            
            # 2. Check for overlap and merge
            if current_start <= last_merged_end:
                # Overlap exists, merge by updating the end time
                merged[-1][1] = max(last_merged_end, current_end)
            else:
                # No overlap, add the new interval
                merged.append(intervals[i])
                
        return merged
```

---

### **200. Number of Islands**

#### **Question**
**Description:**
Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.

**Examples:**
-   **Input:**
    ```
    grid = [
      ["1","1","1","1","0"],
      ["1","1","0","1","0"],
      ["1","1","0","0","0"],
      ["0","0","0","0","0"]
    ]
    ```
-   **Output:** `1`

-   **Input:**
    ```
    grid = [
      ["1","1","0","0","0"],
      ["1","1","0","0","0"],
      ["0","0","1","0","0"],
      ["0","0","0","1","1"]
    ]
    ```
-   **Output:** `3`

#### **Answer**
**Algorithm:**
This is a classic graph traversal problem on a grid. We can iterate through each cell. If we find a piece of land (`'1'`), we've found a new island. We then use **Depth-First Search (DFS)** or **Breadth-First Search (BFS)** to find all connected parts of that island and "sink" them (e.g., change their value to `'0'`) so we don't count them again.

1.  Initialize `num_islands = 0`.
2.  Iterate through every cell `(r, c)` in the `grid`.
3.  If `grid[r][c] == '1'`:
    -   We have found a new island, so increment `num_islands`.
    -   Start a traversal (DFS or BFS) from `(r, c)` to find and mark all parts of this island.
    -   **DFS Helper `dfs(r, c)`:**
        -   Check for boundary conditions (out of bounds) or if the current cell is water (`'0'`). If so, return.
        -   "Sink" the current land cell by setting `grid[r][c] = '0'`.
        -   Recursively call `dfs` for all 4 neighbors (up, down, left, right).
4.  After the loops complete, return `num_islands`.

**Big O:**
-   **Time Complexity:** O(M * N), where M and N are the dimensions of the grid. Each cell is visited at most twice (once in the main loop and once by the DFS/BFS).
-   **Space Complexity:** O(M * N) in the worst case for the recursion stack depth if the entire grid is one island.

**Python Code:**
```python
from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0
        
        rows, cols = len(grid), len(grid[0])
        num_islands = 0

        def dfs(r, c):
            # Check boundaries and if it's not land
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
                return
            
            # Sink the current land part
            grid[r][c] = '0'
            
            # Explore neighbors
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    num_islands += 1
                    dfs(r, c)
        
        return num_islands
```

---

### **207. Course Schedule**

#### **Question**
**Description:**
There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you must take course `b_i` first if you want to take course `a_i`. For example, the pair `[0, 1]` indicates that to take course 0 you have to first take course 1.
Return `true` if you can finish all courses. Otherwise, return `false`.

**Examples:**
-   **Input:** `numCourses = 2`, `prerequisites = [[1,0]]`
-   **Output:** `true` (Take 0, then 1)

-   **Input:** `numCourses = 2`, `prerequisites = [[1,0],[0,1]]`
-   **Output:** `false` (A cycle exists: 0 -> 1 -> 0)

#### **Answer**
**Algorithm:**
This problem is equivalent to detecting a cycle in a directed graph. A valid course schedule exists if and only if the course dependency graph has no cycles. **Topological Sort** using Kahn's Algorithm (based on BFS and in-degrees) is a great approach.

1.  **Build Graph and In-Degrees:**
    -   Create an adjacency list `adj` to represent the graph.
    -   Create an array `in_degree` of size `numCourses`, initialized to 0.
    -   For each prerequisite `[a, b]` (b -> a), add `a` to `adj[b]` and increment `in_degree[a]`.
2.  **Initialize Queue:**
    -   Create a queue and add all courses with an `in_degree` of 0. These are the courses with no prerequisites.
3.  **Process Courses (BFS):**
    -   Initialize `courses_taken = 0`.
    -   While the queue is not empty:
        -   Dequeue a `course`.
        -   Increment `courses_taken`.
        -   For each `neighbor` of the dequeued `course`:
            -   Decrement `in_degree[neighbor]`.
            -   If `in_degree[neighbor]` becomes 0, it means all its prerequisites are met. Enqueue this `neighbor`.
4.  **Check Result:**
    -   If `courses_taken == numCourses`, it means all courses were successfully processed (no cycle). Return `true`.
    -   Otherwise, a cycle prevented some courses from being processed. Return `false`.

**Big O:**
-   **Time Complexity:** O(V + E), where V is the number of courses (vertices) and E is the number of prerequisites (edges).
-   **Space Complexity:** O(V + E) to store the adjacency list and in-degree array.

**Python Code:**
```python
import collections
from typing import List

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = collections.defaultdict(list)
        in_degree = [0] * numCourses

        for course, prereq in prerequisites:
            adj[prereq].append(course)
            in_degree[course] += 1
        
        q = collections.deque([i for i in range(numCourses) if in_degree[i] == 0])
        courses_taken = 0
        
        while q:
            course = q.popleft()
            courses_taken += 1
            
            for neighbor in adj[course]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    q.append(neighbor)
                    
        return courses_taken == numCourses
```

---

### **53. Maximum Subarray**

#### **Question**
**Description:**
Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

**Examples:**
-   **Input:** `nums = [-2,1,-3,4,-1,2,1,-5,4]`
-   **Output:** `6`
-   **Explanation:** `[4,-1,2,1]` has the largest sum = 6.

-   **Input:** `nums = [5,4,-1,7,8]`
-   **Output:** `23`
-   **Explanation:** `[5,4,-1,7,8]` has the largest sum = 23.

#### **Answer**
**Algorithm:**
This is the classic use case for **Kadane's Algorithm**, a simple and efficient dynamic programming approach.

1.  Initialize two variables:
    -   `max_so_far`: The global maximum sum found. Initialize to the first element of `nums`.
    -   `current_max`: The maximum sum of a subarray ending at the current position. Initialize to the first element.
2.  Iterate through the array `nums` starting from the second element (`i = 1`).
3.  For each number `num`:
    -   The `current_max` for this position is either the `num` itself (starting a new subarray here) or `num + current_max` (extending the previous subarray). So, `current_max = max(num, current_max + num)`.
    -   Update the global `max_so_far` if the `current_max` is greater: `max_so_far = max(max_so_far, current_max)`.
4.  After the loop, `max_so_far` holds the answer.

**Big O:**
-   **Time Complexity:** O(N), as we iterate through the array once.
-   **Space Complexity:** O(1), as we only use a few variables.

**Python Code:**
```python
from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        if not nums:
            return 0
        
        # Initialize with the first element's value
        max_so_far = nums[0]
        current_max = nums[0]
        
        for i in range(1, len(nums)):
            num = nums[i]
            # Decide whether to extend the current subarray or start a new one
            current_max = max(num, current_max + num)
            # Update the overall maximum sum found so far
            max_so_far = max(max_so_far, current_max)
            
        return max_so_far
```

---

### **973. K Closest Points to Origin**

#### **Question**
**Description:**
Given an array of `points` where `points[i] = [x_i, y_i]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`. The distance between two points is the Euclidean distance. You may return the answer in any order.

**Examples:**
-   **Input:** `points = [[1,3],[-2,2]]`, `k = 1`
-   **Output:** `[[-2,2]]`
-   **Explanation:** The distance of (1,3) is `sqrt(10)`. The distance of (-2,2) is `sqrt(8)`. Since `sqrt(8) < sqrt(10)`, (-2,2) is closer. We only want the closest `k=1` point.

-   **Input:** `points = [[3,3],[5,-1],[-2,4]]`, `k = 2`
-   **Output:** `[[3,3],[-2,4]]` (or `[[-2,4],[3,3]]`)

#### **Answer**
**Algorithm:**
This is a "Top K" problem, which is a perfect use case for a **Max-Heap** (or a min-heap in Python, with a trick). We want to maintain a heap of size `k` containing the `k` closest points seen so far.

1.  **Optimization:** To compare distances, we don't need the square root. We can compare the squared Euclidean distances (`x^2 + y^2`) to avoid floating-point calculations.
2.  Initialize an empty max-heap `heap`. In Python, `heapq` is a min-heap, so we store **negative** distances to simulate a max-heap.
3.  Iterate through each `point` in the `points` array.
4.  For each `point = [x, y]`:
    -   Calculate its squared distance: `dist = x*x + y*y`.
    -   Push `(-dist, x, y)` onto the heap. The negative sign ensures the largest distance is at the top (smallest value).
    -   If the size of the heap is now greater than `k`, pop from the heap. This removes the point with the largest distance (farthest from the origin) among the current candidates.
5.  After iterating through all points, the heap contains the `k` points with the smallest distances.
6.  Extract the points from the heap (ignoring the negative distance) and return them.

**Big O:**
-   **Time Complexity:** O(N log K), where N is the number of points. Each of the N points is processed with a heap operation (push/pop) that takes O(log K) time.
-   **Space Complexity:** O(K) to store the heap.

**Python Code:**
```python
import heapq
from typing import List

class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        # Use a max-heap to keep track of the k closest points seen so far.
        # Python's heapq is a min-heap, so we store negative distances.
        max_heap = []

        for x, y in points:
            # Calculate squared distance to avoid sqrt
            dist_sq = -(x*x + y*y)
            
            if len(max_heap) < k:
                heapq.heappush(max_heap, (dist_sq, x, y))
            else:
                # If the new point is closer than the farthest point in the heap,
                # replace the farthest point.
                heapq.heappushpop(max_heap, (dist_sq, x, y))

        # The heap now contains the k closest points.
        # Extract them from the heap tuples.
        return [[x, y] for (dist, x, y) in max_heap]
```

---

### **238. Product of Array Except Self**

#### **Question**
**Description:**
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Examples:**
-   **Input:** `nums = [1,2,3,4]`
-   **Output:** `[24,12,8,6]`

-   **Input:** `nums = [-1,1,0,-3,3]`
-   **Output:** `[0,0,9,0,0]`

#### **Answer**
**Algorithm:**
The problem can be solved in O(n) time without division by making two passes over the array. The product at index `i` is essentially `(product of all numbers to the left of i) * (product of all numbers to the right of i)`.

1.  Initialize a `result` array of the same size as `nums`, filled with `1`s.
2.  **First Pass (Left-to-Right for Prefixes):**
    -   Initialize a variable `prefix_product = 1`.
    -   Iterate from `i = 0` to `n-1`.
    -   For each `i`, set `result[i] = prefix_product`.
    -   Then, update the prefix product for the *next* iteration: `prefix_product *= nums[i]`.
3.  After this pass, `result[i]` contains the product of all elements to its left.
4.  **Second Pass (Right-to-Left for Postfixes):**
    -   Initialize a variable `postfix_product = 1`.
    -   Iterate from `i = n-1` down to `0`.
    -   For each `i`, multiply the existing `result[i]` (which holds the prefix product) by the `postfix_product`.
    -   Then, update the postfix product for the *next* iteration: `postfix_product *= nums[i]`.
5.  After the second pass, `result` will contain the final answer.

**Big O:**
-   **Time Complexity:** O(N), because we make two separate passes through the array.
-   **Space Complexity:** O(1), if the output array is not counted towards the space complexity, as required by the problem's follow-up. Otherwise, it's O(N).

**Python Code:**
```python
from typing import List

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        result = [1] * n
        
        # First pass: Calculate prefix products
        # result[i] will contain the product of all elements to the left of i
        prefix_product = 1
        for i in range(n):
            result[i] = prefix_product
            prefix_product *= nums[i]
            
        # Second pass: Calculate postfix products and multiply
        # result[i] will be multiplied by the product of all elements to the right of i
        postfix_product = 1
        for i in range(n - 1, -1, -1):
            result[i] *= postfix_product
            postfix_product *= nums[i]
            
        return result
```

---

### **438. Find All Anagrams in a String**

#### **Question**
**Description:**
Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in any order. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Examples:**
-   **Input:** `s = "cbaebabacd"`, `p = "abc"`
-   **Output:** `[0,6]`
-   **Explanation:** The substring with start index 0 is "cba", which is an anagram of "abc". The substring with start index 6 is "bac", which is an anagram of "abc".

-   **Input:** `s = "abab"`, `p = "ab"`
-   **Output:** `[0,1,2]`

#### **Answer**
**Algorithm:**
This is a classic problem for the **Sliding Window with a Frequency Map** technique. We maintain a window in `s` of the same size as `p` and check if the characters in the window form an anagram of `p`.

1.  If `len(p) > len(s)`, it's impossible, so return `[]`.
2.  Create two frequency maps (arrays of size 26 or dictionaries): `p_freq` for the pattern `p`, and `s_window_freq` for the current window in `s`.
3.  Populate `p_freq` by counting characters in `p`. Also, populate `s_window_freq` for the initial window of size `len(p)`.
4.  Initialize a `result` list. If the initial `p_freq == s_window_freq`, add index `0` to `result`.
5.  Slide the window one character at a time from `left = 0` to `len(s) - len(p) - 1`.
    -   **Slide Right:** Increment the count for the new character entering the window from the right.
    -   **Slide Left:** Decrement the count for the character leaving the window from the left.
    -   **Compare:** After each slide, compare `s_window_freq` with `p_freq`. If they are identical, it means the current window is an anagram. Add the new starting index (`left + 1`) to the `result` list.
6.  Return `result`.

**Big O:**
-   **Time Complexity:** O(N), where N is the length of `s`. We iterate through `s` once. The frequency map comparison is O(1) because the alphabet size (26) is constant.
-   **Space Complexity:** O(k), where k is the alphabet size (constant, O(1)), for the frequency maps.

**Python Code:**
```python
import collections
from typing import List

class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        if len(p) > len(s):
            return []
            
        p_freq = collections.Counter(p)
        s_window_freq = collections.Counter()
        
        result = []
        
        # Initialize the first window
        for i in range(len(p)):
            s_window_freq[s[i]] += 1
        
        if s_window_freq == p_freq:
            result.append(0)
            
        # Slide the window across the rest of s
        for i in range(len(p), len(s)):
            # Add the new character entering the window
            s_window_freq[s[i]] += 1
            
            # Remove the character leaving the window
            char_to_remove = s[i - len(p)]
            if s_window_freq[char_to_remove] == 1:
                del s_window_freq[char_to_remove]
            else:
                s_window_freq[char_to_remove] -= 1
            
            # Check if the current window is an anagram
            if s_window_freq == p_freq:
                result.append(i - len(p) + 1)
                
        return result
```

---

### **79. Word Search**

#### **Question**
**Description:**
Given an `m x n` `grid` of characters and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where "adjacent" cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Examples:**
-   **Input:** `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`, `word = "ABCCED"`
-   **Output:** `true`

-   **Input:** `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`, `word = "SEE"`
-   **Output:** `true`

-   **Input:** `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`, `word = "ABCB"`
-   **Output:** `false`

#### **Answer**
**Algorithm:**
This problem requires **Backtracking on a Grid**. We will try to find a path that matches the word, and if a path leads to a dead end, we backtrack and try another way.

1.  Iterate through every cell `(r, c)` of the board. If `board[r][c]` matches the first character of the `word`, start a DFS-based backtracking search from that cell.
2.  Define a recursive helper function `backtrack(r, c, k)` where `k` is the index of the character in `word` we are currently trying to match.
3.  **Inside `backtrack(r, c, k)`:**
    -   **Base Case (Success):** If `k` equals `len(word)`, we have found the entire word. Return `True`.
    -   **Base Case (Failure):** Check for failure conditions:
        -   The cell `(r, c)` is out of bounds.
        -   `board[r][c]` does not match `word[k]`.
        -   The cell has already been visited in the current path.
        -   If any are true, return `False`.
    -   **Mark and Explore:**
        -   Temporarily mark the current cell as visited to prevent using it again in the same path. A common way is to change its value (e.g., `board[r][c] = '#'`) or use a separate `visited` set.
        -   Recursively call `backtrack` for all 4 neighbors (`r+1,c`, `r-1,c`, `r,c+1`, `r,c-1`) with the next character index `k+1`.
        -   If any of the recursive calls return `True`, it means a path was found. Propagate `True` up.
    -   **Backtrack:**
        -   **Crucially**, before returning, un-mark the cell (restore its original character or remove from `visited` set). This allows the cell to be used in other potential paths starting from a different initial cell.
4.  If the main loop finishes without any `backtrack` call returning `True`, the word doesn't exist. Return `False`.

**Big O:**
-   **Time Complexity:** O(N * M * 4^L), where N and M are the grid dimensions and L is the length of the `word`. In the worst case, from each of N*M cells, we might explore 4 directions up to L times.
-   **Space Complexity:** O(L) for the recursion stack depth.

**Python Code:**
```python
from typing import List

class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        rows, cols = len(board), len(board[0])
        
        def backtrack(r, c, k):
            # Base case: successfully found the entire word
            if k == len(word):
                return True
            
            # Base case: failure conditions
            if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[k]:
                return False
            
            # Mark the cell as visited for this path
            temp, board[r][c] = board[r][c], "#"
            
            # Explore neighbors
            found = (backtrack(r + 1, c, k + 1) or
                     backtrack(r - 1, c, k + 1) or
                     backtrack(r, c + 1, k + 1) or
                     backtrack(r, c - 1, k + 1))
            
            # Un-mark the cell (backtrack)
            board[r][c] = temp
            
            return found

        for r in range(rows):
            for c in range(cols):
                if backtrack(r, c, 0):
                    return True
        return False
```

---

### **139. Word Break**

#### **Question**
**Description:**
Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words. Note that the same word in the dictionary may be reused multiple times in the segmentation.

**Examples:**
-   **Input:** `s = "leetcode"`, `wordDict = ["leet","code"]`
-   **Output:** `true`

-   **Input:** `s = "applepenapple"`, `wordDict = ["apple","pen"]`
-   **Output:** `true`

-   **Input:** `s = "catsandog"`, `wordDict = ["cats","dog","sand","and","cat"]`
-   **Output:** `false`

#### **Answer**
**Algorithm:**
This is a classic **1D Dynamic Programming** problem. We want to determine if prefixes of the string `s` can be segmented.

1.  Create a DP boolean array `dp` of size `len(s) + 1`. `dp[i]` will be `True` if the substring `s[0...i-1]` can be segmented.
2.  Set the base case: `dp[0] = True`, representing an empty string that can be "segmented" with zero words.
3.  Convert `wordDict` to a `set` for O(1) average time lookups.
4.  Iterate from `i = 1` to `len(s)` (representing the end of the current substring).
5.  For each `i`, iterate with another pointer `j` from `0` to `i-1` (representing a potential split point).
6.  At each `(i, j)` pair, check two conditions:
    -   Is `dp[j]` true? (Meaning the prefix `s[0...j-1]` is valid).
    -   Is the remaining part `s[j...i-1]` a word in the `wordDict`?
7.  If both are true, it means `s[0...i-1]` can be segmented. Set `dp[i] = True` and `break` the inner loop (since we only need one way to segment it).
8.  The final answer is the value of `dp[len(s)]`.

**Big O:**
-   **Time Complexity:** O(N * M * K), where N is `len(s)`, M is `len(wordDict)`, and K is `max(len(word))`. With a hash set for the dictionary and Python's string slicing, it's closer to O(N^2 * K) due to the nested loops and slicing. A more optimized version is O(N * M), checking `s.startswith(word, j)` to avoid slicing. The standard DP approach is often cited as O(N^2).
-   **Space Complexity:** O(N) for the DP array.

**Python Code:**
```python
from typing import List

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        word_set = set(wordDict)
        # dp[i] is True if s[0...i-1] can be segmented
        dp = [False] * (len(s) + 1)
        dp[0] = True # Base case for empty prefix
        
        for i in range(1, len(s) + 1):
            for j in range(i):
                # Check if the prefix s[0...j-1] is valid AND
                # the remaining part s[j...i-1] is in the dictionary.
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break # Found a way, no need to check other splits for i
                    
        return dp[len(s)]
```

Of course. To ensure you have comprehensive coverage across all the major categories, here are suggestions for additional "Easy" and "Medium" flashcards. These selections fill in some gaps and introduce other classic problems from the Grind 75 list that test core concepts.

---

### **278. First Bad Version**

**Category:** Binary Search
**Why it's a good addition:** This is a quintessential binary search problem on an abstract space rather than a simple array, which is a common variation.

#### **Question**
**Description:**
You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.
Suppose you have `n` versions `[1, 2, ..., n]` and you want to find the first bad one, which causes all the following ones to be bad. You are given an API `bool isBadVersion(version)` which returns whether a version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

**Examples:**
-   **Input:** `n = 5`, `bad = 4`
-   **Output:** `4`
-   **Explanation:** `isBadVersion(3)` -> false, `isBadVersion(5)` -> true, `isBadVersion(4)` -> true. Then 4 is the first bad version.

#### **Answer**
**Algorithm:**
The problem structure `[false, false, ..., true, true, true]` is perfectly suited for **Binary Search**. Our goal is to find the leftmost `true`.

1.  Initialize pointers `left = 1` and `right = n`.
2.  Initialize a variable `first_bad = n`.
3.  While `left <= right`:
    -   Calculate `mid = left + (right - left) // 2`.
    -   Call `isBadVersion(mid)`.
    -   If `isBadVersion(mid)` is `true`:
        -   This `mid` is a potential answer. We record it and try to find an even earlier bad version in the left half.
        -   Set `first_bad = mid`, and search left: `right = mid - 1`.
    -   If `isBadVersion(mid)` is `false`:
        -   This version is good, so the first bad version must be to its right.
        -   Search right: `left = mid + 1`.
4.  Return `first_bad`.

**Big O:**
-   **Time Complexity:** O(log N), as we are performing a binary search over N versions.
-   **Space Complexity:** O(1).

**Python Code:**
```python
# The isBadVersion API is defined for you.
# def isBadVersion(version: int) -> bool:

class Solution:
    def firstBadVersion(self, n: int) -> int:
        left, right = 1, n
        
        while left <= right:
            mid = left + (right - left) // 2
            if isBadVersion(mid):
                # This could be the first bad one, try to find an earlier one
                right = mid - 1
            else:
                # This version is good, so the first bad one must be after it
                left = mid + 1
        
        # 'left' will be pointing to the first bad version at the end
        return left
```

---

### **110. Balanced Binary Tree**

**Category:** Trees (DFS)
**Why it's a good addition:** It's a classic tree problem that requires combining depth calculation with a balance check in a single traversal.

#### **Question**
**Description:**
Given a binary tree, determine if it is **height-balanced**. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

**Examples:**
-   **Input:** `root = [3,9,20,null,null,15,7]`
-   **Output:** `true`

-   **Input:** `root = [1,2,2,3,3,null,null,4,4]`
-   **Output:** `false`

#### **Answer**
**Algorithm:**
We can adapt a standard DFS depth-finding algorithm. The recursive function will return the height of a subtree, but it will also signal if an imbalance is found.

1.  Create a recursive helper function `check_height(node)`.
2.  **Inside `check_height(node)`:**
    -   **Base Case:** If `node` is `None`, it's balanced and has a height of 0. Return `0`.
    -   Recursively call `check_height` on the left and right children: `left_height = check_height(node.left)`, `right_height = check_height(node.right)`.
    -   **Check for Imbalance Signal:** If either recursive call returned a special value (e.g., `-1`) indicating an imbalance in a lower subtree, propagate this signal up by immediately returning `-1`.
    -   **Check Current Node's Balance:** If `abs(left_height - right_height) > 1`, this node is unbalanced. Return `-1`.
    -   **Return Height:** If the node is balanced, return its height: `1 + max(left_height, right_height)`.
3.  The main function calls `check_height(root)` and returns `False` if the result is `-1`, otherwise `True`.

**Big O:**
-   **Time Complexity:** O(N), as we visit each node once.
-   **Space Complexity:** O(H), where H is the height of the tree, for the recursion stack.

**Python Code:**
```python
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        
        def check_height(node):
            if not node:
                return 0 # Height of a null tree
            
            left_height = check_height(node.left)
            # If a subtree is already unbalanced, propagate the error
            if left_height == -1:
                return -1

            right_height = check_height(node.right)
            # If a subtree is already unbalanced, propagate the error
            if right_height == -1:
                return -1
                
            # Check if the current node is unbalanced
            if abs(left_height - right_height) > 1:
                return -1
            
            # Return the height of the current node's subtree
            return 1 + max(left_height, right_height)
            
        return check_height(root) != -1
```


---

### **49. Group Anagrams**

**Category:** Arrays & Hashing
**Why it's a good addition:** This is a canonical problem demonstrating a clever use of hash maps where the key is a canonical representation of a group.

#### **Question**
**Description:**
Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

**Examples:**
-   **Input:** `strs = ["eat","tea","tan","ate","nat","bat"]`
-   **Output:** `[["bat"],["nat","tan"],["eat","tea","ate"]]`

#### **Answer**
**Algorithm:**
The key is to find a unique "signature" or "key" for each anagram group. A sorted string is a perfect candidate.

1.  Initialize an empty dictionary `anagram_map`. The keys will be the sorted string signatures, and the values will be lists of the original strings.
2.  Iterate through each `word` in the input list `strs`.
3.  For each `word`, create its signature by sorting its characters: `signature = "".join(sorted(word))`.
4.  Use this `signature` as a key in `anagram_map`. Append the original `word` to the list associated with this key. A `defaultdict` is useful here.
5.  After iterating through all words, the `anagram_map` will have all strings grouped by their signature.
6.  Return the values of the `anagram_map`.

**Big O:**
-   **Time Complexity:** O(N * K log K), where N is the number of strings and K is the maximum length of a string. Sorting each string takes O(K log K).
-   **Space Complexity:** O(N * K) to store the hash map.

**Python Code:**
```python
import collections
from typing import List

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        anagram_map = collections.defaultdict(list)
        
        for word in strs:
            # The sorted string is the unique key for an anagram group
            signature = "".join(sorted(word))
            anagram_map[signature].append(word)
            
        return list(anagram_map.values())
```

---

### **102. Binary Tree Level Order Traversal**

**Category:** Trees (BFS)
**Why it's a good addition:** This is the most fundamental application of Breadth-First Search (BFS) on a tree and a very common interview question.

#### **Question**
**Description:**
Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Examples:**
-   **Input:** `root = [3,9,20,null,null,15,7]`
-   **Output:** `[[3],[9,20],[15,7]]`

#### **Answer**
**Algorithm:**
This is a perfect use case for **Breadth-First Search (BFS)** using a queue.

1.  Initialize an empty list `result` and a queue (e.g., `collections.deque`) containing the `root` node if it exists.
2.  While the queue is not empty:
    -   Get the number of nodes at the current level: `level_size = len(queue)`.
    -   Initialize a list `current_level` to store the values of nodes at this level.
    -   Loop `level_size` times to process all nodes at the current level.
        -   Dequeue a `node`.
        -   Add its value to `current_level`.
        -   If the `node` has a left child, enqueue it.
        -   If the `node` has a right child, enqueue it.
    -   After the inner loop, append `current_level` to the `result`.
3.  Return `result`.

**Big O:**
-   **Time Complexity:** O(N), as we visit each node exactly once.
-   **Space Complexity:** O(W), where W is the maximum width of the tree. This is for the queue, which can hold up to all nodes at the widest level.

**Python Code:**
```python
import collections
from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        
        result = []
        q = collections.deque([root])
        
        while q:
            level_size = len(q)
            current_level = []
            
            for _ in range(level_size):
                node = q.popleft()
                current_level.append(node.val)
                
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            
            result.append(current_level)
            
        return result
```

---

### **46. Permutations**

**Category:** Backtracking
**Why it's a good addition:** This is a cornerstone backtracking problem that demonstrates how to build solutions step-by-step while managing the state of used elements.

#### **Question**
**Description:**
Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.

**Examples:**
-   **Input:** `nums = [1,2,3]`
-   **Output:** `[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`

#### **Answer**
**Algorithm:**
This is solved using **Backtracking**. We build a permutation one element at a time.

1.  Initialize an empty list `result` to store all permutations.
2.  Define a recursive helper `backtrack(current_path, available_nums)`.
3.  **Inside `backtrack`:**
    -   **Base Case:** If `available_nums` is empty, it means we have formed a full permutation. Add a copy of `current_path` to `result` and return.
    -   **Recursive Step:** Iterate through each `num` in `available_nums`.
        -   **Choose:** Add `num` to `current_path`.
        -   **Explore:** Make a recursive call with the updated path and the remaining available numbers.
        -   **Un-choose (Backtrack):** Remove `num` from `current_path` so it's available for other branches of the recursion.
4.  A common implementation avoids passing `available_nums` by checking if a number from the original `nums` is already in the `current_path`.

**Big O:**
-   **Time Complexity:** O(N * N!), where N is the number of elements. There are N! permutations, and for each one, we take N steps to build it.
-   **Space Complexity:** O(N) for the recursion stack depth and the path storage.

**Python Code:**
```python
from typing import List

class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []
        
        def backtrack(current_path):
            # Base case: a full permutation is formed
            if len(current_path) == len(nums):
                result.append(current_path[:]) # Append a copy
                return
            
            for num in nums:
                if num not in current_path:
                    # Choose
                    current_path.append(num)
                    # Explore
                    backtrack(current_path)
                    # Un-choose (backtrack)
                    current_path.pop()
        
        backtrack([])
        return result
```

Absolutely. Let's continue with another set of Medium questions from the list, focusing on fundamental tree algorithms, classic dynamic programming, backtracking for subsets, and the elegant Dutch National Flag problem.

***

### **Grind 75 Flashcards: Medium Questions (Part 7)**

---

### **98. Validate Binary Search Tree**

#### **Question**
**Description:**
Given the `root` of a binary tree, determine if it is a valid **binary search tree (BST)**.
A valid BST is defined as follows:
-   The left subtree of a node contains only nodes with keys **less than** the node's key.
-   The right subtree of a node contains only nodes with keys **greater than** the node's key.
-   Both the left and right subtrees must also be binary search trees.

**Examples:**
-   **Input:** `root = [2,1,3]`
-   **Output:** `true`

-   **Input:** `root = [5,1,4,null,null,3,6]`
-   **Output:** `false`
-   **Explanation:** The root node's value is 5 but its right child's value is 4.

#### **Answer**
**Algorithm:**
A simple check like `node.left.val < node.val` is not sufficient because a node in the left subtree could be greater than an ancestor node. The correct approach is to perform a **recursive DFS traversal** while passing down valid range constraints (`min_val`, `max_val`).

1.  Define a recursive helper function `is_valid(node, min_val, max_val)`.
2.  **Inside `is_valid`:**
    -   **Base Case:** If `node` is `None`, it's a valid BST. Return `True`.
    -   **Validation:** Check if the current `node.val` violates the constraints. If `node.val <= min_val` or `node.val >= max_val`, it's invalid. Return `False`.
    -   **Recursive Step:**
        -   For the left child, the new valid range is `(min_val, node.val)`. Call `is_valid(node.left, min_val, node.val)`.
        -   For the right child, the new valid range is `(node.val, max_val)`. Call `is_valid(node.right, node.val, max_val)`.
    -   Return `True` only if both recursive calls return `True`.
3.  Initial call: `is_valid(root, -infinity, +infinity)`.

**Big O:**
-   **Time Complexity:** O(N), where N is the number of nodes, as we visit each node once.
-   **Space Complexity:** O(H), where H is the height of the tree, for the recursion stack.

**Python Code:**
```python
import math
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        
        def is_valid(node, min_val, max_val):
            if not node:
                return True
            
            # The current node's value must be within the valid range
            if not (min_val < node.val < max_val):
                return False
            
            # Recursively check left and right subtrees with updated ranges
            is_left_valid = is_valid(node.left, min_val, node.val)
            is_right_valid = is_valid(node.right, node.val, max_val)
            
            return is_left_valid and is_right_valid

        return is_valid(root, -math.inf, math.inf)
```

---

### **230. Kth Smallest Element in a BST**

#### **Question**
**Description:**
Given the `root` of a binary search tree and an integer `k`, return the `k`th smallest value (1-indexed) of all the values of the nodes in the tree.

**Examples:**
-   **Input:** `root = [3,1,4,null,2]`, `k = 1`
-   **Output:** `1`

-   **Input:** `root = [5,3,6,2,4,null,null,1]`, `k = 3`
-   **Output:** `3`

#### **Answer**
**Algorithm:**
The key property of a Binary Search Tree (BST) is that an **in-order traversal** visits its nodes in ascending sorted order. We can leverage this to find the kth smallest element.

1.  Perform an in-order traversal (Left, Root, Right) of the BST.
2.  Store the visited node values in a list.
3.  The `k`th smallest element will be the element at index `k-1` in the resulting sorted list.

**Optimized Iterative In-order Traversal:**
We can stop the traversal as soon as we find the `k`th element, avoiding building the full list.
1.  Initialize an empty stack and a `count = 0`.
2.  Start with `current_node = root`.
3.  Loop as long as `current_node` is not `None` or the `stack` is not empty.
    -   While `current_node` is not `None`, push it onto the `stack` and go left: `current_node = current_node.left`.
    -   Once you can't go left anymore, pop a node from the stack. This is the next node in the in-order sequence.
    -   Increment `count`. If `count == k`, this node is our answer. Return its value.
    -   Move to the right subtree to continue the traversal: `current_node = popped_node.right`.

**Big O:**
-   **Time Complexity:** O(H + k), where H is the height of the tree. We traverse down to the smallest element (O(H)) and then visit up to `k` elements. In a balanced tree, this is O(log N + k).
-   **Space Complexity:** O(H) for the stack in the iterative approach.

**Python Code:**
```python
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        current = root
        
        while current or stack:
            # Go left as far as possible
            while current:
                stack.append(current)
                current = current.left
            
            # Process the node (this is the in-order visit)
            current = stack.pop()
            k -= 1
            if k == 0:
                return current.val
            
            # Move to the right subtree
            current = current.right
```

---

### **105. Construct Binary Tree from Preorder and Inorder Traversal**

#### **Question**
**Description:**
Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.

**Examples:**
-   **Input:** `preorder = [3,9,20,15,7]`, `inorder = [9,3,15,20,7]`
-   **Output:** `[3,9,20,null,null,15,7]`

#### **Answer**
**Algorithm:**
This is a classic **divide-and-conquer** problem using recursion.
-   **Preorder (`Root, Left, Right`)** tells us the root of any subtree. The very first element is the root of the entire tree.
-   **Inorder (`Left, Root, Right`)** tells us which nodes are in the left and right subtrees relative to a root.

1.  **Optimization:** Create a hash map `inorder_map` to store `value -> index` for the `inorder` array. This allows for O(1) lookup of a root's position in the inorder traversal.
2.  Define a recursive helper function `build(pre_start, pre_end, in_start, in_end)`.
3.  **Inside `build`:**
    -   **Base Case:** If `pre_start > pre_end` or `in_start > in_end`, there are no nodes to build. Return `None`.
    -   **Find Root:** The root of the current subtree is `preorder[pre_start]`.
    -   **Create Node:** `root_node = TreeNode(root_val)`.
    -   **Find Split Point:** Find the index of `root_val` in the inorder array using the hash map: `inorder_root_idx = inorder_map[root_val]`.
    -   **Get Subtree Sizes:** The number of nodes in the left subtree is `num_left = inorder_root_idx - in_start`.
    -   **Recursive Calls:**
        -   `root_node.left = build(pre_start + 1, pre_start + num_left, in_start, inorder_root_idx - 1)`
        -   `root_node.right = build(pre_start + num_left + 1, pre_end, inorder_root_idx + 1, in_end)`
    -   Return `root_node`.

**Big O:**
-   **Time Complexity:** O(N), as we visit each node once. The hash map makes finding the inorder index O(1).
-   **Space Complexity:** O(N) for the hash map and O(H) for the recursion stack (where H is tree height). Total space is O(N).

**Python Code:**
```python
from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        inorder_map = {val: i for i, val in enumerate(inorder)}
        preorder_idx = 0
        
        def build(in_left, in_right):
            nonlocal preorder_idx
            # Base case: no elements to construct subtree
            if in_left > in_right:
                return None
            
            # The first element in preorder is the root
            root_val = preorder[preorder_idx]
            preorder_idx += 1
            root = TreeNode(root_val)
            
            # Find root's position in inorder to split left/right subtrees
            inorder_root_idx = inorder_map[root_val]
            
            # Recursively build left and right subtrees
            root.left = build(in_left, inorder_root_idx - 1)
            root.right = build(inorder_root_idx + 1, in_right)
            
            return root
            
        return build(0, len(inorder) - 1)
```

---

### **78. Subsets**

#### **Question**
**Description:**
Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

**Examples:**
-   **Input:** `nums = [1,2,3]`
-   **Output:** `[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`

#### **Answer**
**Algorithm:**
This is a quintessential **Backtracking** problem where we build subsets by deciding, for each number, whether to include it or not.

1.  Initialize an empty list `result` to store all subsets and an empty list `current_path` to build a subset.
2.  Define a recursive helper `backtrack(start_index)`.
3.  **Inside `backtrack`:**
    -   First, add the current state of `current_path` to the `result` list. This captures the subset formed at this stage.
    -   Iterate from `start_index` to the end of `nums`. This prevents generating duplicate subsets (e.g., `[2,1]` after `[1,2]`).
    -   For each number `nums[i]`:
        -   **Choose:** Add `nums[i]` to `current_path`.
        -   **Explore:** Make a recursive call: `backtrack(i + 1)`. We pass `i + 1` to ensure we only consider elements after the current one for the next step.
        -   **Un-choose (Backtrack):** Remove `nums[i]` from `current_path` to explore paths that *don't* include this element at this level.
4.  Start the process by calling `backtrack(0)`.

**Big O:**
-   **Time Complexity:** O(N * 2^N). There are 2^N subsets, and for each subset, it can take up to O(N) time to create a copy of it.
-   **Space Complexity:** O(N) for the recursion stack depth and the `current_path`.

**Python Code:**
```python
from typing import List

class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        result = []
        current_path = []

        def backtrack(start_index):
            # Add the subset formed so far
            result.append(current_path[:])
            
            # Explore further options by adding more elements
            for i in range(start_index, len(nums)):
                # Choose
                current_path.append(nums[i])
                # Explore
                backtrack(i + 1)
                # Un-choose (backtrack)
                current_path.pop()

        backtrack(0)
        return result
```

Of course. The "Hard" problems from Grind 75 are excellent for pushing your understanding of algorithms to the limit. They often require combining multiple concepts or using a very clever insight. Here is the first set.

---

### **23. Merge k Sorted Lists**

#### **Question**
**Description:**
You are given an array of `k` linked-lists `lists`, where each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return its head.

**Examples:**
-   **Input:** `lists = [[1,4,5],[1,3,4],[2,6]]`
-   **Output:** `[1,1,2,3,4,4,5,6]`
-   **Explanation:** The linked-lists are: `[1->4->5, 1->3->4, 2->6]`. Merging them gives `1->1->2->3->4->4->5->6`.

-   **Input:** `lists = [[]]`
-   **Output:** `[]`

#### **Answer**
**Algorithm:**
The most efficient and common approach uses a **Min-Heap (Priority Queue)**.
1.  Create a min-heap. The heap will store tuples of `(node.val, list_index, node)` to keep track of the smallest node values across all lists. The `list_index` is needed to break ties if values are equal (though Python's `heapq` is stable, it's good practice).
2.  Initialize the heap by pushing the head node of each non-empty list.
3.  Create a `dummy` node to act as the head of the new merged list and a `tail` pointer, initially at `dummy`.
4.  While the heap is not empty:
    -   Pop the element with the smallest value from the heap. This gives you the `node` that should be next in the merged list.
    -   Append this `node` to `tail.next` and advance the `tail` pointer.
    -   If the popped `node` has a `next` node in its original list, push that `next` node onto the heap. This ensures the next smallest element from that list is now a candidate.
5.  Return `dummy.next`.

**Big O:**
-   Let `N` be the total number of nodes across all lists and `k` be the number of lists.
-   **Time Complexity:** O(N log k).
    -   Initialization takes O(k log k) to build the initial heap.
    -   Each of the N nodes will be pushed and popped from the heap once. Each heap operation takes O(log k) time (since the heap size is at most `k`).
-   **Space Complexity:** O(k) to store the heads of the `k` lists in the heap.

**Python Code:**
```python
import heapq
from typing import List, Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        min_heap = []
        # Add the head of each list to the min-heap
        for i, head in enumerate(lists):
            if head:
                # Add (value, list_index, node) to handle same-value nodes
                heapq.heappush(min_heap, (head.val, i, head))
        
        dummy = ListNode()
        tail = dummy
        
        while min_heap:
            val, i, node = heapq.heappop(min_heap)
            
            tail.next = node
            tail = tail.next
            
            # If there's a next node in the same list, add it to the heap
            if node.next:
                heapq.heappush(min_heap, (node.next.val, i, node.next))
                
        return dummy.next
```

---

### **295. Find Median from Data Stream**

#### **Question**
**Description:**
The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.
Implement the `MedianFinder` class:
-   `MedianFinder()`: initializes the object.
-   `void addNum(int num)`: adds the integer `num` from the data stream to the data structure.
-   `double findMedian()`: returns the median of all elements so far.

**Example:**
```
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
medianFinder.findMedian(); // return 1.5
medianFinder.addNum(3);
medianFinder.findMedian(); // return 2.0
```

#### **Answer**
**Algorithm:**
The key is to maintain two heaps:
1.  **`small_half` (Max-Heap):** Stores the smaller half of the numbers.
2.  **`large_half` (Min-Heap):** Stores the larger half of the numbers.

**Logic:**
-   The heaps should be kept balanced (or off by at most one element).
-   The largest number in `small_half` will always be less than or equal to the smallest number in `large_half`.
-   The median can be calculated from the top elements of these heaps.

**`addNum(num)`:**
1.  By default, add `num` to `small_half` (a max-heap, so push `-num`).
2.  **Balance:** The first element added to `small_half` might actually belong in `large_half`. Move the largest element from `small_half` to `large_half`.
3.  **Re-balance:** If `len(small_half)` becomes smaller than `len(large_half)`, it means we moved an element unnecessarily. Move the smallest from `large_half` back to `small_half`.

**`findMedian()`:**
1.  If `len(small_half) > len(large_half)` (odd number of elements), the median is the top of `small_half`.
2.  If `len(small_half) == len(large_half)` (even number of elements), the median is the average of the tops of both heaps.

**Big O:**
-   **`addNum` Time Complexity:** O(log N), due to heap push/pop operations.
-   **`findMedian` Time Complexity:** O(1), as it only involves looking at the top of the heaps.
-   **Space Complexity:** O(N) to store all the numbers.

**Python Code:**
```python
import heapq

class MedianFinder:
    def __init__(self):
        # Two heaps:
        # small_half: max-heap (stores smaller half of numbers)
        # large_half: min-heap (stores larger half of numbers)
        self.small_half = []
        self.large_half = []

    def addNum(self, num: int) -> None:
        # Python's heapq is a min-heap, so use negative values for max-heap
        heapq.heappush(self.small_half, -num)
        
        # Ensure every element in small_half is <= every element in large_half
        if (self.small_half and self.large_half and 
                -self.small_half[0] > self.large_half[0]):
            val = -heapq.heappop(self.small_half)
            heapq.heappush(self.large_half, val)
        
        # Balance the heaps (sizes can differ by at most 1)
        if len(self.small_half) > len(self.large_half) + 1:
            val = -heapq.heappop(self.small_half)
            heapq.heappush(self.large_half, val)
        
        if len(self.large_half) > len(self.small_half) + 1:
            val = heapq.heappop(self.large_half)
            heapq.heappush(self.small_half, -val)

    def findMedian(self) -> float:
        if len(self.small_half) > len(self.large_half):
            return -self.small_half[0]
        elif len(self.large_half) > len(self.small_half):
            return self.large_half[0]
        else: # Even number of elements
            return (-self.small_half[0] + self.large_half[0]) / 2.0
```

---

### **42. Trapping Rain Water**

#### **Question**
**Description:**
Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Example:**
-   **Input:** `height = [0,1,0,2,1,0,1,3,2,1,2,1]`
-   **Output:** `6`

#### **Answer**
**Algorithm:**
There are several ways to solve this, but the **Two-Pointer** approach is the most efficient in terms of space.

1.  Initialize pointers `left = 0` and `right = len(height) - 1`.
2.  Initialize `left_max = 0` and `right_max = 0` to track the max height seen from each side.
3.  Initialize `total_water = 0`.
4.  Loop while `left < right`.
5.  The amount of water trapped at any point is determined by the shorter of the two boundary walls (`left_max` and `right_max`).
6.  **Inside the loop:**
    -   If `height[left] < height[right]`:
        -   The `left_max` is the limiting wall.
        -   Update `left_max = max(left_max, height[left])`.
        -   The water trapped at the `left` pointer is `left_max - height[left]`. Add this to `total_water`.
        -   Move the pointer: `left += 1`.
    -   Else (`height[right] <= height[left]`):
        -   The `right_max` is the limiting wall.
        -   Update `right_max = max(right_max, height[right])`.
        -   The water trapped at the `right` pointer is `right_max - height[right]`. Add this to `total_water`.
        -   Move the pointer: `right -= 1`.
7.  Return `total_water`.

**Big O:**
-   **Time Complexity:** O(N), as each pointer traverses the array once.
-   **Space Complexity:** O(1).

**Python Code:**
```python
from typing import List

class Solution:
    def trap(self, height: List[int]) -> int:
        if not height:
            return 0
        
        left, right = 0, len(height) - 1
        left_max, right_max = height[left], height[right]
        total_water = 0
        
        while left < right:
            # The amount of water is limited by the shorter of the two max walls
            if left_max < right_max:
                left += 1
                # The new left_max is the max of itself and the new wall
                left_max = max(left_max, height[left])
                # The water trapped at this position is the difference
                total_water += left_max - height[left]
            else:
                right -= 1
                # The new right_max is the max of itself and the new wall
                right_max = max(right_max, height[right])
                # The water trapped at this position is the difference
                total_water += right_max - height[right]
                
        return total_water
```

---

### **297. Serialize and Deserialize Binary Tree**

#### **Question**
**Description:**
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

**Example:**
-   **Input:** `root = [1,2,3,null,null,4,5]`
-   **Output:** `[1,2,3,null,null,4,5]`
-   **Explanation:** You can serialize the tree to a string like `"[1,2,3,null,null,4,5]"` and then deserialize it back.

#### **Answer**
**Algorithm:**
A **pre-order traversal (DFS)** is a natural fit for this problem because the root always comes first, making reconstruction straightforward.

**`serialize(root)`:**
1.  Use a recursive DFS helper function `dfs(node)`.
2.  **Inside `dfs(node)`:**
    -   **Base Case:** If `node` is `None`, append a special marker (e.g., `"N"`) to a list of values.
    -   **Recursive Step:** Append the `node.val` (as a string) to the list. Then, recursively call `dfs` for the left and right children.
3.  Join the list of values with a separator (e.g., a comma) to form the final serialized string.

**`deserialize(data)`:**
1.  Split the input string `data` by the separator to get a list of values.
2.  Use a global index or a queue (`collections.deque`) to keep track of the current value to be processed.
3.  Define a recursive helper function `build()`.
4.  **Inside `build()`:**
    -   Get the next value from the list/queue.
    -   **Base Case:** If the value is the null marker (`"N"`), return `None`.
    -   **Recursive Step:** Create a new `TreeNode` with the current value (converted to an integer).
    -   Recursively call `build()` to construct the left subtree and assign it to `node.left`.
    -   Recursively call `build()` to construct the right subtree and assign it to `node.right`.
    -   Return the created `node`.
5.  The initial call to `build()` returns the root of the reconstructed tree.

**Big O:**
-   **Time Complexity:** O(N) for both `serialize` and `deserialize`, as we visit each node once.
-   **Space Complexity:** O(N) to store the serialized string and O(H) for the recursion stack depth (where H is the tree height).

**Python Code:**
```python
import collections

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string."""
        res = []
        
        def dfs(node):
            if not node:
                res.append("N")
                return
            res.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
            
        dfs(root)
        return ",".join(res)

    def deserialize(self, data):
        """Decodes your encoded data to tree."""
        if not data:
            return None
            
        vals = collections.deque(data.split(','))
        
        def build():
            val = vals.popleft()
            if val == "N":
                return None
            
            node = TreeNode(int(val))
            node.left = build()
            node.right = build()
            return node
            
        return build()
```

---

### **76. Minimum Window Substring**

#### **Question**
**Description:**
Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

**Examples:**
-   **Input:** `s = "ADOBECODEBANC"`, `t = "ABC"`
-   **Output:** `"BANC"`
-   **Explanation:** The minimum window is "BANC" which contains 'A', 'B', and 'C'.

-   **Input:** `s = "a"`, `t = "a"`
-   **Output:** `"a"`

-   **Input:** `s = "a"`, `t = "aa"`
-   **Output:** `""`

#### **Answer**
**Algorithm:**
This is a challenging but classic **Sliding Window** problem. The core idea is to expand a window until it's "valid" (contains all characters of `t`) and then contract it from the left to find the minimum possible size for that valid window.

1.  Create a frequency map `t_freq` for all characters in `t`.
2.  Initialize `window_freq` for the current window, a `left` pointer, `result_len = infinity`, and `result_indices = [-1, -1]`.
3.  We need two counters: `required_chars` (the number of unique characters in `t`) and `formed_chars` (the number of unique characters in the current window that meet their required frequency).
4.  Iterate with a `right` pointer through `s`. For each character `char_r`:
    -   Add `char_r` to `window_freq`.
    -   If `char_r` is in `t_freq` and its count in the window now matches its required count in `t_freq`, increment `formed_chars`.
5.  **Contract Window:** Once `formed_chars == required_chars`, the window is valid.
    -   Enter a `while` loop to shrink the window from the left.
    -   Update the minimum window size found so far if the current window is smaller.
    -   Get the character `char_l` at the `left` pointer. Move `left` pointer forward.
    -   Decrement the count of `char_l` in `window_freq`.
    -   If `char_l` is a required character and its count in the window just dropped below its required frequency, decrement `formed_chars`. This will break the `while` loop, and we'll go back to expanding the window with the `right` pointer.
6.  After the main loop, if `result_len` is still infinity, no window was found. Otherwise, use `result_indices` to return the substring.

**Big O:**
-   **Time Complexity:** O(N + M), where N is the length of `s` and M is the length of `t`. Both `left` and `right` pointers traverse `s` once.
-   **Space Complexity:** O(k), where k is the number of unique characters in `s` and `t`. This is constant if the character set is fixed (e.g., ASCII).

**Python Code:**
```python
import collections

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not t or not s or len(s) < len(t):
            return ""

        t_freq = collections.Counter(t)
        window_freq = collections.defaultdict(int)
        
        required = len(t_freq)
        formed = 0
        left = 0
        
        res_len = float('inf')
        res_indices = [-1, -1]

        for right, char_r in enumerate(s):
            window_freq[char_r] += 1
            
            if char_r in t_freq and window_freq[char_r] == t_freq[char_r]:
                formed += 1
            
            # Once window is valid, contract it from the left
            while left <= right and formed == required:
                # Update result if this window is smaller
                if (right - left + 1) < res_len:
                    res_len = right - left + 1
                    res_indices = [left, right]
                
                char_l = s[left]
                window_freq[char_l] -= 1
                
                if char_l in t_freq and window_freq[char_l] < t_freq[char_l]:
                    formed -= 1
                
                left += 1

        start, end = res_indices
        return s[start : end + 1] if res_len != float('inf') else ""
```

---

### **84. Largest Rectangle in Histogram**

#### **Question**
**Description:**
Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

**Example:**
-   **Input:** `heights = [2,1,5,6,2,3]`
-   **Output:** `10`
-   **Explanation:** The largest rectangle is shown in the diagram. It has an area of 10 units (height 5, width 2).

#### **Answer**
**Algorithm:**
This problem can be solved efficiently using a **Monotonic Stack**. The key insight is that for any bar `h`, the largest rectangle that includes `h` as its height extends to the left and right until it hits a bar shorter than `h`.

1.  Initialize a monotonic (increasing) `stack` to store `(index, height)` pairs.
2.  Initialize `max_area = 0`.
3.  Iterate through the `heights` array (plus a sentinel value of 0 at the end to flush the stack).
4.  For each `(i, h)`:
    -   While the stack is not empty and the height at the top of the stack is greater than the current height `h`:
        -   This means the bar at the top of the stack cannot extend any further to the right.
        -   Pop the `(index, height)` from the stack.
        -   The width of the rectangle with this popped `height` is from the new stack top's index to the current index `i`.
        -   Calculate `area = height * (i - new_stack_top_index - 1)`.
        -   Update `max_area = max(max_area, area)`.
    -   Push the current `(i, h)` onto the stack.
5.  Return `max_area`.

**Big O:**
-   **Time Complexity:** O(N). Each bar is pushed onto and popped from the stack at most once.
-   **Space Complexity:** O(N) in the worst case (for a strictly increasing histogram).

**Python Code:**
```python
from typing import List

class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        max_area = 0
        # Stack stores pairs of (index, height)
        stack = [] 
        
        # Append a 0 to the end to ensure all bars are processed
        for i, h in enumerate(heights + [0]):
            start_index = i
            while stack and stack[-1][1] > h:
                index, height = stack.pop()
                # The width is from the current index 'i' back to the
                # index of the previous element on the stack.
                width = i - index
                max_area = max(max_area, height * width)
                # The current bar 'h' can extend back to this popped bar's start_index
                start_index = index
            stack.append((start_index, h))
            
        return max_area
```



