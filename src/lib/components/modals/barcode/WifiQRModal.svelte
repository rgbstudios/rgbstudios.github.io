<script lang="ts">
	/// STATE ///
	import QRCode from 'qrcode';
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ModalButton from '$lib/components/base/ModalButton.svelte';
	import WifiScanHelpModal from './WifiScanHelpModal.svelte';

	/// STATE ///
	import { bgColor, linesColor, margin } from '$lib/stores/barcode';
	export let hidden: boolean = true;
	let canvas: HTMLCanvasElement;
	let qrDataURL: string;
	let auth: 'WPA' | 'WEP' = 'WPA';
	let name: string = '';
	let pass: string = '';
	let showName: boolean = false;
	let showPass: boolean = false;
	$: wifiStr = `WIFI:T:${auth};S:${name};P:${pass};;`;
	$: errorMsg = name && pass ? '' : 'Please enter a name and a password';

	/// METHODS ///
	function download() {
		qrDataURL = canvas.toDataURL('image/png');
	}

	function print() {
		qrDataURL = canvas.toDataURL('image/png');
		const win = window.open('', '', '');
		win.document.write(`<style type="text/css">
			* {
				text-align: center;
				font: 32px Arial;
				line-height: 2.5rem;
			}
			b {
				font-weight: bold; /*idk...*/
			}
			img:not(.icon) {
				padding: 0.5rem;
				margin: 1rem;
				border: 4px solid black;
				box-shadow: 0.5rem 0.5rem #999;
			}
		</style>`);
		win.document.write(`<b>Scan to automatically connect to our Wifi</b> <br>`);
		win.document.write(`<img src='${qrDataURL}'></img>`);
		if (showName) win.document.write(`<br><b>Network:</b> ${name}`);
		if (showPass) win.document.write(`<br><b>Password:</b> ${pass}`);
		win.document.close();
		win.addEventListener(
			'load',
			() => {
				win.focus();
				win.print();
				win.close();
			},
			false
		);
	}

	$: canvas &&
		QRCode.toCanvas(canvas, wifiStr, {
			margin: $margin,
			color: {
				light: $bgColor,
				dark: $linesColor
			}
		});
</script>

<Modal id="barcode-wifi-qr-modal" bind:hidden fluid>
	<div slot="title">Wifi QR Code</div>
	<div class="grid lg:grid-cols-3 grid-cols-1 gap-4">
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
		<div class="col-span-full grid gap-4 mx-auto">
			<h3 class="flex gap-3">Print Settings</h3>
			<div class="gap-4 grid">
				<label class="flex items-center gap-3 cursor-pointer">
					<input type="checkbox" bind:checked={showName} class="checkbox" />
					<span class="label-text">Show Name</span>
				</label>
				<label class="flex items-center gap-3 cursor-pointer">
					<input type="checkbox" bind:checked={showPass} class="checkbox" />
					<span class="label-text">Show Password</span>
				</label>
			</div>
		</div>
	</div>
	{#if errorMsg === ''}
		<div class="grid p-4 justify-center">
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
		<div class="alert shadow-lg mt-4 alert-error">
			{errorMsg}
		</div>
	{/if}
</Modal>
<WifiScanHelpModal />
