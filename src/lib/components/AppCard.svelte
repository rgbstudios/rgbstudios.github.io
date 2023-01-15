<script>
	export let title, text, img, link, isNew, isPopular, isUpdated, tags;
</script>

<a
	href={link}
	target="_blank"
	class="card bg-base-800 p-4 pt-0 ring-base-700 hover:ring-2 cursor-pointer no-underline"
>
	<div class="card-body">
		<!-- <img
			class="w-8 sm:w-12 inline-block mr-4"
			src="img/projects/icons/{link.replace(/\//g, '').replace('projects', '')}.png"
			alt=""
		/> -->
		<h2 class="card-title text-3xl">
			{title}
		</h2>
		<p>
			{#if isNew}
				<div class="badge badge-primary">NEW</div>
			{/if}
			{#if isPopular}
				<div class="badge badge-primary">POPULAR</div>
			{/if}
			{#if isUpdated}
				<div class="badge badge-primary">UPDATED</div>
			{/if}
		</p>
		<p class="my-4">{text}</p>
		<div class="card-actions">
			{#if tags}
				{#each tags as tag}
					<div class="badge badge-outline">{tag}</div>
				{/each}
			{/if}
		</div>
	</div>
	<figure><img src={img} alt={title} class="w-full h-72 object-cover object-top" /></figure>
</a>
