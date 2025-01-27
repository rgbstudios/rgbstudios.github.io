<script>
	import { page } from '$app/stores';
	import MobileMenu from './MobileMenu.svelte';
	import MobileMenuItem from './MobileMenuItem.svelte';

	import Icon from '$lib/components/Icon.svelte';
</script>

<div class="navbar bg-base-900/90 sticky top-0 z-10 backdrop-blur-sm">
	<div class="navbar-start">
		<MobileMenu>
			<MobileMenuItem href="/" label="Home" />
			<MobileMenuItem
				label="Projects"
				submenu={[
					{ href: '/projects', label: 'All Projects' },
					{ href: '/projects/popular', label: 'Popular' },
					{ href: '/projects/new', label: 'New' },
					{ href: '/projects/updated', label: 'Recently Updated' }
				]}
			/>
			<MobileMenuItem
				label="Blog"
				submenu={[
					{ href: '/blog', label: 'All Posts' },
					{ href: '/blog?category=webdev', label: 'Web Dev' },
					{ href: '/blog?category=design', label: 'Design' }
				]}
			/>
			<MobileMenuItem href="/about" label="About Us" />
			<MobileMenuItem href="/contact" label="Contact" />
		</MobileMenu>
		<a class="hidden xs:block btn btn-ghost" href="/" aria-label="Menu">
			<img class="h-full" src="/img/rgb_logo_light_256.png" alt="RGB Studios logo" />
		</a>
	</div>

	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal p-0">
			<li><a href="/" class:active={$page.url.pathname === '/'}>Home</a></li>
			<li>
				<a href="/projects" class:active={$page.url.pathname === '/projects'}>
					Projects
					<Icon name="chevron_down" class="w-4 h-4" />
				</a>
				<ul class="p-2 bg-base-900">
					<li><a href="/projects">All Projects</a></li>
					<li><a href="/projects/popular">Popular</a></li>
					<li><a href="/projects/new">New</a></li>
					<li><a href="/projects/updated">Recently Updated</a></li>
				</ul>
			</li>
			<li>
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
<div class="w-full h-1 opacity-50 hidden lg:blocksticky top-14" />
