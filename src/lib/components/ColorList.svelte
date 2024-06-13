<script>
	// todo keyboard, local storage?
	// handle local storage through settings where component is used
	// will use this componen t twice, one for history and one for favs
	// basically an array of items with crud opperations, plus rendering and editing and opening colors

	// future: add sorting by date and display date options

	import Icon from './Icon.svelte';
	import { settings } from '$lib/stores/color-picker';

	import copyText from '$lib/util/copyText';

	export let settingName;

	let lastTimestamp;

	const remove = (timestamp) => {
		/// NOTE: this line closes the modal (no idea why)
		$settings[settingName] = $settings[settingName].filter((item) => item.timestamp != timestamp);
		$settings = $settings;
	};

	export const add = (item) => {
		if (contains(item.color)) return;

		// 100ms timeout for creating new $settings[settingName]
		if (Date.now() - lastTimestamp < 100) return;
		lastTimestamp = Date.now();

		$settings[settingName] = [
			{
				...item,
				timestamp: Date.now()
			},
			...$settings[settingName]
		];
		$settings = $settings;
	};

	export const contains = (color) => $settings[settingName].some((x) => x.color === color);

	export const set = (newItems) => {
		$settings[settingName] = newItems;
		$settings = $settings;
	};

	const removeAll = () => {
		$settings[settingName] = [];
		$settings = $settings;
	};
</script>

{#if $settings[settingName] && $settings[settingName].length > 0}
	<p>{$settings[settingName].length} items</p>
	<button class="btn my-2" on:click={removeAll}>
		<Icon name="close" class="inline w-4 h-4" />
		Remove All
	</button>
	<!-- TODO: dropdown to sort by (name, date, etc) -->
	<div>
		{#each $settings[settingName] as item (item.timestamp)}
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
							tabindex="0"
							class="btn"
							on:click={() => ($settings.color = item.color)}
							title="Open"
						>
							<Icon name="open" class="inline w-4 h-4" />
						</button>
						<!-- <button class="btn">
							<Icon name="heart" class="inline w-4 h-4" />
						</button> -->
						<button
							type="button"
							class="btn"
							on:click={() => remove(item.timestamp)}
							title="Remove"
						>
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

<style lang="postcss">
	p {
		@apply leading-relaxed text-base md:text-lg;
	}
</style>
