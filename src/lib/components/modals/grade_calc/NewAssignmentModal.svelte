<script lang="ts">
	/// COMPONENTS ///
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';

	/// UTILS ///
	import uid from '$lib/util/uid';

	/// STATE ///
	import { assignments } from '$lib/stores/grade-calc';
	import ModalButton from '$lib/components/base/ModalButton.svelte';
	let name: Assignment['name'],
		max_score: Assignment['max_score'] = 100,
		weight: Assignment['weight'] = 100;

	/// METHODS ///
	function newAssignment() {
		$assignments.push({
			id: uid(),
			name,
			max_score,
			weight
		});
		$assignments = $assignments;
	}
</script>

<Modal id="grade-calc-new-assignment-modal" showCloseBtn={false}>
	<form class="form-control pt-4 grid gap-3">
		<label class="input-group">
			<span>Name</span>
			<input
				type="text"
				placeholder="(optional)"
				bind:value={name}
				class="input input-bordered grow"
			/>
		</label>
		<label class="input-group">
			<span>Max Score</span>
			<input
				type="text"
				required
				min="0"
				placeholder="100"
				bind:value={max_score}
				class="input input-bordered grow"
			/>
		</label>
		<label class="input-group">
			<span>Weight</span>
			<input
				type="text"
				required
				min="0"
				placeholder="100"
				bind:value={weight}
				class="input input-bordered grow"
			/>
		</label>
		<div class="flex justify-end grid-cols-2 gap-3">
			<ModalButton
				_for="grade-calc-new-assignment-modal"
				on:click={newAssignment}
				class="btn-primary"
			>
				<Icon name="check" /> &nbsp; Add</ModalButton
			>
			<ModalButton _for="grade-calc-new-assignment-modal" class="btn-error">
				<Icon name="close" /> &nbsp; Cancel</ModalButton
			>
		</div>
	</form>
</Modal>
