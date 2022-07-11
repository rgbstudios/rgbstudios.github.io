<script context="module" lang="ts">
	export interface TabItem {
		id: number;
		title: string;
	}
</script>

<script lang="ts">
	export let tabs: TabItem[];
	export let activeTab: TabItem['id'] = tabs[0].id;
</script>

<div class="tabs justify-center">
	{#each tabs as tab}
		<button
			class="tab tab-bordered"
			class:tab-active={activeTab === tab.id}
			on:click={() => (activeTab = tab.id)}
		>
			{tab.title}
		</button>
	{/each}
</div>
