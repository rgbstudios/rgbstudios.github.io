---
layout: blog_layout
title: 'Simple JavaScript to Convert an Array of Objects to HTML Table'
slug: 'js-array-objects-table'
date: '2024/04/17'
updated_date: '2024/04/17'
author: 'Justin Golden'
preview_text: 'Learn how to take an array of objects and display it as a table on your website'
img: '/img/blog/undraw_apps.svg'
categories: ['webdev', 'js', 'css']
keywords:
  [
    'js objects to table',
    'js array of data to table',
    'javascript array of objects table',
    'json to table',
    'javascript render array of objects to html table',
    'simple javascript loop display data on page'
  ]
---

<img src="/img/blog/undraw_apps.svg" alt="" class="bg-white p-4">

Here's how to render an array of JSON objects into a HTML table.

### The HTML

Start with an empty table. We will populate it dynamically with JS

```html
<table id="data-table">
	<thead>
		<tr></tr>
	</thead>
	<tbody></tbody>
</table>
```

### The Data

Define your data as an array of objects. Here's some sample data:

```js
const jsonArray = [
	{ Name: 'John', Age: 25, City: 'New York' },
	{ Name: 'Alice', Age: 30, City: 'Los Angeles' },
	{ Name: 'Bob', Age: 35, City: 'Chicago' }
];
```

### Render Your Data to Your Table

Here's the final step, and the important one:

```js
// Get table header and body elements
const tableHeader = document.querySelector('#data-table thead tr');
const tableBody = document.querySelector('#data-table tbody');

// Function to render array of JSON objects in table
function renderTable(jsonArray) {
	// Clear existing header and rows
	tableHeader.innerHTML = '';
	tableBody.innerHTML = '';

	// Create table headers
	const headers = Object.keys(jsonArray[0]);

	headers.forEach((header) => {
		const th = document.createElement('th');
		th.textContent = header;
		tableHeader.appendChild(th);
	});

	// Create table rows and cells
	jsonArray.forEach((obj) => {
		const row = document.createElement('tr');
		headers.forEach((header) => {
			const cell = document.createElement('td');
			cell.textContent = obj[header];
			row.appendChild(cell);
		});
		tableBody.appendChild(row);
	});
}

// Call the function to render the table
renderTable(jsonArray);
```

### Note: Missing Keys

Note: this code obtains headers only from the first item in the array: `const headers = Object.keys(jsonArray[0]);`

So data like this will work:

```js
const jsonArray = [
	{ Name: 'John', Age: 25, City: 'New York' },
	{ Name: 'Alice', Age: 30 },
	{ Name: 'Bob', City: 'Chicago' }
];
```

But if you have a key that isn't in the first row, then it won't render:

```js
const jsonArray = [
	{ Name: 'John', Age: 25, City: 'New York' },
	{ Name: 'Alice', Age: 30 },
	{ Name: 'Bob', State: 'Illinois' }
];
```

To support unique and missing keys in your data, replace that line with this one:

```js
const headers = [...new Set(jsonArray.flatMap((obj) => Object.keys(obj)))];
```
