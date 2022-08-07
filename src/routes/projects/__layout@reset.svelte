<script>
	import { onMount, setContext } from 'svelte';

	import '../../app.css';

	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import SmallFooter from '$lib/components/SmallFooter.svelte';
	import { Toasts } from '$lib/components/Toast';
	import { writable } from 'svelte/store';

	const isDark = writable(true);
	setContext('share-buttons-dark', isDark);
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

<Toasts />
