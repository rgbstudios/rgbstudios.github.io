<script>
	import SEO from './SEO.svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';

	export let title,
		description,
		keywords,
		icon,
		screenshot,
		isDark = false,
		isCondensed = false;
</script>

<div />

<SEO title="{title} | RGB Studios" {description} {keywords} {icon} {screenshot} />

<Breadcrumbs
	{isDark}
	breadcrumbs={[
		{
			text: 'Home',
			link: '/'
		},
		{
			text: 'Projects',
			link: '/projects'
		},
		{
			text: title
		}
	]}
/>

<article class="prose lg:prose-xl mx-auto text-center">
	<img
		class={isCondensed ? 'w-8 sm:w-12 inline-block mr-4' : 'w-16 mx-auto'}
		src="/{icon}"
		alt=""
	/>
	<h1
		class="text-center {isDark ? 'text-base-900 ' : 'text-white'} {isCondensed
			? 'text-3xl md:text-4xl lg:text-5xl inline-block'
			: ''}"
	>
		{title}
	</h1>
</article>
