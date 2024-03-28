<script>
	export let title, text, longText, img, link;
</script>

<div class="card lg:card-side bg-base-900 shadow-xl w-full">
	<figure class="flex-shrink-0">
		<img src={img} alt={title} class="w-full h-64 lg:h-96 lg:w-96 object-cover object-top" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p class="lg:hidden">{text}</p>
		<p class="hidden lg:block">{longText}</p>
		<div class="card-actions justify-end">
			<a href={link} target="_blank" rel="noreferrer" class="btn btn-primary">View</a>
		</div>
	</div>
</div>
