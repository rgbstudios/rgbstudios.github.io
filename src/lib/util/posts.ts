import { allBlogs } from '../../routes/(rgb)/blog/allBlogs';

export async function getPosts() {
	return await Promise.all(
		Object.entries(allBlogs).map(async ([path, page]) => {
			const { metadata } = await page();
			const slug = path.substring(3, path.length - 9); // `3` removes `../` prefix; `9` removes `+page.svelte` suffix.
			return { ...metadata, slug };
		})
	);
}
