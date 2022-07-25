<script lang="ts" context="module">
	export interface CarouselItem {
		id: string;
		data: any;
	}
</script>

<script lang="ts">
	export let items: CarouselItem[];
	export let activeIndex: number = 0;
	$: length = items.length;

	function next() {
		activeIndex = (activeIndex + 1 + length) % length;
	}
	function prev() {
		activeIndex = (activeIndex - 1 + length) % length;
	}
</script>

<div class="parent">
	<button class="btn prev" on:click={prev}><span> &lsaquo; </span></button>
	{#each items as item}
		<div class="child" style:transform="translateX(-{activeIndex * 100}%)"><slot {item} /></div>
	{/each}
	<button class="btn next" on:click={next}><span> &rsaquo; </span></button>
	<div class="flex gap-3 absolute bottom-5 left-1/2 -translate-x-1/2">
		{#each items as _, index}
			<div
				class="w-3 h-3 rounded-full bg-white opacity-50 transition"
				class:opacity-100={index === activeIndex}
			/>
		{/each}
	</div>
</div>

<style>
	.parent {
		@apply flex overflow-hidden relative;
	}
	.btn {
		@apply absolute top-1/2 bg-black/50 text-white z-10 text-5xl outline-none border-none;
	}
	.prev {
		@apply left-5;
	}
	.next {
		@apply right-5;
	}
	.child {
		@apply basis-full shrink-0 transition duration-1000;
	}
</style>
