<script>
	import { onMount } from 'svelte';

	export let title, date, author, categories, img, preview_text, keywords, updated_date;

	import Breadcrumbs from '../../components/Breadcrumbs.svelte';
	import SEO from '../../components/SEO.svelte';
	import ShareButtons from '../../components/ShareButtons.svelte';

	$: link = '';
	onMount(() => {
		link = window.location.href;
	});
</script>

<svelte:head><title>{title} | RGB Studios</title></svelte:head>

<SEO
	title={`${title} | RGB Studios`}
	description={preview_text}
	{keywords}
	screenshot={img}
	articleData={{
		published_time: date,
		modified_time: updated_date,
		author: author,
		tags: keywords
	}}
/>

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
	<h5>{author} &mdash; {date}</h5>
	<h1>{title}</h1>
	{#each categories as category}
		<div class="badge badge-outline mr-2">{category}</div>
	{/each}
	<slot />
</article>

<ShareButtons {title} {link} />
