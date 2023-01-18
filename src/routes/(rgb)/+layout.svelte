<script>
	import '$lib/app.css';

	import Navbar from '$lib/components/layout/Navbar.svelte';
	import RGBHero from '$lib/components/layout/RGBHero.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<Navbar />
<RGBHero />
<div class="container py-8">
	<slot />
</div>
<Footer />
