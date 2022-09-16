<script>
	export let title, text, link, tags, img;
</script>

<a href={link} class="card bg-base-800 ring-base-700 hover:ring-2 cursor-pointer no-underline m-4">
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
	<figure>
		<picture>
			<source type="image/avif" srcset={img.replace('.avif', '.jpg')} alt={title} />
			<img src={img} alt={title} class="w-full h-72 object-cover object-top" />
		</picture>
	</figure>
</a>
