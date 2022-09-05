<script lang="ts">
	import screenfull from 'screenfull';
	import { onMount, tick } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let canvas: HTMLCanvasElement;
	let uiHidden: boolean = false;
	let radius: number = 10;
	let colorsVisible: boolean = true;
	let currentTool: 'draw' | 'fill' = 'draw';
	let currentColor: string = 'hsl(0,0%,0%)';
	let isClicking: boolean = false;
	let oldImages = [];
	let filesInput: HTMLInputElement;
	let printing: boolean = false;
	$: canvas && setRad(radius);

	const colors = [];
	colors.push('hsl(0,0%,0%)');
	colors.push('hsl(0,0%,25%)');
	colors.push('hsl(0,0%,50%)');
	colors.push('hsl(0,0%,75%)');
	colors.push('hsl(0,0%,100%)');
	for (let i = 0; i < 360; i += 30) {
		colors.push('hsl(' + i + ',100%,25%)');
	}
	for (let i = 0; i < 360; i += 30) {
		colors.push('hsl(' + i + ',100%,50%)');
	}
	for (let i = 0; i < 360; i += 30) {
		colors.push('hsl(' + i + ',100%,75%)');
	}

	function toggleSwatch() {
		colorsVisible = !colorsVisible;
	}

	/// FILL ///

	// https://codepen.io/Geeyoam/pen/vLGZzG
	function getColorAtPixel(imageData, x, y) {
		const { width, data } = imageData;

		return {
			r: data[4 * (width * y + x) + 0],
			g: data[4 * (width * y + x) + 1],
			b: data[4 * (width * y + x) + 2],
			a: data[4 * (width * y + x) + 3]
		};
	}

	function setColorAtPixel(imageData, color, x, y) {
		const { width, data } = imageData;

		data[4 * (width * y + x) + 0] = color.r & 0xff;
		data[4 * (width * y + x) + 1] = color.g & 0xff;
		data[4 * (width * y + x) + 2] = color.b & 0xff;
		data[4 * (width * y + x) + 3] = color.a & 0xff;
	}

	function colorMatch(a, b) {
		return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
	}

	function getColorForFloodFill() {
		const ctx = canvas.getContext('2d');
		let tmp = { r: 0x0, g: 0x0, b: 0x0, a: 0xff };
		const style = ctx.strokeStyle as string;
		tmp.r = parseInt(style.slice(1, 3), 16);
		tmp.g = parseInt(style.slice(3, 5), 16);
		tmp.b = parseInt(style.slice(5, 7), 16);
		return tmp;
	}

	function floodFill(imageData, newColor, x, y) {
		const { width, height, data } = imageData;
		const stack = [];
		const baseColor = getColorAtPixel(imageData, x, y);
		let operator = { x, y };

		// Check if base color and new color are the same
		if (colorMatch(baseColor, newColor)) {
			return;
		}

		// Add the clicked location to stack
		stack.push({ x: operator.x, y: operator.y });

		while (stack.length) {
			operator = stack.pop();
			let contiguousDown = true; // Vertical is assumed to be true
			let contiguousUp = true; // Vertical is assumed to be true
			let contiguousLeft = false;
			let contiguousRight = false;

			// Move to top most contiguousDown pixel
			while (contiguousUp && operator.y >= 0) {
				operator.y--;
				contiguousUp = colorMatch(getColorAtPixel(imageData, operator.x, operator.y), baseColor);
			}

			// Move downward
			while (contiguousDown && operator.y < height) {
				setColorAtPixel(imageData, newColor, operator.x, operator.y);

				// Check left
				if (
					operator.x - 1 >= 0 &&
					colorMatch(getColorAtPixel(imageData, operator.x - 1, operator.y), baseColor)
				) {
					if (!contiguousLeft) {
						contiguousLeft = true;
						stack.push({ x: operator.x - 1, y: operator.y });
					}
				} else {
					contiguousLeft = false;
				}

				// Check right
				if (
					operator.x + 1 < width &&
					colorMatch(getColorAtPixel(imageData, operator.x + 1, operator.y), baseColor)
				) {
					if (!contiguousRight) {
						stack.push({ x: operator.x + 1, y: operator.y });
						contiguousRight = true;
					}
				} else {
					contiguousRight = false;
				}

				operator.y++;
				contiguousDown = colorMatch(getColorAtPixel(imageData, operator.x, operator.y), baseColor);
			}
		}
	}

	function doFill(e: MouseEvent) {
		if (currentTool != 'fill') return false;
		const ctx = canvas.getContext('2d');
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const col = getColorForFloodFill();
		const rect = canvas.getBoundingClientRect();
		const x = Math.round(e.clientX - rect.left);
		const y = Math.round(e.clientY - rect.top);
		floodFill(imageData, col, x, y);
		ctx.putImageData(imageData, 0, 0);
	}

	/// DRAWING ///

	function engage(e) {
		saveOld();
		if (currentTool != 'draw') return false;
		isClicking = true;
		putPoint(e);
	}

	function disengage() {
		const ctx = canvas.getContext('2d');
		isClicking = false;
		ctx.beginPath(); // clear old path
	}

	function putPoint(e) {
		const ctx = canvas.getContext('2d');
		if (isClicking) {
			let x, y;
			if (e.offsetX) {
				x = e.offsetX;
				y = e.offsetY;
			} else {
				let touch = e.touches[0];
				x = touch.pageX;
				y = touch.pageY;
			}
			ctx.lineTo(x, y); // connect to previous click
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, 2 * Math.PI);
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(x, y);
		}
	}

	function saveOld() {
		const ctx = canvas.getContext('2d');
		// anything that edits the image should call this function first
		if (oldImages.length > 29) {
			oldImages = oldImages.slice(1, 29);
		}
		oldImages.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
	}

	function undo() {
		const ctx = canvas.getContext('2d');
		if (oldImages.length != 0) {
			ctx.putImageData(oldImages.pop(), 0, 0);
			// ctx.putImageData(oldImages[oldImages.length - 1], 0, 0);
			// oldImages.pop();
		}
	}

	function setColor(color: string) {
		const ctx = canvas.getContext('2d');
		currentColor = color;
		ctx.fillStyle = currentColor;
		ctx.strokeStyle = currentColor;
	}

	function onResize() {
		const ctx = canvas.getContext('2d');
		let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
		canvas.width = canvas.getBoundingClientRect().width;
		canvas.height = canvas.getBoundingClientRect().height;
		ctx.putImageData(img, 0, 0);
		setColor(currentColor);
		setRad(radius);
	}

	function setRad(rad: number) {
		const ctx = canvas.getContext('2d');
		ctx.lineWidth = 2 * rad;
	}

	/// FILES ///

	function saveImg() {
		const data = canvas.toDataURL('image/png');
		const newWindow = window.open('about:blank', 'image from canvas');
		newWindow.document.write('<img src="' + data + '">');
	}

	function deleteImg() {
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let oldStyle = ctx.fillStyle;
		ctx.fillStyle = '#fff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = oldStyle;
	}

	function loadImg() {
		filesInput.click();
	}

	function handleFiles(e) {
		const ctx = canvas.getContext('2d');
		const file = e.target.files[0];
		let img = new Image();
		if (file) {
		}
		img.onload = function () {
			ctx.drawImage(img, 0, 0);
		};
		img.src = URL.createObjectURL(e.target.files[0]);
	}

	/// FILTERS ///

	function invert() {
		const ctx = canvas.getContext('2d');
		saveOld();
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		let data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			data[i] = 255 - data[i]; // r
			data[i + 1] = 255 - data[i + 1]; // g
			data[i + 2] = 255 - data[i + 2]; // b
		}
		ctx.putImageData(imageData, 0, 0);
	}

	function grayscale() {
		const ctx = canvas.getContext('2d');
		saveOld();
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		let data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
			data[i] = avg; // r
			data[i + 1] = avg; // g
			data[i + 2] = avg; // b
		}
		ctx.putImageData(imageData, 0, 0);
	}

	function darken() {
		const ctx = canvas.getContext('2d');
		saveOld();
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		let data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			data[i] = 0.5 * data[i]; // r
			data[i + 1] = 0.5 * data[i + 1]; // g
			data[i + 2] = 0.5 * data[i + 2]; // b
		}
		ctx.putImageData(imageData, 0, 0);
	}

	function lighten() {
		const ctx = canvas.getContext('2d');
		saveOld();
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		let data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			data[i] = 255 - 0.5 * (255 - data[i]); // r
			data[i + 1] = 255 - 0.5 * (255 - data[i + 1]); // g
			data[i + 2] = 255 - 0.5 * (255 - data[i + 2]); // b
		}
		ctx.putImageData(imageData, 0, 0);
	}

	/// LIFECYCLE HOOKS ///
	onMount(() => {
		const ctx = canvas.getContext('2d');
		onResize();
		ctx.fillStyle = 'white';
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fill();
		ctx.beginPath();
		setColor(currentColor);
	});
</script>

<svelte:window on:resize={onResize} />

<SEO
	title="Doodle Pad | RGB Studios"
	description="A simple website to doodle in your browser"
	keywords={['doodle', 'draw', 'pad', 'drawing']}
	icon="img/projects/icons/doodle-pad.png"
	screenshot="img/projects/screenshots/doodle-pad.png"
/>

<div class="h-screen flex flex-col relative">
	{#if !uiHidden}
		<div
			class="p-3 inline-flex gap-2 align-center flex-wrap absolute top-0 bg-base-900"
			class:hidden={printing}
		>
			<!-- COLORS -->
			<label class="flex gap-2 align-center">
				Brush size:
				<input type="range" min="1" max="30" bind:value={radius} />
			</label>
			<label class="flex gap-2 align-center">
				<button class="btn btn-sm" on:click={toggleSwatch}>
					<Icon name="swatch" /> &nbsp; Toggle Swatches
				</button>
			</label>
			{#if colorsVisible}
				<div class="flex flex-wrap gap-1">
					{#each colors as color}
						<button
							style:background-color={color}
							class="w-[30px] h-[30px] inline-block"
							class:border-2={color === currentColor}
							on:click={() => setColor(color)}
						/>
					{/each}
				</div>
			{/if}
			<div class="btn-group">
				<button
					class="btn btn-sm"
					class:btn-active={currentTool === 'draw'}
					on:click={() => (currentTool = 'draw')}>Brush</button
				>
				<button
					class="btn btn-sm"
					class:btn-active={currentTool === 'fill'}
					on:click={() => (currentTool = 'fill')}>Fill</button
				>
			</div>
			<div class="btn-group">
				<button class="btn btn-sm" on:click={undo} title="Undo">
					<Icon name="undo" />
				</button>
				<button class="btn btn-sm" on:click={deleteImg} title="Clear">
					<Icon name="trash" />
				</button>
				<button class="btn btn-sm" on:click={loadImg} title="Upload">
					<Icon name="upload" />
				</button>
				<button class="btn btn-sm" on:click={saveImg} title="Download">
					<Icon name="download" />
				</button>
				<button
					class="btn btn-sm"
					on:click={async () => {
						printing = true;
						await tick();
						window.print();
						printing = false;
					}}
					title="Print"
				>
					<Icon name="print" />
				</button>
				<button class="btn btn-sm" on:click={() => screenfull.toggle()} title="Fullscreen">
					<Icon name="fullscreen" />
				</button>
			</div>
		</div>
	{/if}
	<canvas
		bind:this={canvas}
		class="grow cursor-pointer bg-white"
		on:click={doFill}
		on:mousedown={engage}
		on:mouseup={disengage}
		on:mousemove={putPoint}
		on:mouseleave={disengage}
		on:touchstart={engage}
		on:touchend={disengage}
		on:touchmove={putPoint}
		on:touchcancel={disengage}
	>
		Your browser does not support the canvas element
	</canvas>
	<button
		class="absolute bottom-0 m-5 btn btn-sm"
		class:hidden={printing}
		on:click={async () => {
			uiHidden = !uiHidden;
			await tick();
			onResize();
		}}
		title="Toggle UI"
	>
		<Icon name="eye" />
	</button>
	{#if !uiHidden}
		<div class="dropdown absolute bottom-0 right-0 m-5 dropdown-top dropdown-end">
			<span tabindex="0" class="btn btn-sm m-1">Filters</span>
			<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-900 rounded-box w-52">
				<li><button on:click={darken}>Darken</button></li>
				<li><button on:click={lighten}>Lighten</button></li>
				<li><button on:click={grayscale}>Grayscale</button></li>
				<li><button on:click={invert}>Invert</button></li>
			</ul>
		</div>
	{/if}
</div>
<input type="file" style="display: none" on:change={handleFiles} bind:this={filesInput} />
