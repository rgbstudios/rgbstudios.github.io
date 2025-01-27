---
layout: blog_layout
title: 'HTTPS localhost on a SvelteKit, Vue, React, or other Vite Project with mkcert'
slug: 'localhost-https-vite-mkcert'
date: '2024/09/05'
updated_date: '2024/09/05'
author: 'Justin Golden'
preview_text: 'Learn how to get localhost HTTPS on a SvelteKit, Vue, React, or other Vite Project with mkcert-cli'
img: '/img/blog/lock.avif'
categories: ['web', 'vite', 'svelte', 'react', 'vue', 'javascript', 'node', 'npm']
keywords:
  [
    'svelte kit https localhost',
    'svelte kit https',
    'svelte kit localhost cert',
    'svelte kit https cert',
    'svelte kit https localhost mkcert',

    'vue https localhost',
    'vue https',
    'vue localhost cert',
    'vue https cert',
    'vue https localhost mkcert',

    'react https localhost',
    'react https',
    'react localhost cert',
    'react https cert',
    'react https localhost mkcert',

    'mkcert-cli'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/lock.avif" alt="">
    <img src="/img/blog/lock.jpg" alt="">
  </picture>
  <figcaption>Photo credit @jsalvino on Unsplash</figcaption>
</figure>

---

Here's how you can get your `localhost` to be HTTPS with any Vite project (SvelteKit, Vue, React, SolidJS, Preact, Astro, etc.)

We will be using the [`mkcert-cli`](https://www.npmjs.com/package/mkcert-cli) package to generate a self-signed certificate.

No need to install this package, since we will run it with `npx` for one-time use.

## Update your `package.json`

Add the following command to your `package.json` file:

```json
"cert": "npx -y mkcert-cli"
```

This will run the `mkcert-cli` package and generate a self-signed certificate.

For custom output dir and/or file names, use the following command:

```json
"cert": "npx -y mkcert-cli --outDir app/ssl --cert server.crt --key server.key"
```

You should only have to run this once. Run your newly added command with `npm run cert` and click ok to trust if a window pops up.

## Update your `vite.config.js`

Update your `vite.config.js` file to include the following:

```js
import fs from 'fs';

server: {
  https: {
    key: fs.readFileSync('./app/ssl/server.key'),
    cert: fs.readFileSync('./app/ssl/server.crt')
  }
}
```

Use the location and name of your certificate files instead of `app/ssl/server.key` and `app/ssl/server.crt`.

## Update your `.gitignore`

Remember, do **NOT** commit your certificate files to your repo. Update the `.gitignore` file to ensure they are not committed:

```gitignore
app/ssl/
```

## Remember to update your `README.md`

Remember to update your readme:

```md
First Time Setup: Run `npm install` and then `npm run cert`.
```

---
