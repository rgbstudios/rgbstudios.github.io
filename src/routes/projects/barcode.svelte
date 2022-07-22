<script lang="ts">
	import jsQR from 'jsqr';
	import { page } from '$app/stores';
	import copyText from '$lib/util/copyText';

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
	import { browser } from '$app/env';
	let errorMsg: string = '';
	let barcodeCanvas: HTMLCanvasElement;
	let barcodeDataURL: string;
	let qrModalHidden: boolean = true;
	let parsedUploadString: string = '';
	let filesInput: HTMLInputElement;

	// update error message
	$: if (barcodeCanvas) {
		if ($text.trim() === '' || !isValid($text, $format)) errorMsg = 'Invalid Text';
		else errorMsg = '';
	}

	$: barcodeCanvas &&
		isValid($text, $format) &&
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

	function isValid(text: string, format: string): boolean {
		try {
			// @ts-ignore: JsBarcode is cdn loaded library
			JsBarcode(barcodeCanvas, text, {
				displayValue: $showLabel,
				format,
				width: $width,
				height: $height,
				margin: $margin,
				background: $bgColor,
				lineColor: $linesColor
			});
			return true;
		} catch {
			return false;
		}
	}

	/// METHODS ///
	function download() {
		barcodeDataURL = barcodeCanvas.toDataURL('image/png');
	}

	function copy() {
		updateParams();
		copyText(window.location.href);
	}

	$: if (browser) {
		$width, $height, $margin, $showLabel, $format, $linesColor, $bgColor, $text;
		updateParams();
	}

	function updateParams() {
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
		history.replaceState(null, null, '?' + stringParams);
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

	async function handleFiles(e: Event) {
		const inp = e.target as HTMLInputElement;
		const file = inp.files[0] as File;
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
				} else {
					parsedUploadString = 'No QR Code found';
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
			{errorMsg}
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
		<label class="flex items-center gap-3 cursor-pointer">
			<input type="checkbox" bind:checked={$showLabel} class="checkbox" />
			<span class="label-text">Display barcode label</span>
		</label>
		<ModalButton _for="barcode-settings-modal"><Icon name="settings" /> &nbsp; Settings</ModalButton
		>
		<SettingsModal />
	</div>
	<div class:hidden={!!errorMsg} class="contents">
		<div class="mx-auto">
			<canvas bind:this={barcodeCanvas} />
		</div>
		<div class="btn-group mx-auto gap-1">
			<a
				on:click={download}
				href={barcodeDataURL}
				download="barcode-{$text.toLowerCase().split(' ').join('-')}.png"
				class="btn"
			>
				<Icon name="download" /> &nbsp; Download
			</a>
			<button class="btn" on:click={copy}><Icon name="copy" /> &nbsp; Copy</button>
		</div>
		<div class="alert">
			<div>
				<Icon name="info" />
				<span>Right click the image and click "Copy image" to copy it.</span>
			</div>
		</div>
	</div>
	<div class="btn-group mx-auto gap-1">
		<ModalButton _for="barcode-qr-modal">
			<Icon name="qrcode" /> &nbsp; QR Code
		</ModalButton>
		<QrModal bind:hidden={qrModalHidden} />
		<ScanQrModal />
		<ModalButton _for="barcode-scan-qr-modal">
			<Icon name="video_camera" /> &nbsp; Scan QR Code
		</ModalButton>
		<ModalButton _for="barcode-qr-upload-modal" on:click={loadImg}>
			<Icon name="upload" /> &nbsp; Upload QR Code
		</ModalButton>
		<Modal id="barcode-qr-upload-modal">
			<div slot="title">Upload QR</div>
			<p class:text-error={parsedUploadString === 'No QR Code found'}>
				{parsedUploadString}
			</p>
		</Modal>
	</div>
	<div class="divider" />
	<div class="btn-group mx-auto gap-1">
		<ModalButton _for="barcode-wifi-qr-modal">
			<Icon name="wifi" /> &nbsp; Wifi QR Code
		</ModalButton>
		<WifiQrModal />
	</div>
</div>
<input type="file" style="display: none" on:change={handleFiles} bind:this={filesInput} />
