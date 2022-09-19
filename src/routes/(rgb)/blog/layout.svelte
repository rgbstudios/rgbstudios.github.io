<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let title,
		slug,
		date,
		author,
		categories,
		img,
		preview_text,
		keywords,
		updated_date,
		hidden;

	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';

	$: link = '';
	onMount(() => {
		if (hidden) {
			goto('/404');
		}
		link = window.location.href;

		articleElement = document.getElementById('main-article');
	});

	let scrollPercent, articleElement;

	const onScroll = () => {
		scrollPercent = window.scrollY / articleElement.offsetHeight;
	};
</script>

<svelte:head><title>{title} | RGB Studios</title></svelte:head>

<div class="w-full top-0 left-0 fixed h-2 z-10">
	<div class="h-2 bg-brand-green/50" style="width:{(scrollPercent ?? 0) * 100}%" />
</div>

<SEO
	title={`${title} | RGB Studios`}
	url={$page.url.origin + '/blog/' + slug}
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

<svelte:window on:scroll={onScroll} />

<article id="main-article" class="prose lg:prose-xl mx-auto m-8">
	<h5>{author} &mdash; {new Date(date).toLocaleDateString()}</h5>
	<h1>{title}</h1>
	{#each categories as category}
		<div class="badge badge-outline mr-2">{category}</div>
	{/each}
	<slot />
	<hr />
	<span class="not-prose">
		<a href="/blog" class="btn btn-primary no-underline">
			More Blog Articles <Icon name="chevron_right" />
		</a>
	</span>
</article>

<div class="noprint">
	<ShareButtons {title} {link} isDark={true} />
</div>