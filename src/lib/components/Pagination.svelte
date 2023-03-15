<script>
	export let totalPosts, currentPage;

	const postsPerPage = 12;

	const totalPageCount = Math.ceil(totalPosts / postsPerPage);
</script>

{#if totalPageCount > 1 && currentPage !== 1}
	<a class="btn btn-outline" href="/blog/page/{currentPage - 1}" rel="prev">&lt;</a>
{/if}

{#each Array(totalPageCount) as _, i}
	{#if currentPage !== i + 1}
		<a class="btn btn-outline" href="/blog/page/{i + 1}">{i + 1}</a>
	{:else}
		<span class="btn btn-outline border-0">{i + 1}</span>
	{/if}
{/each}

{#if totalPageCount > 1 && currentPage !== totalPageCount}
	<a class="btn btn-outline" href="/blog/page/{currentPage + 1}" rel="next">&gt;</a>
{/if}
