<script lang="ts">
	import BlogGrid from '$lib/components/BlogGrid.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	export let data;

	$: posts = data.posts;
	$: pageNum = data.pageNum;
</script>

<svetle:head>
	<title>Blog Page {pageNum} | RGB Studios</title>
</svetle:head>

<Breadcrumbs
	breadcrumbs={[
		{
			text: 'Home',
			link: '/'
		},
		{
			text: 'Blog',
			link: '/blog'
		},
		{
			text: 'Page ' + pageNum
		}
	]}
/>

<article class="my-8">
	<div class="prose-custom mx-auto">
		<h1 class="text-center">Blog Page {pageNum}</h1>
	</div>

	<BlogGrid {posts} />
</article>
