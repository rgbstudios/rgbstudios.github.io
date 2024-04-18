<script>
	/**
	 * Blog posts home page (`/blog`)
	 *
	 * Displays non-hidden blog posts of the category in the URL parameter
	 */

	import { page } from '$app/stores';

	import BlogGrid from '$lib/components/BlogGrid.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import SEO from '$lib/components/SEO.svelte';

	export let data = {};
	$: posts = data.posts;

	const postsPerPage = 12;

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	$: category = $page.url.searchParams.get('category');
	$: searchTerm = '';

	// Show only non-hidden posts of the given category, then sort them by date
	$: filteredPosts = posts
		?.filter((post) => !post.hidden)
		.filter((post) => category === null || post.categories.includes(category))
		.filter(
			(post) =>
				searchTerm === '' ||
				post.title
					.replace(/ /g, '')
					.toLowerCase()
					.includes(searchTerm.replace(/ /g, '').toLowerCase())
		)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	$: pageTitle = category === null ? 'Blog' : `${capitalize(category)} Blog Posts`;
</script>

<svelte:head>
	<title>{pageTitle} | RGB Studios</title>
</svelte:head>

<SEO
	title={`${pageTitle} | RGB Studios`}
	url={$page.url.origin + '/blog'}
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

<article class="prose-custom mx-auto">
	<h1 class="text-center">{pageTitle}</h1>
	{#if searchTerm !== '' && filteredPosts.length !== 0}
		<h2 class="text-center">
			{filteredPosts.length} results for <span class="underline">{searchTerm}</span>:
		</h2>
	{/if}
</article>

<img class="h-64 mx-auto" src="/img/pages/blog_post.svg" alt="" />

<form
	class="input-group"
	action=""
	on:submit|preventDefault={(evt) => (searchTerm = evt.target[0].value)}
>
	<input type="text" class="input input-bordered w-full" value={searchTerm} />
	<button class="btn btn-square btn-primary">
		<Icon name="search" />
	</button>
</form>

{#if filteredPosts.length !== 0}
	<BlogGrid posts={filteredPosts.splice(0, postsPerPage)} />
	{#if searchTerm === ''}
		<Pagination totalPosts={posts.length} currentPage="1" />
	{/if}
{:else}
	<article class="prose-custom mx-auto mt-8">
		<p>
			No posts found for that {category !== null && searchTerm === ''
				? 'category'
				: category === null && searchTerm !== ''
					? 'search'
					: 'category and search'}. Try a different category or search or
			<a href="/blog" on:click={() => (searchTerm = '')}> View all blog posts </a>
		</p>
		<img class="w-full max-w-sm mx-auto" src="/img/pages/blank_canvas.svg" alt="" />
	</article>
{/if}
