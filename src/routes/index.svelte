<script>
	import FeaturedAppCarousel from '../components/FeaturedAppCarousel.svelte';
	import BlogCard from '../components/BlogCard.svelte';
	import SEO from '../components/SEO.svelte';

	import projects from '../data/projects';

	$: featured = projects.filter((p) => p.isFeatured);
</script>

<SEO />

<article class="prose lg:prose-xl mx-auto my-8">
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
</article>

<div class="prose lg:prose-xl my-8">
	<h3>Featured Projects:</h3>
</div>
<FeaturedAppCarousel slides={featured} />

<div class="prose lg:prose-xl my-8">
	<h3>Featured Articles:</h3>
</div>
<div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	<BlogCard
		title="File Size on the Web"
		text="PC games add gigabyte updates, but web devs will debate fiercely over a few kilobytes. Find out why."
		link="/blog/file-size-on-the-web"
		tags={['webdev']}
		img="/img/blog/slow_website_frustration.avif"
	/>
</div>
