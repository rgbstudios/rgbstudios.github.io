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
	// import BlogCard from '../components/BlogCard.svelte';
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
	{#each posts.posts as post}
		{#each post.categories as category}
			<div class="badge badge-outline">{category}</div>
		{/each}
		<a href="/blog/{post.slug}">{post.title}</a>
	{/each}
</article>
<!-- <div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each blogs as { title, text, img, link, tags }}
		<BlogCard {title} {text} {img} {link} {tags} />
	{/each}
</div> -->
