---
layout: blog_layout
title: 'About the CSS Accent Color Property'
slug: 'css-accent-color-property'
date: '2024/03/26'
updated_date: '2024/03/26'
author: 'Justin Golden'
preview_text: 'Learn how to use the new CSS accent-color property and what it can do'
img: '/img/blog/undraw_check_boxes.svg'
categories: ['webdev', 'css']
keywords:
  [
    'css accent-color property',
    'what elements support accent-color css',
    'css accent-color checkbox toggles',
    'css accent-color browser support usage'
  ]
---

<img src="/img/blog/undraw_check_boxes.svg" alt="" class="bg-white p-4">

## The `accent-color` Property

The `accent-color` is a newer CSS property that some browsers support and will affect the background colors of various elements

## Supported Elements

- `input[type=checkbox]`
- `input[type=radio]`
- `input[type=range]`
- `progress`

## Setting The Color

You can set `accent-color` like any other CSS property, inline or with a CSS selector:

```html
<input type="checkbox" style="accent-color: green;" />
```

```css
input[type='checkbox'] {
	accent-color: green;
}
```

You can set `accent-color` however you prefer to set a color, so hex/rgb/rgba, hsl/hsla, color name, etc.

Here's some working code and a working demo for you!

```html
<input checked type="checkbox" style="accent-color: green;" />
<input checked type="radio" style="accent-color: green;" />
<input type="range" style="accent-color: green;" />
<progress value="50" max="100" style="accent-color: green;"></progress>
```

<input checked type="checkbox" style="accent-color: green;">
<input checked type="radio" style="accent-color: green;">
<input type="range" style="accent-color: green;">
<progress value="50" max="100" style="accent-color: green;"></progress>

Browser support is (at time of writing) around 94%.

## Links

[Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color)
[Browser Support](https://caniuse.com/?search=accent-color)
