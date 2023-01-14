/**
 * Serves `robots.txt` for crawlers
 */

export async function GET() {
	const txt = `User-agent: *
Disallow:
Sitemap: https://rgbstudios.org/sitemap.xml`.trim();
	return new Response(txt, {
		headers: {
			'Cache-Control': 'public, max-age=0, s-maxage=3600',
			'Content-Type': 'text/plain'
		}
	});
}
