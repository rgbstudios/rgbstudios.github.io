<script>
	import Carousel from './base/Carousel.svelte';
	import FeaturedAppCard from './FeaturedAppCard.svelte';
	export let slides;
</script>

{#if slides.length === 1}
	<FeaturedAppCard {...slides[0]} />
{:else if slides.length > 1}
	<Carousel let:item={slide} items={slides}>
		<FeaturedAppCard {...slide} />
	</Carousel>
{/if}
