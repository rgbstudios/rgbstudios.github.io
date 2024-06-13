<script>
	import w3color from '$lib/util/external/w3color';
	import Icon from './Icon.svelte';
	import { settings } from '$lib/stores/color-picker';

	export let color;

	$: c = w3color(color);

	function hslToHex(str) {
		return w3color(str).toHexString();
	}
	function hslToRgb(str) {
		return w3color(str).toRgbString();
	}
</script>

<h3 class="mb-4">Hue</h3>
<div class="overflow-x-auto">
	<table>
		<tr>
			<th></th>
			<th>Hue</th>
			<th>Hex</th>
			<th>RGB</th>
			<th>HSL</th>
		</tr>
		{#each [...Array(24).keys()]
			.map((i) => i * 15)
			.concat(c.hue)
			.sort((a, b) => a - b) as hue}
			{@const loopColor = `hsl(${hue}, ${Math.round(c.sat * 100)}%, ${Math.round(c.lightness * 100)}%)`}
			{@const isCurrent = hue === c.hue}
			<tr class:font-bold={isCurrent}>
				<td class="w-16 h-4" style="background-color: {loopColor}"></td>
				<td>
					{hue}
				</td>
				<td>
					{hslToHex(loopColor)}
				</td>
				<td>
					{hslToRgb(loopColor)}
				</td>
				<td>
					{loopColor}
					<button
						class="btn btn-sm ml-4"
						on:click={() => ($settings.color = hslToHex(loopColor))}
						title="Open"
					>
						<Icon name="open" class="inline w-4 h-4" />
					</button>
				</td>
			</tr>
		{/each}
	</table>
</div>

<h3 class="mt-10 mb-4">Saturation</h3>
<div class="overflow-x-auto">
	<table>
		<tr>
			<th></th>
			<th>Saturation</th>
			<th>Hex</th>
			<th>RGB</th>
			<th>HSL</th>
		</tr>
		{#each [...Array(21).keys()]
			.map((i) => i * 5)
			.concat(c.sat * 100)
			.sort((a, b) => a - b) as saturation}
			{@const loopColor = `hsl(${c.hue}, ${Math.round(saturation)}%, ${Math.round(c.lightness * 100)}%)`}
			{@const isCurrent = saturation === c.sat * 100}
			<tr class:font-bold={isCurrent}>
				<td class="w-16 h-4" style="background-color: {loopColor}"></td>
				<td>
					{Math.round(saturation)}%
				</td>
				<td>
					{hslToHex(loopColor)}
				</td>
				<td>
					{hslToRgb(loopColor)}
				</td>
				<td>
					{loopColor}
					<button
						class="btn btn-sm ml-4"
						on:click={() => ($settings.color = hslToHex(loopColor))}
						title="Open"
					>
						<Icon name="open" class="inline w-4 h-4" />
					</button>
				</td>
			</tr>
		{/each}
	</table>
</div>

<h3 class="mt-10 mb-4">Lightness</h3>
<div class="overflow-x-auto">
	<table>
		<tr>
			<th></th>
			<th>Lightness</th>
			<th>Hex</th>
			<th>RGB</th>
			<th>HSL</th>
		</tr>
		{#each [...Array(21).keys()]
			.map((i) => i * 5)
			.concat(c.lightness * 100)
			.sort((a, b) => a - b) as lightness}
			{@const loopColor = `hsl(${c.hue}, ${Math.round(c.sat * 100)}%, ${Math.round(lightness)}%)`}
			{@const isCurrent = lightness === c.lightness * 100}
			<tr class:font-bold={isCurrent}>
				<td class="w-16 h-4" style="background-color: {loopColor}"></td>
				<td>
					{Math.round(lightness)}%
				</td>
				<td>
					{hslToHex(loopColor)}
				</td>
				<td>
					{hslToRgb(loopColor)}
				</td>
				<td>
					{loopColor}
					<button
						class="btn btn-sm ml-4"
						on:click={() => ($settings.color = hslToHex(loopColor))}
						title="Open"
					>
						<Icon name="open" class="inline w-4 h-4" />
					</button>
				</td>
			</tr>
		{/each}
	</table>
</div>

<style lang="postcss">
	h3 {
		@apply tracking-widest sm:text-xl md:text-2xl;
	}
	.btn {
		@apply p-2 bg-white hover:bg-base-100 text-base-900 border-0;
	}

	table {
		min-width: 100%;
	}
	th,
	td {
		padding: 0.5rem 1rem;
		white-space: nowrap;
	}
	th {
		text-align: left;
	}
</style>
