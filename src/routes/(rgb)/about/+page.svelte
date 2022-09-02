<script>
	import AboutCard from '$lib/components/AboutCard.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import SEO from '$lib/components/SEO.svelte';

	import people from '$lib/data/people';
</script>

<SEO title="About | RGB Studios - A Web Development Company" />

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
	<p class="text-xl">
		We are a US based web development company that creates cool web apps, helpful blog posts, and
		websites for other people. We are an agency run by two passionate web developers. Reach out if
		you'd like to chat or call.
	</p>
</article>

<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each people as { name, img, website, email, about }}
		<AboutCard title={name} text={about} {email} {img} link={website} />
	{/each}
</div>
