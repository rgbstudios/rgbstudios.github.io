---
layout: blog_layout
title: 'First time setup for Tailwind CSS'
slug: 'tailwind-setup'
date: '2022/12/16'
updated_date: '2022/12/16'
author: 'Justin Golden'
preview_text: 'Set up a Tailwind project without any other dependencies!'
img: '/img/blog/using_computer_easy.avif'
categories: ['webdev']
keywords:
  [
    'tailwind css',
    'setup tailwind',
    'tailwind setup',
    'tailwind no dependencies',
    'tailwind simple',
    'tailwind first time'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/using_computer_easy.avif" alt="">
    <img src="/img/blog/using_computer_easy.jpg" alt="">
  </picture>
  <figcaption>Photo credit @crew on Unsplash</figcaption>
</figure>

Length: Short

Level: ✓ Beginner ✓ Intermediate ✗ Advanced

### The Files

`src/app.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

This is your input file. It includes all of the tailwind styles you'll need: base, components, and utilities. You can add more files by just linking to them from this file.

---

`src/index.html`

```html
<!DOCTYPE html>
<html>
	<head>
		<title>myapp</title>
		<link href="/dist/output.css" rel="stylesheet" />
	</head>
	<body>
		<h1 class="text-3xl font-bold underline">myapp</h1>
	</body>
</html>
```

This is your webpage. Feel free to change the title and heading. We link to the CSS file generated at `/dist/output.css` which includes all of your CSS, converted into vanilla CSS and minified, with all other tailwind classes removed (during production, read more below). `text-3xl font-bold underline` are example Tailwind classes to confirm everything is setup correctly. As said before, feel free to remove or modify.

---

`package.json`

```json
{
	"name": "myapp",
	"version": "1.0.0",
	"description": "",
	"scripts": {
		"dev": "tailwindcss -i ./src/app.css -o ./dist/output.css --watch",
		"build": "tailwindcss -i ./src/app.css -o ./dist/output.css",
		"prod": "tailwindcss -i ./src/app.css -o ./dist/output.css --minify"
	},
	"devDependencies": {
		"tailwindcss": "^3.2.4"
	}
}
```

The `package.json` is a JSON file describing your project and allows you to specify dependencies (such as Tailwind) you can install with `npm` and scripts you can run. I've included three scripts:

- dev: generates output CSS and continues to generate every time a file is changed (thanks to the `--watch` flag)

- build: generates output CSS

- prod: generates minified output CSS (thanks to the `--minify` flag)

These scripts can be run with `npm run SCRIPTNAME`, for example, `npm run dev`.

---

`tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		extend: {}
	},
	plugins: []
};
```

This is your tailwind config file. Any time you customize your theme, such as changing colors, fonts, or units, those changes will go here. The first line just tells your editor what this file should look like. You can read more about [customizing your theme](https://tailwindcss.com/docs/theme).

Note the `content` line. This is where Tailwind looks for utility classes when you run your scripts. Any file not matching this pattern won't be searched for utility classes (so a `font-extrabold` in a file won't cause those styles to be generated unless the file matches the specified string). We specify any `js` and `html` files inside the `src` folder as starting points. Tailwind also finds our CSS file as it is linked

---

To get setup (assuming you've got `npm`, if not, just [install Node JS](https://nodejs.org/en/download/) and it'll come with it), go to your project root and install your dependencies (tailwind) with `npm install`. Then, you can run `npm run dev` and open up your `index.html` file and you should be good to go.

Happy coding!
