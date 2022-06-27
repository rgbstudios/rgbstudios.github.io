<script>
	import FeaturedAppCarousel from '../components/FeaturedAppCarousel.svelte';

	import projects from '../data/projects';

	$: featured = projects.filter((p) => p.isFeatured);
</script>

<svelte:head>
	<title>RGB Studios.org</title>
</svelte:head>

<FeaturedAppCarousel slides={featured} />

<article class="prose lg:prose-xl mx-auto mt-8">
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
