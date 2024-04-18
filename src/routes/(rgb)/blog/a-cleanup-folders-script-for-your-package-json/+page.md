---
layout: blog_layout
title: 'Ignore Dark Mode During Print Using Tailwind CSS'
slug: 'ignore-dark-mode-during-print-tailwind-css'
date: '2024/03/27'
updated_date: '2024/03/27'
author: 'Justin Golden'
preview_text: 'Learn how to ignore dark mode and use light mode when the user prints your page in your Tailwind CSS project'
img: '/img/blog/undraw_printing_invoices.svg'
categories: ['webdev', 'tailwindcss', 'css']
keywords:
  [
    'turn off dark mode print tailwind css',
    'turn off dark mode print',
    'use light mode styles when printing',
    'use light mode styles when printing tailwind css',
    'print specific styles css',
    'tailwind print styles'
  ]
---

<img src="/img/blog/undraw_printing_invoices.svg" alt="" class="bg-white p-4">

### The Problem

Your website uses Tailwind CSS and has a light and dark mode. The user can print the page, but if they're in dark mode, they get a mess. How can you configure Tailwind so it automatically uses light mode when they print?

### The Solution

1. In your `tailwind.config.cjs`, set `darkMode` to `null`:

`darkMode: null`

2. In your `tailwind.config.cjs`, under `plugins`, `addVariant` for `dark` to use `@media not print`:

```js
plugins: [
	plugin(function ({ addUtilities, addVariant }) {
		addVariant('dark', '@media not print { .dark & }');
	})
];
```

That's it! Hope this short article helped you. Feel free to check out our [other articles](/blog)!
