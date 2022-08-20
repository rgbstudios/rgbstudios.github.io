<script>
	import { browser } from '$app/env';

	// Note: copied from desktop clock and modified

	import { session } from '$app/stores';
	import Icon from './Icon.svelte';

	export let title;
	export let icon;

	let shown = false;
	export const show = () => (shown = true);
	export const hide = () => (shown = false);
	export const toggle = () => (shown = !shown);

	// prevent scrolling behind modal
	$: if (shown && browser) document.body.classList.add('overflow-hidden');
	$: if (!shown && browser) document.body.classList.remove('overflow-hidden');
</script>

<svelte:window
	on:keydown={(e) => {
		// TODO: only hide the topmost modal?
		if (e.key == 'Escape') {
			hide();
		}
	}}
/>

<div
	class="xs:p-4 sm:p-8 fixed left-0 top-0 w-full h-full bg-white bg-opacity-75 z-20 {shown
		? 'block'
		: 'hidden'}"
	on:click={() => hide()}
>
	<div
		class="modal-content bg-white overflow-auto h-full surface p-2 xs:p-8 relative m-auto w-full md:w-3/4"
		on:click|stopPropagation
	>
		<div class="mb-4 border-b-2 border-gray-200 pb-8">
			<button class="btn-circle z-30 float-right" on:click={() => hide()} aria-label="Close">
				<Icon name="close" class="w-6 h-6" />
			</button>
			<h1 class="text-left"><Icon name={icon} class="w-6 h-6 inline mr-2" /> {title}</h1>
		</div>
		<div class="text-left relative">
			<slot />
		</div>
	</div>
</div>

<style>
	.modal-content {
		animation: animateTop 0.25s;
		-webkit-animation: animateTop 0.25s;
	}

	@keyframes animateTop {
		from {
			top: -240px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
	@-webkit-keyframes animateTop {
		from {
			top: -240px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
</style>
