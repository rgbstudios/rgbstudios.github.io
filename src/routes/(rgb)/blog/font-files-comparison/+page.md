---
layout: blog_layout
title: 'A Comparison of All Major Font Files'
slug: 'font-files-comparison'
date: '2023/01/05'
updated_date: '2023/01/05'
author: 'Justin Golden'
preview_text: 'Read on to learn about different font files, their use cases, capabilities, performance, and support.'
img: '/img/blog/metal_type_grid.avif'
categories: ['design', 'learn', 'typography', 'webdev']
keywords:
  [
    'font file formats',
    'types of font files',
    'font file comparison',
    'font files explained',
    'font file support',
    'best font format for web',
    'font formats comparison'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/metal_type_grid.avif" alt="">
    <img src="/img/blog/metal_type_grid.jpg" alt="">
  </picture>
  <figcaption>Photo credit @fabiosbruun on Unsplash</figcaption>
</figure>

Length: Short

Level: ✓ Beginner ✓ Intermediate ✓ Advanced

---

### Raster vs Vector

Raster images or bitmaps refer to images that contain a grid of square pixels, while vectors refer to imagery defined by lines and curves.

Most fonts are vectors, but it's important to know the distinction. Vectors have smaller file sizes and scale infinitely, and their only limitation is they are not good for camera photos, making them perfect for fonts. It's also worth noting that raster fonts will render faster if you just need one for one size. One may use a raster font for a set of pixel art characters for example.

### Font Formats

**PostScript** (`.ps`) was an earlier and inefficient font file format created by Adobe, which has different data for printing and screens, and has different versions for Mac and Windows.

**TrueType** (`.ttf`) was developed by Apple and licensed to Microsoft and required only one file, but a separate file was necessary for other font styles. This file format was for screen only, and PostScript was used for print.

**OpenType** (`.otf`) was developed by Adobe and Microsoft and is based on TrueType and supports more ligatures and glyphs.

_TTF and OTF files are nearly the same._

**Web Open Format Fonts** (`.woff` and `.woff2`) are compressed and highly efficient fonts for websites. These files only work on websites and cannot be installed on your system, but they are blazing fast on the web. WOFF2 is a newer version with even further improved compression. WOFF2 has slightly less support (96% vs 98% of browsers at time of writing) (https://caniuse.com/woff2 https://caniuse.com/woff) on the web, but you can use a `@font-face` rule (see below).

**Embedded OpenType Fonts** (`.eot`) was created by Microsoft for Internet Explorer and is no longer used due to security issues. This file format was a variant of OpenType.

**SVG** (`.svg`) fonts allow for more effects within the glpyhs. SVG fonts are a newer version of the OpenType format and allow colors, transparencies and animations. These files are generally larger.

### Choose a Font File Format for Your Project

If you want full compatibility across operating systems, programs, and browsers, choose `TTF` or `OTF`.

If you are making a website, use `WOFF` (and `WOFF2` with a fallback if you can).

If you need special effects that other files don't support, use `SVG`.

---

Basically, for the web use `WOFF` and otherwise `TTF` or `OTF`.

### Use WOFF2 and Fallback to WOFF

Use WOFF2 if you have it, and fallback to WOFF in case WOFF2 isn't supported on the client.

```css
@font-face {
	font-family: 'MyFont';
	src: url('myfont.woff2') format('woff2'), url('myfont.woff') format('woff');
}
```

The name entered in `font-family` will be used when you want to apply this font, the `url` is the path to your font, and the order of the `src` property is the order they will try to load, which is why we start with `woff2`.
