---
layout: blog_layout
title: 'Make a Tabs Component with Alpine JS in Three Minutes'
slug: 'alpine-tabs-component'
date: '2023/01/09'
updated_date: '2023/01/09'
author: 'Justin Golden'
preview_text: 'Learn Alpine JS and make a fully functional tabs component in just three minutes'
img: '/img/blog/typing_document.avif'
categories: ['webdev', 'javascript', 'alpinejs']
keywords:
  [
    'alpine js tabs',
    'easy tabs component javascript',
    'tabs component tutorial',
    'alpine beginner tutorial',
    'learn alpine js fast'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/typing_document.avif" alt="">
    <img src="/img/blog/typing_document.jpg" alt="">
  </picture>
  <figcaption>Photo credit @glenncarstenspeters on Unsplash</figcaption>
</figure>

Length: Short

Level: ✓ Beginner ✓ Intermediate ✗ Advanced

_If you don't know [Alpine JS](https://alpinejs.dev/), check their [website](https://alpinejs.dev/) and then spend less than an hour following along the [Alpine JS crash course from Traversy Media](https://youtu.be/r5iWCtfltso)._

_For a TL;DR, check the complete code at the bottom of this article._

### Step 0: Add Alpine JS to the Project

This is step zero because I'm assuming you've already got Alpine if you're here, but in case you don't:

```html
<script src="https://unpkg.com/alpinejs" defer></script>
```

Fo the latest version. To pin a specific version:

```html
<script src="https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js" defer></script>
```

If you go to https://unpkg.com/alpinejs in browser, it'll redirect to the latest version. You can then copy that URL (such as `https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js` above) to make sure you stick with the same version.

Just add the script tag above inside your `body` and then move on to start this tutorial:

### Step 1: Boilerplate HTML

First, let's add in our tabs in an unordered list. We will click these to change the content displayed. Second, let's add in the tab content. This is what will changed based on what tab is open.

```html
<!-- Tabs -->
<ul>
	<li>
		<button href="#">Tab 1</button>
	</li>
	<li>
		<button href="#">Tab 2</button>
	</li>
	<li>
		<button href="#">Tab 3</button>
	</li>
</ul>

<!-- Tab content -->
<div>
	<div>Tab 1 content</div>
	<div>Tab 2 content</div>
	<div>Tab 3 content</div>
</div>
```

### Step 2: Our Data - Alpine x-data

Wrap your HTML in a `div` and set its `x-data` to an object that stores our `currentTab` as `1`:

```html
<div x-data="{ currentTab: 1 }">
	<!-- Tabs and tab content here -->
</div>
```

We need this to wrap all of our tab code so they have access to this `x-data`.

### Step 3: Conditionally Show Tabs - Alpine x-show

For each of our tabs, we only want to show them when `currentTab` is set to their tab number:

```html
<div x-show="currentTab === 1">Tab 1 content</div>
<div x-show="currentTab === 2">Tab 2 content</div>
<div x-show="currentTab === 3">Tab 3 content</div>
```

### Step 4: Change Data on Click - Alpine @click

Clicking the tabs should change `currentTab` to the correct value. We'll add an `@click` listener:

```html
<li @click="currentTab = 1">
	<button href="#">Tab 1</button>
</li>
<li @click="currentTab = 2">
	<button href="#">Tab 2</button>
</li>
<li @click="currentTab = 3">
	<button href="#">Tab 3</button>
</li>
```

### Complete Code

```html
<script src="https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js" defer></script>

<div x-data="{ currentTab: 1 }">
	<ul>
		<li @click="currentTab = 1">
			<button href="#">Tab 1</button>
		</li>
		<li @click="currentTab = 2">
			<button href="#">Tab 2</button>
		</li>
		<li @click="currentTab = 3">
			<button href="#">Tab 3</button>
		</li>
	</ul>
	<div>
		<div x-show="currentTab === 1">Tab 1 content</div>
		<div x-show="currentTab === 2">Tab 2 content</div>
		<div x-show="currentTab === 3">Tab 3 content</div>
	</div>
</div>
```

### Closing

I hope you learned something from this article. Note that you can use any numbers (or strings) for your `currentTab` and change which elements have these properties (I used `ul li` for semantic reasons and `buttons` because they're focusable and clickable and don't navigate the user to a page).
