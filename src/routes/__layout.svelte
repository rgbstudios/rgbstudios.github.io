<script>
	import { onMount } from 'svelte';

	import '../app.css';

	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';

	onMount(() => {
		// random primary color. r,g, or b
		const randomColor = ['150 80% 40%', '225 100% 60%', '15 100% 40%'][
			Math.floor(Math.random() * 3)
		];
		document.querySelector(':root').style.setProperty('--p', randomColor);
	});
</script>

<Navbar />

<slot />

<Footer />
