<script>
	// @see open graph protocol https://ogp.me/

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	/**
	 * Potential keywords:
	 * web application development
	 * us based web development companies
	 * web development services us
	 * us based web development company
	 * web developer companies
	 * web developer portfolio
	 * web development firm
	 * custom web development services
	 * web app development services
	 * web development agency
	 * web application development company
	 * custom web application development
	 * web app development company
	 * custom web development
	 * web development services
	 * web development companies
	 * web app development
	 * web design and development
	 * web development company
	 * front end web developer
	 * full stack web development
	 *
	 * Notes:
	 * The terms US, USA, agency, company, web app (instead of just web) mean a more qualified prospect that is likely to afford you
	 */

	export let title = 'RGB Studios - A Web Development Company',
		description = 'RGB Studios makes simple, useful websites, webapps, and mobile apps.',
		keywords = [
			'rgb studios',
			'useful web apps',
			'web development',
			'web development company',
			'US based web development companies',
			'USA web development company',
			'One of the Best US based web development companies',
			'affordable web designer',
			'simple tool',
			'online calculators',
			'online converters',
			'desktop clock',
			'online clock',
			'binomial calculator',
			'dnd roller',
			'dnd dice roller',
			'dnd dice',
			'roll dnd dice online',
			'chrome notes',
			'browser extension notepad'
		],
		screenshot = 'img/website_seo_img.png',
		icon = 'img/rgb_logo_256.png',
		url,
		articleData = null;

	let HOST_URL = $page.url.origin;
	onMount(() => {
		if (!url) url = window.location.href;
	});
</script>

<svelte:head>
	<title>{title}</title>

	<link rel="icon" href={HOST_URL + '/' + icon} />
	<meta name="apple-mobile-web-app-status-bar" content="#111111" />
	<meta name="theme-color" content="#111111" />
	<meta name="msapplication-TileColor" content="#111111" />
	<link rel="mask-icon" href={HOST_URL + '/' + icon} color="#111111" />

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
