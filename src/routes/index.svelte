<script>
	// import FeaturedAppCard from '../components/FeaturedAppCard.svelte';
	import FeaturedAppCarousel from '../components/FeaturedAppCarousel.svelte';

	import projects from '../data/projects';

	$: featured = projects.filter((p) => p.title === 'Desktop Clock')[0];
</script>

<svelte:head>
	<title>RGB Studios.org</title>
</svelte:head>

<!-- <FeaturedAppCard
	title={featured.title}
	text={featured.text}
	longText={featured.longText}
	img={featured.img}
	link={featured.link}
/> -->

<FeaturedAppCarousel
	slides={[
		{
			id: 'clock',
			app: {
				title: featured.title,
				text: featured.text,
				longText: featured.longText,
				img: featured.img,
				link: featured.link
			}
		},
		{
			id: 'notes',
			app: {
				title: 'notes',
				text: 'text',
				longText: 'longText',
				img: 'http://placekitten.com/200/300',
				link: 'google.com'
			}
		},
		{
			id: 'notes2',
			app: {
				title: 'notes2',
				text: 'text2',
				longText: 'longText2',
				img: 'http://placekitten.com/200/200',
				link: 'google.com/'
			}
		}
	]}
/>

<article class="prose lg:prose-xl mx-auto mt-8">
	<h1>What We Do</h1>
	<p>
		RGB Studios makes awesome websites, webapps, mobile apps, and browser extensions. We take pride
		in clean, beautiful designs that are simple and easy to use.
	</p>
	<p>Check out <a href="/projects" class="btn btn-primary no-underline">Our Projects</a></p>
</article>
