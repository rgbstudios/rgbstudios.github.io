<script>
	export let title, text, link, tags, img;
</script>

<a
	href={link}
	class="group card bg-base-800 ring-base-700 hover:ring-2 cursor-pointer no-underline"
>
	<div class="card-body">
		<h2 class="group-hover:text-white card-title text-2xl lg:text-3xl">
			{title}
		</h2>
		<p class="my-4">{text}</p>
		<div class="card-actions">
			{#each tags as tag}
				<div class="badge badge-outline">{tag}</div>
			{/each}
		</div>
	</div>

	<picture>
		<source type="image/avif" srcset={img} alt={title} />
		<img
			src={img.replace('.avif', '.jpg')}
			alt={title}
			class="group-hover:scale-105 transition-transform w-full h-72 object-cover object-top"
		/>
	</picture>
</a>
