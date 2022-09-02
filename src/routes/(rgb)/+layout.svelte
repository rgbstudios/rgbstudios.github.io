<script>
	import '$lib/app.css';

	import Navbar from '$lib/components/Navbar.svelte';
	import RGBHero from '$lib/components/RGBHero.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Navbar />
<RGBHero />
<div class="container mx-auto p-8">
	<slot />
</div>
<Footer />
