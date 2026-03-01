---
date: 2024-04-29
title: Wildlife Monitoring System with Raspberry Pi
tags: [project, embedded-system, rpi, yolo, ml, python, hardware]
---

This project is for course CSE 40373 _Embedded System Development_ in 2024
Spring semester.

In this project, I created a system that employs a motion sensor to detect
nearby movements, triggering a camera to capture an image when motion is
detected. This image is then processed using the YOLOv8 model for object
recognition. If the object is an animal of interest, users receive a push
notification on their iPhone via the
[Bark API](https://apps.apple.com/us/app/bark-customed-notifications/), and the
image is uploaded to Google Drive.

The source code of this project is hosted
[here](https://github.com/sghuang19/wildlife-monitor).
