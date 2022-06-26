<script context="module">
	export const load = ({ error, status }) => ({
		props: {
			error,
			status
		}
	});
</script>

<script>
	export let error, status;
</script>

<svelte:head>
	<title>Error {status === 404 ? ' 404' : ''}</title>
</svelte:head>

<div class="container mx-auto py-8">
	<article class="prose lg:prose-xl mx-auto">
		{#if status === 404}
			<h1 class="text-center">The resource could not be found</h1>
		{/if}

		<p>{error.name} {status} &mdash; {error.message}</p>

		<a href="/" class="btn btn-primary no-underline">Go back home</a>
	</article>
</div>
