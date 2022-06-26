<script>
	import RGBHero from '../components/RGBHero.svelte';
	import AppCard from '../components/AppCard.svelte';

	import projects from '../data/projects';
</script>

<RGBHero />
<div class="container mx-auto p-8">
	<article class="prose lg:prose-xl">
		<h1 class="text-center">RGB Studios</h1>
		<p>Hello there</p>
	</article>
	<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each projects as { title, text, img, link, isNew, tags }}
			<AppCard {title} {text} {img} {link} {isNew} {tags} />
		{/each}
	</div>
</div>
