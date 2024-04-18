<script>
	import { onMount } from 'svelte';

	import '$lib/app.css';

	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import SmallFooter from '$lib/components/layout/SmallFooter.svelte';

	$: link = '';
	$: title = '';
	onMount(() => {
		link = window.location.href;
		title = document.title;
	});
</script>

<slot />
<div class="container py-8">
	<ShareButtons {title} {link} />
	<SmallFooter />
</div>
