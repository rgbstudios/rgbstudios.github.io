<script>
	import AboutCard from '$lib/components/AboutCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import SEO from '$lib/components/SEO.svelte';

	import people from '$lib/data/people';
</script>

<SEO title="About | RGB Studios" />

<Breadcrumbs
	breadcrumbs={[
		{
			text: 'Home',
			link: '/'
		},
		{
			text: 'About'
		}
	]}
/>

<article class="prose lg:prose-xl mx-auto">
	<h1 class="text-center">About</h1>
</article>
<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each people as { name, img, website, email, about }}
		<AboutCard title={name} text={about} {email} {img} link={website} />
	{/each}
</div>
