<script>
	import ColorList from '$lib/components/ColorList.svelte';
	import Modal from '$lib/components/base/Modal.svelte';
	import { settings } from '$lib/stores/color-picker';

	const id = 'history-color-list-modal';
	export let historyList;
</script>

<Modal {id}>
	<div slot="title">History</div>
	<ColorList bind:items={$settings.historyList} bind:this={historyList} modalId={id} />
</Modal>
