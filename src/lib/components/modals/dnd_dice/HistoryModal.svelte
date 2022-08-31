<script>
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';

	import downloadFile from '$lib/util/downloadFile';

	export let rollHistory, rolledDice;
</script>

<Modal id="dnd-dice-history-modal" class="bg-white text-base-900">
	<div slot="title">
		<Icon name="history" /> &nbsp; History
	</div>

	<p>You've rolled {rolledDice} {rolledDice === 1 ? 'die' : 'dice'}</p>
	<textarea
		value={rollHistory.length ? rollHistory.join('\r') : ''}
		rows="10"
		class="textarea w-full"
	/>
	<div class="xs:grid xs:grid-cols-2 xs:gap-2">
		<button
			class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0"
			on:click={() => (rollHistory = '')}
		>
			<Icon name="trash" class="w-4 h-4 inline" /> &nbsp; Clear History
		</button>
		<button
			class="btn block h-auto leading-6 text-xs"
			on:click={() =>
				downloadFile(rollHistory.length ? rollHistory.join('\r') : '', 'roll-history.txt')}
		>
			<Icon name="download" class="w-4 h-4 inline" /> &nbsp; Download History
		</button>
	</div>
</Modal>

<style>
	input,
	textarea {
		@apply bg-white border-2 border-base-200 font-normal;
	}

	button,
	select,
	input {
		@apply bg-white border-2 border-base-200 hover:bg-base-200;
	}

	button:focus,
	select:focus,
	input:focus,
	label:focus,
	textarea:focus {
		@apply outline-base-500;
	}
</style>
