<script>
	import { onMount } from 'svelte';

	import '../../app.css';

	import ShareButtons from '../../components/ShareButtons.svelte';
	import SmallFooter from '../../components/SmallFooter.svelte';

	$: link = '';
	$: title = '';
	onMount(() => {
		link = window.location.href;
		title = document.title;
	});
</script>

<div class="container mx-auto p-8">
	<slot />
	<ShareButtons {title} {link} />
</div>

<SmallFooter />
