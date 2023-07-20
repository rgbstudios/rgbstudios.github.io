---
layout: blog_layout
title: 'A Simple Guide to Redirects in Svelte Kit'
slug: 'redirects-in-svelte-kit'
date: '2022/09/16'
updated_date: '2023/07/20'
author: 'Justin Golden'
preview_text: 'Read on for a ten line imlementation to handling as many redirects as you need in your Svelte Kit project.'
img: '/img/blog/redirect_road.avif'
categories: ['webdev', 'svelte', 'svelte kit']
keywords:
  [
    'svelte kit redirects',
    'svelte kit simple redirect',
    'svelte kit redirect multiple',
    'svelte kit hooks redirect'
  ]
---

### The Problem

You want to handle redirects without creating a new page or a lot of code for each new redirect. You want something that works and that scales.

### The Solution

Create a `hooks.server.js` file in your `src` directory:

```js
import { redirect, type Handle } from '@sveltejs/kit';

const redirects = {
	'/test1': '/test2'
};

export const handle: Handle = async ({ event, resolve }) => {
	if (redirects[event.url.pathname]) throw redirect(301, redirects[event.url.pathname]);
	return await resolve(event);
};
```

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/redirect_road.avif" alt="">
    <img src="/img/blog/redirect_road.jpg" alt="">
  </picture>
  <figcaption>Photo credit @35mm on Unsplash</figcaption>
</figure>

### The Details

1. We first define a mapping of `redirects` which will direct from the key (eg. `/test1`) to the value (eg. `/test2`).

2. We export a `handle` function, which takes in the `event` which represents the request and a `resolve` function which generates a response (in our case, rendering a page, see the [docs](https://kit.svelte.dev/docs/hooks#handle)):

```js
export async function handle({ event, resolve }) {
```

3. We then check to see if `redirects` contains the current page (`event.url.pathname`):

```js
if (redirects[event.url.pathname])
```

4. If the redirect exists, then we return a response with status 301 (permanent redirect, 302 is temporary, [Status code 301](https://justingolden.me/status-codes/#301)) to the new location, `redirects[event.url.pathname])`

```js
throw redirect(301, redirects[event.url.pathname]);
```

Basically, the code would check if `redirects` contains that key and if so redirect to the value, so if the value exists, redirect to it:

```js
if ('/test2') throw redirect(301, '/test2');
```

5. If there is no redirect, then we simply resolve the event and return that response, not changing anything from default behavior.

```js
return await resolve(event);
```

---

_Thank you KTibow for helping update this article to the latest version of SvelteKit. Updated 07/20/2023_
