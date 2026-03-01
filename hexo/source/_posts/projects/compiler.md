---
title: Compiler for B-Minor 2023
description: A compiler handwritten in C.
date: 2023-12-07
tag: [project, compiler, cse, system, c, pl, sde]
permalink: compiler/
---

## Background

{% fa_css %}

The source code of this project can be found on
[{% fa_inline github fab %} GitHub](https://github.com/sghuang19/ghuang3-compiler).

This course project for CSE 40243
[_Compilers and Language Design_](https://dthain.github.io/compilers-fa23/),
offered in Fall 2023 at the University of Notre Dame, was taught by Prof.
Douglas Thain. I also had the privilege of working with Dr. Thain during the
summer of 2022.

As a side "note", the notes I took for this course can be found [{% fa_inline
pen fas %} here](https://notes.sghuang.com/compilers-and-language-design).

<!-- more -->

## Specification

B-Minor is a language designed by Dr. Thain for teaching this compiler course.
The specification of this language is tweaked slightly each year. The complete
specs of B-Minor 2023 can be found on the
[course website](https://dthain.github.io/compilers-fa23/bminor).

In short, it supports:

- Primitive types, arrays, and strings
- `for`, `if`, and `while` control logic
- `print` as a statement instead of a function
- Function calls, including recursion. I decided to implement stack calling
  implemented instead of register calling

{% note primary no-icon %}

This language is named `B-Minor` because `C`, `C-Sharp`, `C-Major`, `C-Minor`
and `B` are all taken, and Dr. Thain prefers minor keys over major.

{% endnote %}

## How I Wrote It

- Encoder, Resolver, Typechecker, Code Generator: Handwritten in C.
- Scanner: Implemented with RegEx and [Flex](https://github.com/westes/flex).
- Parser: Implemented with [Bison](https://gnu.org/software/bison/).

The Context Free Grammar for this project is pretty elegant in my opinion:

{% ghcode
https://github.com/sghuang19/ghuang3-compiler/blob/main/grammar.y
110 334 {lang:flex} %}
