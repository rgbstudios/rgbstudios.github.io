<script>
	import Icon from '$lib/components/Icon.svelte';
	import Modal from '$lib/components/base/Modal.svelte';
</script>

<Modal id="dnd-dice-character-modifiers-modal" class="bg-white text-base-900">
	<div slot="title">
		<Icon name="table" /> &nbsp; Roll Modifier Table
	</div>

	<div class="modal-body">
		<table class="table w-full">
			<tbody>
				<tr>
					<th>Roll Value</th>
					<th>Modifier</th>
				</tr><tr>
					<td>3</td>
					<td>-4</td>
				</tr><tr>
					<td>4-5</td>
					<td>-3</td>
				</tr><tr>
					<td>6-7</td>
					<td>-2</td>
				</tr><tr>
					<td>8-9</td>
					<td>-1</td>
				</tr><tr>
					<td>10-11</td>
					<td>+0</td>
				</tr><tr>
					<td>12-13</td>
					<td>+1</td>
				</tr><tr>
					<td>14-15</td>
					<td>+2</td>
				</tr><tr>
					<td>16-17</td>
					<td>+3</td>
				</tr><tr>
					<td>18</td>
					<td>+4</td>
				</tr>
			</tbody>
		</table>
	</div>
</Modal>

<style>
	table * {
		@apply bg-white;
	}
	th,
	td {
		@apply border-gray-200;
	}
</style>
