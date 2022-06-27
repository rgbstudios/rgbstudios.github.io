<svelte:head>
	<title>Sitemap | RGB Studios.org</title>
</svelte:head>

<article class="prose lg:prose-xl mx-auto">
	<h1>Sitemap</h1>
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
		<h2 class="block col-span-2 sm:col-span-3 md:col-span-4">Projects</h2>
		<a href="/projects">All</a>
		<a href="/projects?sort=popular">Popular</a>
		<a href="/projects?sort=new">New</a>
		<a href="/projects?sort=updated">Recently Updated</a>

		<h2 class="block col-span-2 sm:col-span-3 md:col-span-4">Company</h2>
		<a href="/about">About us</a>
		<a href="/contact">Contact</a>
	</div>
</article>

<style>
	a {
		@apply link link-hover bg-base-200 m-2 p-2 text-center;
	}
</style>
