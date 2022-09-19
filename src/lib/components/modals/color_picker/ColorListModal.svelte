<script>
	import ColorList from '$lib/components/ColorList.svelte';
	import Modal from '$lib/components/base/Modal.svelte';

	export let id, title, colorItems, settingName;
</script>

<Modal {id} class="max-w-full bg-white text-black" fluid={true}>
	<div slot="title">{title}</div>
	<ColorList {settingName} bind:this={colorItems} modalId={id} />
</Modal>
