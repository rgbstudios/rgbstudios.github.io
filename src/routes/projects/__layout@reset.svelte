<script>
	import { onMount, setContext } from 'svelte';

	import '../../app.css';

	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import SmallFooter from '$lib/components/SmallFooter.svelte';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import Toast from '$lib/components/Toast.svelte';

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
			/// it's null for every route except color-picker
			document.body.style.backgroundColor = null;
		}
		if ($page.url.pathname.includes('projects/dnd-dice')) {
			$isDark = false;
		}
	}
</script>

<div
	class:dnd-dice={$page.url.pathname.includes('projects/dnd-dice')}
	class="flex min-h-full flex-col"
>
	<div class="container mx-auto px-4 py-8 flex-1">
		<slot />
		<br />
		<br />
		<ShareButtons {title} {link} />
	</div>

	<SmallFooter />

	<Toast />
</div>

<style>
	.dnd-dice {
		background-color: #fff;
		background-size: 2.5rem 2.5rem;
		background-image: linear-gradient(to right, #eee8 1px, transparent 1px),
			linear-gradient(to bottom, #eee8 1px, transparent 1px);
	}
	.dnd-dice * {
		@apply text-base-900;
	}
</style>
