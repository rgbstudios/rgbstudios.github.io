<script>
	import { page } from '$app/stores';

	import Icon from './Icon.svelte';
</script>

<div class="navbar bg-base-900/90 sticky top-0 z-10 backdrop-blur-sm">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="btn btn-ghost lg:hidden">
				<Icon name="menu" />
			</button>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-900 rounded-box w-52"
			>
				<li><a href="/">Home</a></li>

				<li tabindex="0">
					<span class="justify-between">
						Projects
						<Icon name="chevron_right" class="w-4 h-4" />
					</span>
					<ul class="p-2 bg-base-900">
						<li><a href="/projects">All Projects</a></li>
						<li><a href="/projects?sort=popular">Popular</a></li>
						<li><a href="/projects?sort=new">New</a></li>
						<li><a href="/projects?sort=updated">Recently Updated</a></li>
					</ul>
				</li>
				<li tabindex="0">
					<span class="justify-between">
						Blog
						<Icon name="chevron_right" class="w-4 h-4" />
					</span>
					<ul class="p-2 bg-base-900">
						<li><a href="/blog">All Posts</a></li>
						<li><a href="/blog?category=webdev">Web Dev</a></li>
						<li><a href="/blog?category=design">Design</a></li>
					</ul>
				</li>
				<li><a href="/about">About Us</a></li>
				<li><a href="/contact">Contact</a></li>
			</ul>
		</div>
		<a class="btn btn-ghost" href="/">
			<img class="h-full" src="/img/rgb_logo_light_256.png" alt="RGB Studios logo" />
		</a>
	</div>

	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal p-0">
			<li><a href="/" class:active={$page.url.pathname === '/'}>Home</a></li>
			<li tabindex="0">
				<a href="/projects" class:active={$page.url.pathname === '/projects'}>
					Projects
					<Icon name="chevron_down" class="w-4 h-4" />
				</a>
				<ul class="p-2 bg-base-900">
					<li><a href="/projects">All Projects</a></li>
					<li><a href="/projects?sort=popular">Popular</a></li>
					<li><a href="/projects?sort=new">New</a></li>
					<li><a href="/projects?sort=updated">Recently Updated</a></li>
				</ul>
			</li>
			<li tabindex="0">
				<a href="/blog" class:active={$page.url.pathname === '/blog'}>
					Blog
					<Icon name="chevron_down" class="w-4 h-4" />
				</a>
				<ul class="p-2 bg-base-900">
					<li><a href="/blog">All Posts</a></li>
					<li><a href="/blog?category=webdev">Web Dev</a></li>
					<li><a href="/blog?category=design">Design</a></li>
				</ul>
			</li>
			<li><a href="/about" class:active={$page.url.pathname === '/about'}>About Us</a></li>
			<li><a href="/contact" class:active={$page.url.pathname === '/contact'}>Contact</a></li>
		</ul>
	</div>

	<div class="navbar-end">
		<a class="btn btn-outline" href="/contact">Get in touch</a>
	</div>
</div>
<div class="navbar-bottom sticky top-14" />

<style>
	.navbar-bottom {
		@apply w-full h-1 opacity-50 hidden lg:block;
		/* background: linear-gradient(
			-45deg,
			var(--brand-red) 33%,
			var(--brand-green) 33%,
			var(--brand-green) 67%,
			var(--brand-blue) 67%
		); */
	}
</style>
