<script lang="ts" context="module">
	export interface CarouselItem {
		id: string;
		data: any;
	}
</script>

<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	export let items: CarouselItem[];
	export let activeIndex: number = 0;
	export let duration: number = 1000;

	export let buttonStyle = 'primary';

	export let autoScroll: boolean = true;
	export let autoScrollDuration: number = 5000;
	let autoScrollInterval: ReturnType<typeof setInterval>;

	let moving: boolean = false;
	$: length = items.length;

	function step(amount: number) {
		if (moving) return;
		moving = true;
		activeIndex = (activeIndex + amount + length) % length;
		setTimeout(() => (moving = false), duration);

		if (autoScroll && autoScrollDuration) {
			clearInterval(autoScrollInterval);
			autoScrollInterval = setInterval(() => step(1), autoScrollDuration);
		}
	}

	function goto(idx: number) {
		if (moving) return;
		moving = true;
		activeIndex = idx;
		setTimeout(() => (moving = false), duration);

		if (autoScroll && autoScrollDuration) {
			clearInterval(autoScrollInterval);
			autoScrollInterval = setInterval(() => step(1), autoScrollDuration);
		}
	}

	$: if (autoScroll && autoScrollDuration) {
		clearInterval(autoScrollInterval);
		autoScrollInterval = setInterval(() => step(1), autoScrollDuration);
	} else {
		clearInterval(autoScrollInterval);
	}
</script>

<div class="relative">
	<!-- Prev -->
	<button
		aria-label="Previous slide"
		class="z-10 absolute p-2 lg:p-4 text-lg top-1/2 -translate-y-1/2 rotate-180 transition-colors {buttonStyle ===
		'primary'
			? 'bg-primary hover:bg-green-700'
			: 'bg-base-900 hover:bg-base-800'}"
		on:click={() => step(-1)}
	>
		<Icon name="chevron_right" />
	</button>
	<!-- Carousel -->
	<div class="flex overflow-hidden">
		{#each items as item (item.id)}
			<div
				class="basis-full shrink-0 transition"
				style:transition-duration="{duration}ms"
				style:transform="translateX(-{activeIndex * 100}%)"
			>
				<slot {item} />
			</div>
		{/each}
	</div>
	<!-- Next -->
	<button
		aria-label="Next slide"
		class="z-10 absolute p-2 lg:p-4 text-lg top-1/2 right-0 -translate-y-1/2 transition-colors {buttonStyle ===
		'primary'
			? 'bg-primary hover:bg-green-700'
			: 'bg-base-900 hover:bg-base-800'}"
		on:click={() => step(1)}
	>
		<Icon name="chevron_right" />
	</button>
	<!-- Dots -->
	<div class="flex gap-3 absolute bottom-4 left-1/2 -translate-x-1/2 col-start-2 col-end-3">
		{#each items as _, index}
			<button
				aria-label="Go to slide {index + 1}"
				class="w-4 h-4 rounded-full bg-white hover:opacity-100 transition"
				class:opacity-50={index !== activeIndex}
				on:click={() => goto(index)}
			/>
		{/each}
	</div>
</div>
