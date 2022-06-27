// https://www.sitemaps.org/protocol.html

// http://localhost:3000/sitemap.xml

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

const BASE_URL = 'https://rgbstudios.org/';

export async function get() {
	return {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		},
		body: `<?xml version="1.0" encoding="UTF-8" ?>
	<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
		${pages
			.map(
				(page) =>
					`<url>
			<loc>${BASE_URL}${page.url}</loc>
			<changefreq>${page.changefreq ?? 'monthly'}</changefreq>
			<priority>${page.priority ?? 0.5}</priority>
		  </url>`
			)
			.join('')}
	</urlset>`.trim()
	};
}
