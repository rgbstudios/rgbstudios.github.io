/**
 * Endpoint to send blog post data to the front end
 */

import { getPosts } from '$lib/util/posts';
export async function load() {
	return { posts: await getPosts() };
}
