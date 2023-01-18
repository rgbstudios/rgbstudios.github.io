<script>
	/**
	 * Catch all for any error
	 *
	 * Renders differently for 404 errors and non-404 errors.
	 * Test 500 errors by creating an invalid import in homepage
	 * For example:
	 * `import SEO from '$lib/components/SEO.svelteee';`
	 */

	import '$lib/app.css';

	import { page } from '$app/stores';

	import projects from '$lib/data/projects';
	import FeaturedAppCarousel from '$lib/components/FeaturedAppCarousel.svelte';

	$: featuredApps = projects.filter((p) => p.isFeatured);

	$: console.log($page);
</script>

<svelte:head>
	<title>{$page.status === 404 ? 'Page Not Found' : 'Error'} | RGB Studios</title>
</svelte:head>

<div class="container my-8">
	{#if $page.status === 404}
		<div class="prose-custom mx-auto">
			<h1 class="text-center">Error 404</h1>
			<h2 class="text-center">The resource could not be found</h2>
			<img class="w-full max-w-md mx-auto" src="/img/pages/blank_canvas.svg" alt="" />

			<p>
				<span class="not-prose">
					<a href="/" class="btn btn-primary no-underline">Go back home</a>
				</span>
				or check out our popular <a href="/projects">projects</a>:
			</p>
		</div>
		<FeaturedAppCarousel slides={featuredApps} />
	{:else}
		<div class="prose-custom mx-auto">
			<h1>Error {$page.status} &mdash; {$page.error.message}</h1>
			<span class="not-prose"
				><a href="/" class="btn btn-primary no-underline">Go back home</a></span
			>
			<p>
				If this problem persists, please contact us at <a href="mailto:contact@rgbstudios.org">
					contact@rgbstudios.org
				</a>.
			</p>
		</div>
	{/if}
</div>
