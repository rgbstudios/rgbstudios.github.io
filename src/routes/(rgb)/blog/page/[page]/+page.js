import { error } from '@sveltejs/kit';

const postsPerPage = 12;

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
	// If non-numeric values, 404
	if (!new RegExp(/^[0-9]+$/).test(params.page)) {
		throw error(404, 'Not found');
	}
	// If page number is 0 or contains a leading 0, 404
	if (params.page[0] === '0') {
		throw error(404, 'Not found');
	}

	const pageNum = parseInt(params.page);

	const res = await fetch('/blog/posts.json');
	const posts = await res.json();

	const pagePosts = posts.splice(postsPerPage * (pageNum - 1), postsPerPage);

	// Invalid page number, 404
	if (pagePosts.length === 0) {
		throw error(404, 'Not found');
	}

	return { posts: pagePosts, pageNum };
}
