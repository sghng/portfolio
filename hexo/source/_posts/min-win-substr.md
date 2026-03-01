---
title: An Efficient Python 3 Solution to the Minimum Window Substring Problem
date: 2024-06-26
tags: [algorithms, sliding-window, strings, leetcode, python]
---

An efficient solution to
[this problem](https://leetcode.com/problems/minimum-window-substring/) that
beats 99.92% solutions in runtime and 98.79% in memory usage.

```python
start = min_start = 0
end = -1
min_w = len(s) + 1

table = [0] * 128
count = len(t)

for c in t:
    table[ord(c)] += 1

for c in s:
    end += 1
    if table[ord(c)] > 0:
        count -= 1
    table[ord(c)] -= 1

    if count == 0:
        while table[ord(s[start])] < 0:
            table[ord(s[start])] += 1
            start += 1

        if end - start + 1 < min_w:
            min_w = end - start + 1
            min_start = start

return "" if min_w == len(s) + 1 else s[min_start:][:min_w]
```

<!-- more -->

## Intuition

- Maintain a sliding window.
- Keep track of whether the window contains all characters in `t`.
- Also keep track of the "surplus" characters in the window.
- If it does, shrink the window by trimming the redundant characters from the
  start, by referring to the surplus characters table.
- Also keep track of the minimum window size and the corresponding window.

## A Quick Prototype and Its Optimization

```python
counter_t = Counter(t)
counter_w = Counter()
start = 0
w = ""
min_w = s + t
for c in s:
    counter_w[c] += 1
    w += c
    while start < len(s) and counter_w[s[start]] - counter_t[s[start]] >= 1:
        counter_w.subtract(s[start])
        start += 1
        w = w[1:]
    if counter_t <= counter_w:
        if len(w) < len(min_w):
            min_w = w
if len(min_w) == len(s) + len(t):
    return ""
else:
    return min_w
```

There is a lot of room for optimization in the above code.

- The `Counter` class is handy but slow for this use case.
- We can keep track of the `start` and `end` indices of the window instead of
  the substring of the window itself. Alternatively, we can keep track of the
  `start` index and the length of the window.
- We don't have to trim the window at each interation, it is only needed when a
  valid window is found.
- As a side effect, when we trim window only when the window is valid, we no
  longer need to guard `start` index again out of range error.

## Explanation of the Final Code

Here's the final code with comments:

```python
# Initialize the variables needed
start = min_start = 0
end = -1  # So that at the first iteration end == 1
min_w = len(s) + 1  # The max possible window length is len(s)

table = [0] * 128  # Since only letters are considered
count = len(t)

# Initialize the table
for c in t:
    table[ord(c)] += 1

for c in s:
    end += 1  # Advance the end index
    if table[ord(c)] > 0:  # One more char from t is found
        count -= 1
    table[ord(c)] -= 1  # Update the table

    # A valid window is found
    if count == 0:
        # Let's trim the window!
        while table[ord(s[start])] < 0:
            # If the char at the start is "surplus", remove it
            table[ord(s[start])] += 1
            start += 1

        # Update the minimum window
        if end - start + 1 < min_w:
            min_w = end - start + 1
            min_start = start

# If a valid window is never found, return ""
return "" if min_w == len(s) + 1 else s[min_start:][:min_w]
```

The use of `counter` variable significantly speeds up the algorithm. Otherwise,
we would have to consult the table each time, and test whether `max(table) == 0`
to see if we found a valid window.

## Some Optimization Tricks for Leetcode

- `s[min_start:][:min_w]` is somehow much faster than
  `s[min_start:min_start + min_w + 1]`
- `table[ord(c)]` is faster than `table[ord(c) - ord('A')]`
- Initialize `min_w` to a integer is slightly faster than `float('inf')`.
