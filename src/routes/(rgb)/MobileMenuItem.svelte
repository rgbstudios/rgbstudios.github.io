<script>
	import Icon from '$lib/components/Icon.svelte';

	export let href = '';
	export let label = '';
	export let submenu = [];
</script>

<li>
	{#if submenu.length}
		<span class="justify-between">
			{label}
			<Icon name="chevron_right" class="w-4 h-4" />
		</span>
		<ul class="p-2 bg-base-900">
			{#each submenu as { href, label, submenu }}
				<svelte:self {href} {label} {submenu} />
			{/each}
		</ul>
	{:else}
		<a {href}>{label}</a>
	{/if}
</li>
