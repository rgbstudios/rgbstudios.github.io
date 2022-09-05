<script>
	import FeaturedAppCarousel from '$lib/components/FeaturedAppCarousel.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Icon from '$lib/components/Icon.svelte';

	import projects from '$lib/data/projects';

	export let data = {};

	$: posts = data.posts;

	$: featuredPosts =
		posts
			?.filter((post) => !post.hidden)
			?.filter((post) => post.categories.includes('webdev')) // TODO criteria for featured
			?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			?.slice(0, 4) ?? [];

	$: featuredApps = projects.filter((p) => p.isFeatured);
</script>

<SEO />

<p class="text-xl">
	We are a US based web development company that creates cool web apps, helpful blog posts, and
	websites for other people.
</p>

<div class="prose lg:prose-xl my-8">
	<h3>Featured Projects:</h3>
</div>
<FeaturedAppCarousel slides={featuredApps} />

<article class="prose lg:prose-xl my-8">
	<p>
		RGB Studios makes awesome websites, webapps, mobile apps, and browser extensions. We take pride
		in clean, beautiful designs that are simple and easy to use.
	</p>
	<span class="not-prose">
		<a href="/projects" class="btn btn-primary no-underline">
			Our Projects <Icon name="chevron_right" />
		</a>
	</span>
</article>

<div class="prose lg:prose-xl my-8">
	<hr />
	<h3>Featured Articles:</h3>
</div>
<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each featuredPosts as { title, preview_text, slug, categories, img } (slug)}
		<BlogCard {title} text={preview_text} link="/blog/{slug}" {img} tags={categories} />
	{/each}
</div>
<article class="prose lg:prose-xl max-w-none my-8">
	<p>
		Read on to learn more about the web, design, and how to get your website cleaner, easier to use,
		and higher ranked.
	</p>
	<span class="not-prose">
		<a href="/blog" class="btn btn-primary no-underline">
			Blog Articles <Icon name="chevron_right" />
		</a>
	</span>

	<p>
		We can also design your website for you or help you with your style guide and brand identity.
		Contact us for a quote!
	</p>
	<span class="not-prose">
		<a href="/contact" class="btn btn-primary no-underline">
			Reach Out <Icon name="chevron_right" />
		</a>
	</span>
</article>
