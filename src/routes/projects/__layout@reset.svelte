<script>
	import { onMount, setContext } from 'svelte';

	import '../../app.css';

	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import SmallFooter from '$lib/components/SmallFooter.svelte';
	import { Toasts } from '$lib/components/Toast';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	const isDark = writable(true);
	setContext('share-buttons-dark', isDark);
	$: link = '';
	$: title = '';
	onMount(() => {
		link = window.location.href;
		title = document.title;
	});

	$: if (browser) {
		if ($page.url.pathname === '/projects/color-picker') {
			$isDark = true;
			document.documentElement.style.removeProperty('--current-color');
			document.body.style.backgroundColor = null;
		}
	}
</script>

<div class="container mx-auto p-8">
	<slot />
	<br />
	<br />
	<ShareButtons {title} {link} />
</div>

<SmallFooter />

<Toasts />
