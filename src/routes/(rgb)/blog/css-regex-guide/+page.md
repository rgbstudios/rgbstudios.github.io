---
layout: blog_layout
title: 'A Simple Guide to CSS Regex'
slug: 'css-regex-guide'
date: '2024/03/27'
updated_date: '2024/03/27'
author: 'Justin Golden'
preview_text: 'Learn how to use CSS regex in minutes'
img: '/img/blog/undraw_code_thinking.svg'
categories: ['webdev', 'javascript', 'node js']
keywords: ['css regex guide', 'css regex tutorial', 'css regex pros and cons']
---

<img src="/img/blog/undraw_code_thinking.svg" alt="" class="bg-white p-4">

## What is Regex?

Regex, short for regular expression, is a sequence of characters that define a search pattern. It's commonly used in programming and text processing to efficiently match and manipulate strings based on specific patterns or rules. It's usually used in "real" programming languages to match certain strings.

## What is CSS Regex?

CSS regex allows developers to target HTML elements based on patterns within their attribute values. By using regex selectors in CSS, developers can apply styles to elements that match specific patterns.

## Why You Might be Required to Use CSS Regex

Some websites use dynamically generated css classes that contain a hash that changes every regeneration, for example `footer-menu-6b809e` where `6b809e` may change. Under these circumstances, if you want to target a class that starts with "footer-menu-" then you would need CSS regex.

## Why You Don't Want to Use CSS Regex

There are many problems with using css regex. For example, if you check if a class starts with "footer-menu" then it will also match "footer-menu" itself as well as "footer-menu-paragraph-6b809e" etc. If you check if the class in general starts with "footer-menu" then it might work so long as `class="footer-menu-6b809e bg-blue pad-lg"` but once the class order changes and `footer-menu-6b809e` is no longer the first class, for example, `class="new-class footer-menu-6b809e bg-blue pad-lg"` or `class="bg-blue footer-menu-6b809e pad-lg"`, then your code no longer works. The same is true for checking if the class ends with a value. If that class is no longer the last class, then your code breaks.

This is because you aren't checking for individual classes, but rather checking the entire css class, including spaces and all.

Additionally, if you just check if it contains a string, such as "footer-menu-" when this may match other classes, inlcuding "footer-menu-text" or "wrapper-footer-menu" and if you add spaces to the front and/or back, then this means the selector wouldn't work if it's the first or last class listed.

You should only use these CSS class regex selectors if you have to, and remember, that changing classes and class order may break the code.

## How to Use CSS Regex

Now that the warnings are out of the way, here are the selectors:

- `*`: Matches **any part** of an attribute's value
- `^`: Matches **the beginning** of an attribute's value
- `$`: Matches **the end** of an attribute's value

For example, you could use:

```css
div[class*='footer-menu'] {
}
```

to select a class that **contains** "footer-menu"

```css
div[class^='footer-menu'] {
}
```

to select a class that **starts with** "footer-menu"

```css
div[class$='footer-menu'] {
}
```

to select a class that **ends with** "footer-menu"

## Good Uses of CSS Regex

I spoke badly about using regex to select classes as if they are strings, as there are many pitfalls and it means your code is vulnerable to breaking from minor updates. However, there are other good usages of regex in CSS.

Here's the full list of selectors:

- `*`: Matches **any part** of an attribute's value
- `^`: Matches **the beginning** of an attribute's value
- `$`: Matches **the end** of an attribute's value
- `~`: Matches an attribute value that is **space-separated** (e.g., class~="example" matches elements with the class "example" in a space-separated list of classes)
- `|`: Matches an attribute value that is **hyphen-separated** (e.g., lang|="en" matches elements with the lang attribute set to "en" or starting with "en-")

Example creative usages:

- `a[href^="https://mywebsite.com/"]` can be used to target links that are to your website, or a specific website and style them differently with CSS
- `img[src$=".png"]` can be used to target PNG images. Notably, you can use this with the `:not()` selector and `.svg` to select non vector images
- `[class~="footer"]` can be used to select elements that contain the class footer, but this is the same as selecting `.footer` and is just harder to read. It would not work for `footer-6b809e` for example
- `[data-^="data-video-"]` can be used to select elements with a `data-video-SOMETHING` attribute, so if you have many data attributes already and don't want to clutter with a bunch of css classes.
- `[lang|="en"]` targets elements with lang set to "en" or starting with "en" such as "en-US" or "en-GB" and can be used for localization.

## Conclusion

CSS regex has some niche usages. It is most commonly used for avoiding hashes, but when doing this, it has plenty of pitfalls, so use carefully. It's a good tool to know in case there isn't another way to solve a problem.
