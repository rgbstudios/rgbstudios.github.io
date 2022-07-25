<script lang="ts" context="module">
	export interface CarouselItem {
		id: string;
		data: any;
	}
</script>

<script lang="ts">
	import Icon from '../Icon.svelte';

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

<div class="relative">
	<!-- Prev -->
	<button
		class="absolute bg-primary p-3 z-10 text-lg top-1/2 -translate-y-1/2 rotate-180 hover:bg-green-700 transition"
		on:click={prev}><Icon name="chevron_right" /></button
	>
	<!-- Carousel -->
	<div class="carousel">
		{#each items as item}
			<div class="child" style:transform="translateX(-{activeIndex * 100}%)"><slot {item} /></div>
		{/each}
	</div>
	<!-- Next -->
	<button
		class="absolute bg-primary p-3 z-10 text-lg top-1/2 right-0 -translate-y-1/2 hover:bg-green-700 transition"
		on:click={next}><Icon name="chevron_right" /></button
	>
	<!-- Dots -->
	<div class="flex gap-3 absolute bottom-5 left-1/2 -translate-x-1/2 col-start-2 col-end-3">
		{#each items as _, index}
			<div
				class="w-3 h-3 rounded-full bg-white opacity-50 transition"
				class:opacity-100={index === activeIndex}
			/>
		{/each}
	</div>
</div>

<style>
	.carousel {
		@apply flex overflow-hidden;
	}
	.child {
		@apply basis-full shrink-0 transition duration-1000;
	}
</style>
