---
layout: blog_layout
title: 'Fix hacked crypto wallet popup on your website'
slug: 'lottie-files-hack'
date: '2024/10/30'
updated_date: '2024/10/30'
author: 'Justin Golden'
preview_text: 'Fix hacked crypto wallet popup on your website - downgrade to 2.0.4 of lottie files'
img: '/img/blog/person_writing.avif'
categories: ['webdev']
keywords: ['crypto wallet popup', 'lottie files hack', 'lottie files hack crypto wallet popup']
---

## Problem

Lottie Files was recently hacked with malware displaying a crypto wallet popup on websites. This seems to target websites with React, which also includes WordPress websites.

## Solution

Downgrade to version 2.0.4 of lottie files.

If you have a newer version or `@latest` (which is bad security practice for reasons now obvious), downgrade to 2.0.4 or earlier.

`https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js`
`https://unpkg.com/@lottiefiles/lottie-player@2.0.4/dist/lottie-player.js`
