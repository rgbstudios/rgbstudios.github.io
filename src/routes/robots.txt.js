// http://localhost:3000/robots.txt

const BASE_URL = 'https://rgbstudios.org/';

export async function get() {
	return {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'text/plain'
		},
		body: `User-agent: *
Disallow:
Sitemap: ${BASE_URL}/sitemap.xml`.trim()
	};
}
