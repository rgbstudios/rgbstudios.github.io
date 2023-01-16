<script>
	import '$lib/app.css';

	import Navbar from './Navbar.svelte';
	import RGBHero from './RGBHero.svelte';
	import Footer from './Footer.svelte';
</script>

<Navbar />
<RGBHero />
<div class="container py-8">
	<slot />
</div>
<Footer />
