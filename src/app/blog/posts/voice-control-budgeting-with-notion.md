---
title: "I Tried Talking to My Budget"
slug: "voice-control-budgeting-with-notion"
status: "draft"
date: "2025-07-16"
coverImage: "/assets/blog/talking-to-my-budget.svg"
coverAlt: "Graphic cover showing a speech signal and budgeting blocks floating in a cosmic interface."
source: "https://www.notion.so/232ac88dabfd800e80d9e94392df7909"
summary: "A personal workflow experiment that turns quick voice notes into structured Notion expense records."
tags:
  - Notion
  - iPhone Shortcuts
  - Automation
  - AI
---

# I Tried Talking to My Budget

I had been tracking expenses in Notion for a while, but the friction was still too high.

Even after creating a Notion form and opening it through an iPhone Shortcut, I still had to fill in fields like amount, description, category, date, and related records. That is fine once or twice, but it becomes easy to skip when I am outside, in a hurry, or just trying to record something quickly.

At some point the thought became: what if I could just say what I spent, and let the system do the tidy-up?

## The Lazy Input

The dream workflow was simple:

1. speak a short sentence into my phone
2. let AI extract the important details
3. turn those details into a Notion API payload
4. add the expense directly to my budgeting database

For example, I wanted to say something like:

> "Lunch was 15 dollars, food category."

And have the system create a clean database entry without me opening Notion or filling out a form.

## The Shortcut Stack

I used iPhone Shortcuts as the main interface because it is fast, native, and easy to trigger from the phone.

The shortcut captures voice input, converts it into text, and asks an AI step to extract structured values such as amount, description, and category. Those values are then mapped into the shape expected by the Notion API.

The API payload was the part that needed the most care. Notion properties have different structures depending on their type, so a number, select, relation, and text field all need to be prepared differently. The shortcut could not simply pass the AI output straight into the request, so I mapped the values manually and used the extracted fields as variables.

Not glamorous, but satisfying: voice in, clean Notion row out.

## The Useful Bit

The biggest lesson was that AI becomes more useful when it is placed inside a narrow workflow.

I did not need a general assistant. I needed a small parser that understood my budget categories and produced predictable output. Once the prompt included the right context, the rest of the workflow became much easier to control.

I also learned that automation quality depends heavily on the last mile. The impressive part is the AI extraction, but the useful part is the boring connection work: field mapping, API permissions, database IDs, relation IDs, and request formatting.

## Why I Like This One

This project is a small example of how personal software can remove friction from everyday habits.

Budgeting usually fails when recording becomes annoying. By reducing the input to a quick voice command, the workflow becomes easier to keep using.

It also reflects the way I like to build: combine existing tools, keep the interface close to the user, and make the system valuable by reducing the number of steps between intent and result.

