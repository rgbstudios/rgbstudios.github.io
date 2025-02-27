/**
 * Endpoint to get all blog post data
 */

export async function GET() {
	const posts = await Promise.all(
		Object.entries(import.meta.glob('../**/*.md')).map(async ([path, page]) => {
			const { metadata } = await page();
			const slug = path.substring(3, path.length - 9); // `3` removes `../` prefix; `9` removes `+page.svelte` suffix.
			return { ...metadata, slug };
		})
	);

	return new Response(JSON.stringify(posts, null, 4), {
		status: 200
	});
}
