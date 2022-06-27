<svelte:head>
	<title>Sitemap | RGB Studios.org</title>
</svelte:head>

<article class="prose lg:prose-xl mx-auto">
	<h1>Sitemap</h1>
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
		<h2 class="block col-span-2 sm:col-span-3 md:col-span-4">Projects</h2>
		<a href="/projects">All Apps</a>
		<a href="/projects?sort=popular">Popular Apps</a>
		<a href="/projects?sort=new">New Apps</a>
		<a href="/projects?sort=updated">Recently Updated Apps</a>

		<h2 class="block col-span-2 sm:col-span-3 md:col-span-4">Blog</h2>
		<a href="/blog">All Posts</a>
		<a href="/blog?category=webdev">Web Dev Posts</a>
		<a href="/blog?category=design">Design Posts</a>

		<h2 class="block col-span-2 sm:col-span-3 md:col-span-4">Company</h2>
		<a href="/">Home</a>
		<a href="/about">About us</a>
		<a href="/contact">Contact</a>
	</div>
</article>

<style>
	a {
		@apply link link-hover bg-base-200 m-2 p-2 text-center;
	}
</style>
