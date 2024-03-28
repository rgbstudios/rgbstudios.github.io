---
layout: blog_layout
title: 'A Cleanup Folders Script for Your package.json'
slug: 'a-cleanup-folders-script-for-your-package-json'
date: '2022/09/16'
updated_date: '2022/09/16'
author: 'Justin Golden'
preview_text: 'Check out this ten line script to instantly clear those pesky build folders'
img: '/img/blog/vacuum_confetti.avif'
categories: ['webdev', 'javascript', 'node js']
keywords:
  [
    'package.json clean folders',
    'package.json delete folders script',
    'package.json remove folders script',
    'node js script to delete folders',
    'simple javascript delete folders'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/vacuum_confetti.avif" alt="" />
    <img src="/img/blog/vacuum_confetti.jpg" alt="">
  </picture>
  <figcaption>Photo credit @norevisions on Unsplash</figcaption>
</figure>

### The Problem

"Have you tried turning it off and on again?" You find yourself deleting the same few folders over and over again to clear the cache, rebuild, or whatever other reason you need to ensure your project is working as expected.

### The Solution

1. Create a `clean.js` file (I store mine in an `infrastructure` directory at the root of the project):

```js
import fs from 'fs';

const paths = ['.netlify', '.svelte-kit', 'build'];
for (const path of paths) {
	if (fs.existsSync(path)) {
		fs.rmSync(path, { recursive: true });
		console.log(`deleted ${path}`);
	}
}
```

Of course, change `paths` to your desired paths to delete. I chose paths for my Svelte Kit + Netlify project.

Feel free to add `node_modules` here, but just know reinstalling might take some time, and it often doesn't solve anything that rerunning `npm install` doesn't already solve.

Feel free to remove the `console.log` as well. I like it as confirmation that the command ran and as a reminder of what I deleted.

2. Add it to your `package.json` `scripts`:

`"clean": "node infrastructure/clean.js",`

3. Bonus points: `cleanbuild`

I like to add a `cleanbuild` script to run clean, then reinstall (this doesn't delete `node_modules`, unless of course you specified that in your `clean.js` script, then run build and preview to ensure everything is in order in every way):

`"cleanbuild": "npm run clean && npm install && npm run build && npm run preview"`

---

Obligatory **BE CAREFUL** warning: Do **NOT** put a folder you don't want deleted. You can delete your project in an instant. Of course, this is why we use git, but I figured it's worth mentioning for any newbies here.
