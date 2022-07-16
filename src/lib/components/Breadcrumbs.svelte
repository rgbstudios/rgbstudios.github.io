<script>
	export let breadcrumbs;
</script>

<div class="text-sm breadcrumbs mb-2">
	<ul>
		{#each breadcrumbs as { text, link }}
			{#if link}
				<li><a class="underline" href={link}>{text}</a></li>
			{:else}
				<li><span>{text}</span></li>
			{/if}
		{/each}
	</ul>
</div>
