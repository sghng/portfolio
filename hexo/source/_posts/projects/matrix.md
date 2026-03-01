---
date: 2020-12-25
title: Matrix Arithmetic Library and Strassen Algorithm Implementation
tags: [project, algorithm, python, matrix, math]
mathjax: true
---

This post details my project for the CSE203B course, _Design and Analysis of
Algorithms B_[^1], in which I led a team of four students. Our main task was to
implement [Strassen algorithm](https://notes.sghuang.com/strassen), a classic
example of recursion. To fully embrace this challenge, we opted to develop our
own matrix library rather than relying on NumPy. This project was my first taste
of Python OOP and magic methods -- and it was enjoyable!

<!-- more -->

Visit [our GitHub repo](https://github.com/sghuang19/cs203b-fa20) to know more
about this project. The following images are from the
[report](https://github.com/sghuang19/cs203b-fa20/blob/main/report/project-report.md)
we wrote.

Compared to the traditional approach, our algorithm achieved the expected speed
up, with the runtime aligning closely with the theoretical $O(n^{2.81})$.

![Runtime comparison](https://github.com/sghuang19/cs203b-fa20/raw/main/figures/runtime_4096.png)

Profiling the tool to identify performance bottlenecks:

![Performance](https://github.com/sghuang19/cs203b-fa20/raw/main/figures/call_multiplication_8192.png)

{% note info no-icon %}

As a side note, I achieved 100/100 on the final exam and for the course overall.
Our project received a full scored of 30/30.

{% endnote %}

[^1]: CSE203B is the equivalent of CSE203 for non-CSE majors.
