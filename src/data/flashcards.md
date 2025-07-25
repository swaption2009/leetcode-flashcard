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