---
layout: blog_layout
title: 'Understanding MJS and CJS - JavaScript Modules Explained'
slug: 'modules-explained-mjs-cjs'
date: '2025/03/19'
updated_date: '2025/03/19'
author: 'Justin Golden'
preview_text: 'Why you should know the difference between mjs and cjs'
img: '/img/blog/building-white-black.avif'
categories: ['webdev', 'javascript', 'node js', 'modules']
keywords:
  [
    'mjs vs cjs javascript',
    'javascript modules explained',
    'difference between mjs and cjs',
    'what is mjs',
    'what is cjs',
    'what is es modules',
    'what is common js'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/building-white-black.avif" alt="" />
    <img src="/img/blog/building-white-black.jpg" alt="">
  </picture>
  <figcaption>Photo credit @maxvdo on Unsplash</figcaption>
</figure>

## Introduction

If you've ever worked with JavaScript modules, you may have encountered cases where some `import` or `require` statements don't work as expected. You might have also seen files with `.mjs` or `.cjs` extensions and wondered why they exist.

In this article, we'll break down the difference between **ES Modules (ESM)** and **CommonJS (CJS)**, why these file extensions matter, and how to navigate module systems in modern JavaScript projects.

---

## A Brief History of JavaScript Modules

JavaScript originally had no built-in module system. Developers had to rely on global variables or hacks like immediately-invoked function expressions (IIFEs) to manage dependencies.

### CommonJS (CJS)

Node.js, a runtime for executing JavaScript outside the browser, was created to leverage JavaScript's asynchronous, event-driven nature for backend development. This allowed developers to use JavaScript for both front-end and back-end programming.

To manage dependencies and modularize code, Node.js introduced **CommonJS (CJS)** as a module system, allowing developers to `require()` files and export functionality using `module.exports`:

```js
const fs = require('fs');
module.exports = { greet: () => console.log('Hello!') };
```

CommonJS became the standard for Node.js, but it wasn't supported in browsers.

### ES Modules (ESM)

To standardize module usage across both browsers and servers, **ES Modules (ESM)** were introduced in JavaScript **ES6 (2015)**. This syntax allows `import` and `export` statements:

```js
import fs from 'fs';
export function greet() {
	console.log('Hello!');
}
```

While ESM works natively in modern browsers, Node.js only fully adopted it in **version 12+**, requiring specific configurations.

---

## The `.mjs` and `.cjs` Extensions

By default, Node.js assumes JavaScript files (`.js`) use **CommonJS**. If you want to use ESM, you need to:

1. **Use the `.mjs` extension**
2. **Set `"type": "module"` in `package.json`**

### `.mjs` (ES Modules)

- Explicitly tells Node.js to treat the file as an **ES Module**.
- Uses `import`/`export` syntax.
- Doesn't support `require()`.

### `.cjs` (CommonJS)

- Explicitly tells Node.js to treat the file as **CommonJS**.
- Uses `require()` and `module.exports`.
- Doesn't support `import` unless using dynamic `import()`.

### `"type": "module"` in `package.json`

Instead of renaming files to `.mjs`, you can add this to `package.json`:

```json
{
	"type": "module"
}
```

This makes **all `.js` files** in your project default to **ESM**, while `.cjs` files still use CommonJS.

Conversely, if your project primarily uses CommonJS but you need some ESM files, you don't need to specify `type` as it defaults to `commonjs`. You can explicitly set it if you'd like:

```json
{
	"type": "commonjs"
}
```

and use `.mjs` for ES Modules.

---

## Why Does This Matter?

### 1. **Compatibility Issues**

Some libraries only support **ESM**, while others are still **CommonJS**. Mixing them can cause errors like:

```
SyntaxError: Cannot use import statement outside a module
```

or

```
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module
```

### 2. **Top-Level `await` in ES Modules**

ESM supports **top-level `await`**, allowing asynchronous operations at the module level:

```js
// Works in ESM (.mjs or "type": "module")
const data = await fetch('https://api.example.com').then((res) => res.json());
```

This doesn't work in CommonJS.

### 3. **Tree-Shaking & Performance**

ES Modules allow **tree-shaking**, meaning bundlers like Webpack or Rollup can remove unused exports, optimizing your final build.

CommonJS loads entire modules, which can increase bundle size.

---

## Best Practices

- **For browser projects**: Use **ES Modules** (`import/export`).
- **For Node.js projects**:
  - If working with modern tooling, use `"type": "module"` and `.mjs`.
  - If using older packages, stick to `.cjs`.
- **For compatibility**: If mixing both, use `.cjs` for CommonJS modules and `.mjs` for ES modules when mixing them.

- Browsers: natively support ES Modules (mjs)
- Performance: ES Modules have better performance
- Future proof: ES Modules are the official JS module standard
- Node: Node.js still defaults to CJS, but you can add `"type": "module"` to your `package.json` and use ES Modules

---

## Reference Table

| Feature                  | CommonJS (CJS)                 | ECMAScript Modules (ESM) |
| ------------------------ | ------------------------------ | ------------------------ |
| Syntax                   | `require()` / `module.exports` | `import` / `export`      |
| Execution                | Synchronous                    | Asynchronous             |
| Browser Support          | No (requires bundler)          | Yes (native support)     |
| Tree Shaking             | No                             | Yes                      |
| Default Usage in Node.js | Before ES modules support      | Modern standard          |

---

## Conclusion

Understanding **`.mjs` vs. `.cjs`** is crucial as JavaScript transitions from CommonJS to ES Modules. While ESM is the future, CommonJS is still widely used. By managing these file extensions and settings properly, you can avoid frustrating import/export errors and improve compatibility across environments.
