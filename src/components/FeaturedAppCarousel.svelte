<script>
	import FeaturedAppCard from './FeaturedAppCard.svelte';
	export let slides;
</script>

<div class="carousel w-full">
	{#each slides as { id, app }, idx}
		<div {id} class="carousel-item relative w-full">
			<FeaturedAppCard {...app} />

			<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<a
					href="#{slides[idx === 0 ? slides.length - 1 : idx - 1].id}"
					class="btn btn-circle bg-white border-0">❮</a
				>
				<a
					href="#{slides[idx === slides.length - 1 ? 0 : idx + 1].id}"
					class="btn btn-circle bg-white border-0">❯</a
				>
			</div>
		</div>
	{/each}
</div>
