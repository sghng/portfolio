---
title:
  A Pythonic and Fast Solution for "Longest Substring without Repeating
  Characters" Problem
date: 2024-06-25
tags: [algorithm, leetcode, python]
permalink: longest-substring-without-repeating-characters/
---

This solution beats 98.90% solutions on
[LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
by runtime and 98.03% by memory usage. My notes for this problem can be found at
[here](https://notes.guanchao.pro/leetcode/longest-substring-without-repeating-characters/).

<!-- prettier-ignore-start -->

{% code lang:python line_number:true %}
substr = ""
for c in s:
    index = substr.rfind(c)
    if index == -1:
        substr += c
    else:
        substr = substr[index + 1 :] + c
    max_len = len(substr) if len(substr) > max_len else max_len
return max_len
{% endcode %}

<!-- prettier-ignore-end -->

<!-- more -->

Intuition:

- Maintain a tracking of the current substring that has no repeating characters.
- Use the built-in `str.find()` method to search for the next character within
  the substring.
- If the character is found, update the substring by removing everything up to
  and including that character.
- Then, append the new character to the substring.

I experimented with various approaches to optimize performance by only
maintaining the `start` and `end` indices of the substring, which surprisingly
did not perform as well as the current solution. Many solutions on LeetCode
claim faster execution times, but they end up being less efficient in practice.

It's possible to make it even shorter if we are willing to sacrifice a bit of
performance and readability:

<!-- prettier-ignore-start -->

{% code lang:python line_number:true %}
substr = ""
for c in s:
    substr = substr[substr.find(c) + 1:] + c
    max_len = len(substr) if len(substr) > max_len else max_len
return max_len
{% endcode %}

<!-- prettier-ignore-end -->

The functionality hinges on the fact that `str.find()` returns `-1` when the
character isn't found, thus `substr[-1 + 1:]` simplifies to `substr` itself.
