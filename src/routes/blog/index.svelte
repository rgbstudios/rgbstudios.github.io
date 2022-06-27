<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/blog/posts.json');
		// const { posts } = await res.json();

		let posts = null;
		try {
			posts = await res.json();
		} catch (e) {
			posts = await res.text();
		}

		return {
			props: { posts }
		};
	}
</script>

<script>
	import BlogCard from '../../components/BlogCard.svelte';
	import Breadcrumbs from '../../components/Breadcrumbs.svelte';

	export let posts;
</script>

<svelte:head>
	<title>Blog | RGB Studios</title>
</svelte:head>

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
	<h1 class="text-center">Blog</h1>
</article>
<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each posts.posts as { title, preview_text, slug, categories }}
		<BlogCard {title} text={preview_text} link="/blog/{slug}" tags={categories} />
	{/each}
</div>
