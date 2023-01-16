/**
 * Endpoint to send blog post data to the front end
 */

export async function load({ fetch }) {
	const res = await fetch('/blog/posts.json');
	const posts = await res.json();

	return { posts };
}
