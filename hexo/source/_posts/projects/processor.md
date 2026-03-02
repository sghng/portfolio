---
date: 2022-01-08
title: ARMv3 Processor with Multiplier
tags: [project, verilog, arm, assembly, hardware, processor, electronics]
---

<!-- cSpell:words SMUL -->

This post details my project for SME309 _Microprocessor Design_ in Fall 2021
semester. In this project, I wrote a microprocessor that implements basic
instructions of AMRv3 along with a multi-cycle multiplier. As a side-note, I
achieved a score of 98/100 for this course, and ranked the first in the final
exam.

<!-- more -->

The processor is written with Verilog, and simulated with Quartus. To know more
about this project, visit the
[GitHub repo](https://github.com/sghuang19/sme309-fa21/), or read the project
reports for
[single-cycle processor](https://github.com/sghuang19/sme309-fa21/blob/main/SME309-Lab-Report.md)
and for
[multiplier](https://github.com/sghuang19/sme309-fa21/blob/main/SME309-Lab-Report-Multiplier.md).

The following figures are from the report.

![Processor Design](https://github.com/sghuang19/sme309-fa21/raw/main/processor.svg)

Test cases for `SMUL` signed multiplication.

![SMUL Test](https://github.com/sghuang19/sme309-fa21/raw/main/figures/SMUL_more.png)
