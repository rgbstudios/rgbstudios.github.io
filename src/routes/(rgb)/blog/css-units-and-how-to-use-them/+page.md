---
layout: blog_layout
title: 'CSS Units and How to Use Them'
slug: 'css-units-and-how-to-use-them'
date: '2023/07/20'
updated_date: '2023/07/20'
author: 'Justin Golden'
preview_text: 'Learn all about different units in CSS and which you should use when'
img: '/img/blog/measuring_tape.avif'
categories: ['webdev', 'css']
keywords:
  [
    'units in css',
    'css pixels or rem',
    'css pixels or em',
    'css px or rem',
    'css px or em',
    'css difference between em and rem',
    'css ch unit',
    'css viewport units',
    'css vw, vh, vmin and vmax'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/measuring_tape.avif" alt="">
    <img src="/img/blog/measuring_tape.jpg" alt="">
  </picture>
  <figcaption>Photo credit @siora18 on Unsplash</figcaption>
</figure>

### CSS Units You Need to Know

**Unit:** `px` - Pixels

**Definition:** Each `px` is a pixel on the user's screen. It's quite simple and the most common unit. Not a bad option, but personally, using `rem` for most measurements is probably best (read on below).

**Use case:** Almost anything. Font sizes, buttons, divs, sections, you name it

**Example:** `height: 32px`

---

**Unit:** `em` - Em

**Definition:** 1 `em` is supposed to be the width of a letter "M." However, this is unit doesn't change based on your selected font size or family. `em` defaults to `16px` but scales based on the **parent's** font size.

For example, if you set the parent's font size to `20px`, and an element inside is set to `1.2em`, then the child element will be 1.2 x `20px`, so `12px`. This compounds, so if there are multiple elements inside each other that all use `em`, they will all multiply. It's for this reason that I recommend using `rem` instead of `em` (read below).

See [Kevin Powell's video on the difference between rem and em](https://youtu.be/_-aDOAMmDHI?si=dUWgzFDCHKy-KuxB)

**Use case:** Sometimes used for typography, spacing around type, type inside cards or buttons. Recommend using `rem` instead.

**Example:** `height: 2em`

---

**Unit:** `rem` - Rem

**Definition:** 1 `rem` is a "root em" (some say "relative em"). This unit was designed to fix the problems with `em` units compounding. `rem` only cares about the "root" font size (the `<html>` element).

`rem` are also better than `px` beecause they adapt to the user's system and browser preferences. For example, a user could change the zoom on their device, and `px` would not adapt, but `rem` would.

`1rem` defaults to `16px` (same as `em`), which most developers can get used to, and also lends itself towards making a nice grid system in units of 4px/16px, such as: `0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.5rem`, `2rem`, `3rem`, `4rem`, `6rem`. Use only these values and you'll have a nice consistent grid.

If you want to change to count in another system (for example, `10px`), so you can easily just set the pixel value but still get all of the benefits of uding `rem`, then you can either do:

`html { font-size: 10px; }`

or

`html { font-size: 62.5%; }`

**Use case:** Use almost everywhere in my opinion. Either use `px` or `rem` as your units for 90% of use cases. Only use specific other units (viewport units, percentages, ch) for specific use cases.

**Example:** `height: 2rem`

---

**Unit:** `%` - Percent

**Definition:** Each `%` is a percentage of its parent. For example, an element with `width: 80%` will have a width 80% of the size of its parent's width. If the parent's width decreases or increases, so will the child's.

**Use case:** Useful in certain layouts. Consider also using `flex` or `grid` layouts, and setting the `gap` to a certain number of `rem` or `px`. Consider `flex-wrap: wrap` to automatically fit the right number of items on the page, or use a specific number of grid columns (eg. 3 columns: `display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));`). Best used for `width` and `height`.

[CSS Tricks Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
[CSS Tricks Flex Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

**Example:** `width: 80%`

---

**Unit:** `ch` - Character

**Definition:** Each `ch` unit represents the width of a character. Specifically, it's designed to be the width of a "o" in a font.

**Use case:** Usually, in typography, you want your body copy to be about 60-80 characters per line. You can use `max-width: 75ch` to set the maximum width of your blog post to approx 75 characters. This unit should really only be used for type, and other than setting `max-width`, shouldn't really be used in my opinion.

**Example:** `max-width: 75ch`

---

**Unit:** `vw`, `vh`, `vmin`, `vmax` - Viewport Units

**Definition:** A `vw` is a "viewport width" unit, specifically, 1% of the viewport width. If a unit has `width: 100vw`, then its width is the exact same number of pixels as the current viewport (this is different from percent as percent cares about the parent element and viewport units care about the entire browser window viewport). `vh` is "viewport height" and uses the window's height instead of width. `vmin` uses the minimum value of `vw` and `vh`, in other words, on smaller screens like phones, it will use the width, then it will increase to use the height and continue using the height. `vmax` is the maximum of `vw` and `vh`. These units are occasionally useful for placing elements or scaling them with the screen. I find myself using `vw` occasionally. `vmin` is a lot more useful than `vmax` in my experience, as it scales nicely so that it doesn't get too small or too big.

**Use case:** A large element, maybe a modal or absolutely positioned element. Maybe used for a layout. Use sparingly and on larger elements. Could be used to set `font-size` to scale proportionally, but I'd recommend going with a [type scale](https://typescale.com/) instead.

**Example:** `width: 75vw`

---

### Min, Max, and Clamp

Although they aren't units, they're often used with units to do some black magic. `min()`, `max()`, and `clamp()` work how you'd think they work, and you can read about them on [web.dev](https://web.dev/min-max-clamp/) or [CSSS Tricks](https://css-tricks.com/min-max-and-clamp-are-css-magic/), but I figured it was worth mentioning even though they aren't technically "units."

**Example:** `width: min(50%, 400px);` (at least `400px` but not beyond half the parent's size)

### Useful Resources

[Kevin Powell on CSS Units](https://youtu.be/N5wpD9Ov_To?si=6r0k561Z3ONhOnCn)
