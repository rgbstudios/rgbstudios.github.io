---
layout: blog_layout
title: 'How to Enable Hibernate on Windows and When to Use it'
slug: 'enable-hibernate-on-windows'
date: '2026/01/22'
updated_date: '2026/01/22'
author: 'Justin Golden'
preview_text: 'Learn how to enable hibernate on Windows, what hibernate is, and when you should and should not use it'
img: '/img/blog/hibernate_bear.avif'
categories: ['tech', 'troubleshooting', 'windows']
keywords:
  [
    'enable hibernate windows 11',
    'windows 11 hibernate mode',
    'hibernate vs sleep windows',
    'how to use hibernate windows 11',
    'windows 11 power options',
    'hibernate windows laptop battery',
    'windows 11 sleep vs hibernate',
    'ctrl x power menu windows',
    'windows 11 shutdown options',
    'what is hibernate windows'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/hibernate_bear.avif" alt="" />
    <img src="/img/blog/hibernate_bear.jpg" alt="">
  </picture>
  <figcaption>Photo credit @@kush3107 on Unsplash</figcaption>
</figure>

Windows 11 offers several ways to pause your computer when you’re not actively using it: **Lock**, **Sleep**, and **Hibernate**. Hibernate is often hidden by default, but it can be extremely useful—especially for laptops. This guide explains **how to enable Hibernate**, **how it differs from Sleep and Lock**, and **when you should use each option**.

---

## What Is Hibernate?

**Hibernate** saves your entire session (open apps, files, and system state) to your disk and then **completely powers off** the computer. When you turn it back on, everything resumes exactly where you left off.

Unlike Sleep, Hibernate uses **no power at all** while the computer is off.

---

## Hibernate vs Sleep vs Lock

### Lock

- Keeps everything running
- Just locks the screen
- Uses full power
- **Best for:** stepping away briefly while staying logged in

### Sleep

- Keeps your session in memory (RAM)
- Uses a small amount of power
- Wakes up very fast
- **Best for:** short breaks (minutes to a few hours)

### Hibernate

- Saves session to disk, then powers off
- Uses zero power
- Takes slightly longer to resume than Sleep
- **Best for:** long breaks, travel, or saving battery overnight

---

## When Should You Use Hibernate?

Hibernate is ideal when:

- You’re on a **laptop** and want to save battery
- You won’t use your PC for **several hours or days**
- You want to keep everything open but fully shut down
- You’re traveling or closing the lid for a long time

Desktop users can also benefit, especially if they want a clean power-off without losing work.

---

## How to Enable Hibernate in Windows 11

Hibernate is usually disabled by default. Here’s how to turn it on.

### Step 1: Enable Hibernate Mode

1. Hit **Start** button and type "change what closing the lid does" and select it
2. Click **Change settings that are currently unavailable**
3. Under **Shutdown settings**, check **Hibernate**
4. Click **Save changes**

Hibernate is now enabled.

<div class="flex flex-wrap gap-4">
    <img src="/img/blog/posts/hibernate_step1.png" alt="" style="margin:0; object-fit:contain;" class="max-w-sm">
    <img src="/img/blog/posts/hibernate_step2.png" alt="" style="margin:0; object-fit:contain;" class="max-w-sm">
    <img src="/img/blog/posts/hibernate_step3.png" alt="" style="margin:0; object-fit:contain;" class="max-w-sm">
</div>

---

## How to Use Hibernate

Once enabled, you can activate Hibernate in two common ways.

### Option 1: Start Menu (Standard Way)

1. Click **Start**
2. Click the **Power** icon (bottom-right of the Start menu)
3. Select **Hibernate**

### Option 2: Power User Menu (Ctrl + X)

1. Press **Ctrl + X**
2. Select **Shut down or sign out**
3. Choose **Hibernate**

(Hit Ctrl+X, then release and hit U then release and hit H).

Both methods do the same thing—use whichever feels more natural.

---

## Does Hibernate Use Disk Space?

Yes. Windows creates a file called `hiberfil.sys` that stores your session.  
This file typically uses **about 40–75% of your installed RAM**.

On modern systems with SSDs, this is usually not a problem.

---

## Final Thoughts

- **Lock** is for quick privacy
- **Sleep** is for short breaks
- **Hibernate** is for long pauses with zero power use

If you use a laptop or want maximum battery savings without closing apps, enabling Hibernate on Windows 11 is absolutely worth it.
