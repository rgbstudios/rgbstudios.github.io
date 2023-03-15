<script>
	import BlogCard from '$lib/components/BlogCard.svelte';
	export let posts;
</script>

<div class="grid gap-8 my-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each posts as { title, preview_text, slug, categories, img } (slug)}
		<BlogCard {title} text={preview_text} link="/blog/{slug}" {img} tags={categories} />
	{/each}
</div>
