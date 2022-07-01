<script>
	import { onMount } from 'svelte';

	import '../../app.css';

	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import SmallFooter from '$lib/components/SmallFooter.svelte';
	import ModalManager from '$lib/components/ModalManager.svelte';

	$: link = '';
	$: title = '';
	onMount(() => {
		link = window.location.href;
		title = document.title;
	});
</script>

<div class="container mx-auto p-8">
	<slot />
	<br />
	<br />
	<ShareButtons {title} {link} />
</div>

<SmallFooter />

<ModalManager />
