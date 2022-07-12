<script lang="ts">
	/// COMPONENTS ///
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';

	/// STATE ///
	import { assignments, setupDone } from '$lib/stores/grade-calc';
	import ModalButton from '$lib/components/base/ModalButton.svelte';
	import NewAssignmentModal from './NewAssignmentModal.svelte';

	/// METHODS ///
	function removeAssignment(id: Assignment['id']) {
		$assignments = $assignments.filter(({ id: i }) => i !== id);
	}
</script>

<Modal id="grade-calc-setup-modal" hidden={$setupDone} showCloseBtn>
	<div slot="title">Setup</div>
	<div class="overflow-x-auto py-4">
		<table class="table table-zebra w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Name</th>
					<th>Max Score</th>
					<th>Weight</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each $assignments as { id, name, max_score, weight }, index (id)}
					<tr>
						<td>{name || `Assignment ${index + 1}`}</td>
						<td>{max_score}</td>
						<td>{weight}</td>
						<td
							><button
								type="button"
								class="btn btn-error text-lg rounded-full"
								on:click={() => removeAssignment(id)}>&times;</button
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="btn-group justify-end gap-1">
		<button class="btn btn-primary" on:click={() => ($setupDone = true)}>
			<Icon name="check" /> &nbsp; Confirm</button
		>
		<ModalButton _for="grade-calc-new-assignment-modal">
			<Icon name="plus" /> &nbsp; New Assignment</ModalButton
		>
	</div>
</Modal>
<NewAssignmentModal />
