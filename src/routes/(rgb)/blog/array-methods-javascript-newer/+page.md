---
layout: blog_layout
title: 'Array Methods in JavaScript - Part 3: New Methods in 2024'
slug: 'array-methods-javascript-newer'
date: '2024/01/04'
updated_date: '2024/01/04'
author: 'Justin Golden'
preview_text: 'Learn about new array methods coming soon to a browser near you!'
img: '/img/blog/solar_array_3.avif'
categories: ['web', 'javascript']
keywords:
  [
    'learn js arrays',
    'javascript array methods',
    'javascript array groupBy',
    'javascript array with',
    'javascript array at',
    'javascript array fill',
    'javascript array toSorted'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/solar_array_3.avif" alt="">
    <img src="/img/blog/solar_array_3.jpg" alt="">
  </picture>
  <figcaption>Photo credit @mannyb on Unsplash</figcaption>
</figure>

Length: Long

Level: X Beginner ✓ Intermediate ✓ Advanced

---

**If you haven't yet, read part one on [the basic JavaScript array methods](/blog/array-methods-javascript), or read part two on [JavaScript array iteration methods](/blog/array-methods-javascript-iteration)!**

---

### Group By

Groups an array into an object with key-value pairs based on group condition.

```js
const cars = [
	{ type: 'Volvo', year: 2016 },
	{ type: 'Saab', year: 2001 },
	{ type: 'BMW', year: 2010 },
	{ type: 'BMW', year: 2012 }
];

const grouped = Object.groupBy(cars, (car) => car.type);
console.log(grouped);
```

Returned: `{BMW: [{…}, {…}], Saab: [{…}], Volvo: [{…}]}`

`Map.groupBy` will return a `Map`.

We can also group by something more complex, for example:

```js
const grouped = Object.groupBy(cars, (car) => car.type[0]);
```

This will group by the first letter of the car type, so Honda and Hyundai would be grouped together for example.

Returned: `{V: [{…}], S: [{…}], B: [{…}, {…}]}`

### With

Creates a new array with the value at the specified index changed to the given value.

```js
const cars = [
	{ type: 'Volvo', year: 2016 },
	{ type: 'Saab', year: 2001 },
	{ type: 'BMW', year: 2010 }
];

const carsWith = cars.with(1, { type: 'Ford', year: 2002 });
console.log(carsWith);
console.log(cars);
```

`with` does not mutate the array.

Cars With: `[{type: 'Volvo', year: 2016}, {type: 'Ford', year: 2002}, {type: 'BMW', year: 2010}]`

You can also use a negative index to change the values starting at the end.

### At

Similar to bracket notation (`cars[2]`), but it allows negative numbers. We can use `cars.at(-1)` to get the last element.

### Fill

Allows you to fill the entire array with a value.

```js
const names = ['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle'];
names.fill('Joe');
```

This mutates the original array:

Names: `['Joe', 'Joe', 'Joe', 'Joe', 'Joe', 'Joe', 'Joe', 'Joe']`

You can also provide a second parameter for the index to start at (and optionally a third for the index of fill to end), so for example:

```js
names.fill('Joe', 2);
```

Would return `['Jack', 'Jace', 'Joe', 'Joe', 'Joe', 'Joe', 'Joe', 'Joe']`

```js
names.fill('Joe', 2, 4);
```

Would return `['Jack', 'Jace', 'Joe', 'Joe', 'Kai', 'Kevin', 'Ken', 'Kyle']`

### toSorted, toReversed, toSpliced

These are the same as `reverse`, `splice`, and `sort`, but they do **not** mutate the original array and return a new array.

```js
const names = ['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle'];
const reversed = names.toReversed();
```

Reversed: `['Kyle', 'Ken', 'Kevin', 'Kai', 'Josh', 'Jane', 'Jace', 'Jack']`

Names: `['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle']`

Note that `names` is not mutated, unlike if we called `reversed`.

### Is Array

If you have a variable and you want to check if it's an array, you might think to do the following:

```js
const names = ['Jack', 'Jace', 'Jane', 'Josh'];
console.log(typeof names);
```

However, this will return `'object'`, since arrays are objects in JavaScript.

We can use `Array.isArray`:

```js
console.log(Array.isArray(names)); // true
```

### Sets

At time of writing (Dec 2023), these do not work in most major browsers. Feel free to learn about them for use in the coming months, or if you're a reader from the future, then hello future reader!

- `A.difference(B)`: get elements in set A but not in set B (like A AND NOT B) &mdash; **A ∖ B**
- `A.intersection(B)`: get elements in **both** set A **and** set B (like A AND B) &mdash; **A ∩ B**
- `A.symmetricDifference(B)`: get elements in set A or set B but **not** both (like A XOR B) &mdash; **(A ∖ B) ∪ (B ∖ A)**
- `A.union(B)`: get elements in set A, or set B, or both (like A OR B) &mdash; **A ∪ B**
- `A.isDisjointFrom(B)`: return true if sets A and B have no overlap, else false &mdash; **A ∩ B = ∅**
- `A.isSubsetOf(B)`: return true if all elements inside A are inside B, else false &mdash; **A ⊆ B**
- `A.isSupersetOf(B)`: return true if all elements inside B are inside A, else false &mdash; **A ⊇ B**

These methods also work on `Maps`.

<img src="/img/blog/posts/javascript_sets.png" alt="chart of javascript set functions">

Check out the [MDN docs on sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) for more. Image above from the MDN docs.

---

Did you learn anything new from these articles? Consider sharing them with your friends or posting online with the buttons below!

---

### Further Reading

- [Web Dev Simplified Video on New Array Methods](https://youtu.be/mSBnJvHtgD0?si=QLzZrIS-YJ-Uc7LQ)
