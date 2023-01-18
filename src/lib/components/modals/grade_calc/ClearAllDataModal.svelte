<script lang="ts">
	/// COMPONENTS ///
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';

	/// STATE ///
	import { clearData } from '$lib/stores/grade-calc';
	import ModalButton from '$lib/components/base/ModalButton.svelte';

	function clear() {
		const inp = document.getElementById('grade-calc-settings-modal') as HTMLInputElement;
		inp.checked = false;
		clearData();
	}
</script>

<Modal id="grade-calc-clear-data-modal" showCloseBtn={false}>
	<form class="form-control pt-4 grid gap-3">
		<p>This will delete all your student grade history. Are you sure you want to proceed?</p>
		<div class="flex justify-end grid-cols-2 gap-3">
			<ModalButton _for="grade-calc-clear-data-modal" on:click={clear} class="btn-error">
				<Icon name="check" /> &nbsp; Clear</ModalButton
			>
			<ModalButton _for="grade-calc-clear-data-modal">
				<Icon name="close" /> &nbsp; Cancel</ModalButton
			>
		</div>
	</form>
</Modal>
