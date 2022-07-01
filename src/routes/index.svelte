<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/blog/posts.json');
		const { posts } = await res.json();

		return {
			props: { posts }
		};
	}
</script>

<script>
	import FeaturedAppCarousel from '$lib/components/FeaturedAppCarousel.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import SEO from '$lib/components/SEO.svelte';

	import projects from '$lib/data/projects';

	export let posts;

	$: featuredPosts = posts
		?.filter((post) => !post.hidden)
		.filter((post) => post.categories.includes('webdev')) // TODO criteria for featured
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 4);

	$: featuredApps = projects.filter((p) => p.isFeatured);
</script>

<SEO />

<div class="prose lg:prose-xl my-8">
	<h3>Featured Projects:</h3>
</div>
<FeaturedAppCarousel slides={featuredApps} />

<div class="prose lg:prose-xl my-8">
	<hr />
	<h3>Featured Articles:</h3>
</div>
<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each featuredPosts as { title, preview_text, slug, categories, img } (slug)}
		<BlogCard {title} text={preview_text} link="/blog/{slug}" {img} tags={categories} />
	{/each}
</div>

<article class="prose lg:prose-xl my-8">
	<hr />
	<h1>What We Do</h1>
	<p>
		RGB Studios makes awesome websites, webapps, mobile apps, and browser extensions. We take pride
		in clean, beautiful designs that are simple and easy to use.
	</p>
	<a href="/projects" class="btn btn-primary no-underline">Our Projects</a>
	<hr />
	<p>
		We can also design your website for you or help you with your style guide and brand identity.
		Contact us for a quote!
	</p>
	<a href="/contact" class="btn btn-primary no-underline">Reach Out</a>
	<hr />
	<p>
		Read on to learn more about the web, design, and how to get your website cleaner, easier to use,
		and higher ranked.
	</p>
	<a href="/blog" class="btn btn-primary no-underline">Blog Articles</a>
</article>
