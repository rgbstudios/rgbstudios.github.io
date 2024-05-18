<script lang="ts">
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { bgColor, height, linesColor, margin, width } from '$lib/stores/barcode';

	/* global JsBarcode */

	let barcodeSvg: SVGSVGElement;

	$: barcodeSvg &&
		// @ts-ignore: JsBarcode is cdn loaded library
		JsBarcode(barcodeSvg, 'Hello World!', {
			width: $width,
			height: $height,
			margin: $margin,
			background: $bgColor,
			lineColor: $linesColor
		});

	function resetSettings() {
		$width = 1;
		$height = 100;
		$margin = 10;
		$linesColor = '#000000';
		$bgColor = '#FFFFFF';
	}
</script>

<Modal id="barcode-settings-modal">
	<div slot="title">Settings</div>
	<div class="grid gap-3">
		<label class="input-group">
			<span>Lines Color</span>
			<input type="color" class="input input-bordered grow" bind:value={$linesColor} />
			<span>{$linesColor}</span>
		</label>
		<label class="input-group">
			<span>Background Color</span>
			<input type="color" class="input input-bordered grow" bind:value={$bgColor} />
			<span>{$bgColor}</span>
		</label>
		<div class="divider" />
		<label class="input-group gap-4">
			<span>Width</span>
			<input type="range" min="1" max="4" class="input input-bordered grow" bind:value={$width} />
			<span>{$width}</span>
		</label>
		<label class="input-group gap-4">
			<span>Height</span>
			<input
				type="range"
				min="25"
				max="250"
				class="input input-bordered grow"
				bind:value={$height}
			/>
			<span>{$height}</span>
		</label>
		<label class="input-group gap-4">
			<span>Margin</span>
			<input type="range" min="0" max="40" class="input input-bordered grow" bind:value={$margin} />
			<span>{$margin}</span>
		</label>
		<div class="overflow-auto mx-auto">
			<svg bind:this={barcodeSvg} />
		</div>
		<div class="mx-auto">
			<button class="btn" on:click={resetSettings}>
				<Icon name="reset" /> &nbsp; Reset Settings
			</button>
		</div>
	</div>
</Modal>
