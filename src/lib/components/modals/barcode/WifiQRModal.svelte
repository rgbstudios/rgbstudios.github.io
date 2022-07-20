<script lang="ts">
	import QRCode from 'qrcode';
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let canvas: HTMLCanvasElement;
	import { bgColor, linesColor, margin } from '$lib/stores/barcode';
	import ModalButton from '$lib/components/base/ModalButton.svelte';
	import WifiScanHelpModal from './WifiScanHelpModal.svelte';
	let qrDataURL: string;
	export let hidden: boolean = true;
	let auth: 'WPA' | 'WEP' = 'WPA';
	let name: string = '';
	let pass: string = '';
	$: wifiStr = `WIFI:T:${auth};S:${name};P:${pass};;`;
	$: errorMsg = name && pass ? '' : 'Please enter a name and a password';

	/// METHODS ///
	function download() {
		qrDataURL = canvas.toDataURL('image/png');
	}

	$: canvas &&
		QRCode.toCanvas(canvas, wifiStr, {
			margin: $margin,
			color: {
				light: $bgColor,
				dark: $linesColor
			}
		});

	function print() {
		qrDataURL = canvas.toDataURL('image/png');
		const win = window.open(qrDataURL, '_blank');
		const iframe = `<iframe style='border: none; outline: none' width='100%' height='100%' src='${qrDataURL}'></iframe>`;
		win.document.write(iframe);
		win.print();
		win.close();
	}
</script>

<Modal id="barcode-wifi-qr-modal" bind:hidden fluid>
	<div slot="title">Wifi QR Code</div>
	<div class="grid lg:grid-cols-3 grid-cols-1 gap-5">
		<label class="input-group">
			<span>Auth Type</span>
			<select class="select select-bordered grow" bind:value={auth}>
				<option>WPA</option>
				<option>WEP</option>
			</select>
		</label>
		<label class="input-group">
			<span>Name</span>
			<input type="text" class="grow input input-bordered" bind:value={name} />
		</label>
		<label class="input-group">
			<span>Password</span>
			<input type="password" class="grow input input-bordered" bind:value={pass} />
		</label>
	</div>
	{#if errorMsg === ''}
		<div class="grid p-5 justify-center">
			<canvas bind:this={canvas} />
		</div>
		<div class="btn-group justify-center gap-1">
			<a
				on:click={download}
				href={qrDataURL}
				download="qr-wifi-{name.toLowerCase().split(' ').join('-')}.png"
				class="btn"><Icon name="download" /> &nbsp; Download</a
			>
			<button class="btn" on:click={print}>
				<Icon name="print" /> &nbsp; Print
			</button>
			<ModalButton _for="barcode-wifi-scan-help-modal">
				<Icon name="info" /> &nbsp; Help Scanning
			</ModalButton>
		</div>
	{:else}
		<div class="alert shadow-lg mt-5 alert-error">
			<div>
				<Icon name="close" />
				<span>{errorMsg}</span>
			</div>
		</div>
	{/if}
</Modal>
<WifiScanHelpModal />
