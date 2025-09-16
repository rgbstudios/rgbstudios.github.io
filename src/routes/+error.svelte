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

	import projects from '$lib/data/projects';
	import FeaturedAppCarousel from '$lib/components/FeaturedAppCarousel.svelte';

	$: featuredApps = projects.filter((p) => p.isFeatured);
</script>

<svelte:head>
	<title>{$page.status === 404 ? 'Page Not Found' : 'Error'} | RGB Studios</title>
</svelte:head>

<article class="prose-custom mx-auto my-8">
	<h1 class="text-center">Error {$page.status} &mdash; {$page.error.message}</h1>

	{#if $page.status === 404}
		<h2 class="text-center">The resource could not be found</h2>
		<img class="w-full max-w-md mx-auto" src="/img/pages/blank_canvas.svg" alt="" />

		<p>
			<span class="not-prose"
				><a href="/" class="btn btn-primary no-underline">Go back home</a></span
			>
			<i>or</i> check out our popular <a href="/projects">projects</a>:
		</p>

		<FeaturedAppCarousel slides={featuredApps} />
	{:else}
		<span class="not-prose"><a href="/" class="btn btn-primary no-underline">Go back home</a></span>

		<p>
			If this problem persists, please contact us at <a href="mailto:contact@rgbstudios.org">
				contact@rgbstudios.org
			</a>.
		</p>
	{/if}
</article>
