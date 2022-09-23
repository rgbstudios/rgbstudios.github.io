module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	parser: '@typescript-eslint/parser', // add the TypeScript parser
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022
	},
	plugins: [
		'svelte3',
		'@typescript-eslint' // add the TypeScript plugin
	],
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3'
		}
	],
	settings: {
		'svelte3/typescript': () => require('typescript'), // pass the TypeScript package to the Svelte plugin
		'svelte3/typescript': true // load TypeScript as peer dependency
	},
	env: {
		es2021: true,
		browser: true,
		node: true
	},
	globals: {
		google: true,
		MathJax: true
	}
};
