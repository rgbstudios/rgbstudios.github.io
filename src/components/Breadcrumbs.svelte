<script>
	export let breadcrumbs;
</script>

<div class="text-sm breadcrumbs">
	<ul>
		{#each breadcrumbs as { text, link }}
			{#if link}
				<li><a href={link}>{text}</a></li>
			{:else}
				<li><span>{text}</span></li>
			{/if}
		{/each}
	</ul>
</div>
