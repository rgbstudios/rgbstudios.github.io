<script lang="ts">
	// todo: conversion ratio for formulas like temperature should be displayed better
	import { converter, type ConversionResult } from '$lib/util/convertUnits';

	let value: number | null = null;
	let fromUnit: string = '';
	let measure: string = 'length';
	let results: ConversionResult[] = [];

	// Fetch available measure categories (e.g., length, mass, etc.)
	const measures: string[] = converter.getMeasures();

	// Handle input changes (parse the value and unit)
	function handleInputChange(event: Event) {
		const input = (event.target as HTMLInputElement).value;
		const parsedValue = parseFloat(input);
		value = !isNaN(parsedValue) ? parsedValue : null;
	}

	// Reactive block to update conversion results when value and unit are provided
	$: if (value !== null && fromUnit && measure) {
		try {
			results = converter.convert(value.toString(), fromUnit, measure); // Pass the value as string
		} catch (error) {
			console.error('Conversion error:', error);
			results = [];
		}
	} else {
		results = [];
	}
</script>

<div class="mx-auto p-4 max-w-2xl">
	<div class="flex flex-wrap gap-2 mb-4">
		<input
			type="number"
			step="0.1"
			placeholder="Enter value"
			on:input={handleInputChange}
			class="input flex-1"
			bind:value
		/>

		<select bind:value={fromUnit} class="select">
			<option value="" disabled selected>Select unit</option>
			{#each converter.getUnits(measure) as unit}
				<option value={unit}>{unit}</option>
			{/each}
		</select>

		<select on:change={() => (fromUnit = '')} bind:value={measure} class="select">
			<option value="" disabled>Select category</option>
			{#each measures as m}
				<option value={m}>{m}</option>
			{/each}
		</select>
	</div>

	{#if results.length > 0}
		<table class="w-full">
			<thead>
				<tr>
					<th>Unit</th>
					<th>Value</th>
					<th>Conversion Formula</th>
				</tr>
			</thead>
			<tbody>
				{#each results as { unit, value: convertedValue, description }}
					<tr>
						<td>{unit}</td>
						<td>{convertedValue.toFixed(6)}</td>
						<td>
							1 {fromUnit} = {converter
								.convert('1', fromUnit, measure)
								.find((r) => r.unit === unit)
								?.value.toFixed(6)}
							{unit}
							{#if description}
								<br />
								{description}
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<style lang="postcss">
	th,
	td {
		@apply p-4 text-left border border-base-300;
	}
</style>
