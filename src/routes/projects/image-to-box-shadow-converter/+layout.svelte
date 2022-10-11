<script>
	import { onMount } from 'svelte';

	// prepare canvas
	let canvas = null;
	let canvasContext = null;
	let image = null;
	let shadows = [];

	let pixelsPerShadow = 5; // How many Pixels Per Shadow?
	let pixelsPerShadowPixel = 5; //
	let shadowSpaceX = 0;
	let shadowSpaceY = 0;
	let boxShadow = '';

	// references / storage
	let pixels = [];
	onMount(() => {
		canvas = document.createElement('canvas');
		canvasContext = canvas.getContext('2d');
		canvas.width = image.width;
		canvas.height = image.height;
		canvasContext.drawImage(
			image,
			0,
			0,
			image.width,
			image.height,
			0,
			0,
			image.width,
			image.height
		);
		pixels = canvasContext.getImageData(0, 0, image.width, image.height).data;
		getShadows();
	});

	function getShadows() {
		let shadows = '';

		const imageWidth = image.width;
		const imageHeight = image.height;

		for (let x = 0; x < imageWidth; x += pixelsPerShadow) {
			for (let y = 0; y < imageHeight; y += pixelsPerShadow) {
				const pixelIndex = y * imageWidth * 4 + x * 4;
				const xx = x / pixelsPerShadow;
				const yy = y / pixelsPerShadow;

				shadows += `${xx * pixelsPerShadowPixel + xx * (shadowSpaceX * pixelsPerShadowPixel)}px ${
					yy * pixelsPerShadowPixel + yy * (shadowSpaceY * pixelsPerShadowPixel)
				}px 0 ${pixelsPerShadowPixel}px rgb(${pixels[pixelIndex]},${pixels[pixelIndex + 1]},${
					pixels[pixelIndex + 2]
				}),`;
			}
		}

		boxShadow = shadows.slice(0, shadows.length - 1) + ';';
	}
</script>

<div class="flex h-screen flex-col">
	<div class="bg-light-200 w-full p-3">
		<!-- Image <input type="file" bind:this={image} on:change={() => } /> -->
		Pixels Per Shadow
		<input type="number" min="1" max="50" bind:value={pixelsPerShadow} on:change={getShadows} />
		Shadow Pixel Size
		<input type="number" min="1" bind:value={pixelsPerShadowPixel} on:change={getShadows} />px Space
		X <input type="number" min="0" bind:value={shadowSpaceX} on:change={getShadows} />px Space Y
		<input type="number" min="0" bind:value={shadowSpaceY} on:change={getShadows} />px
	</div>
	<div class="flex-1">
		<div style={'width: 0px; height: 0px; box-shadow:' + boxShadow} />
		<img src="/amsterdam-3350566_1920.jpg" bind:this={image} class="opacity-0" />
	</div>
</div>

<style>
	input {
		color: black;
	}
</style>
