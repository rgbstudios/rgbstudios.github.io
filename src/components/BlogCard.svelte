<script>
	export let title, text, link, tags;
</script>

<a href={link} class="card bg-base-200 shadow-xl cursor-pointer no-underline m-4">
	<div class="card-body">
		<h2 class="card-title text-3xl">
			{title}
		</h2>
		<p class="my-4">{text}</p>
		<div class="card-actions">
			{#each tags as tag}
				<div class="badge badge-outline">{tag}</div>
			{/each}
		</div>
	</div>
</a>
