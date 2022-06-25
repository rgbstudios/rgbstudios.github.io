<script>
	import Icon from './Icon.svelte';
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="btn btn-ghost lg:hidden">
				<Icon name="menu" class="w-6 h-6" />
			</button>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a>Item 1</a></li>
				<li tabindex="0">
					<a class="justify-between">
						Parent
						<Icon name="chevron_right" class="w-4 h-4" />
					</a>
					<ul class="p-2">
						<li><a>Submenu 1</a></li>
						<li><a>Submenu 2</a></li>
					</ul>
				</li>
				<li><a>Item 3</a></li>
			</ul>
		</div>
		<a class="btn btn-ghost">
			<img class="h-full" src="/img/rgb_logo_light_64.png" alt="RGB Studios logo" />
		</a>
	</div>

	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal p-0">
			<li><a>Item 1</a></li>
			<li tabindex="0">
				<a>
					Parent
					<Icon name="chevron_down" class="w-4 h-4" />
				</a>
				<ul class="p-2">
					<li><a>Submenu 1</a></li>
					<li><a>Submenu 2</a></li>
				</ul>
			</li>
			<li><a>Item 3</a></li>
		</ul>
	</div>

	<div class="navbar-end">
		<a class="btn">Get started</a>
	</div>
</div>
