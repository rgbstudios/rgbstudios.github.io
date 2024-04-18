---
layout: blog_layout
title: 'Use Two Simple Lines of CSS to Make Your Div Full-Bleed'
slug: 'full-bleed-css'
date: '2024/03/27'
updated_date: '2024/03/27'
author: 'Justin Golden'
preview_text: 'Use this quick CSS hack to make your div full bleed, even if it is inside a container and you want the background-color to extend out'
img: '/img/blog/undraw_complete_design.svg'
categories: ['webdev', 'css']
keywords:
  ['css full bleed outside container', 'css full bleed div', 'css full bleed margin padding']
---

<img src="/img/blog/undraw_complete_design.svg" alt="" class="bg-white p-4">

### The Problem

You have a container that nicely wraps the whole page layout, but you have a div and you want it to extend its background color all the way to the edge of the screen (full-bleed), without redoing your entire DOM structure.

### The Solution

Two simple lines of CSS, credit to [Kevin Powell](https://www.youtube.com/@KevinPowell)

```css
.full-bleed {
	margin: 0 calc(50% - 50vw);
	padding: 0 calc(50vw - 50%);
}
```

Now you can apply this to your design like so:

```html
<main class="container">
	<header>Header</header>
	<section>Section</section>
	<footer class="full-bleed" style="background-color: green;">Footer</footer>
</main>
```

See the working example below:

<div class="container">
	<div>Header</div>
	<div>Section</div>
	<div class="full-bleed" style="background-color: green;">Footer</div>
</div>

<style>
  .full-bleed {
    margin: 0 calc(50% - 50vw);
    padding: 0 calc(50vw - 50%);
  }
</style>
