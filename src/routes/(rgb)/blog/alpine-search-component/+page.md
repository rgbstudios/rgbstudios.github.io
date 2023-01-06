---
layout: blog_layout
title: 'Tutorial: How to Make a Simple Search Component in Alpine JS'
slug: 'alpine-search-component'
date: '2023/01/05'
updated_date: '2023/01/05'
author: 'Justin Golden'
preview_text: 'Create a simple search component in just minutes that can automatically search data and render to the page using Alpine JS.'
img: '/img/blog/search_alpine.avif'
categories: ['programming', 'learn', 'webdev']
keywords:
  [
    'alpine js search',
    'alpine js search tutorial',
    'alpine js search guide',
    'search component alpine',
    'easy javascript search',
    'alpine js tutorial',
    'easy search with javascript',
    'javascript simple search algorithm',
    'front end search'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/search_alpine.avif" alt="">
    <img src="/img/blog/search_alpine.jpg" alt="">
  </picture>
  <figcaption>Photo credit @andrewtneel on Unsplash</figcaption>
</figure>

Length: Medium

Level: ✓ Beginner ✓ Intermediate X Advanced

---

<img src="/img/blog/posts/alpine_search.gif" alt="code demo">

### Add Alpine

[AlpineJS.dev](https://alpinejs.dev/) has the script source to get you started as `//unpkg.com/alpinejs`, but we'll want to use the most recent version and pin it, so paste that URL in your browser and then copy the new URL (At time of writing, it's `https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js`)

So add the following to your `<head>`:

```html
<script src="https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js" defer></script>
```

### Add Your Data

Next, add your data in. Open a `<script>` tag and put your data in a const (of course, for an app with a backend, fetch your data and then load async):

```js
const userData = [
	{
		id: 1,
		name: 'Joe',
		age: 20,
		image: 'https://randomuser.me/api/portraits/men/1.jpg'
	},
	{
		id: 2,
		name: 'Sally',
		age: 25,
		image: 'https://randomuser.me/api/portraits/women/1.jpg'
	},
	{
		id: 3,
		name: 'Tom',
		age: 30,
		image: 'https://randomuser.me/api/portraits/men/2.jpg'
	},
	{
		id: 4,
		name: 'John',
		age: 35,
		image: 'https://randomuser.me/api/portraits/men/3.jpg'
	},
	{
		id: 5,
		name: 'Samantha',
		age: 40,
		image: 'https://randomuser.me/api/portraits/women/2.jpg'
	}
];
```

### Add in your HTML

(I'm using some Tailwind classes for this example)

```html
<div class="container mx-auto">
	<input
		placeholder="Search for a user..."
		type="search"
		class="block w-full rounded bg-gray-200 p-4 mb-4"
	/>
	<div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
		<div class="flex items-center shadow p-4">
			<img class="rounded-full w-12 h-12" src="https://randomuser.me/api/portraits/men/2.jpg" />
			<div class="ml-4">
				<p class="text-lg text-gray-900">Joe</p>
				<p class="text-sm font-bold text-gray-600">20</p>
			</div>
		</div>
		<div class="flex items-center shadow p-4">
			<img class="rounded-full w-12 h-12" src="https://randomuser.me/api/portraits/men/2.jpg" />
			<div class="ml-4">
				<p class="text-lg text-gray-900">Joe</p>
				<p class="text-sm font-bold text-gray-600">20</p>
			</div>
		</div>
	</div>
</div>
```

### Set up Your Loop

```html
<div x-data="userData">
	<!-- ... -->
	<template x-for="user in userData" :key="user.id">
		<div class="flex items-center shadow p-4">
			<img class="rounded-full w-12 h-12" :src="user.image" />
			<div class="ml-4">
				<p class="text-lg text-gray-900" x-text="user.name"></p>
				<p class="text-sm font-bold text-gray-600" x-text="user.age"></p>
			</div>
		</div>
	</template>
</div>
```

In this loop, we use a `template` with `x-for` to iterate each user (key of `id`) and then we fill in the image `src` and paragraph `text` with Alpine.

### Set Up Your Search

Add `x-model="search"` to bind the data to the `search` variable:

```html
<input
	x-model="search"
	placeholder="Search for a user..."
	type="search"
	class="block w-full rounded bg-gray-200 p-4 mb-4"
/>
```

Then, inside your script, add a function to `getUsers()` and replace your `x-data` with that:

`<div class="container mx-auto" x-data="getUsers()">`

```js
function getUsers() {
	return {
		search: '',
		userData: userData
	};
}
```

**Now, let's add the search algorithm:**

```js
function getUsers() {
	return {
		search: '',
		allData: userData,
		get filteredUsers() {
			if (this.search === '') {
				return this.allData;
			}
			return this.allData.filter((user) => {
				return user.name
					.replace(/ /g, '')
					.toLowerCase()
					.includes(this.search.replace(/ /g, '').toLowerCase());
			});
		}
	};
}
```

We'll add a getter for filtered users. The first step is to return all data if our search term is empty.

Next, we can filter our data according to `this.search`. The function above takes the user's `name` field without spaces and lowercase and compares it to the search term without spaces and lowercase. We use `includes` to see if it's anywhere inside the string, but you can use `startsWith` to check the beginning of strings, or change any other parts of the search algorithm such as comparing multiple different fields.

Note the usage of `this.` to use `search` and `allData` inside our object.

We'll want to replace `userData` with `filteredUsers` in our `x-for` loop as well.

### Full File

```html
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
		<script src="https://unpkg.com/alpinejs@3.10.5/dist/cdn.min.js" defer></script>
	</head>

	<body class="bg-gray-100 text-gray-900 px-4 py-8">
		<div class="container mx-auto" x-data="getUsers()">
			<input
				x-ref="searchInput"
				x-model="search"
				x-on:keydown.window.prevent.slash="$refs.searchInput.focus()"
				placeholder="Search for a user..."
				type="search"
				class="block w-full rounded bg-gray-200 p-4 mb-4"
			/>
			<div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
				<template x-for="user in filteredUsers" :key="user.id">
					<div class="flex items-center shadow p-4">
						<img class="rounded-full w-12 h-12" :src="user.image" />
						<div class="ml-4">
							<p class="text-lg text-gray-900" x-text="user.name"></p>
							<p class="text-sm font-bold text-gray-600" x-text="user.age"></p>
						</div>
					</div>
				</template>
			</div>
		</div>
		<script>
			function getUsers() {
				return {
					search: '',
					allData: userData,
					get filteredUsers() {
						if (this.search === '') {
							return this.allData;
						}
						return this.allData.filter((user) => {
							return user.name
								.replace(/ /g, '')
								.toLowerCase()
								.includes(this.search.replace(/ /g, '').toLowerCase());
						});
					}
				};
			}

			const userData = [
				{
					id: 1,
					name: 'Joe',
					age: 20,
					image: 'https://randomuser.me/api/portraits/men/1.jpg'
				},
				{
					id: 2,
					name: 'Sally',
					age: 25,
					image: 'https://randomuser.me/api/portraits/women/1.jpg'
				},
				{
					id: 3,
					name: 'Tom',
					age: 30,
					image: 'https://randomuser.me/api/portraits/men/2.jpg'
				},
				{
					id: 4,
					name: 'John',
					age: 35,
					image: 'https://randomuser.me/api/portraits/men/3.jpg'
				},
				{
					id: 5,
					name: 'Samantha',
					age: 40,
					image: 'https://randomuser.me/api/portraits/women/2.jpg'
				}
			];
		</script>
	</body>
</html>
```

This example was modified from [AlpineToolbox.com](https://www.alpinetoolbox.com/).
