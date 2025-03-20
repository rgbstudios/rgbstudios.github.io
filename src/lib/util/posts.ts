import { allBlogs } from '../../routes/(rgb)/blog/allBlogs';

export async function getPosts() {
	return await Promise.all(
		Object.entries(allBlogs).map(async ([path, page]) => {
			const { metadata } = await page();
			const slug = path.substring(2, path.length - 9); // `2` removes `./` prefix; `9` removes `+page.svelte` suffix.
			return { ...metadata, slug };
		})
	);
}
