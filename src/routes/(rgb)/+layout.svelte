<script>
	import '$lib/app.css';

	import Navbar from './Navbar.svelte';
	import RGBHero from './RGBHero.svelte';
	import Footer from './Footer.svelte';
</script>

<Navbar />
<RGBHero />
<div class="sm:container mx-auto p-8">
	<slot />
</div>
<Footer />
