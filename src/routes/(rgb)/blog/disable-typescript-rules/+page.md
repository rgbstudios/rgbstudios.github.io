---
layout: blog_layout
title: 'How to Disable Specific TypeScript Rules'
slug: 'disable-typescript-rules'
date: '2023/07/20'
updated_date: '2023/07/20'
author: 'Justin Golden'
preview_text: 'Learn how to disable and ignore TypeScript warnings and errors by line, by file, and by project'
img: '/img/blog/mute_light.avif'
categories: ['webdev', 'typescript']
keywords:
  [
    'typescript disable rule',
    'typescript disable error',
    'typescript disable warning',
    'typescript ignore rule',
    'typescript ignore error',
    'typescript ignore warning',
    'typescript ignore rule one line',
    'typescript ignore rule entire file',
    'typescript ignore rule one instance'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/mute_light.avif" alt="" />
    <img src="/img/blog/mute_light.jpg" alt="">
  </picture>
  <figcaption>Photo credit @mbaumi on Unsplash</figcaption>
</figure>

### One Line

To ignore an error in one line:

`// @ts-ignore`

You can also write text after it, for example:

`// @ts-ignore: this error is dumb so we ignore it`

Use `eslint-disable-next-line` to disable non-typescript rules from eslint and typescript eslint.

For example:

```js
// eslint-disable-next-line no-unused-vars
const author = 'Justin';
```

### One File

To ignore for the entire file, put this line at the top for the rule you want to ignore:

`/* eslint-disable @typescript-eslint/no-unused-vars */`

If you want to enable the rule after ignoring it for several lines, just add:

`/* eslint-enable @typescript-eslint/no-unused-vars */`

above the location you want to start enabling it.

To disable all eslint, just remove the rule name:

`/* eslint-disable */`

### Project Level

Edit your `.eslintrc` or `.eslintrc.cjs` and go to the rules object and set the rule you want to disable to `'off'`:

```cjs
module.exports = {
	rules: {
		'@typescript-eslint/no-unused-vars': 'off'
	}
};
```

You can also configure eslint rules in your `package.json`:

```json
"eslintConfig": {
  "rules": {
    "no-unused-vars": "off"
  }
},
```

Use this option if you use eslint without typescript-eslint.

### When to Ignore

Generally, you want your project to be error free. But that doesn't mean you just ignore everything to get the lines away. The whole value of the rules are that they enforce clean and bug free code. However, you should edit rules in general to your preference, at the project level. Specific rules should only be disbaled if you're using other code that is poorly typed. One final consideration is opportunity cost; if it would take you three hours to solve the error, but the code isn't bug prone and can be safely left alone, maybe the project (and you) are better off spending those three hours elsewhere, so add a "TODO" comment above it and consider moving on.

### Related Reading

Check out [Jon Middaugh's article on ignoring TypeScript errors](https://smartdevpreneur.com/typescript-eslint-ignore-and-disable-type-rules/)
