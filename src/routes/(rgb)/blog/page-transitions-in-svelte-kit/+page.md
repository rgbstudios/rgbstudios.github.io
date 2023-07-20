---
layout: blog_layout
title: 'Page Transitions in Svelte Kit'
slug: 'page-transitions-in-svelte-kit'
date: '2023/07/20'
updated_date: '2023/07/20'
author: 'Justin Golden'
preview_text: 'A simple guide to page transitions in your svelte kit project'
img: '/img/blog/moving_train.avif'
categories: ['webdev', 'svelte', 'svelte kit']
keywords:
  [
    'svelte kit page transitions',
    'svelte page transitions',
    'page transitions',
    'page transitions svelte',
    'page transitions svelte kit'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/moving_train.avif" alt="" />
    <img src="/img/blog/moving_train.jpg" alt="">
  </picture>
  <figcaption>Photo credit @juliakadel on Unsplash</figcaption>
</figure>

Pages in Svelte Kit are similar to components, and they're mounted and unmounted.

We can use `transition:`, `in:`, and `out:` on them as well (learn more about [transitions in svelte kit](/blog/svelte-kit-transitions-guide)).

---

### Steps

There are just two steps to creating page transitions with svelte kit!

(to see the thought process explained, as well as more detail on custom transitons, check the video linked below)

**Step 1: Setting up url from your server**

In your `routes/+layout.server.js` file (create one if you don't have one), export the url.pathname:

```js
export const load = async ({ url }) => {
	return {
		url: url.pathname
	};
};
```

(if you already have a load function, add `url: url.pathname` to the returned object and extract `url` from the parameter if you don't already use it)

**Step 2: Creating the page transitions**

In your `routes/+layout.svelte` file, import the transition you want to use. I'll be importing `fade`:

```js
import { fade } from 'svelte/transition';
```

Next, we want to be able to recieve the data from our server file:

```js
export let data;
```

Last, we will run the transition when `data.url` changes:

```svelte
{#key data.url}
  <div in:fade={{ duration: 250, delay: 250 }} out:fade={{ duration: 250 }}>
    <slot />
  </div>
{/key}
```

Make sure you set your `in` transition `delay` to be the same as the `out` transition `duration`.

### Related Video

Check out this [video on svelte kit page transitions](https://youtu.be/gkw1wFIXM_8) by [Joy of Code](https://www.youtube.com/@JoyofCodeDev) who has a lot of cool Svelte content!
