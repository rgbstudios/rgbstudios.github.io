<script>
	import projects from '$lib/data/projects';
	import FeaturedAppCarousel from '$lib/components/FeaturedAppCarousel.svelte';

	$: featuredApps = projects.filter((p) => p.isFeatured);
</script>

<svelte:head>
	<title>Page Not Found | RGB Studios</title>
</svelte:head>

<article class="prose-custom mx-auto">
	<h1 class="text-center">Error 404</h1>
	<h2 class="text-center">The resource could not be found</h2>
	<img class="w-full max-w-md mx-auto" src="/img/pages/blank_canvas.svg" alt="" />

	<p>
		<span class="not-prose"><a href="/" class="btn btn-primary no-underline">Go back home</a></span>
		<i>or</i> check out our popular <a href="/projects">projects</a>:
	</p>

	<FeaturedAppCarousel slides={featuredApps} />
</article>
