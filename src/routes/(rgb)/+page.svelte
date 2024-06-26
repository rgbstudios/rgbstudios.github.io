<script>
	import { page } from '$app/stores';

	import FeaturedAppCarousel from '$lib/components/FeaturedAppCarousel.svelte';
	import AppCard from '$lib/components/AppCard.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Icon from '$lib/components/Icon.svelte';

	import projects from '$lib/data/projects';

	export let data = {};

	$: featuredPosts =
		data?.posts
			?.filter((post) => !post.hidden)
			?.filter((post) => post.categories.includes('webdev')) // TODO criteria for featured
			?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			?.slice(0, 4) ?? [];

	$: featuredApps = projects.filter((p) => p.isFeatured);
</script>

<SEO url={$page.url.origin} />

<p class="text-xl">
	We are a US based web development company that creates cool web apps, helpful blog posts, and
	websites for other people.
</p>

<div class="prose-custom my-8">
	<h2>Featured Projects</h2>
</div>
<FeaturedAppCarousel slides={featuredApps} />

<article class="my-8 lg:w-full grid gap-8 lg:grid-cols-3">
	<p class="prose-custom lg:col-span-2">
		RGB Studios makes awesome websites, webapps, mobile apps, and browser extensions. We take pride
		in clean, beautiful designs that are simple and easy to use.
	</p>
	<span class="not-prose">
		<a href="/projects" class="btn btn-primary no-underline">
			Our Projects <Icon name="chevron_right" />
		</a>
	</span>
</article>

<hr />

<!-- begin temp -->

<div class="prose-custom my-8">
	<h2>New Tool &mdash; Hash Checker!</h2>
</div>

{#each projects as { title, text, img, link, isNew, isPopular, isUpdated, tags } (link)}
	{#if title === 'Hash Checker'}
		<AppCard {title} {text} {img} {link} {isNew} {isPopular} {isUpdated} {tags} />
	{/if}
{/each}

<hr />

<!-- end temp -->

<div class="prose-custom my-8">
	<h2>Featured Articles</h2>
</div>
<div class="grid gap-8 my-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each featuredPosts as { title, preview_text, slug, categories, img } (slug)}
		<BlogCard {title} text={preview_text} link="/blog/{slug}" {img} tags={categories} />
	{/each}
</div>

<article class="my-8 lg:w-full grid gap-8 lg:grid-cols-3">
	<p class="prose-custom lg:col-span-2">
		Read on to learn more about the web, design, and how to get your website cleaner, easier to use,
		and higher ranked.
	</p>
	<span class="not-prose">
		<a href="/blog" class="btn btn-primary no-underline">
			Blog Articles <Icon name="chevron_right" />
		</a>
	</span>
</article>

<hr />

<div class="prose-custom my-8">
	<h2>Get in Touch</h2>
</div>

<img class="my-8 w-full max-w-xl mx-auto" src="/img/pages/responsive.svg" alt="" />

<article class="my-8 lg:w-full grid gap-8 lg:grid-cols-3">
	<p class="prose-custom lg:col-span-2">
		We can also design your website for you or help you with your style guide and brand identity.
		Contact us for a quote!
	</p>
	<span class="not-prose">
		<a href="/contact" class="btn btn-primary no-underline">
			Reach Out <Icon name="chevron_right" />
		</a>
	</span>
</article>
