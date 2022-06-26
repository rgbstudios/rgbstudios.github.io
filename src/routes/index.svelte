<script>
	import { onMount } from 'svelte';
	import RGBHero from '../components/RGBHero.svelte';
	import AppCard from '../components/AppCard.svelte';

	import projects from '../data/projects';

	onMount(() => {
		// random primary color. r,g, or b
		document
			.querySelector(':root')
			.style.setProperty(
				'--p',
				['150 80% 40%', '225 100% 60%', '15 100% 40%'][Math.floor(Math.random() * 3)]
			);
	});
</script>

<RGBHero />
<div class="container mx-auto p-8">
	<article class="prose lg:prose-xl">
		<h1 class="text-center">RGB Studios</h1>
		<p>Hello there</p>
	</article>
	{#each projects as { title, text, img, link, isNew, tags }}
		<AppCard {title} {text} {img} {link} {isNew} {tags} />
	{/each}
</div>
