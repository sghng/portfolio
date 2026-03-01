---
title: Pythonic Implementations of Time Based Key-Val Store
tags: [leetcode, python, algorithm]
mathjax: true
---

## Approach 1: Linear Search

Our first solution is using dictionary. This has a $O(1)$ complexity for setting
and $O(n)$ for getting, as we have to perform linear search. There are two
tricks:

- Extending the `defaultdict` class.
- Chaining the `.get(key, {}).items()` expressions to make code looks more
  elegant.

```python
class TimeMap(defaultdict):
    def __init__(self):
        super().__init__(dict)

    def set(self, key: str, value: str, timestamp: int) -> None:
        self[key][timestamp] = value

    def get(self, key: str, timestamp: int) -> str:
        max_time = 0
        res = ""
        for time, val in super().get(key, {}).items():
            if max_time < time <= timestamp:
                max_time = time
                res = val
        return res
```

However, the runtime exceeded limit when testing on LeetCode.

<!-- more -->

## Approach 2: Binary Search

Alternatively, we can put `time: val` pairs into list, and use binary search to
find them.

```python
class TimeMap(defaultdict):
    def __init__(self):
        super().__init__(list)

    def set(self, key: str, value: str, timestamp: int) -> None:
        self[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        index = bisect_right(super().get(key, []), timestamp, key=lambda x: x[0])
        return self[key][index - 1][1] if index else ""
```

Notice that the same trick here is used again. When the list is empty,
`bisect_right` returns `0`, which again indicates there's not valid query
result. With the short circuit evaluation, `self[key]` won't be executed either.

## Approach 3: Sorted Container

```python
from sortedcontainers import SortedDict

class TimeMap(defaultdict):
    def __init__(self):
        super().__init__(SortedDict)

    def set(self, key: str, value: str, timestamp: int) -> None:
        self[key][timestamp] = value

    def get(self, key: str, timestamp: int) -> str:
        index = super().get(key, SortedDict()).bisect_right(timestamp)
        return self[key].peekitem(index - 1)[1] if index else ""
```
