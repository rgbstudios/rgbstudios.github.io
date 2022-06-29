---
layout: blog_layout
title: 'Using Two Unique Layouts in Svelte Kit'
date: '2022/06/29'
updated_date: '2022/06/29'
author: 'Justin Golden'
preview_text: "If you ever struggled to use one layout for some pages, and another layout that doesn't inherit from the base layout, read on."
img: '/img/blog/two_doors.avif'
categories: ['webdev', 'svelte', 'svelte kit']
keywords:
  [
    'svelte kit layouts',
    'svelte kit multiple layouts',
    'svelte kit unique layouts',
    'svelte kit layout that does not inherit'
  ]
---

<img src="/img/blog/two_doors.avif">

### The Problem

If you're like me, you want one layout for your entire website, and another layout for just the pages inside your `projects/` directory.

You don't want the `projects` pages to have both layouts, you don't want ot manually have to set the layouts for the `projects` and you don't want to have to manually set the layout of every other page.

According to the [docs](https://kit.svelte.dev/docs/layouts), it seems like each layout must inherit from a parent, but if you inherit from your full layout, then you use both layouts in `projects`, and if you inherit from an empty layout, then the rest of your pages don't have a layout.

### The Solution

Someone on Discord sent me a clever solution:

1. In your top level, make a `__layout-reset.svelte` file with just `<slot />`

2. In your `project` folder, name the layout: `__layout@reset.svelte` and style accordingly for projects.

3. In your top level, make a `__layout.svelte` file and style accordingly for non-projects.
