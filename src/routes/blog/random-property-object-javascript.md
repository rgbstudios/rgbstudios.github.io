---
layout: blog_layout
title: 'How to Get a Random Property of an Object in JavaScript'
date: '2022/07/18'
updated_date: '2022/07/18'
author: 'Justin Golden'
preview_text: 'Get a random key from a JavaScript object in two lines and less than a millisecond'
img: '/img/blog/dice_in_water.avif'
categories: ['webdev', 'javascript', 'oop']
keywords:
  [
    'random object property',
    'js object random property',
    'js object random key',
    'javascript object random property',
    'javascript object random key'
  ]
hidden: true
---

<figure>
<img src="/img/blog/dice_in_water.avif" alt="">
<figcaption>Photo credit @deneskozma on Unsplash</figcaption>
</figure>

### The Function

This one is short and sweet:

```
const randomProperty = (obj) => {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};
```

### The Explanation

`const keys = Object.keys(obj);`

We get all possible keys using `Object.keys()`. This alias cleans up the second line and ensures we don't need to run `Object.keys()` twice.

`return obj[keys[(keys.length * Math.random()) << 0]];`

We return `obj[keys[RANDOM_KEY_NUMBER]]` where `RANDOM_KEY_NUMBER` is a random number between zero and the number of keys minus one.

If we have four keys, they would have indicies `0,1,2,3` and `keys.length` would be 4.

`Math.random()` generates a random float between 0 and 1. Multiplied by `keys.length`, this gets us a number between zero and the number of keys. But we want a number between zero and the number of keys minus one. In our example, 4 is the number of keys, but that's not a valid index. We use a left bit shift `<<` on zero to effectively round down to the nearest integer. So 3.45 would become 3, which is a valid index.

### Usage

Use this function for getting a random option from a list, for example, a random user, location, or color.

You can also call it by just passing an array in directly, for example: `randomProperty(['apple', 'orange', 'banana'])`.
