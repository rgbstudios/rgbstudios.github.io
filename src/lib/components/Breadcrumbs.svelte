<script>
	export let breadcrumbs,
		isDark = false;
</script>

<div class="text-sm breadcrumbs mb-2">
	<ul>
		{#each breadcrumbs as { text, link }}
			{#if link}
				<li class="underline {isDark ? 'text-base-900 ' : 'text-white'}">
					<a href={link}>{text}</a>
				</li>
			{:else if text}
				<li class={isDark ? 'text-base-900 ' : 'text-white'}>{text}</li>
			{/if}
		{/each}
	</ul>
</div>
