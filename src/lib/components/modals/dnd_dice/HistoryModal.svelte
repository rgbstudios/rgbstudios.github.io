<script>
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '../../Icon.svelte';

	export let rollHistory, rolledDice;
</script>

<Modal id="dnd-dice-history-modal" class="bg-white text-gray-900">
	<div slot="title">
		<Icon name="history" /> &nbsp; History
	</div>

	<p>You've rolled {rolledDice} {rolledDice === 1 ? 'die' : 'dice'}</p>
	<textarea value={rollHistory.join('\r')} rows="10" class="textarea w-full" />
	<div class="xs:grid xs:grid-cols-2 xs:gap-2">
		<button class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0">
			<Icon name="trash" class="w-4 h-4 inline" /> &nbsp; Clear History
		</button>
		<button class="btn block h-auto leading-6 text-xs">
			<Icon name="download" class="w-4 h-4 inline" /> &nbsp; Download History
		</button>
	</div>
</Modal>

<style>
	input,
	textarea {
		@apply bg-white border-2 border-gray-200 font-normal;
	}

	button,
	select,
	input {
		@apply bg-white border-2 border-gray-200 hover:bg-gray-200;
	}
</style>
