<script>
	import Icon from './Icon.svelte';
	const year = new Date().getFullYear();
</script>

<div class="bg-base-800 w-full">
	<footer class="container mx-auto footer items-center p-4">
		<div class="items-center grid-flow-col">
			<img class="w-12 h-12" src="/img/rgb_logo_64.png" alt="RGB logo" />
			<p>
				<a class="link link-hover font-bold" href="/">RGB Studios</a>
				<br />
				Simple webapps and more
				<br />
				&copy; Copyright {year}
			</p>
		</div>
		<div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
			<a href="https://twitter.com/rgbstudiosorg" target="_blank">
				<Icon name="twitter" />
			</a>
			<a href="https://www.facebook.com/rgbstudios.org" target="_blank">
				<Icon name="facebook" />
			</a>
		</div>
	</footer>
</div>
