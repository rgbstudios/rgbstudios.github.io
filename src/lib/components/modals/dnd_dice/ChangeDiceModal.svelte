<script>
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';

	export let value, title, change;
</script>

<Modal id="dnd-dice-change-{change}-modal" class="bg-white text-base-900">
	<div slot="title">
		<Icon name="roll_dice" /> &nbsp; {title}
	</div>

	<input type="number" class="input input-bordered w-full" bind:value min="0" max="9999" />
</Modal>

<style>
	.label-text {
		@apply font-bold text-base-700;
	}
	button,
	select,
	input {
		@apply bg-white border-2 border-base-200 hover:bg-base-200;
	}
</style>
