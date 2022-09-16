---
layout: blog_layout
title: 'Getting a Version Number in a Svelte Kit Project'
date: '2022/07/18'
updated_date: '2022/07/18'
author: 'Justin Golden'
preview_text: "Read on to find the simple and complete way of using your app's version number in your project"
img: '/img/blog/wall_of_numbers.avif'
categories: ['webdev', 'svelte', 'svelte kit']
keywords:
  [
    'version number svelte kit',
    'get version number',
    'version number vite',
    'version number svelte',
    'get version number package.json',
    'use app version number simple',
    'app version number',
    'app version string',
    'project version number'
  ]
hidden: true
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/wall_of_numbers.avif" alt="">
    <img src="/img/blog/wall_of_numbers.jpg" alt="">
  </picture>
  <figcaption>Photo credit @nhillier on Unsplash</figcaption>
</figure>

### The Simple

The easiest possible answer is as follows:

Create a new `version.js` file in your project with one line:

```
export default '1.0.0';
```

and simply update this value whenever you want to update your version number.

Use the value like so: `import version from './version.js';`

This of course is not automatic and will not sync with your `package.json` version.

### Using Your Package Version

To use the `"version"` defined in your `package.json` through your app, we can define it as a global inside `svelte.config.js`:

```
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);
```

Then inside your config object:

```
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			define: {
				__version__: JSON.stringify(pkg.version)
			}
		}
	},
	// ...
};

export default config;
```

[From the Svelte Kit FAQ](https://kit.svelte.dev/faq#read-package-json)

Now, you should be able to use `__version__` anywhere in your project, without importing it. Any time you restart your dev or build, this variable should get the version from your `package.json`.

### Linting

We must still define `__version__` as a global so our linters don't complain. Here are a few common solutions to this, specifically, for an ESLint and Prettier setup:

1. In `.eslintrc.json`:

```
"globals": {
		"__version__": "readonly"
	},
```

2. In `package.json`:

```
"eslintConfig": {
	"globals": {
		"__version__": true
	}
}
```

3. In `src/global.d.ts`:

```
declare const __version__: string;
```

4. In the files you use it in:

```
/* global __version__:readonly */
```

5. In `vite-env.d.ts` (create if one doesn't already exist). See [Vite shared options docs](https://vitejs.dev/config/shared-options.html#define)

```
declare const __version__: string;
```

Let us know if you find something not in this list at [contact@rgbstudios.org](mailto:contact@rgbstudios.org) and we'll be happy to add it.
