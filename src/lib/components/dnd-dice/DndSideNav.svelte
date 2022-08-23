<script>
	import Icon from '$lib/components/Icon.svelte';

	let open = false;
</script>

<button class="btn absolute top-0 left-0 z-30" on:click={() => (open = !open)}>
	<Icon name={open ? 'close' : 'menu'} />
</button>

<nav
	id="dnd-side-nav"
	class="h-full {open
		? 'w-64'
		: 'w-0'} overflow-hidden fixed top-0 left-0 z-20 bg-white/80 pt-20 ease-in-out border-r-2 border-base-200 transition-all"
>
	<a href="/projects/dnd-dice">
		<img src="/img/projects/other/icon-d20.svg" class="h-8 inline" alt="" /> Dice Roller
	</a>
	<a href="/projects/dnd-dice/char">
		<img src="/img/projects/other/icon-d6.svg" class="h-8 inline" alt="" /> Character Roller
	</a>
	<a href="/projects/dnd-dice/spell">
		<img src="/img/projects/other/icon-d8.svg" class="h-8 inline" alt="" /> Spell Searcher
	</a>
</nav>

<style>
	.btn {
		@apply bg-white border-2 border-base-200 hover:bg-base-200;
	}
	#dnd-side-nav a {
		@apply m-4 bg-white border-2 border-base-200 text-base-900 hover:bg-base-200 p-4 text-lg block;
	}
</style>
