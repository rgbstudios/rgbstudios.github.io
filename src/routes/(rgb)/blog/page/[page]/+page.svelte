<script lang="ts">
	import BlogGrid from '$lib/components/BlogGrid.svelte';

	export let data;

	$: posts = data.posts;
	$: pageNum = data.pageNum;
</script>

<svetle:head>
	<title>Blog Page {pageNum} | RGB Studios</title>
</svetle:head>

<article class="my-8">
	<div class="prose-custom mx-auto">
		<h1 class="text-center">Blog Page {pageNum}</h1>
	</div>

	<BlogGrid {posts} />
</article>
