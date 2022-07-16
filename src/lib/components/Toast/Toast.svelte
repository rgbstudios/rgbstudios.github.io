<script>
	// https://dev.to/danawoodman/svelte-quick-tip-creating-a-toast-notification-system-ge3

	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	import Icon from '../Icon.svelte';

	const dispatch = createEventDispatcher();

	export let type, text, dismissible, timeout;
</script>

<div
	class="w-80 p-4 flex items-center mb-2 mx-auto bg-base-100 border text-white"
	role="alert"
	transition:fade
>
	<Icon name={type} />

	<span class="ml-4 text-white">
		{text}
	</span>

	{#if dismissible}
		<button class="ml-auto" aria-label="Close" on:click={() => dispatch('dismiss')}>
			<Icon name="close" />
		</button>
	{/if}

	<!-- TODO: progress bar not working here, works in clock though -->
	{#if timeout}
		<div
			class="absolute bottom-0 left-0 h-1 bg-gray-600"
			style="animation-duration: {timeout / 1000}s;
                animation-timing-function: linear; animation-name: shrink;"
		/>
	{/if}
</div>

<style>
	@keyframes shrink {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}
</style>
