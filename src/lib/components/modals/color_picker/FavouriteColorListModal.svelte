<script>
	import ColorList from '$lib/components/ColorList.svelte';
	import Modal from '$lib/components/base/Modal.svelte';
	import { settings } from '$lib/stores/color-picker';

	const id = 'favorite-color-list-modal';
	export let favoritesList;
</script>

<Modal {id}>
	<div slot="title">Favourites</div>
	<ColorList bind:items={$settings.favoritesList} bind:this={favoritesList} modalId={id} />
</Modal>
