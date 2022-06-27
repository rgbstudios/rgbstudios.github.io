<script>
	export let title;

	import Breadcrumbs from '../../components/Breadcrumbs.svelte';
</script>

<svelte:head><title>{title} | RGB Studios</title></svelte:head>

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
			text: title
		}
	]}
/>
<article class="prose lg:prose-xl mx-auto mt-8">
	<h1>{title}</h1>
	<slot />
</article>
