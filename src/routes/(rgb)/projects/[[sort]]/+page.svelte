<script>
	import { page } from '$app/stores';

	import AppCard from '$lib/components/AppCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import SEO from '$lib/components/SEO.svelte';

	import projects from '$lib/data/projects';

	$: sort = $page.params.sort;

	$: pageTitle =
		(sort === 'popular'
			? 'Popular'
			: sort === 'new'
				? 'New'
				: sort === 'updated'
					? 'Recently Updated'
					: 'All') + ' Projects';

	$: filteredProjects = projects.filter((project) => {
		if (sort === 'new' && !project.isNew) return false;
		if (sort === 'popular' && !project.isPopular) return false;
		if (sort === 'updated' && !project.isUpdated) return false;
		return true;
	});
</script>

<SEO
	title={`${pageTitle} | RGB Studios`}
	url={$page.url.origin + '/projects'}
	description="View the top web apps from RGB Studios: clocks, calculators, converters and more"
/>

<Breadcrumbs
	breadcrumbs={[
		{
			text: 'Home',
			link: '/'
		},
		{
			text: 'Projects'
		}
	]}
/>

<article class="prose-custom mx-auto">
	<h1 class="text-center">
		{pageTitle}
	</h1>
</article>
<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each filteredProjects as { title, text, img, link, isNew, isPopular, isUpdated, tags } (link)}
		<AppCard {title} {text} {img} {link} {isNew} {isPopular} {isUpdated} {tags} />
	{/each}
</div>

{#if sort !== null && sort !== undefined}
	<a class="btn btn-primary flex mt-8" href="/projects">View all projects</a>
{/if}
