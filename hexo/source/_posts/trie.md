---
title: Pythonic Implementations of Trie (Prefix Tree)
date: 2024-07-21
tags: [data-structure, python, leetcode]
---

This post proposes a Pythonic implementation of Trie data structure, with
`insert`, `search`, and `starts_with` methods. With careful design, the Pythonic
improvements reduced the lines of code from 27 lines to 8 lines.

```python
class Trie(dict):
    def insert(self, word: str) -> None:
        reduce(lambda node, c: node.setdefault(c, {}), word, self)['$'] = True

    def search(self, word: str) -> bool:
        return self.starts_with(word + '$')

    def starts_with(self, prefix: str) -> bool:
        node = self
        return all(node := node.get(char) for char in prefix)
```

<!-- more -->

See this
[LeetCode problem](https://leetcode.com/problems/implement-trie-prefix-tree/)
for more info.

## Basic Implementation

The most basic implementation has separated `TrieNode` and `Trie` classes, and
marks the end of the word with the `is_end_of_word` attribute in `TrieNode`.

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word

    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
```

## Improved

There are multiple improvements we can make to this basic implementation.

- We can mark the end of word by inserting a character out of the alphabet into
  the dictionary.
- If end-of-word marker is used, searching a full word is becomes to searching
  the word with end-of-word marker suffixed.
- We can merge the `Trie` and `TrieNode` classes into one class, since each of
  the `TrieNode` is also the root of a "sub-trie".
- We can simplify the searching and inserting code with higher-order functions
  such as `reduce`, `all`, and `any`.
- Since each trie is a `dict`, we can make `Trie` extends`dict`.

```python
class Trie(dict):
    def insert(self, word: str) -> None:
        reduce(lambda node, c: node.setdefault(c, {}), word, self)['$'] = True

    def search(self, word: str) -> bool:
        return self.starts_with(word + '$')

    def starts_with(self, prefix: str) -> bool:
        node = self
        return all(node := node.get(char) for char in prefix)
```

Now let's go into details of the implementation.

### `insert`

```python
reduce(lambda node, c: node.setdefault(c, {}), word, self)['$'] = True
```

When inserting a word into the trie, we start from the root, iterate over the
word and insert the characters into the dictionary at each level. This can be
done in a Pythonic functional programming style using `reduce`. We leverage
`dict.setdefault` to create a new level of trie for unseen word sequences
before.

The final return value of `reduce` is the leave of trie. By inserting
`{'$': True}` in this dictionary, we marked it as a full word.

The whole inserting process takes only one line, isn't it beautiful?

### `starts_with`

```python
node = self
return all(node := node.get(char) for char in prefix)
```

Let's go over `starts_with` first since `search` relies on this method. Recall
that in Python, many built-in data structures have default boolean value, which
is `True` when they are non-empty. We can utilize this property to convert the
searching process into a series of boolean `and` operations.

To avoid the redundant declarative style, we leverage the walrus operator `:=`
to update the node as we iterate. When a character isn't found, the expression
is short-circuited and `False` is returned immediately.

### `search`

```python
return self.starts_with(word + '$')
```

With the use of end-of-word marker, searching `'word'` is now equivalent to
searching a word that starts with `'word$'`!

## Bonus: Implementation of `WordDictionary`

<https://leetcode.com/problems/design-add-and-search-words-data-structure/>

```python
class WordDictionary(dict):
    def add_word(self, word: str) -> None:
        reduce(lambda node, c: node.setdefault(c, {}), word, self)['$'] = True

    def search(self, word: str) -> bool:
        return self.search_helper(word + '$', self)

    def search_helper(self, word: str, node: dict) -> bool:
        for i, c in enumerate(word):
            if c == ".":
                return any(
                    self.search_helper(word[i + 1:], node)
                    for node in node.values() if node is not True
                )
            else:
                if not (node := node.get(c)):
                    return False
        return True
```
