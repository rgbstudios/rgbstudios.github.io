<script>
	import Icon from '$lib/components/Icon.svelte';
	const year = new Date().getFullYear();
</script>

<footer class="w-full">
	<div class="footer p-10 bg-base-800 text-base-content">
		<div>
			<span class="footer-title">Projects</span>
			<a class="footer-link" href="/projects">All</a>
			<a class="footer-link" href="/projects?sort=popular">Popular</a>
			<a class="footer-link" href="/projects?sort=new">New</a>
			<a class="footer-link" href="/projects?sort=updated">Recently Updated</a>
		</div>
		<div>
			<span class="footer-title">Blog</span>
			<a class="footer-link" href="/blog">All Posts</a>
			<a class="footer-link" href="/blog?category=webdev">Web Dev</a>
			<a class="footer-link" href="/blog?category=design">Design</a>
		</div>
		<div>
			<!-- <span class="footer-title">Services</span>
			<a class="footer-link">Branding</a>
			<a class="footer-link">Design</a> -->

			<span class="footer-title">Company</span>
			<a class="footer-link" href="/about">About Us</a>
			<a class="footer-link" href="/contact">Contact</a>
		</div>
	</div>
	<div class="footer px-10 py-4 border-t bg-base-800 text-base-content border-base-700">
		<div class="items-center grid-flow-col">
			<img class="w-12 h-12" src="/img/rgb_logo_256.png" alt="RGB logo" />
			<p>
				<a class="footer-link font-bold" href="/">RGB Studios</a><br />Simple webapps and more<br
				/>&copy; Copyright {year}
			</p>
		</div>
		<div>
			<a class="footer-link" href="/sitemap">Sitemap</a>
			<a class="footer-link" href="/privacy">Privacy Policy</a>
		</div>
		<div class="md:place-self-center md:justify-self-end">
			<div class="grid grid-flow-col gap-4">
				<a
					class="hover:text-white"
					href="https://twitter.com/rgbstudiosorg"
					target="_blank"
					aria-label="Twitter"
				>
					<Icon name="twitter" />
				</a>
				<a
					class="hover:text-white"
					href="https://www.facebook.com/rgbstudios.org"
					target="_blank"
					aria-label="Facebook"
				>
					<Icon name="facebook" />
				</a>
			</div>
		</div>
	</div>
</footer>

<style lang="postcss">
	.footer-link {
		@apply link link-hover p-1;
	}
</style>
