<script>
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '../../Icon.svelte';

	export let value;
</script>

<Modal id="dnd-dice-change-dice-modal" class="bg-white text-gray-900">
	<div slot="title">
		<Icon name="roll_dice" /> &nbsp; Number of Dice
	</div>

	<input type="number" class="input input-bordered w-full" bind:value min="0" max="9999" />
</Modal>

<style>
	.label-text {
		@apply font-bold text-gray-700;
	}
	button,
	select,
	input {
		@apply bg-white border-2 border-gray-200 hover:bg-gray-200;
	}
</style>
