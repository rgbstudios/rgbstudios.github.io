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

### Why do web developers care so much about saving a few kilobytes?

The web is the world. Almost everyone worldwide has access to the web, be it from a blazing fast internet connection or a really rough signal. But even with a bad signal, a hundred klilobytes shouldn't matter, right?

Wrong.

Research by Google found that **53% of mobile visitors leave the website if it doesn't load in 3 seconds**. With average load times for sites hovering around 19 seconds on 3G and 14 seconds on 4G, it's clear that every second matters.

But surely a few megabytes won't make a difference, right?

While it's ideal for a website to be under 1mb, a website ranging between 2-3mb is still acceptable. However, it's important to note that the impact on performance and user experience becomes more noticeable as the size of the website increases. Not all bytes are equal in terms of their impact on load time. For example, it takes the browser longer to run JavaScript than it does to render an image, and it takes even longer to paint CSS or render content to the DOM. By optimizing these elements and minimizing the size of the website, web developers can improve performance and enhance user experience.

<figure>
<img src="/img/blog/hands_on_desk.avif" alt="">
<figcaption>Photo credit @nordwood on Unsplash</figcaption>
</figure>

### Easy Wins

##### Images

The first thing I would check would be your image sizes. Large, unoptimized images can slow down your website significantly. I've seen far too many websites with a single 8-12mb photo that accounts for 90+% of the load time and 99% of the file size. Use image compression tools like [squoosh.app](https://squoosh.app/) and consider using optimized image formats like `webp`. If you're using a metaframework such as NextJS for React, try looking into built in solutions (NextJS has NextJS images built in). Also, consider lazyloading images. If you're using WordPress or another CMS, see if there's a plugin for automatically optimizing images for your CMS (Try Smush for WP).

Complex animations and videos can impact website performance and slow down load time. To improve the user experience, it's important to limit animations and use transitions sparingly. Transitions can add visual interest and help guide users through the user interface, but it's best to use them sparingly and only in response to user input (e.g., hover or click). Too many animations and transitions can be overwhelming and distract from the content. Remember, less is more when it comes to animations and transitions.

##### Fonts

When it comes to website performance, fonts are an often-overlooked consideration. While a single font may only be around 20-60kb, using multiple font families, weights, variants, and character sets can quickly add up to hundreds of kilobytes. These fonts must be parsed by the browser, which can slow down load time and be noticeable to users. Even a slight delay in font loading can cause the page layout to shift, which can be frustrating for users. This phenomenon, known as cumulative layout shift (CLS), is something that Google takes into account in its page ranking algorithm. To improve website performance and enhance the user experience, it's important to be mindful of the number and size of fonts used on your site.

[Web font best practices](https://youtu.be/G0cOQ79WKZE) is a great resource for optimizing your fonts.

### Results

There's also a lot more than meets the eye. Tracking scripts can greatly reduce performance and make a 0.1mb site feel like it weighs a ton. There's also a different between 100kb of image and 100kb of JavaScript. An image that's 100kb loads and it's done, but 100kb of Javascript has to be executed, and that's a **lot** of code. Anything that interacts with the DOM (document object model, the web page itself) takes significantly longer than just about anything else. This includes JavaScript updates (running `document.getElementById` and similar) as well as CSS.

If your webpage has a lot of styles, it can take a long time for the browser to paint all of those to the screen. Removing unused CSS and JS can make all the difference. Make sure you're not importing too many libraries, and make sure you use minified code, and fast CDNs. If you've got control over the backend, look into code splitting.

### Final Things to Check

Try running Lighthouse in your inspect element pane of any chromiumbrowser, and try opening the Network tab in your inspector then hard refreshing (`ctrl+shift+R`) and viewing the page waterfall, sorting by size, and checking the total file sizes at the bottom.
