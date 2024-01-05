---
layout: blog_layout
title: 'How to Easily Create a Random UID in JavaScript'
slug: 'random-uid-javascript'
date: '2024/01/04'
updated_date: '2024/01/04'
author: 'Justin Golden'
preview_text: 'A simple solution to generating a random UID in JavaScript'
img: '/img/blog/passport.avif'
categories: ['programming', 'javascript', 'web']
keywords:
  [
    'random uid js',
    'random uid javascript',
    'random id js',
    'random id javascript',
    'javascript generate random id',
    'javascript random id timestamp'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/passport.avif" alt="">
    <img src="/img/blog/passport.jpg" alt="">
  </picture>
  <figcaption>Photo credit @convertkit on Unsplash</figcaption>
</figure>

Length: Short

Level: ✓ Beginner ✓ Intermediate X Advanced

---

### The Simple Solution

You can simply use `window.crypto.randomUUID()` to get a random UID. It will output a string like `82aba12e-0c84-4ec0-aff0-fc66101dfb92` for example.

`randomUUID` has 93% browser support at time of writing on [caniuse.com](https://caniuse.com/?search=randomuuid).

You can make an alias like so:

```js
const uid = () => window.crypto.randomUUID();
```

Then you can simply call `uid()` instead of calling `window.crypto.randomUUID()`.

### Custom

If you want 100% browser support and to write your own solution, I've got a simple one line solution modified from [this StackOverflow post](https://stackoverflow.com/q/6248666) (feel free to read the suggestions here for other ideas).

This code creates a base 36 (lowercase letters and numbers) ID, which uses both the current timestamp and random numbers. This would mean it's both impossible to generate a duplicate ID unless timestamps are identical and if two timestamps are identical the odds of any two IDs being duplicate are 1/36^10. That's 2.735e-16 or 0.000000000000000002735%.

Example output: `lq783h2cp2cngzxuhtq`

Code: `Date.now().toString(36) + Math.random().toString(36).substring(2)`

Full code in `uid.js`:

```js
const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

export default uid;
```
