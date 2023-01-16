// Handle redirects

import redirects from '$lib/data/redirects';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const redirect = redirects.find((item) => event.url.pathname === item.source);

	let response = null;
	if (redirect) {
		response = new Response('', {
			status: 301,
			headers: {
				location: redirect.destination + event.url.search
			}
		});
	}

	response ??= await resolve(event);

	response.headers.set('link', event.url.origin + event.url.pathname + '; rel="canonical"');

	return response;
}
