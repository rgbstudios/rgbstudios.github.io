const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'brand-red': '#cc3300',
				'brand-green': '#339966',
				'brand-blue': '#3366ff'
			},
			fontFamily: {
				sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
				display: ['Poppins'],
				body: ['Open Sans']
			}
		}
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')],
	daisyui: {
		themes: [
			{
				rgbtheme: {
					'success': '#339966',
					'info': '#3366ff',
					'error': '#cc3300',
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
