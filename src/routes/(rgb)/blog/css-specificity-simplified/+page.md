---
layout: blog_layout
title: 'CSS Specificity Simplified'
slug: 'css-specificity-simplified'
date: '2023/07/20'
updated_date: '2023/07/20'
author: 'Justin Golden'
preview_text: 'Learn how CSS specificity works in a few simple and easy to learn examples'
img: '/img/blog/chess.avif'
categories: ['webdev', 'css']
keywords:
  [
    'css specificity',
    'css specificity explained',
    'specificity in css',
    'css rules',
    'which css rules apply'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/chess.avif" alt="">
    <img src="/img/blog/chess.jpg" alt="">
  </picture>
  <figcaption>Photo credit @grstocks on Unsplash</figcaption>
</figure>

### What is Specificity in CSS

Specificity refers to how "specific" a rule is in CSS. CSS as you may know, stands for "cascading style sheets. "Cascading" refers to how the rules cascade depending on which elements you target.

When multiple rules conflict(target the same attribute on the same element), for example:

```html
<p class="large">hi</p>
```

```css
p {
	font-size: 12px;
}
.large {
	font-size: 14px;
}
p.large {
	font-size: 16px;
}
```

The more **specific** rule (in this case, `p.large`) is applied.

### Complexity

However, in some cases, it's not so obvious which rule is applied. I'm hoping this short post will demistify that for you.

Google Chrome Developers just put out [a video](https://youtu.be/e8tl_yp5BQg?t=264) and put up this great graphic:

<img src="/img/blog/posts/css-specificity.jpg" alt="css specificity example">

Basically, you count the number of IDs, classes, and types used. The number of IDs are most important, and in a tie, then the number of classes, and in a tie, the number of types.

A type would be like "div" or "button" and class could also be states like `:hover` or square brackets like `[role=button]` as shown above.

For those new to HTML and CSS, IDs are unique and targeted with a `#`, for example: `#my-id` and multiple elements can have the same class, and they are targeted with a `.`, for example: `.my-class`.
