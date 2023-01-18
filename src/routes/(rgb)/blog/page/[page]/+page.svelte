<script lang="ts">
	import BlogGrid from '$lib/components/BlogGrid.svelte';

	export let data;

	$: posts = data.posts;
	$: pageNum = data.pageNum;
</script>

<svetle:head>
	<title>Blog Page {pageNum} | RGB Studios</title>
</svetle:head>

<article class="prose-custom mx-auto my-8">
	<h1 class="text-center">Blog Page {pageNum}</h1>

	<BlogGrid {posts} />
</article>
