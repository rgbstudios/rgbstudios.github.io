<script>
	export let value, min, max, dataType, onChange;
</script>

<input
	type="range"
	{value}
	{min}
	{max}
	data-type={dataType}
	on:change={onChange}
	class="w-full slider {$$props.class ?? ''}"
/>

<style lang="postcss">
	.slider {
		@apply appearance-none w-full h-2 rounded-full border-2 border-base-200;
	}

	.slider::-webkit-slider-thumb {
		@apply appearance-none w-5 h-5 rounded-full cursor-pointer ring-2 ring-base-200;
		background-color: var(--current-color);
	}

	.slider::-moz-range-thumb {
		@apply appearance-none w-5 h-5 rounded-full cursor-pointer  ring-2 ring-base-200;
		background-color: var(--current-color);
	}
</style>
