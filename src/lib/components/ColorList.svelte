<script>
	// todo keyboard, local storage?
	// handle local storage through settings where component is used
	// will use this componen t twice, one for history and one for favs
	// basically an array of items with crud opperations, plus rendering and editing and opening colors

	// future: add sorting by date and display date options

	import Icon from './Icon.svelte';
	import { settings } from '$lib/stores/color-picker';

	export let items = [];
	export let modal;
	export let copyText;

	let lastTimestamp;

	const remove = (timestamp) => {
		items = items.filter((item) => item.timestamp != timestamp);
	};

	export const add = (item) => {
		if (contains(item.color)) return;

		// 100ms timeout for creating new items
		if (Date.now() - lastTimestamp < 100) return;
		lastTimestamp = Date.now();

		items = [
			{
				...item,
				timestamp: Date.now()
			},
			...items
		];
	};

	export const contains = (color) => items.some((x) => x.color === color);

	export const set = (newItems) => (items = newItems);

	const removeAll = () => (items = []);
</script>

{#if items && items.length > 0}
	<p>{items.length} items</p>
	<button class="btn my-2" on:click={removeAll}>
		<Icon name="close" class="inline w-4 h-4" />
		Remove All
	</button>
	<!-- TODO: dropdown to sort by (name, date, etc) -->
	<div>
		{#each items as item, idx (item.timestamp)}
			<div class="surface grid grid-cols-2 md:grid-cols-6 gap-2 mb-2">
				<div class="col-span-2 md:col-span-3">
					<input type="text" class="w-full" placeholder="Color name" bind:value={item.name} />
				</div>
				<div>
					<div class="w-8 h-8 rounded inline-block" style="background-color: {item.color}" />
					<span>{item.color}</span>
				</div>
				<div class="md:col-span-2">
					<div class="float-right">
						<!-- <button>edit</button> -->
						<!-- <button>move</button> -->
						<!-- <button>share</button> -->
						<button class="btn" on:click={() => copyText(item.color)} title="Copy">
							<Icon name="copy" class="inline w-4 h-4" />
						</button>
						<button
							class="btn"
							on:click={() => {
								$settings.color = item.color;
								modal.hide();
							}}
							title="Open"
						>
							<Icon name="open" class="inline w-4 h-4" />
						</button>
						<!-- <button class="btn">
							<Icon name="heart" class="inline w-4 h-4" />
						</button> -->
						<button class="btn" on:click={() => remove(item.timestamp)} title="Remove">
							<Icon name="close" class="inline w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<p>No colors</p>
{/if}
