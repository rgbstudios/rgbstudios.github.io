<script>
	import { onMount } from 'svelte';

	import '../../app.css';

	import ShareButtons from '../../components/ShareButtons.svelte';
	import SmallFooter from '../../components/SmallFooter.svelte';
	import ModalManager from '../../components/ModalManager.svelte';

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
