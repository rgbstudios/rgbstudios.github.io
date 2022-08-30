const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'brand-red': '#c30',
				'brand-green': '#396',
				'brand-blue': '#36f',

				'base': {
					100: '#eee',
					200: '#ddd',
					300: '#ccc',
					500: '#aaa',
					700: '#333',
					800: '#222',
					900: '#111'
				},

				'accent': {
					800: '#123',
					900: '#012'
				}
			},
			fontFamily: {
				sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
				display: ['Poppins'],
				body: ['Open Sans']
			},
			screens: {
				xs: '360px'
			}
		}
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')],
	daisyui: {
		themes: [
			{
				rgbtheme: {
					// https://daisyui.com/docs/colors/
					'primary': '#396',
					'success': '#396',
					'info': '#36f',
					'error': '#c30',
					'primary-content': '#eee',
					'base-content': '#eee',
					'secondary-content': '#eee',
					'accent-content': '#eee',
					'neutral': '#ccc',

					'base-100': '#111',
					'base-200': '#222',
					'base-300': '#333',

					'--rounded-box': '0',
					'--rounded-btn': '0',
					'--rounded-badge': '0',
					'--animation-btn': '0.25s',
					'--animation-input': '0.25s',
					'--btn-text-case': 'uppercase',
					'--btn-focus-scale': '0.95',
					'--border-btn': '1px',
					'--tab-border': '1px',
					'--tab-radius': '0'
				}
			}
		]
	}
};
