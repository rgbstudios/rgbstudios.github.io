---
layout: blog_layout
title: 'How to Create a Svelte Kit Store That Syncs With Local Storage - Svelte 5'
slug: 'svelte-kit-local-storage-store'
date: '2023/12/15'
updated_date: '2023/12/15'
author: 'Justin Golden'
preview_text: 'Create a Svelte Kit store that automatically syncs with localStorage in Svelte 5'
img: '/img/blog/storage.avif'
categories: ['programming', 'javascript', 'web', 'svelte', 'sveltekit']
keywords:
  [
    'svelte kit store local storage',
    'svelte local storage',
    'svelte kit local storage store',
    'svelte 5 local storage',
    'svelte 5 store',
    'svelte 5 local storage store'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/storage.avif" alt="">
    <img src="/img/blog/storage.jpg" alt="">
  </picture>
  <figcaption>Photo credit @joshstyle on Unsplash</figcaption>
</figure>

Length: Short

Level: X Beginner ✓ Intermediate ✓ Advanced

---

### The Solution

```svelte
let todos = $state([]);

$effect(()=> {
  const savedTodos = localStorage.getItem('todos');
  if(savedTodos) todos = JSON.parse(savedTodos);
});

$effect(()=> {
  localStorage.setItem('todos', JSOn.stringify(todos);
});
```

### The Explanation

The `$effect` code runs whenever there's a change. Above, we get the `localStorage` item. We check if it exists and if so, we override our current value by parsing the JSON of the localStorage object. The second block will run whenever `todos` changes and stringifies the variable and stores it in `localStorage`. And of course, the first line declares our local `todos` variable with `$state`.

Check out [Joy of Code's Todo App With Svelte 5 Runes Video](https://youtu.be/uOI77E8Y95Q?si=A0xZs0k0WE6HiC5q) for more.
