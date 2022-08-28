<script>
	import ColorList from '$lib/components/ColorList.svelte';
	import Modal from '$lib/components/base/Modal.svelte';
	import { settings } from '$lib/stores/color-picker';

	export let id, title, colorItems, settingName;
</script>

<Modal {id}>
	<div slot="title">{title}</div>
	<ColorList bind:items={$settings[settingName]} bind:this={colorItems} modalId={id} />
</Modal>
