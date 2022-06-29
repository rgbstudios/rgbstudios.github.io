<script>
	import SEO from './SEO.svelte';
	import Breadcrumbs from './Breadcrumbs.svelte';

	export let title, description, keywords, icon, screenshot;
</script>

<div />

<SEO title="{title} | RGB Studios" {description} {keywords} {icon} {screenshot} />

<Breadcrumbs
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

<article class="prose lg:prose-xl mx-auto">
	<img class="mx-auto" src="/{icon}" width="64px" alt="" />
	<h1 class="text-center">{title}</h1>
</article>
