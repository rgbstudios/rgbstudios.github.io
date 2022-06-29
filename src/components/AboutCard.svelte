<script>
	import Icon from './Icon.svelte';

	export let title, text, img, link, email;
</script>

<div class="card bg-base-200 shadow-xl m-4">
	<div class="card-body">
		<h2 class="card-title text-3xl">
			{title}
		</h2>
		<p class="mt-4">{text}</p>
	</div>
	<img src={img} alt={title} class="w-full h-72 object-cover object-top grayscale mb-8" />
	<a href="mailto:{email}" class="btn btn-outline">
		<Icon name="envelope" class="w-6 h-6" />
	</a>
	<a href={link} target="_blank" class="btn btn-outline">
		<Icon name="home" class="w-6 h-6" />
	</a>
</div>
