<script>
	import RGBHero from '../components/RGBHero.svelte';
	import Card from '../components/Card.svelte';

	import projects from '../data/projects';

	import { page } from '$app/stores';
	$: sort = $page.url.searchParams.get('sort');

	$: pageTitle =
		(sort === 'popular'
			? 'Popular'
			: sort === 'new'
			? 'New'
			: sort === 'updated'
			? 'Recently Updated'
			: 'All') + ' Projects';
</script>

<svelte:head>
	<title>{pageTitle} | RGB Studios</title>
</svelte:head>

<RGBHero />
<div class="container mx-auto py-8">
	<article class="prose lg:prose-xl mx-auto">
		<h1 class="text-center">
			{pageTitle}
		</h1>
	</article>
	<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each projects as { title, text, img, link, isNew, isPopular, isUpdated, tags }}
			{#if sort === null || (sort === 'new' && isNew) || (sort === 'popular' && isPopular) || (sort === 'updated' && isUpdated)}
				<Card {title} {text} {img} {link} {isNew} {isPopular} {isUpdated} {tags} />
			{/if}
		{/each}
	</div>
</div>
