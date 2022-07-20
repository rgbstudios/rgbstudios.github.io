<script lang="ts">
	import jsQR from 'jsqr';
	import { page } from '$app/stores';

	/// COMPONENTS ///
	import Icon from '$lib/components/Icon.svelte';
	import ModalButton from '$lib/components/base/ModalButton.svelte';
	import SettingsModal from '$lib/components/modals/barcode/SettingsModal.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import QrModal from '$lib/components/modals/barcode/QRModal.svelte';
	import ScanQrModal from '$lib/components/modals/barcode/ScanQRModal.svelte';
	import WifiQrModal from '$lib/components/modals/barcode/WifiQRModal.svelte';
	import Modal from '$lib/components/base/Modal.svelte';

	/// STATE ///
	import { barcodeFormats } from '$lib/data/consts';
	import {
		format,
		showLabel,
		bgColor,
		height,
		linesColor,
		margin,
		width,
		text
	} from '$lib/stores/barcode';
	let errorMsg: string = '';
	let barcodeCanvas: HTMLCanvasElement;
	let barcodeDataURL: string;
	let qrModalHidden: boolean = true;
	let parsedUploadString: string = '';
	let filesInput: HTMLInputElement;

	// update error message
	$: if ($text.trim() === '') errorMsg = 'Invalid Text';
	else errorMsg = '';

	$: barcodeCanvas &&
		// @ts-ignore: JsBarcode is cdn loaded library
		JsBarcode(barcodeCanvas, $text, {
			displayValue: $showLabel,
			format: $format,
			width: $width,
			height: $height,
			margin: $margin,
			background: $bgColor,
			lineColor: $linesColor
		});

	$: parseURL($page.url.searchParams);

	/// METHODS ///
	function download() {
		barcodeDataURL = barcodeCanvas.toDataURL('image/png');
	}

	function copy() {
		let queryParams = new URLSearchParams(window.location.search);
		queryParams.set('width', String($width));
		queryParams.set('height', String($height));
		queryParams.set('margin', String($margin));
		queryParams.set('label', String($showLabel ? 1 : 0));
		queryParams.set('format', $format);
		queryParams.set('lc', $linesColor);
		queryParams.set('bgc', $bgColor);
		queryParams.set('q', $text);
		queryParams.set('isqr', '0');
		let stringParams = queryParams.toString();
		stringParams
			? history.replaceState(null, null, '?' + stringParams)
			: history.replaceState(null, null);
	}

	function parseURL(params: URLSearchParams) {
		const w = Number(params.get('width'));
		if (w) $width = w;
		const h = Number(params.get('height'));
		if (h) $height = h;
		const m = Number(params.get('margin'));
		if (m) $margin = m;
		const l = Boolean(Number(params.get('label')));
		if (l) $showLabel = l;
		const lc = params.get('lc');
		if (lc) $linesColor = lc;
		const bgc = params.get('bgc');
		if (bgc) $bgColor = bgc;
		const f = params.get('format');
		if (f) $format = f;
		const q = params.get('q');
		if (q) $text = q;
		const isQr = Boolean(Number(params.get('isqr')));
		qrModalHidden = !isQr;
	}

	function loadImg() {
		filesInput.click();
	}

	async function handleFiles(e) {
		const file = e.target.files[0] as File;
		const reader = new FileReader();
		reader.addEventListener('loadend', () => {
			const dataURL = reader.result as string;
			const canvas = document.createElement('canvas');
			const img = new Image();
			img.addEventListener('load', () => {
				canvas.width = img.naturalWidth || img.width;
				canvas.height = img.naturalHeight || img.height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const code = jsQR(imageData.data, imageData.width, imageData.height, {
					inversionAttempts: 'dontInvert'
				});
				if (code) {
					parsedUploadString = code.data;
				}
			});
			img.src = dataURL;
		});
		reader.readAsDataURL(file);
	}
</script>

<svelte:head>
	<script src="https://unpkg.com/jsbarcode@latest/dist/JsBarcode.all.min.js"></script>
</svelte:head>
<ProjectHeader
	title="Barcode Generator"
	description="Use Barcode Generator to generate a barcode for any text, then save or share the image"
	keywords={[
		'barcode',
		'barcode generator',
		'generator',
		'bar code',
		'bar code generator',
		'code generator',
		'code creator',
		'create',
		'qr code',
		'qr reader',
		'qr code reader',
		'qr upload',
		'qr upload image',
		'qr upload photo',
		'qr scanner',
		'qr code scanner',
		'qr download',
		'qr online',
		'qr code online',
		'qr free',
		'qr code free'
	]}
	icon="img/projects/icons/barcode.png"
	screenshot="img/projects/screenshots/barcode.png"
/>
<div class="grid gap-5 mt-5">
	<label class="input-group">
		<span>Barcode Text</span>
		<input
			type="text"
			required
			placeholder="Enter text for your barcode..."
			class="input input-bordered grow"
			bind:value={$text}
		/>
	</label>
	{#if errorMsg !== ''}
		<div class="alert alert-error shadow-lg">
			<div>
				<Icon name="close" />
				<span>Barcode Text is required</span>
			</div>
		</div>
	{/if}
	<div class="grid gap-5 lg:grid-cols-[auto,auto,auto] md:grid-cols-[auto,auto]">
		<label class="input-group">
			<span>Format</span>
			<select class="select select-bordered max-w-xs" bind:value={$format}>
				{#each barcodeFormats as f}
					<option>{f}</option>
				{/each}
			</select>
		</label>
		<label class="label cursor-pointer">
			<span class="label-text">Display barcode label</span>
			<input type="checkbox" bind:checked={$showLabel} class="checkbox" />
		</label>
		<ModalButton _for="barcode-settings-modal"><Icon name="settings" />Settings</ModalButton>
		<SettingsModal />
	</div>
	<div class="mx-auto">
		<canvas bind:this={barcodeCanvas} />
	</div>
	<div class="btn-group mx-auto gap-1">
		<a
			on:click={download}
			href={barcodeDataURL}
			download="barcode-{$text.toLowerCase().split(' ').join('-')}.png"
			class="btn"><Icon name="download" />Download</a
		>
		<button class="btn" on:click={copy}><Icon name="copy" />Copy</button>
	</div>
	<div class="alert">
		<div>
			<Icon name="info" />
			<span>Right click the image and click "Copy image" to copy it.</span>
		</div>
	</div>
	<div class="btn-group mx-auto gap-1">
		<ModalButton _for="barcode-qr-modal">QR Code</ModalButton>
		<QrModal bind:hidden={qrModalHidden} />
		<ModalButton _for="barcode-scan-qr-modal">Scan QR Code</ModalButton>
		<ScanQrModal />
		<ModalButton _for="barcode-scan-qr-modal">Scan QR Code</ModalButton>
		<ModalButton _for="barcode-qr-upload-modal" on:click={loadImg}
			><Icon name="upload" />Upload QR Code</ModalButton
		>
		<Modal id="barcode-qr-upload-modal">
			<div slot="title">Upload QR</div>
			<p>
				{parsedUploadString}
			</p>
		</Modal>
	</div>
	<div class="divider" />
	<div class="btn-group mx-auto gap-1">
		<ModalButton _for="barcode-wifi-qr-modal">Wifi QR Code</ModalButton>
		<WifiQrModal />
	</div>
</div>
<input type="file" style="display: none" on:change={handleFiles} bind:this={filesInput} />
