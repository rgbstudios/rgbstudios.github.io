---
layout: blog_layout
title: 'A Simple Guide to Redirects in Svelte Kit'
date: '2022/06/29'
updated_date: '2022/06/29'
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

Create a `hooks.js` file in your `routes` directory:

```
import redirects from './data/redirects';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const redirect = redirects.find((item) => event.url.pathname === item.source);

  if (redirect) {
    return new Response('', { status: 301, headers: { Location: redirect.destination } });
  }

  const response = await resolve(event);
  return response;
}
```

_(optional)_ Create `redirects.js` (in my example in my `data` directory):
(alternatively, you could just store this object inside of `hooks.js`, but I like to keep them separate)

```
const redirects = [
  {
    source: '/test1',
    destination: '/test2'
  }
];

export default redirects;
```

<figure>
  <img src="/img/blog/redirect_road.avif" alt="">
  <figcaption>Photo credit @35mm on Unsplash</figcaption>
</figure>

### The Details

For starters, I think the `redirects` file is fairly self-explanatory, but I'll give it a go anyways. We export a list of redirect objects, which contain `sources` and `destinations`. We redirect from the source to the destination. Each `source` should be unique.

---

1. The `hooks` file first imports our `redirects`:

`import redirects from './data/redirects';`

2. Then sets the typing for typescript / syntax highlighting (you can remove this but it's nice to have):

`/** @type {import('@sveltejs/kit').Handle} */`

3. We export a the `handle` function, which takes in the `event` which represents the request and a `resolve` function which generates a response (in our case, rendering a page, see the [docs](https://kit.svelte.dev/docs/hooks#handle)):

`export async function handle({ event, resolve }) {`

4. We then check to see if any `redirects` contains the current page (`event.url.pathname`) as a `source`:

`const redirect = redirects.find((item) => event.url.pathname === item.source);`

5. If the redirect exists, then we return a response with status 301 (permanent redirect, 302 is temporary, [Status code 301](https://justingolden.me/status-codes/#301)) to the new location, `redirect.destination`

`return new Response('', { status: 301, headers: { Location: redirect.destination } });`

6. If there is no redirect, then we simply resolve the event and return that response, not changing anything form default behavior.

`const response = await resolve(event); return response;`
