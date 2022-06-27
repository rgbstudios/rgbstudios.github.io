<script>
	// @see open graph protocol https://ogp.me/

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let title = 'RGB Studios',
		description = 'RGB Studios makes simple, useful websites, webapps, and mobile apps.',
		keywords = [
			'rgb studios',
			'useful web apps',
			'web development',
			'web development company',
			'affordable web designer',
			'simple tool',
			'online calculators',
			'online converters',
			'desktop clock',
			'binomial calculator',
			'dnd roller',
			'dnd dice',
			'clock',
			'chrome notes',
			'browser extension notepad'
		],
		screenshot = 'img/website_seo_img.png',
		url,
		articleData = null;

	let HOST_URL = $page.url.host;
	onMount(() => {
		if (!url) url = window.location.href;
	});
</script>

<svelte:head>
	<title>{title}</title>

	<link rel="icon" href="{HOST_URL}/img/rgb_logo_64.png" />
	<meta name="apple-mobile-web-app-status-bar" content="#111111" />
	<meta name="theme-color" content="#111111" />
	<meta name="msapplication-TileColor" content="#111111" />
	<link rel="mask-icon" href="{HOST_URL}/img/rgb_logo_64.png" color="#111111" />

	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index" />

	<meta property="og:image:height" content="600" />
	<meta property="og:image:width" content="1600" />
	<meta property="og:description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={HOST_URL + '/' + screenshot} />
	<meta property="og:site_name" content={title} />

	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={HOST_URL + '/' + screenshot} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />

	<link rel="canonical" href={url} />

	{#if articleData !== null}
		<meta property="article:publisher" content={HOST_URL} />
		<meta property="article:published_time" content={articleData.published_time} />
		<meta property="article:modified_time" content={articleData.modified_time} />
		<meta property="article:author" content={articleData.author} />
		<meta property="article:section" content="Technology" />
		<meta property="article:tag" content={articleData.tags} />
		<meta property="og:type" content="article" />
	{:else}
		<meta property="og:type" content="website" />
	{/if}
</svelte:head>
