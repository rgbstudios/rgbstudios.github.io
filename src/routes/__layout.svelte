<script>
	import '../app.css';

	import Navbar from '../components/Navbar.svelte';
	import RGBHero from '../components/RGBHero.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<Navbar />

<RGBHero />

<div class="container mx-auto py-8">
	<slot />
</div>

<Footer />
