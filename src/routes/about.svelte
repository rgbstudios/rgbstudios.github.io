<script>
	import RGBHero from '../components/RGBHero.svelte';
	import AboutCard from '../components/AboutCard.svelte';

	import people from '../data/people';
</script>

<svelte:head>
	<title>About | RGB Studios</title>
</svelte:head>

<RGBHero />
<div class="container mx-auto py-8">
	<article class="prose lg:prose-xl mx-auto">
		<h1 class="text-center">About</h1>
	</article>
	<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each people as { name, img, website, email, about }}
			<AboutCard title={name} text={about} {email} {img} link={website} />
		{/each}
	</div>
</div>
