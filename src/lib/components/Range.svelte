<script>
	export let value, min, max, dataType, onChange;
</script>

<div class="w-full">
	<input
		type="range"
		{value}
		{min}
		{max}
		data-type={dataType}
		on:change={onChange}
		class="slider {$$props.class ?? ''}"
	/>
</div>

<style>
	.slider {
		@apply appearance-none w-full h-2 rounded-full border-2 border-gray-200;
	}

	.slider::-webkit-slider-thumb {
		@apply appearance-none w-5 h-5 rounded-full cursor-pointer ring-2 ring-gray-200;
		background-color: var(--current-color);
	}

	.slider::-moz-range-thumb {
		@apply appearance-none w-5 h-5 rounded-full cursor-pointer  ring-2 ring-gray-200;
		background-color: var(--current-color);
	}
</style>
