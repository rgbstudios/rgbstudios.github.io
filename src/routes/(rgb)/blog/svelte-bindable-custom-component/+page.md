---
layout: blog_layout
title: 'How to Bind to a Custom Component in Svelte'
slug: 'svelte-bindable-custom-component'
date: '2025/04/09'
updated_date: '2025/04/09'
author: 'Justin Golden'
preview_text: 'Learn how to bind to a custom component in Svelte.'
img: '/img/blog/chainlink.avif'
categories: ['svelte', 'svelte kit']
keywords:
  [
    'svelte bind custom component',
    'svelte bind component',
    'svelte ref custom component',
    'svelte ref component',
    'svelte custom component binding',
    'svelte reference component',
    'svelte kit bind custom component',
    'svelte bind to element within custom component'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/chainlink.avif" alt="" />
    <img src="/img/blog/chainlink.jpg" alt="">
  </picture>
  <figcaption>Photo credit @merittthomas on Unsplash</figcaption>
</figure>

### The Problem

When binding a custom `Button.svelte` component with `bind:this={myButton}`, your app breaks.

### The Solution

Instead of binding directly with `bind:this`, pass it as a ref.

`Button.svelte`:

```svelte
<script>
  let {ref = $bindable()} = $props();
</script>

<button bind:this={ref}></button>
```

Usage:

```svelte
<Button bind:ref={myButton}></Button>
```

That's it! Hope this short article helped you. Feel free to check out our [other articles](/blog)!
