<script>
	/**
	 * Used for non-404 errors
	 *
	 * Test this page by creating an invalid import in homepage
	 * For example:
	 * `import SEO from '$lib/components/SEO.svelteee';`
	 */

	import '$lib/app.css';

	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Error | RGB Studios</title>
</svelte:head>

<article class="prose-custom mx-auto my-8">
	<h1>Error {$page.status} &mdash; {$page.error.message}</h1>

	<span class="not-prose"><a href="/" class="btn btn-primary no-underline">Go back home</a></span>

	<p>
		If this problem persists, please contact us at <a href="mailto:contact@rgbstudios.org">
			contact@rgbstudios.org
		</a>.
	</p>
</article>
