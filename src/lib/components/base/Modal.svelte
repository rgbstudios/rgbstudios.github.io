<script lang="ts">
	import { browser } from '$app/env';

	import Icon from '$lib/components/Icon.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let id: string;
	export let hidden: boolean = true;
	export let showCloseBtn: boolean = true;
	export let fluid: boolean = false;
	let inp: HTMLInputElement;

	onMount(() => {
		document.addEventListener('keyup', function (e: KeyboardEvent) {
			if (e.key === 'Escape') {
				inp.checked = false;
			}
		});
	});

	function onChange(e: Event) {
		const inp = e.target as HTMLInputElement;
		hidden = !inp.checked;
	}

	// stop background scrolling on open
	function onOpen() {
		const scrollY = window.scrollY;
		document.body.style.position = 'fixed';
		document.body.style.width = '100%';
		document.body.style.top = `-${scrollY}px`;
	}

	// allow background scrolling on close
	function onClose() {
		const scrollY = document.body.style.top;
		document.body.style.position = '';
		document.body.style.top = '';
		window.scrollTo(0, parseInt(scrollY || '0') * -1);
	}

	function trapFocus(e: TransitionEvent) {
		const el = (e.target as HTMLElement).querySelector('.close-btn') as HTMLElement;
		el.focus();
	}

	$: if (browser) {
		if (hidden) {
			onClose();
			dispatch('close');
		} else {
			onOpen();
			dispatch('open');
		}
	}
</script>

<input
	bind:this={inp}
	type="checkbox"
	{id}
	class="modal-toggle"
	checked={!hidden}
	on:change={onChange}
/>

<label for={id} class="modal" class:open={!hidden} on:transitionend={trapFocus}>
	<label
		for=""
		class="overscroll-contain modal-box relative rounded border-2 {$$props.class}"
		class:max-w-full={fluid}
	>
		{#if $$slots.title || showCloseBtn}
			<div class="header flex justify-between items-center border-b-2 p-2 mb-5">
				<h3><slot name="title" /></h3>
				{#if showCloseBtn}
					<label for={id} class="btn btn-ghost btn-sm btn-circle close-btn" tabindex="0">
						<Icon name="close" />
					</label>
				{/if}
			</div>
		{/if}
		<slot />
	</label>
</label>

<style>
	/* for focus trapping */
	.modal {
		background-color: rgba(255, 255, 255, 0);
	}
	.modal.open:not(:focus-within) {
		background-color: rgb(255, 255, 254, 0);
		transition: background-color 0.01s;
	}
</style>
