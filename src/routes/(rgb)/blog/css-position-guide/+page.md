---
layout: blog_layout
title: 'Guide to Position in CSS'
slug: 'css-position-guide'
date: '2024/01/04'
updated_date: '2024/01/04'
author: 'Justin Golden'
preview_text: 'Learn about the different position properties in CSS'
img: '/img/blog/undraw_world.svg'
categories: ['web', 'css']
keywords: ['css position guide', 'css position explained', 'css position property']
---

<img src="/img/blog/undraw_world.svg" alt="" class="bg-white p-4">

Length: Medium

Level: ✓ Beginner ✓ Intermediate ✓ Advanced

---

### `Static`

- Default value
- Can be used to revert from absolute or another value based on media query
- Example: an item is absolute on mobile and needs to have absolute "turned off" on desktop.

### `Relative`

- Add `top` (or `bottom` or `left` or `right`) to change its position on page from its normal position. Leaves empty space where it used to be and doesn't change document flow
- Acts as a parent for absolute or sticky elements
- Can use x-index
- Example: Modal with an absolute position close button

### `Absolute`

- Pulls out of document flow and doesn't leave empty space where it used to be. Use `top`, `bottom`, `left`, and/or `right` to rearrange its position. These values are relative to the nearest `relative` parent, but if there are none, then the viewport (`body`) is used. In other words, the closest `relative` parent becomes the nearest containing block and the `absolute` item is positioned relative to that item.
- Can be considered bad practice
- Example: Close button in a modal

### `Fixed`

- Fixes item in place on screen, which stays fixed when the user scrolls as well
- Use `top`, `bottom`, `left`, and/or `right` to rearrange its position
- Example: scroll to top button

### `Sticky`

- Cool younger brother to `fixed` which fixes the item to top, but also accounts for its height
- Use `top`, `bottom`, `left`, and/or `right` to rearrange its position
- The element is the same as usual until it "sticks." The element only sticks to the top (or wherever you define it) after you scroll to that position In other words, it only sticks after the user would scroll past it.
- Example: sticky navbar

---

Consider watching [Kevin Powell's CSS Position Video](https://youtu.be/fF_NVrd1s14?si=HBFfpx_e_H4_1Pun) for more!
