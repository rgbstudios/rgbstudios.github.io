---
layout: blog_layout
title: 'Array Methods in JavaScript - Part 1: The Basics'
slug: 'array-methods-javascript'
date: '2023/12/15'
updated_date: '2023/12/15'
author: 'Justin Golden'
preview_text: 'Learn about many different array methods in JavaScript - Great read for all skill sets!'
img: '/img/blog/solar_array.avif'
categories: ['web', 'javascript']
keywords:
  [
    'learn js arrays',
    'javascript array methods',
    'javascript arrays guide',
    'javascript sort array',
    'javascript shuffle random array',
    'javascript array min max',
    'javascript pop push slice shift',
    'javascript new array methods'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/solar_array.avif" alt="">
    <img src="/img/blog/solar_array.jpg" alt="">
  </picture>
  <figcaption>Photo credit @publicpowerorg on Unsplash</figcaption>
</figure>

Length: Long

Level: ✓ Beginner ✓ Intermediate ✓ Advanced

---

This will be a long one, but for each section, I'll try to keep everything as brief as possible : )

Here's our example array:

```js
const names = ['John', 'Joey', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh'];
```

### Add and Remove Elements from the Front and Back

#### Use `pop` to **remove** and return the **last** element:

```js
names.pop();
```

Returned: `'Josh'`

Names: `['John', 'Joey', 'Jill', 'Jack', 'Jace', 'Jane']`

#### Use `push` to **add** an element to the **end**:

```js
names.push('Java');
```

Returns the length of the array.

Returned: `8`

Names: `['John', 'Joey', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh', 'Java']`

#### Use `shift` to **remove** and return the **first** element:

```js
names.shift();
```

Returned: `'John'`

Names: `['Joey', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh']`

#### Use `unshift` to **add** an element to the **beginning**:

```js
names.unshift('Java');
```

Returns the length of the array.

Returned: `8`

Names: `['Java', 'John', 'Joey', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh']`

### Length of an Array

Use `.length`.

```js
names.length;
```

Returned: `7`

### To String

```js
names.toString();
```

Returned: `'John,Joey,Jill,Jack,Jace,Jane,Josh'`

or join with specific character(s):

```js
names.join(' - ');
```

Returned: `'John - Joey - Jill - Jack - Jace - Jane - Josh'`

### Merge Arrays

```js
const names = ['John', 'Joey', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh'];
const newNames = ['Kai', 'Kevin', 'Ken', 'Kyle'];

const allNames = names.concat(newNames);
```

`['John', 'Joey', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle']`

Concat does not mutate the existing arrays and returns the new concatenated array.

Concat can take any number of arguments, and can also take other variables:

```js
const allNames = names.concat(newNames, newerNames);
```

```js
const allNames = names.concat('Kotlin');
```

```js
const allNames = names.concat(123);
```

### Flatten Arrays

Flattening an array means reducing the dimensionality of an array.

```js
const names = [
	['John', 'Joey', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh'],
	['Kai', 'Kevin', 'Ken', 'Kyle']
];
names.flat();
```

`['John', 'Joey', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle']`

Note on dimensionality:

You can pass an argument for how many levels to flatten (default 1 level). For example:

```js
const nums = [
	[1, 2],
	[123, 234],
	[[321], [654]]
];
console.log(nums.flat());
console.log(nums.flat(2));
```

Results:

`[1, 2, 123, 234, [321], [654]]`
`[1, 2, 123, 234, 321, 654]`

### Splice and Slice Arrays

#### Splice

Use `splice` to add new items and `slice` to slice out a part of an array.

```js
names.splice(2, 0, 'Justin', 'Jessica');
```

Names: ` ['John', 'Joey', 'Justin', 'Jessica', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh']`

Returned: `[]`

The first parameter (`2`) is where the elements should be **added**

The second parameter (`0`) is how many elements should be **removed**

The remaining parameters are items to add to the array.

`splice` returns an array of the deleted items.

#### Slice

Use `slice` to slice out a part of an array.

```js
names.slice(1);
```

Names: `['John', 'Joey', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh']`

Returned: `['Joey', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh']`

Slices an array starting from the first parameter (`1`)

Does not mutate the array. Returns the sliced array.

Slice can take two arguments, for example:

```js
names.slice(2, 4);
```

The arguments specify where to start and stop slicing. The first element is included and the last element is excluded. So `slice(2, 4)` would slice out elements 2 and 3, and `slice(2, 5)` would slice out elements 2, 3, and 4.

Names: `['John', 'Joey', 'Jill', 'Jack', 'Jace', 'Jane', 'Josh']`

Returned: `['Jill', 'Jack']`

### Min and Max

To find the min or max of an array, use `Math.max` or `Math.min` with the spread operator (`...`)

```js
const nums = [3, 1, 4, 1, 5, 9, 2];
Math.max(...nums);
Math.min(...nums);
```

Returned: `9` and `1`

If you can't support ES6, use `Math.max.apply(Math, nums)` and `Math.min.apply(Math, nums)`

### Sort and Reverse

Use `.sort()` to sort an array and `.reverse()` to reverse it.

`sort` can take in a sorting function to determine how to sort. It defaults to sorting alphabetically.

`sort` mutates the original array.

```js
const names = ['Kai', 'Kevin', 'Ken', 'Kyle'];
names.sort();
```

Names: `['Kai', 'Ken', 'Kevin', 'Kyle']`;

Returned: `['Kai', 'Ken', 'Kevin', 'Kyle']`;

You can also call `.reverse()` to reverse the order.

```js
const names = ['Kai', 'Kevin', 'Ken', 'Kyle'];
names.sort();
names.reverse();
```

Names: `['Kyle', 'Kevin', 'Ken', 'Kai']`

Returned: `['Kyle', 'Kevin', 'Ken', 'Kai']`

Custom comparison function:

```js
const names = ['Kai', 'Kevin', 'Ken', 'Kyle'];
names.sort((a, b) => b.length - a.length);
```

You can provide a function that takes in two items and determines which goes first or last in the array. Above we sort by string length.

Names: `['Kevin', 'Kyle', 'Kai', 'Ken']`
Returned: `['Kevin', 'Kyle', 'Kai', 'Ken']`

Here's how the sort function works:

- If the result is **negative**, `a` is sorted before `b`
- If the result is **positive**, `b` is sorted before `a`
- If the result is 0, there is no change to the order

### Shuffle

Here's how you sort an array in a random order:

```js
names.sort(() => 0.5 - Math.random());
```

This will randomly return a positive or negative number half the time, resulting in a randomly ordered array.

For a better random sort, read about the [Fisher Yates Method](https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/#)

### Sorting Objects

You can compare keys of an object in your custom comparison function. Let's use an example from w3 schools:

```js
const cars = [
	{ type: 'Volvo', year: 2016 },
	{ type: 'Saab', year: 2001 },
	{ type: 'BMW', year: 2010 }
];
cars.sort((a, b) => a.year - b.year);
```

Returned: `[{ type: 'Saab', year: 2001 }, { type: 'BMW', year: 2010 }, { type: 'Volvo', year: 2016 }]`

### Note on Array Sorting Stability

A stable array means that elements with the same value must keep their position relative to other elements with the same value. For example, if we had three cars from 2016, then their order should be unchanged.

This was only made a requirement of `sort()` in ES2019, so older browsers may not honor this.

### Note on Constant Arrays

Just because an array is declared with `const` doesn't mean it can't be changed. It simply means the variable can't be redeclared. You can still add, remove, modify, and change the order of items.

---

**Check out [Part 2](/blog/array-methods-javascript-iteration) where we cover array iteration such as `forEach`, `map`, `filter`, `reduce`, `find`, and more!**

---

### Further Reading

- [W3 Schools Array Methods Page](https://www.w3schools.com/js/js_array_methods.asp)
