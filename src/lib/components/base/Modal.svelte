<script lang="ts">
	export let id: string;
	export let checked: boolean = false;
	export let hideCloseBtn: boolean = false;
</script>

<input type="checkbox" {id} class="modal-toggle" bind:checked />
<div class="modal">
	<div class="modal-box relative">
		{#if !hideCloseBtn}
			<label for={id} class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		{/if}
		<slot />
	</div>
</div>
