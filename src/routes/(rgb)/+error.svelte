<script>
	import { page } from '$app/stores';
	import projects from '$lib/data/projects';
	import FeaturedAppCarousel from '$lib/components/FeaturedAppCarousel.svelte';

	$: featuredApps = projects.filter((p) => p.isFeatured);

	$: status = $page.status;
	$: error = $page.error;
</script>

<svelte:head>
	<title>Error {status === 404 ? ' 404' : ''}</title>
</svelte:head>

<article class="prose-custom mx-auto">
	{#if status === 404}
		<h1 class="text-center">The resource could not be found</h1>
	{/if}

	<p>{error.name} {status} &mdash; {error.message}</p>

	<span class="not-prose"><a href="/" class="btn btn-primary no-underline">Go back home</a></span>

	{#if status === 404}
		<p>Check out our popular projects:</p>

		<FeaturedAppCarousel slides={featuredApps} />
	{:else}
		<p>
			If this problem persists, please contact us at <a href="mailto:contact@rgbstudios.org">
				contact@rgbstudios.org
			</a>.
		</p>
	{/if}
</article>
