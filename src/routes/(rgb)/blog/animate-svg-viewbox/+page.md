---
layout: blog_layout
title: 'The trick to animating SVG viewbox'
slug: 'animate-svg-viewbox'
date: '2024/04/17'
updated_date: '2024/04/17'
author: 'Justin Golden'
preview_text: 'Learn how to animate a SVG viewbox quickly'
img: '/img/blog/viewport.avif'
categories: ['webdev', 'svg', 'css']
keywords: ['animate svg viewbox', 'transition svg viewbox', 'zoom in out svg view box']
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/viewport.avif" alt="" />
    <img src="/img/blog/viewport.jpg" alt="">
  </picture>
  <figcaption>Photo credit @mattseymour on Unsplash</figcaption>
</figure>

### The Expectation

You may think you could animate SVG viewbox in CSS per usual:

```css
svg {
	transition: viewBox 1s linear;
}
```

and then set the values with JS:

```js
mySvg.setAttribute('viewBox', '0 0 100 100');
```

But this doesn't work. The JS sets the viewBox, but it doesn't animate.

(by the way, remember "viewBox" has a capital "B")

### Animate Element

You can use the `<animate>` element in SVG:

```xml
<animate attributeName="viewBox" to="0 0 100 100" dur="1s" fill="freeze" />
```

But this runs on page load and doesn't have dynamic data.

For example, if you wanted a dynamic width and height:

```js
mySvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
```

then you wouldn't be able to.

### The Solution

The solution is to add the `animate` element without a `to` attribute:

```xml
<animate attributeName="viewBox" dur="1s" fill="freeze" />
```

Then set the `to` in JS, and then call the `beginElement()` method on the `animate`:

```js
mySvg.querySelector('animate').setAttribute('to', `0 0 ${width} ${height}`);
mySvg.querySelector('animate').beginElement();
```
