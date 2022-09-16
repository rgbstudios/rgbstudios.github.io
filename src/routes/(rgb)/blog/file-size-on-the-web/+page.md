---
layout: blog_layout
title: 'File Size on the Web'
slug: 'file-size-on-the-web'
date: '2022/09/16'
updated_date: '2022/09/16'
author: 'Justin Golden'
preview_text: 'PC games add gigabyte updates, but web devs will debate fiercely over a few kilobytes. Find out why.'
img: '/img/blog/slow_website_frustration.avif'
categories: ['webdev']
keywords:
  [
    'website file size',
    'web page file size',
    'faster website',
    'making faster websites',
    'optimize website images'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/slow_website_frustration.avif" alt="">
    <img src="/img/blog/slow_website_frustration.jpg" alt="">
  </picture>
  <figcaption>Photo credit @elisa_ventur on Unsplash</figcaption>
</figure>

### Why do web developers care so much about a few kilobytes?

The web is the world. Almost everyone worldwide has access to the web, be it from a blazing fast internet connection or a really rough signal. But even with a bad signal, a bundred klilobytes shouldn't matter, right?

Wrong.

Research by Google found that **53% of mobile visitors leave the website if it doesn't load in 3 seconds**. Pair that with average load times for sites (19 seconds on 3G and 14 seconds on 4G) and every second makes a difference.

Ok sure, but now we can load a few megs like nothing, right?

Ideally, a website would be less than 1mb, but a website ranging between 2 or 3 megabytes is right at the limit in my opinion.

<figure>
<img src="/img/blog/hands_on_desk.avif" alt="">
<figcaption>Photo credit @nordwood on Unsplash</figcaption>
</figure>

### Easy Wins

##### Images

First, check your images. I've seen far too many websites with a single 8-12mb photo that accounts for 90+% of the load time and 99% of the file size. Use image compression tools like [squoosh.app](https://squoosh.app/) and try using optimized image formats like `webp`. If you're using a metaframework such as NextJS for React, try looking into built in solutions (NextJS has NextJS images built in). Also, consider lazyloading images. If you're using WordPress or another CMS, see if there's a plugin for automatically optimizing images.

It should go without saying, but if you're loading a video before the user hits the play button, or you have a background video or even a complex animation, that's going to use a lot of bytes too. From a design perspective, I also recommend limiting the animations on page, and only transition when a user interacts with something (for example, a button should be stagnant by default, but if a user hovers or clicks it, it's good practice to change the look and feel so they know it's clickable)

##### Fonts

People don't realize it, but those fonts add up. While a single font may only be about 20-60kb (I don't recommend using more than two font families), once you add multiple font weights (bold, semibold, light, etc.), variants (italic), and character sets (for other languages), just two font families can add up to hundreds of kilobytes, all of which have to be parsed by the browser immediately. Additionally, if they even take a tenth of a second to load, it'll shift the page and your users will notice.

[Web font best practices](https://youtu.be/G0cOQ79WKZE) is a great resource for optimizing your fonts.

### Results

There's also a lot more than meets the eye. Tracking scripts can greatly reduce performance and make a 0.1mb site feel like it weighs a ton. There's also a different between 100kb of image and 100kb of JavaScript. An image that's 100kb loads and it's done, but 100kb of Javascript has to be executed, and that's a **lot** of code. Anything that interacts with the DOM (document object model, the web page itself) takes significantly longer than just about anything else. This includes JavaScript updates (running `document.getElementById` and similar) as well as CSS.

If your webpage has a lot of styles, it can take a long time for the browser to paint all of those to the screen. Removing unused CSS and JS can make all the difference. Make sure you're not importing too many libraries, and make sure you use minified code, and fast CDNs. If you've got control over the backend, look into code splitting.

### Final Things to Check

Try running Lighthouse in your inspect element pane of any chromiumbrowser, and try opening the Network tab in your inspector then hard refreshing (`ctrl+shift+R`) and viewing the page waterfall, sorting by size, and checking the total file sizes at the bottom.
