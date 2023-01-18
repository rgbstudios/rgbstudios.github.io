<script>
	/**
	 * Layout file used for `/projects/*` pages
	 */

	import { onMount } from 'svelte';

	import '$lib/app.css';

	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import SmallFooter from '$lib/components/layout/SmallFooter.svelte';
	import { page } from '$app/stores';
	import Toast from '$lib/components/Toast.svelte';

	import w3color from '$lib/util/external/w3color';
	import { settings } from '$lib/stores/color-picker';

	$: link = '';
	$: title = '';
	onMount(() => {
		link = window.location.href;
		title = document.title;
	});
</script>

<div
	class:dnd-dice={$page.url.pathname.includes('projects/dnd-dice')}
	class="min-h-screen flex flex-col justify-between"
>
	<div class="container py-8 flex-1">
		<slot />
		<br />
		<br />
		<!-- DND dice is light themed and color picker depends on the current color -->
		<ShareButtons
			{title}
			{link}
			isDark={!$page.url.pathname.includes('projects/dnd-dice') &&
				!($page.url.pathname === '/projects/color-picker' && !w3color($settings.color).isDark())}
		/>
	</div>

	<SmallFooter />

	<Toast />
</div>

<style lang="postcss">
	/* Special layout styles for DND dice */
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
