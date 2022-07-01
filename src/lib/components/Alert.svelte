<script>
	import Icon from './Icon.svelte';

	export let text;

	let shown = true;
</script>

{#if shown}
	<div class="alert shadow-lg">
		<div>
			<span>{text} </span>
		</div>
		<div class="flex-none">
			<button class="btn btn-sm btn-secondary" on:click={() => (shown = false)}>
				<Icon name="close" class="w-4 h-4" />
			</button>
		</div>
	</div>
{/if}
