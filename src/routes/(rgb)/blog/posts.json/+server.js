export async function GET() {
	const posts = await Promise.all(
		Object.entries(import.meta.glob('./*.md')).map( async ([path, page]) => {
			const { metadata } = await page();
			const slug = path.split('/').pop().split('.').shift();
			return { ...metadata, slug };
		})
	);

	return new Response( JSON.stringify(posts, null, 4), {
		status: 200
	})
};
