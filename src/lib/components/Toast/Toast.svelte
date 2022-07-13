<script>
	// https://dev.to/danawoodman/svelte-quick-tip-creating-a-toast-notification-system-ge3

	import { session } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	import Icon from '../Icon.svelte';

	const dispatch = createEventDispatcher();

	export let type, dismissible, timeout;
</script>

<div class="w-80 p-4 flex items-center mb-2 mx-auto surface" role="alert" transition:fade>
	<Icon name={type} class="inline w-6 h-6" />

	<div class="ml-4">
		<slot />
	</div>

	{#if dismissible}
		<button class="ml-auto" aria-label="Close" on:click={() => dispatch('dismiss')}>
			<Icon name="close" class="inline w-6 h-6" />
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
