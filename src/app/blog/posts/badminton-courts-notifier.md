---
title: "The Badminton Slot Hunter"
slug: "badminton-courts-notifier"
status: "draft"
date: "2025-01-26"
coverImage: "/assets/blog/badminton-slot-hunter.svg"
coverAlt: "Graphic cover showing a badminton shuttle orbiting a calendar-like planet in a star field."
source: "https://www.notion.so/45b917eb57ae4463b1a5df371a7d9b23"
summary: "A small automation that watches badminton court availability for me, because refreshing a booking page is not a hobby."
tags:
  - Automation
  - Python
  - Selenium
  - GitHub Actions
---

# The Badminton Slot Hunter

Some projects start from a big product idea. This one started from a small, very specific frustration: I kept missing the timing to book badminton courts.

The courts at a university near where I live were the most convenient option, but the weekend slots were limited and disappeared quickly. Checking the booking site manually was annoying, and I did not want to keep refreshing a page just to find out there was nothing available.

So I built a small bot to be the person who cares about the booking page more than I do.

## The Tiny Mission

The goal was simple: check the booking website once a day, look for useful weekend slots, and email me if anything was available.

I wanted it to behave like a polite little scout:

- log in to the booking site
- check each court
- look across the current and upcoming weekend
- collect any available one-hour slots
- send a short email only when there was something worth acting on

That was enough. The point was not to build a complicated booking platform. The point was to remove a repetitive task from my week.

## How It Works, Without the Boring Bits

I used Python with Selenium to automate the browser flow. The script signs in, opens each court page, checks the visible schedule, and extracts the available weekend times.

The biggest challenge was the booking calendar itself. There was no reliable way to know whether a slot belonged to the weekend just by looking at the calendar page. The script had to click into, or inspect, individual slots before it could confirm whether the time was actually useful.

Checking every slot one by one would have made the bot slow and noisy, so I used a binary search approach to narrow down the useful range faster. It turned the calendar from a tedious manual scan into a more efficient search problem.

Once the core flow worked locally, I moved the script into GitHub Actions so it could run on a schedule without needing my laptop. Credentials were handled through environment variables, and the notification step used email so I could act quickly when a slot appeared.

The interesting part was not the code itself. It was translating a human habit into a reliable sequence:

1. What exactly do I check?
2. How do I avoid noisy notifications?
3. What is the smallest useful output?
4. How do I run it regularly without maintaining a server?

Answering those questions made the automation practical.

## The Small Lesson

This project reminded me that useful software does not always need a big interface. Sometimes the best product is a quiet background process that only speaks when it has value to add.

It also reinforced a pattern I like: start from a real inconvenience, reduce the problem to the smallest reliable workflow, then automate only the parts that are repetitive.

The result was a small system that helped me find badminton slots without checking the site manually every day.

## Why I Like This One

I like this project because it shows the kind of engineering I enjoy: practical, user-focused, and just enough to solve the problem.

It combines scripting, browser automation, scheduled jobs, and notification design, but the value is easy to understand: less manual checking, faster reaction time, and more chances to actually play.

Code: https://github.com/Bruce-zzhu/unimelb-badminton-courts-notifier

