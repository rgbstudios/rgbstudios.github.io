<script>
	import FeaturedAppCard from './FeaturedAppCard.svelte';
	export let slides;
</script>

{#if slides.length === 1}
	<FeaturedAppCard {...slides[0]} />
{:else if slides.length > 1}
	<div class="carousel w-full">
		{#each slides as slide, idx}
			<div id={idx} class="carousel-item relative w-full">
				<FeaturedAppCard {...slide} />

				<div
					class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
				>
					<a
						href="#{idx === 0 ? slides.length - 1 : idx - 1}"
						class="btn btn-circle bg-white border-0">❮</a
					>
					<a
						href="#{idx === slides.length - 1 ? 0 : idx + 1}"
						class="btn btn-circle bg-white border-0">❯</a
					>
				</div>
			</div>
		{/each}
	</div>
{/if}
