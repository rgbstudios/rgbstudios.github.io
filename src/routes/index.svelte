<script>
	import { onMount } from 'svelte';

	onMount(() => {
		// random primary color. r,g, or b
		document
			.querySelector(':root')
			.style.setProperty(
				'--p',
				['150 80% 40%', '225 100% 60%', '15 100% 40%'][Math.floor(Math.random() * 3)]
			);
	});
</script>

<div class="container mx-auto my-8">
	<article class="prose lg:prose-xl">
		<h1 class="text-center">RGB Studios</h1>
		<p>Hello there</p>
	</article>
	<button class="btn btn-primary">Hello</button>
</div>
