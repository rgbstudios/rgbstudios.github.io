import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

import path from 'path';
import { fileURLToPath } from 'url';
import { mdsvex } from 'mdsvex';

const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex({
			extensions: ['.md'],
			layout: {
				blog_layout: path.join(dirname, 'src/routes/(rgb)/blog/layout.svelte')
			}
		})
	],
	kit: {
		/**
		 * edge: we use edge functions
		 * split: split every route into its own function, which we do not want
		 * we want one function for all routes to keep the function warm -> higher chance no coldstart
		 * @link https://www.netlify.com/pricing/
		 */
		adapter: adapter({
			edge: true,
			split: false
		})
	}
};

export default config;
