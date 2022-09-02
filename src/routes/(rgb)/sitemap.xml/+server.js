// https://www.sitemaps.org/protocol.html

const pages = [
	{
		url: '',
		priority: 0.9,
		changefreq: 'weekly'
	},
	{
		url: 'blog',
		priority: 0.7
	},
	{
		url: 'about',
		priority: 0.4
	},
	{
		url: 'contact',
		priority: 0.3
	},
	{
		url: 'privacy',
		priority: 0.1
	},
	{
		url: 'projects',
		priority: 0.8
	},
	{
		url: 'sitemap',
		priority: 0.2
	}
];

export async function GET({ url }) {
	// TODO: handle errors for when this fetch call fails.
	const res = await fetch(url.origin + '/blog/posts.json');
	const posts = (await res.json()) || [];
	const postPages = posts
		.filter(({ hidden }) => !hidden)
		.map(({ slug }) => ({ url: `blog/${slug}`, priority: 0.6 }));
	pages.push(...postPages);

	const xml =
		`<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">${pages
			.map(
				(page) =>
					`<url><loc>https://rgbstudios.org/${page.url}</loc><changefreq>${
						page.changefreq ?? 'monthly'
					}</changefreq><priority>${page.priority ?? 0.5}</priority></url>`
			)
			.join('')}</urlset>`.trim();

	return new Response(xml, {
		headers: {
			'Cache-Control': 'public, max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	});
}
