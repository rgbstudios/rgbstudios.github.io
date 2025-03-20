/**
 * Endpoint to get all blog post data
 */

import { getPosts } from '$lib/util/posts';

export async function GET() {
	const posts = await getPosts();

	return new Response(JSON.stringify(posts), {
		status: 200
	});
}
