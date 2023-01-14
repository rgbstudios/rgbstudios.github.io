---
layout: blog_layout
title: 'What the -u Flag in Git Does'
slug: 'git-u-flag'
date: '2023/01/05'
updated_date: '2023/01/05'
author: 'Justin Golden'
preview_text: 'A quick read on the -u flag in git.'
img: '/img/blog/git_mascot.avif'
categories: ['programming', 'learn']
keywords: ['git u flag', '-u flag git', 'upstream flag git', 'what is -u', 'what does -u do']
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/git_mascot.avif" alt="">
    <img src="/img/blog/git_mascot.jpg" alt="">
  </picture>
  <figcaption>Photo credit @synkevych on Unsplash</figcaption>
</figure>

Length: Short

Level: ✓ Beginner ✓ Intermediate X Advanced

---

### Intro

You may have seen the `-u` flag when reading about git online, such as in `git push -u origin master`.

### The Docs

The `-u` flag is the same as `--set-upstream`, which in the [git push docs](https://git-scm.com/docs/git-push) says:

> For every branch that is up to date or successfully pushed, add upstream (tracking) reference, used by argument-less git-pull and other commands.

### Explanation

When you push to your local branch with `-u`, your local branch will be linked to the remote branch.

Specifically, it sets the origin as the upstream remote in your git config.

### Result

This means you can use `git pull` and `git push` without having to specify arguments each time.

### More

You can always run `git push --help` to read the docs on the command line, and offline : )
