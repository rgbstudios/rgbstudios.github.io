throw new Error("@migration task: Update +server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");

export const get = async () => {
	let posts = await Promise.all(
		Object.entries(import.meta.glob('./*.md')).map(async ([path, page]) => {
			const { metadata } = await page();
			const slug = path.split('/').pop().split('.').shift();
			return { ...metadata, slug };
		})
	);

	return {
		status: 200,
		body: { posts }
	};
};
