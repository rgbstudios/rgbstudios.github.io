---
layout: blog_layout
title: 'How to Recover a Deleted Git Branch - Deleted Locally, Remotely or Both'
slug: 'recover-deleted-git-branch'
date: '2025/04/24'
updated_date: '2025/04/24'
author: 'Justin Golden'
preview_text: 'Learn how to recover a deleted git branch, even if it was deleted locally and remotely'
img: '/img/blog/person_frustrated_pc.avif'
categories: ['git']
keywords:
  [
    'restore deleted branch',
    'recover deleted branch',
    'restore deleted git branch',
    'recover deleted git branch',
    'restore locally deleted branch',
    'restore remotely deleted branch',
    'restore locally and remotely deleted branch',
    'search by commit message',
    'git branch recovery',
    'git branch restore',
    'git reflog',
    'git branch deletion',
    'recover git history',
    'undelete git branch',
    'bring back deleted git branch',
    'get back deleted git branch',
    'git fsck'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/person_frustrated_pc.avif" alt="" />
    <img src="/img/blog/person_frustrated_pc.jpg" alt="">
  </picture>
  <figcaption>Photo credit @seogalaxy on Unsplash</figcaption>
</figure>

# How to Recover a Deleted Git Branch

Accidentally deleted a Git branch? Don't worry — Git is more forgiving than it seems. Here's how to recover a deleted branch depending on whether it was deleted locally, remotely, or both.

---

## Option 1: Recover a _Locally Deleted Branch_

If you deleted the branch **only locally** (e.g., via `git branch -d branch-name`), but it still exists on the remote:

### ✅ Solution

```bash
git fetch origin
git checkout -b branch-name origin/branch-name
```

This recreates the local branch from the remote one.

## Option 2: Recover a _Remotely Deleted Branch_

If you deleted the branch on GitHub (or another remote), but you still have it **locally**, you can simply push it back:

### Solution

```bash
git checkout branch-name  # (if you're not already on it)
git push -u origin branch-name
```

This will restore the branch on the remote.

## Option 3: Recover a _Branch Deleted Locally and Remotely_

If the branch is deleted both **locally and remotely**, hope is not lost — Git's reflog can still help you retrieve it if you had it checked out recently.

### Step-by-step Recovery with `git reflog`

1. View recent Git activity:

```bash
git reflog
```

2. Look for a line like this:

```bash
abc1234 HEAD@{5}: checkout: moving from master to branch-name
```

Or something like:

```bash
abc1234 HEAD@{7}: commit: Work on feature
```

3. Create the branch again from that commit:

```bash
git checkout -b branch-name abc1234
```

4. Optionally push it back to the remote:

```bash
git push -u origin branch-name
```

## Tips

- Visualize: Run `git log --all --decorate --oneline --graph` to visualize where your lost commits might be.

- Hurry: Reflog entries expire after 30–90 days, depending on your Git settings. Recovery is time-sensitive — deleted commits may be cleaned up by Git's garbage collection, which can run at any time. Act quickly if you need to recover a deleted branch.

## Search by Commit Message

If you remember the commit message but not the hash, try searching for some of the commit message text:

```bash
git log --all --grep="fix imports"
```

For example, if the full message was "clean and fix imports in utils" this would find it.

Or, if you're trying to find a branch reference:

```bash
git reflog | grep "branch-name"
```

To find it

## Recover From Someone Else's Clone

If you're on a team and the branch is gone from both your local and GitHub, someone else might still have a copy.

If your teammate had the branch locally, they can push it back to the remote:

```bash
git push origin branch-name
```

## If You Never Pushed and Never Checked Out

If someone creates a branch, makes a commit, then deletes it without pushing or switching branches, those commits may still exist but are "dangling." Could be recovered with:

```bash
git fsck --lost-found
```

FSCK stands for **File System Consistency Check** and is used to verify the repository's internal structure, ensuring that all objects (commits, blobs, trees, and tags) are valid and reachable. See if you find any dangling commits.

## Closing

Git remembers more than you think. Always try googling, stack overflow, and chatbots for git issues before giving up. There's a lot more tools at your disposal and with the internet and AI, you don't have to remember everything.
