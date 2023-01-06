---
layout: blog_layout
title: 'How to Setup Local Font Files in TailwindCSS'
slug: 'tailwind-setup-local-fonts'
date: '2023/01/05'
updated_date: '2023/01/05'
author: 'Justin Golden'
preview_text: 'Learn how to set up custom fonts in TailwindCSS.'
img: '/img/blog/wood_k.avif'
categories: ['tailwindcss', 'learn', 'webdev']
keywords:
  [
    'set up fonts tailwind',
    'add fonts to tailwind',
    'use custom fonts in tailwind',
    'custom tailwind fonts',
    'customize tailwind font stack',
    'tailwind local font files',
    'tailwind config fonts',
    'tailwind custom fonts',
    'tailwind custom fonts fallback'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/wood_k.avif" alt="">
    <img src="/img/blog/wood_k.jpg" alt="">
  </picture>
  <figcaption>Photo credit @markusspiske on Unsplash</figcaption>
</figure>

Length: Short

Level: ✓ Beginner X Intermediate X Advanced

---

### Step 1: Declare Your Fonts

In a CSS file in your project (I prefer to use `typography.css` as a convention) define your font families and their weights:

```css
@font-face {
	font-family: 'Toby';
	src: url('./fonts/toby/toby-light.woff2') format('woff2');
	font-weight: 300;
}
@font-face {
	font-family: 'Toby';
	src: url('./fonts/toby/toby-regular.woff2') format('woff2');
	font-weight: 400;
}
@font-face {
	font-family: 'Toby';
	src: url('./fonts/toby/toby-bold.woff2') format('woff2');
	font-weight: 700;
}

@font-face {
	font-family: 'Tommy';
	src: url('./fonts/tommy/tommy-regular.woff2') format('woff2');
	font-weight: 400;
}
```

Of course, make sure to include this file in your project.

Also, feel free to add more font-weights, font-styles, as well as fallback font formats or change the font format to the one you have available. To learn more about different font formats and falling back, read [A Comparison of All Major Font Files](/blog/font-files-comparison).

You can also instead use a link, for example:

```css
@import url('https://cdn.website.com?family=terry,timmy');
```

### Setp 2: Set up Tailwind Config

Inside your `tailwind.config.js` file (or whatever other config format you have), go inside your `theme` object:

```js
theme: {
  fontFamily: {
    serif: ['Toby'],
    sans: ['Tommy']
  }
}
```

Be sure to use the name defined in your `font-family` of your `@font-face` rule.

Now, you can use your fonts like so:

`font-sans` or `font-serif`

### Changing Names

You can also customize these names, for example:

```js
theme: {
  fontFamily: {
    toby: ['Toby'],
    tommy: ['Tommy']
  }
}
```

`font-toby` and `font-tommy`

### Fallback to Tailwind Font Stack

If you want to fallback to the default Tailwind font stack, you can first import the default theme:

`const defaultTheme = require('tailwindcss/defaultTheme');`

Then, you can use the spread operator to spread the array out into your font stack:

```js
theme: {
  fontFamily: {
    serif: ['Toby', ...defaultTheme.fontFamily.serif],
    sans: ['Tommy', ...defaultTheme.fontFamily.sans]
  }
}
```

You can also use `extend` to keep the default Tailwind fonts and give your fonts names other than the Tailwind reserved ones:

```js
extend: {
	fontFamily: {
		// ...
	}
}
```
