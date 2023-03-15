<script>
	import Icon from './Icon.svelte';

	export let title, text, img, link, email;
</script>

<div class="card bg-base-800">
	<div class="card-body">
		<h2 class="card-title text-3xl">
			{title}
		</h2>
		<p class="mt-4">{text}</p>
	</div>
	<img
		src={img}
		alt={title}
		class="h-full w-72 sm:w-full sm:h-72 mx-auto object-cover object-center grayscale b-8"
	/>

	<a href="mailto:{email}" class="btn btn-outline" title="Email {title}">
		<Icon name="envelope" />
	</a>
	<a
		href={link}
		target="_blank"
		rel="noreferrer"
		class="btn btn-outline"
		title="{title}'s homepage"
	>
		<Icon name="home" />
	</a>
</div>
