---
layout: blog_layout
title: 'Array Methods in JavaScript - Part 2: Iteration'
slug: 'array-methods-javascript-iteration'
date: '2024/01/04'
updated_date: '2024/01/04'
author: 'Justin Golden'
preview_text: 'Learn about iterating over arrays with forEach, map, filter, reduce, find, and more!'
img: '/img/blog/solar_array_2.avif'
categories: ['web', 'javascript']
keywords:
  [
    'learn js arrays',
    'javascript array methods',
    'javascript array iteration',
    'javascript forEach method',
    'javascript map method',
    'javascript filter method',
    'javascript reduce method',
    'javascript find method'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/solar_array_2.avif" alt="">
    <img src="/img/blog/solar_array_2.jpg" alt="">
  </picture>
  <figcaption>Photo credit @zburival on Unsplash</figcaption>
</figure>

Length: Long

Level: X Beginner ✓ Intermediate ✓ Advanced

---

**If you haven't yet, read part one on [the basic JavaScript array methods](/blog/array-methods-javascript)!**

---

### For Each

`forEach` takes 3 arguments:

- The item value
- The index in the array
- The array

```js
const names = ['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle'];
names.forEach((val, idx, arr) => {
	console.log(val, idx, arr);
});
```

You can see each value, its index, and the array printed at each iteration.

You can also omit trailing parameters that you don't use.

```js
const names = ['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle'];
let namesStartingJ = 0;
names.forEach((val) => {
	if (val[0] === 'J') namesStartingJ++;
});
console.log(namesStartingJ);
```

`4` names start with "J"

```js
const names = ['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle'];
names.forEach((val) => {
	val = val + ' is cool';
});
console.log(names);
```

You will notice that the above doesn't mutate the array:

`['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle']`

`val` is mutated but then discarded and the original array remains intact.

You must use the third parameter, the array, to mutate it:

```js
const names = ['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle'];
names.forEach((val, idx, arr) => {
	arr[idx] = val + ' is cool';
});
console.log(names);
```

`['Jack is cool', 'Jace is cool', 'Jane is cool', 'Josh is cool', 'Kai is cool', 'Kevin is cool', 'Ken is cool', 'Kyle is cool']`

### Map

Map creates a new array and performs a function on each item. Map does not mutate the original array.

```js
const names = ['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle'];
const coolNames = names.map((name) => name + ' is cool');
console.log(coolNames);
console.log(names);
```

Names: `['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle']`

Cool Names: `['Jack is cool', 'Jace is cool', 'Jane is cool', 'Josh is cool', 'Kai is cool', 'Kevin is cool', 'Ken is cool', 'Kyle is cool']`

`map` also takes in 3 arguments:

- The item value
- The index in the array
- The array

These are the same as `forEach`'s arguments.

You can also use `flatMap` to first map all elements then flatten an array. This is similar to `.map().flat()`.

### Filter

Filter creates a new array with elements that meet certain condition. Filter does not mutate the original array.

```js
const names = ['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle'];
const JNames = names.filter((name) => name[0] === 'J');
console.log(JNames);
console.log(names);
```

Names: `['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle']`

J Names: `['Jack', 'Jace', 'Jane', 'Josh']`

`filter` has the same three arguments as `forEach` and `map` (value, index, array).

```js
const cars = [
	{ type: 'Volvo', year: 2016 },
	{ type: 'Saab', year: 2001 },
	{ type: 'BMW', year: 2010 }
];
const newCars = cars.filter((car) => car.year > 2005);
```

Cars: `[{ type: 'Volvo', year: 2016 }, { type: 'Saab', year: 2001 }, { type: 'BMW', year: 2010 }]`

New Cars: `[{ type: 'Volvo', year: 2016 }, { type: 'BMW', year: 2010 }]`

### Reduce

Reduce runs a function on each array element to reduce the entire array to one value. Reduce does not mutate the original array.

```js
const nums = [3, 1, 4, 1, 5, 9, 2];
const sum = nums.reduce((total, val, idx, arr) => total + val);
console.log(sum);
console.log(nums);
```

Sum: `25`

Nums: `[3, 1, 4, 1, 5, 9, 2]`

The function inside `reduce` takes 4 arguments:

- The total (initial value / previous return value)
- The item value
- The index in the array
- The array

The last 3 are the same as the 3 used in the other array methods above.

Reduce can take a second argument (after the function to run on the array) which is an initial value:

```js
const nums = [3, 1, 4, 1, 5, 9, 2];
const sum = nums.reduce((total, val, idx, arr) => total + val, 100);
console.log(sum);
console.log(nums);
```

Sum: `125`

Reduce runs from left-to-right, but `reduceRight` can be used to reduce `right-to-left`.

### Every and Some

Every checks if every value in an array meets a condition.

Some checks if some values in an array meet a condition.

```js
const nums = [3, 1, 4, 1, 5, 9, 2];
const everyOver5 = nums.every((num) => num > 5);
const someOver5 = nums.some((num) => num > 5);
console.log(everyOver5);
console.log(someOver5);
console.log(nums);
```

These methods do not mutate the original array.

Every over 5: `false`

Some over 5: `true`

Nums: `[3, 1, 4, 1, 5, 9, 2]`

### Index Of

Index of searches an array for an element value and returns its index.

JavaScript arrays are zero-indexed, meaning the first item has index 0 and second has position 1.

```js
const nums = [3, 1, 4, 1, 5, 9, 2];
const position = nums.indexOf(1);
console.log(position);
```

Position: `1`

`indexOf` takes in up to 2 arguments:

- The item to search for
- The start index to search. Negative values start counting from the end

`indexOf` returns `-1` if the item is not found.

`indexOf` returns the first occurrence if multiple of the item is found.

`lastIndexOf` returns the last occurence of the specified element.

### Includes

Includes allows us to check if an array includes a specific item.

This is very similar to running `indexOf` and comparing against `-1`. There are a few key differences:

- `includes` returns a boolean and `indexOf` returns a number (the index, else `-1`)
- `includes` can check for `NaN`, unlike `indexOf`
- `includes` is from ES2016, so some old browsers may not support it. It's got [great support at 97.5%](https://caniuse.com/array-includes) at time of writing

`includes` is straightforward to check if an element exists, but `indexOf` is more versatile.

Here's a quick comparison:

```js
const fruits = ['apple', 'banana', 'orange'];

console.log(fruits.includes('banana')); // true
console.log(fruits.includes('grape')); // false

console.log(fruits.indexOf('banana')); // 1
console.log(fruits.indexOf('grape')); // -1
```

### Find

Find returns the value of the first element that meets a condition.

Find index returns the index of the first element to meet a condition.

```js
const nums = [3, 1, 4, 1, 5, 9, 2];
const firstNumGreater5 = nums.find((num) => num > 5);
const firstNumGreater5Index = nums.findIndex((num) => num > 5);
console.log(firstNumGreater5);
console.log(firstNumGreater5Index);
```

First num greater 5: `9`
First num greater 5 index: `5`

`find` and `findIndex` take the same 3 arguments as most functions above: value, index, array.

You can also use `findLast` and `findLastIndex` to find the last element (or index) that meets a condition.

### From

From returns an array from any iterable object or object with a length.

```js
Array.from('ABCDEFG');
```

Result: `['A', 'B', 'C', 'D', 'E', 'F', 'G']`

### Keys, Values, and Entries

Keys returns an array iterator object with the keys of an array.

Values returns an array iterator object with the values of an array.

Entries returns an array iterator object with key/value pairs.

```js
const names = ['Jack', 'Jace', 'Jane', 'Josh', 'Kai', 'Kevin', 'Ken', 'Kyle'];
for (let idx of names.keys()) {
	console.log(idx);
}
for (let name of names.values()) {
	console.log(name);
}
for (let entry of names.entries()) {
	console.log(entry);
}
```

In this example, `keys` outputs the indices (`0, 1, 2...`), `values` outputs the name values (`Jack, Jace, Jane...`) and `entries` outputs the key value pairs (index and name) (`[0, 'Jack'], [1, 'Jace'], [2, 'Jane']...`).

This is more logical with an object, but I felt an array example would be nice to have as well. On an object, you could instead use `Object.keys()`, `Object.values()`, and `Object.entries()`. The following code would not work:

```js
const car = {
	type: 'BMW',
	year: 2010,
	color: 'black',
	location: { country: 'USA', state: 'CA' }
};
for (let k of car.keys()) {
	console.log(k);
}
for (let v of car.values()) {
	console.log(v);
}
for (let e of car.entries()) {
	console.log(e);
}
```

`car.keys is not a function`
`car.values is not a function`
`car.entries is not a function`

```js
const car = {
	type: 'BMW',
	year: 2010,
	color: 'black',
	location: { country: 'USA', state: 'CA' }
};
// Using Object.keys()
for (let k of Object.keys(car)) {
	console.log(k);
}

// Using Object.values()
for (let v of Object.values(car)) {
	console.log(v);
}

// Using Object.entries()
for (let e of Object.entries(car)) {
	console.log(e);
}
```

Keys: `['type', 'year', 'color', 'location']`
Values: `['BMW', 2010, 'black', {…}]`
Entries: `['type', 'BMW'], ['year', 2010], ['color', 'black'], ['location', {…}]`

You can also directly use the array returned by `Object.keys(car)` (or `values` or `entries`) without iterating over with a for loop:

```js
console.log(Object.keys(car));
```

Note that an array of objects would behave just like our array of strings above. Here's a code example:

```js
const cars = [
	{ type: 'Volvo', year: 2016 },
	{ type: 'Saab', year: 2001 },
	{ type: 'BMW', year: 2010 }
];
for (let k of cars.keys()) {
	console.log(k);
}
for (let v of cars.values()) {
	console.log(v);
}
for (let e of cars.entries()) {
	console.log(e);
}
```

I've gone a little off-topic out of arrays and into objects, but it's important not to confuse the array methods with the object methods.

### Spread Operator

Use three dots (`...`) to "spread" an array out. This can be useful if you have an array and you want to pass each individual item into a function, for example:

```js
const nums = [3, 1, 4, 1, 5, 9, 2];
Math.max(...nums);
```

In the above example, we want to pass in every single item of the array into `Math.max`. `Math.max` can't take in an array object, and instead takes in individual values. We want to do: `Math.max(3, 1, 4, 1, 5, 9, 2)`. Rather than rewrite the entire array, especially if we don't know what the items are or how many there are, this makes it way easier.

```js
const q1 = ['Jan', 'Feb', 'Mar'];
const q2 = ['Apr', 'May', 'Jun'];
const q3 = ['Jul', 'Aug', 'Sep'];
const q4 = ['Oct', 'Nov', 'May'];

const year = [...q1, ...q2, ...q3, ...q4];
```

Year: `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'May']`

In the above example, we have four arrays, and we want one array that combines all of them. Instead of writing them all out, we can just spread them together. If we didn't use the spread operator, we'd have a 2 dimensional array:

```js
const year = [q1, q2, q3, q4];
```

Year: `['Jan', 'Feb', 'Mar'], ['Apr', 'May', 'Jun'], ['Jul', 'Aug', 'Sep'], ['Oct', 'Nov', 'May']`

Spreading can also be commonly used instead of using `push` then reassigning a variable in a reactive JavaScript framework. For example:

```js
function addTodo(name) {
	todos.push(name);
}
```

Some frameworks might not "know" that `name` was updated here, since even though a method was called on it, it was reassigned.

This would mean that the `todos` used in the UI wouldn't update, and the user wouldn't see their todo.

```js
function addTodo(name) {
	todos.push(name);
	todos = todos;
}
```

This would result in the user writing redundant and confusing code like above.

```js
function addTodo(name) {
	todos.push(name);
	// update todos for reactivity
	todos = todos;
}
```

Maybe a comment would help, but instead we can simply use the spread operator to add the item and reassign in one swoop:

```js
function addTodo(name) {
	todos = [...todos, name];
}
```

Or we can add it in the front instead of `shift`:

```js
function addTodo(name) {
	todos = [name, ...todos];
}
```

You might also find yourself wanting to loop a specific number of times (not through an array or object) in an each loop.

Here's an example in svelte:

```svelte
<label>Volume</label>
<select>
  {#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as num}
  <option value={num}>{num}</option>
 {num}
{/each}
</select>
```

Instead of manually writing out all 10 items (or let's say we have 100 items), we could use the spread operator:

```svelte
{#each [...Array(11).keys()] as num}
```

If we tried to just use `Array(11).keys()`, it wouldn't work beause `keys` returns an iterator, not an array. The spread operator (`...`) iterates and spreads out the array, and the square brackets (`[]`) contain the spread out array (otherwise it's just "floating in space" and not inside an array).

Last example: lets say we have default themes and user themes, in two arrays, and we want to iterate through both. Instead of making two for loops, we could just iterate on `[...defaultThemes, ...userThemes]`. Easy.

---

**Check out [Part 3](/blog/array-methods-javascript-newer) where we cover new array methods such as `groupBy`, `with`, `at`, `fill`, `toSorted` and more!**

---

### Further Reading

- [W3 schools](https://www.w3schools.com/js/js_array_iteration.asp)
