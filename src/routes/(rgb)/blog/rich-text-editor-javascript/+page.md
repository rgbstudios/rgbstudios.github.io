---
layout: blog_layout
title: 'How to Create a Rich Text Editor in JavaScript'
slug: 'rich-text-editor-javascript'
date: '2024/04/26'
updated_date: '2024/04/26'
author: 'Justin Golden'
preview_text: 'Learn how to create a rich text editor that can bold, italic, underline, change alignment, color, and font'
img: '/img/blog/bold.avif'
categories: ['webdev', 'js']
keywords:
  [
    'javascript rich text editor',
    'how to create a text editor js',
    'javascript contenteditable',
    'js content editable',
    'javascript rich text editor contenteditable',
    'javascript text editor bold italic underline',
    'javascript wysiwyg edtior',
    'how to make javascript rich text editor'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/bold.avif" alt="" />
    <img src="/img/blog/bold.jpg" alt="">
  </picture>
  <figcaption>Photo credit @brett_jordan on Unsplash</figcaption>
</figure>

### Intro

Rich Text editing can be quite helpful for many users and use cases, but they also may be intimidating to create. There are many packages to help with this, but let's say you want to create one yourself, either to learn, to be in control of your code, to keep the file size down, or just for fun.

### The Secret: `contenteditable`

You may or may not know about `contenteditable`, but that's our not so secret sauce here.

Simply adding `contenteditable` to a div:

`<div contenteditable="true"></div>`

<div contenteditable="true" style="border: 1px solid #fff; padding: 0.25rem;"></div>

Will already get you pretty far (try using ctrl+b to bold selected text above for example).

### Secret 2: `execCommand` and Obligatory Warning

We will also be using `execCommand` to perform formatting on our `contenteditable`, which as you may know, is [depreciated with no alternative](https://stackoverflow.com/a/70831583/4907950), however, it's got [98.3% browser support on caniuse](https://caniuse.com/document-execcommand) and doesn't seemt o be going away any time soon.

With that out of the way, let's begin:

### Shortcut Buttons: The Basics

Feel free to follow along in your own project, or make a new code pen at [pen.new](https://pen.new/)

I'll start us off with some buttons, a wrapper for them, and some basic CSS:

```html
<div id="editor" contenteditable="true"></div>

<div id="button-wrapper">
	<button id="bold"><strong>B</strong></button>
	<button id="italic"><em>I</em></button>
	<button id="underline"><u>U</u></button>
</div>
```

```css
body {
	margin: 16px;
	padding: 0;
}

#editor {
	border: 1px solid #e6e6e6;
	margin: 16px 0;
	padding: 16px;
	font-size: 16px;

	border-radius: 4px;
}

#button-wrapper {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

button {
	padding: 8px 16px;
	font-size: 16px;
	border: 1px solid #e6e6e6;
	border-radius: 4px;
	background-color: #f0f0f0;
	color: #333;
	cursor: pointer;
}

button:hover {
	background-color: #e6e6e6;
}
```

Now, let's make this work. Here's the JS:

```js
document.addEventListener('DOMContentLoaded', () => {
	function format(command, value) {
		document.execCommand(command, false, value);
	}

	document.getElementById('bold').addEventListener('click', () => document.execCommand('bold'));

	document.getElementById('italic').addEventListener('click', () => document.execCommand('italic'));

	document
		.getElementById('underline')
		.addEventListener('click', () => document.execCommand('underline'));
});
```

This is quite repetitive, and we'll be reusing that same `execCommand` over and over, so let's clean this up before it gets out of hand:

```js
document.addEventListener('DOMContentLoaded', () => {
	function format(command) {
		document.execCommand(command);
	}

	document.getElementById('bold').addEventListener('click', () => format('bold'));

	document.getElementById('italic').addEventListener('click', () => format('italic'));

	document.getElementById('underline').addEventListener('click', () => format('underline'));
});
```

You'll see why we create this wrapper function later.

### Final Result

Now, let's add some more buttons. I'll be adding alignment, color, and font settings.

We can make use of the other parameters in `execCommand` in our wrapper function now. We will use `prompt` to ask the user to type in color and font settings, which of course can and should be changed when moving being this proof of concept.

```html
<div id="editor" contenteditable="true"></div>

<div id="button-wrapper">
	<button id="bold"><strong>B</strong></button>
	<button id="italic"><em>I</em></button>
	<button id="underline"><u>U</u></button>
	<button id="alignLeft">Align Left</button>
	<button id="alignCenter">Align Center</button>
	<button id="alignRight">Align Right</button>
	<button id="textColor">Text Color</button>
	<button id="bgColor">Background Color</button>
	<button id="fontSize">Font Size</button>
	<button id="fontFamily">Font Family</button>
	<button id="log">Console Log</button>
</div>
```

```css
body {
	margin: 16px;
	padding: 0;
}

#editor {
	border: 1px solid #e6e6e6;
	margin: 16px 0;
	padding: 16px;
	font-size: 16px;

	border-radius: 4px;
}

#button-wrapper {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

button {
	padding: 8px 16px;
	font-size: 16px;
	border: 1px solid #e6e6e6;
	border-radius: 4px;
	background-color: #f0f0f0;
	color: #333;
	cursor: pointer;
}

button:hover {
	background-color: #e6e6e6;
}
```

```js
document.addEventListener('DOMContentLoaded', () => {
	const editor = document.getElementById('editor');

	function format(command, value) {
		document.execCommand(command, false, value);
	}

	document.getElementById('bold').addEventListener('click', () => format('bold'));

	document.getElementById('italic').addEventListener('click', () => format('italic'));

	document.getElementById('underline').addEventListener('click', () => format('underline'));

	document.getElementById('alignLeft').addEventListener('click', () => format('justifyLeft'));

	document.getElementById('alignCenter').addEventListener('click', () => format('justifyCenter'));

	document.getElementById('alignRight').addEventListener('click', () => format('justifyRight'));

	document.getElementById('log').addEventListener('click', () => console.log(editor.innerHTML));

	document.getElementById('textColor').addEventListener('click', () => {
		const color = prompt('Enter text color (e.g., red, #f00):');
		if (color !== null) {
			format('foreColor', color);
		}
	});

	document.getElementById('bgColor').addEventListener('click', () => {
		const color = prompt('Enter background color (e.g., red, #f00):');
		if (color !== null) {
			format('backColor', color);
		}
	});

	document.getElementById('fontSize').addEventListener('click', () => {
		const size = prompt('Enter font size (e.g., 16px):');
		if (size !== null) {
			format('fontSize', size);
		}
	});

	document.getElementById('fontFamily').addEventListener('click', () => {
		const fontFamily = prompt('Enter font family (e.g., Arial, Times New Roman):');
		if (fontFamily !== null) {
			document.execCommand('fontName', false, fontFamily);
		}
	});
});
```
