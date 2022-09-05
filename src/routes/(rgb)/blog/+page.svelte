<script>
	import BlogCard from '$lib/components/BlogCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import SEO from '$lib/components/SEO.svelte';

	import { page } from '$app/stores';

	export let data = {};
	$: posts = data.posts;

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	$: category = $page.url.searchParams.get('category');

	$: filteredPosts = posts
		?.filter((post) => !post.hidden)
		.filter((post) => category === null || post.categories.includes(category))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	$: pageTitle = category === null ? 'Blog' : `${capitalize(category)} Blog Posts`;
</script>

<svelte:head>
	<title>{pageTitle} | RGB Studios</title>
</svelte:head>

<SEO
	title={`${pageTitle} | RGB Studios`}
	description="Read blog posts about web design and more from RGB Studios"
	keywords={[
		'web dev blog',
		'web development blog',
		'web design blog',
		'website design blog',
		'rgb studios blog',
		'design tips and tricks'
	]}
/>

<Breadcrumbs
	breadcrumbs={[
		{
			text: 'Home',
			link: '/'
		},
		{
			text: 'Blog'
		}
	]}
/>

<article class="prose lg:prose-xl mx-auto">
	<h1 class="text-center">{pageTitle}</h1>
</article>
{#if filteredPosts.length !== 0}
	<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each filteredPosts as { title, preview_text, slug, categories, img } (slug)}
			<BlogCard {title} text={preview_text} link="/blog/{slug}" {img} tags={categories} />
		{/each}
	</div>
{:else}
	<article class="prose lg:prose-xl mx-auto mt-8">
		<p>
			No posts found for that category. Try a different category or <a href="/blog">
				View all blog posts
			</a>
		</p>
	</article>
{/if}
