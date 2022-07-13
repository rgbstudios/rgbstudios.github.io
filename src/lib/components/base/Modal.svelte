<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { onMount } from 'svelte';

	export let id: string;
	export let hidden: boolean = true;
	export let showCloseBtn: boolean = false;
	let inp: HTMLInputElement;

	onMount(() => {
		document.addEventListener('keyup', function (e: KeyboardEvent) {
			if (e.key === 'Escape') {
				inp.checked = false;
			}
		});
	});
</script>

<input
	bind:this={inp}
	type="checkbox"
	{id}
	class="modal-toggle"
	checked={!hidden}
	on:change={(e) => (hidden = !e.target.checked)}
/>
<label for={id} class="modal">
	<div class="modal-box relative rounded border-2">
		{#if $$slots.title || showCloseBtn}
			<div class="header flex justify-between items-center border-b-2 p-2 mb-5">
				<h3><slot name="title" /></h3>
				{#if showCloseBtn}
					<label for={id} class="btn btn-ghost btn-sm btn-circle">
						<Icon name="close" />
					</label>
				{/if}
			</div>
		{/if}
		<slot />
	</div>
</label>
