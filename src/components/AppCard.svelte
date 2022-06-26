<script>
	export let title, text, img, link, isNew, tags;
</script>

<a href={link} target="_blank" class="card w-96 bg-base-200 shadow-xl cursor-pointer no-underline">
	<div class="card-body">
		<h2 class="card-title">
			{title}
			{#if isNew}
				<div class="badge badge-secondary">NEW</div>
			{/if}
		</h2>
		<p>{text}</p>
		<div class="card-actions justify-end">
			{#each tags as tag}
				<div class="badge badge-outline">{tag}</div>
			{/each}
		</div>
	</div>
	<figure><img src={img} alt={title} /></figure>
</a>
