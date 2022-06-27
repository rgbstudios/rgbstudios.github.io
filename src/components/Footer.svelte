<script>
	import Icon from './Icon.svelte';
	const year = new Date().getFullYear();
</script>

<footer class="w-full">
	<div class="footer p-10 bg-base-200 text-base-content">
		<div>
			<span class="footer-title">Projects</span>
			<a class="link link-hover" href="/projects">All</a>
			<a class="link link-hover" href="/projects?sort=popular">Popular</a>
			<a class="link link-hover" href="/projects?sort=new">New</a>
			<a class="link link-hover" href="/projects?sort=updated">Recently Updated</a>
		</div>
		<div>
			<span class="footer-title">Blog</span>
			<a class="link link-hover" href="/blog">Blog</a>
			<!-- <a class="link link-hover">Web Development</a>
			<a class="link link-hover">Design</a> -->
		</div>
		<div>
			<!-- <span class="footer-title">Services</span>
			<a class="link link-hover">Branding</a>
			<a class="link link-hover">Design</a> -->

			<span class="footer-title mt-4">Company</span>
			<a class="link link-hover" href="/about">About Us</a>
			<a class="link link-hover" href="/contact">Contact</a>
		</div>
	</div>
	<div class="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
		<div class="items-center grid-flow-col">
			<img class="w-12 h-12" src="/img/rgb_logo_mono_64.png" alt="RGB logo" />
			<p>
				<a class="link link-hover font-bold" href="/">RGB Studios</a><br />Simple webapps and more<br
				/>&copy; Copyright {year}
			</p>
		</div>
		<div>
			<a class="link link-hover" href="/sitemap">Sitemap</a>
			<a class="link link-hover" href="/privacy">Privacy Policy</a>
		</div>
		<div class="md:place-self-center md:justify-self-end">
			<div class="grid grid-flow-col gap-4">
				<a href="https://twitter.com/rgbstudiosorg" target="_blank">
					<Icon name="twitter" class="w-6 h-6" />
				</a>
				<!-- <a>
					<Icon name="youtube" class="w-6 h-6" />
				</a> -->
				<a href="https://www.facebook.com/rgbstudios.org" target="_blank">
					<Icon name="facebook" class="w-6 h-6" />
				</a>
			</div>
		</div>
	</div>
</footer>
