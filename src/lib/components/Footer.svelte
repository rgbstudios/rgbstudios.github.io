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
			<a class="link link-hover" href="/blog">All Posts</a>
			<a class="link link-hover" href="/blog?category=webdev">Web Dev</a>
			<a class="link link-hover" href="/blog?category=design">Design</a>
		</div>
		<div>
			<!-- <span class="footer-title">Services</span>
			<a class="link link-hover">Branding</a>
			<a class="link link-hover">Design</a> -->

			<span class="footer-title">Company</span>
			<a class="link link-hover" href="/about">About Us</a>
			<a class="link link-hover" href="/contact">Contact</a>
		</div>
	</div>
	<div class="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
		<div class="items-center grid-flow-col">
			<img class="w-12 h-12" src="/img/rgb_logo_64.png" alt="RGB logo" />
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
					<Icon name="twitter" />
				</a>
				<!-- <a>
					<Icon name="youtube" />
				</a> -->
				<a href="https://www.facebook.com/rgbstudios.org" target="_blank">
					<Icon name="facebook" />
				</a>
			</div>
		</div>
	</div>
</footer>
