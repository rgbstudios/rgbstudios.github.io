<script>
	export let title, text, img, link, isNew, tags;
</script>

<a href={link} target="_blank" class="card bg-base-200 shadow-xl cursor-pointer no-underline m-4">
	<div class="card-body">
		<h2 class="card-title text-3xl">
			{title}
			{#if isNew}
				<div class="badge badge-secondary">NEW</div>
			{/if}
		</h2>
		<p class="my-4">{text}</p>
		<div class="card-actions">
			{#each tags as tag}
				<div class="badge badge-outline">{tag}</div>
			{/each}
		</div>
	</div>
	<figure><img src={img} alt={title} class="w-full h-72 object-cover object-top" /></figure>
</a>
