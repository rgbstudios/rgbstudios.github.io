---
layout: blog_layout
title: 'A Simple Guide for Svelte Transitions'
slug: 'svelte-kit-transitions-guide'
date: '2022/08/31'
updated_date: '2022/08/31'
author: 'Justin Golden'
preview_text: 'Quickly learn how to apply fade, slide, and other transitions using Svelte'
img: '/img/blog/crosswalk.avif'
categories: ['webdev', 'css', 'ui', 'css transitions', 'svelte', 'svelte']
keywords:
  [
    'svelte transitions',
    'svelte kit transitions',
    'svelte fade',
    'svelte slide',
    'svelte scale',
    'svelte blur',
    'svelte animations',
    'svelte kit animations',
    'js framework easy transitions'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/crosswalk.avif" alt="">
    <img src="/img/blog/crosswalk.jpg" alt="">
  </picture>
  <figcaption>Photo credit @wesleyphotography on Unsplash</figcaption>
</figure>

### TL;DR: All default Svelte transitions

`import { fade, blur, fly, slide, scale, draw, crossfade } from 'svelte/transition';`

### Basics

Import the transition you'd like from above, then simpy add `transition:scale` or `transition:fade` etc. to apply it. Note that these transitions will run automatically when items are rerendered / recalcualted inside of an `#each` loop.

### Delay, Duration, & Easing

We can also control the delay, duration, and easing of our transitions.

We can use a custom easing function, or simply import a default from `svelte/easing`:

`import { quintOut } from "svelte/easing";`

Then, just add the details to your transition in double curly braces:

`transition:scale={{ delay: 250, duration: 300, easing: quintOut }}`

### In & Out (not the burgers)

To specify different transitions for elements entering and leaving, you can replace `transition:` with `in:` and `out:` for different transitions. For example:

`in:scale out:fade`

### Closing

Remember not to over use transitions and aniamtions and only change things in response to user input : )

You can also customize your transitions even more, and work with animations as well. Check the links below to continue learning:

See the [Svelte transitions tutorial](https://svelte.dev/tutorial/transition) for more.

Here are the [Svelte transition docs](https://svelte.dev/docs#template-syntax-element-directives-transition-fn) as well as the [Svelte animation docs](https://svelte.dev/docs#template-syntax-element-directives-animate-fn) for good measure : )
