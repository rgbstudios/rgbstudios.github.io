<script>
	import Icon from '$lib/components/Icon.svelte';
	import Modal from '$lib/components/base/Modal.svelte';

	import downloadFile from '$lib/util/downloadFile';

	export let historyText;
</script>

<Modal id="dnd-dice-character-history-modal" class="bg-white text-base-900">
	<div slot="title">
		<Icon name="history" /> &nbsp; History
	</div>

	<textarea bind:value={historyText} rows="10" class="textarea w-full" />
	<div class="xs:grid xs:grid-cols-2 xs:gap-2">
		<button
			class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0"
			on:click={() => (historyText = '')}
		>
			<Icon name="trash" class="w-4 h-4 inline" /> &nbsp; Clear History
		</button>
		<button
			class="btn block h-auto leading-6 text-xs"
			on:click={() => downloadFile(historyText, 'dnd-character-history.txt')}
		>
			<Icon name="download" class="w-4 h-4 inline" /> &nbsp; Download History
		</button>
	</div>
</Modal>

<style lang="postcss">
	textarea {
		@apply bg-white border-2 border-base-200 font-normal;
	}
	button {
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
