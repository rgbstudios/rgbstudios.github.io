/**
 * Lightweight static adapter based on @sveltejs/adapter-static.
 * Generates a fully static site to avoid Netlify function costs.
 *
 * @param {object} [options]
 * @param {string} [options.pages='build'] Directory for HTML files.
 * @param {string} [options.assets=options.pages] Directory for assets.
 * @param {string|null} [options.fallback] SPA fallback page.
 * @param {boolean} [options.precompress=false] Whether to gzip/brotli assets.
 * @param {boolean} [options.strict=true] Throw on missing IDs when prerendering.
 * @returns {import('@sveltejs/kit').Adapter}
 */
export default function adapter({
	pages = 'build',
	assets = pages,
	fallback,
	precompress = false,
	strict = true
} = {}) {
	return {
		name: 'adapter-static-custom',
		async adapt(builder) {
			builder.rimraf(assets);
			builder.rimraf(pages);

			builder.log.minor('Copying assets');
			builder.writeClient(assets);

			builder.log.minor('Prerendering pages');
			await builder.writePrerendered(pages, { fallback, strict });

			if (precompress) {
				builder.log.minor('Compressing assets');
				await builder.compress(assets);
				if (assets !== pages) await builder.compress(pages);
			}
		}
	};
}
