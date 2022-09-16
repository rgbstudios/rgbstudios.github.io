---
layout: blog_layout
title: 'Creating an Article Progress Bar with Javascript'
slug: 'creating-an-article-progress-bar-with-javascript'
date: '2022/08/31'
updated_date: '2022/08/31'
author: 'Justin Golden'
preview_text: 'Learn how to create a scroll tracker for articles on your blog in just a few minutes'
img: '/img/blog/woman_scrolling.avif'
categories: ['webdev', 'javascript', 'css', 'ui', 'react', 'vue', 'svelte']
keywords:
  [
    'article progress bar',
    'article progress bar js',
    'article progress bar react',
    'article progress bar vue',
    'article progress bar svelte',
    'track scroll progress',
    'track scroll progress js',
    'scroll tracking',
    'scroll tracking js',
    'scroll spy',
    'scroll spy js',
    'create a scroll tracker',
    'vanilla js scroll spy',
    'react scroll spy',
    'vue scroll spy',
    'svelte scroll spy',
    'js framework scroll spy'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/woman_scrolling.avif" alt="">
    <img src="/img/blog/woman_scrolling.jpg" alt="">
  </picture>
  <figcaption>Photo credit @beccatapert on Unsplash</figcaption>
</figure>

### TL;DR

Here's your one line:

`scrollPercent = window.scrollY / articleElement.offsetHeight;`

### Vanilla

#### CSS

First, let's create our scroll spy, and attach it to the top of the page:

Either in

##### Vanilla CSS:

```html
<div class="scrollspy-wrapper">
	<div class="scrollspy-interior"></div>
</div>
```

```css
.scrollspy-wrapper {
	width: 100%;
	top: 0;
	left: 0;
	position: fixed;
	height: 0.5rem;
	z-index: 10;
}

.scrollspy-interior {
	height: 0.5rem;
	background: #22c55e;
}
```

Or using

##### Tailwind CSS:

```html
<div class="w-full top-0 left-0 fixed h-2 z-10">
	<div class="h-2 bg-green-500" />
</div>
```

(add the `scrollspy-interior` class to the inner div if you're using vanilla JS below)

#### JS

First, give your article an ID: `<article id="main-article">`

##### Vanilla JS

```js
let articleElement;

window.addEventListener('load', () => {
	articleElement = document.getElementById('main-article');
});

window.addEventListener('scroll', () => {
	const scrollPercent = window.scrollY / articleElement.offsetHeight;
	document.querySelector('scrollspy-interior').style.width = (scrollPercent ?? 0) * 100;
});
```

Or using a JS framework, Svelte for example:

##### Svelte

```
<script>
import { onMount } from 'svelte';

let scrollPercent, articleElement;

onMount(()=> {
  articleElement = document.getElementById('main-article');
});

const onScroll = () => {
  scrollPercent = window.scrollY / articleElement.offsetHeight;
};
</script>

<svelte:window on:scroll={onScroll} />

<div class="w-full top-0 left-0 fixed h-2 z-10">
	<div class="h-2 bg-green-500" style="width:{(scrollPercent ?? 0) * 100}%" />
</div>
```

### Closing

Hope this helped you out. Feel free to check out our other [articles](/blog)
