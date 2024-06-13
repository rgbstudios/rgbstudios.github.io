---
layout: blog_layout
title: 'How to Scale a SVG Element Around a Transform Origin'
slug: 'svg-scale-animate-transform-origin'
date: '2024/04/26'
updated_date: '2024/04/26'
author: 'Justin Golden'
preview_text: 'The trick to using animatetransform to scale around a center point'
img: '/img/blog/circles.avif'
categories: ['webdev', 'svg']
keywords:
  [
    'svg animatetransform scale transform around center',
    'svg animatetransform scale transform around origin',
    'svg animatetransform scale transform around point',
    'animate svg scale',
    'transform svg scale',
    'svg animatetransform scale transform origin point',
    'svg animatetransform origin point'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/circles.avif" alt="" />
    <img src="/img/blog/circles.jpg" alt="">
  </picture>
  <figcaption>Photo credit @joshuas on Unsplash</figcaption>
</figure>

### The Problem

You want to scale part of a SVG using `<animateTransform>`, but when trying to scale, it scales from the top left corner, not the center.

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <g>
    <circle fill="#EAB308" cx="8" cy="8" r="4"></circle>
    <path d="m8 16v-16m-7 4 14 8m0-8-14 8" fill="none" stroke="#EAB308" stroke-width="1">
    </path>
    <animateTransform
      attributeName="transform"
      type="scale"
      values="0.5; 1.5; 0.5"
      dur="6s"
      repeatCount="indefinite"></animateTransform>
  </g>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <g>
    <circle fill="#EAB308" cx="8" cy="8" r="4"></circle>
    <path d="m8 16v-16m-7 4 14 8m0-8-14 8" fill="none" stroke="#EAB308" stroke-width="1">
    </path>
    <animateTransform
      attributeName="transform"
      type="scale"
      values="0.5; 1.5; 0.5"
      dur="6s"
      repeatCount="indefinite"></animateTransform>
  </g>
</svg>

One would think the `scale` command would have options for the `from`/`to`/`values` to not just set `scaleX` and `scaleY`, but also a point to transform around.

Rotate works this way. For example, if you want to rotate from 0deg to 360deg, around the point 8,8, then you can just add `8 8`:

```xml
<animateTransform
  attributeName="transform"
  type="rotate"
  from="0 8 8"
  to="360 8 8"
  dur="12s"
  repeatCount="indefinite" />
```

And it works fine:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <g>
    <circle fill="#EAB308" cx="8" cy="8" r="4"></circle>
    <path d="m8 16v-16m-7 4 14 8m0-8-14 8" fill="none" stroke="#EAB308" stroke-width="1">
    </path>
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 8 8"
      to="360 8 8"
      dur="12s"
      repeatCount="indefinite"></animateTransform>
  </g>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <g>
    <circle fill="#EAB308" cx="8" cy="8" r="4"></circle>
    <path d="m8 16v-16m-7 4 14 8m0-8-14 8" fill="none" stroke="#EAB308" stroke-width="1">
    </path>
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 8 8"
      to="360 8 8"
      dur="12s"
      repeatCount="indefinite"></animateTransform>
  </g>
</svg>

Without centering around 8,8:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <g>
    <circle fill="#EAB308" cx="8" cy="8" r="4"></circle>
    <path d="m8 16v-16m-7 4 14 8m0-8-14 8" fill="none" stroke="#EAB308" stroke-width="1">
    </path>
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0"
      to="360"
      dur="12s"
      repeatCount="indefinite"></animateTransform>
  </g>
</svg>

### The Answer

I searched for a long time for the answer, on StackOverflow and dozens of forumns with hundreds of replies. I looked at the SVG docs and docs on Mozilla and elsewhere and could not find the answer.

However, the answer is quite simple, and it simply requires setting the `transform-origin` in the item you're animating:

`<g transform-origin="8 8">`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <g transform-origin="8 8">
    <circle fill="#EAB308" cx="8" cy="8" r="4"></circle>
    <path d="m8 16v-16m-7 4 14 8m0-8-14 8" fill="none" stroke="#EAB308" stroke-width="1">
    </path>
    <animateTransform
      attributeName="transform"
      type="scale"
      values="0.5; 1.5; 0.5"
      dur="6s"
      repeatCount="indefinite"></animateTransform>
  </g>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <g transform-origin="8 8">
    <circle fill="#EAB308" cx="8" cy="8" r="4"></circle>
    <path d="m8 16v-16m-7 4 14 8m0-8-14 8" fill="none" stroke="#EAB308" stroke-width="1">
    </path>
    <animateTransform
      attributeName="transform"
      type="scale"
      values="0.5; 1.5; 0.5"
      dur="6s"
      repeatCount="indefinite"></animateTransform>
  </g>
</svg>

For fun, combining with our rotation:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <g transform-origin="8 8">
    <circle fill="#EAB308" cx="8" cy="8" r="4"></circle>
    <path d="m8 16v-16m-7 4 14 8m0-8-14 8" fill="none" stroke="#EAB308" stroke-width="1">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 8 8"
        to="360 8 8"
        dur="12s"
        repeatCount="indefinite"></animateTransform>
    </path>
    <animateTransform
      attributeName="transform"
      type="scale"
      values="0.5; 1.5; 0.5"
      dur="6s"
      repeatCount="indefinite"></animateTransform>
  </g>
</svg>
```

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <g transform-origin="8 8">
    <circle fill="#EAB308" cx="8" cy="8" r="4"></circle>
    <path d="m8 16v-16m-7 4 14 8m0-8-14 8" fill="none" stroke="#EAB308" stroke-width="1">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 8 8"
        to="360 8 8"
        dur="12s"
        repeatCount="indefinite"></animateTransform>
    </path>
    <animateTransform
      attributeName="transform"
      type="scale"
      values="0.5; 1.5; 0.5"
      dur="6s"
      repeatCount="indefinite"></animateTransform>
  </g>
</svg>

[Transform Origin SVG Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform-origin)

I hope this helps someone!
