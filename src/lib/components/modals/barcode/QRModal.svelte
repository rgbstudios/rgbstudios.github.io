<script lang="ts">
	import QRCode from 'qrcode';
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let canvas: HTMLCanvasElement;
	import { bgColor, linesColor, margin, text } from '$lib/stores/barcode';
	let qrDataURL: string;
	export let hidden: boolean = true;

	/// METHODS ///
	function download() {
		qrDataURL = canvas.toDataURL('image/png');
	}

	function copy() {
		let queryParams = new URLSearchParams(window.location.search);
		queryParams.set('margin', String($margin));
		queryParams.set('lc', $linesColor);
		queryParams.set('bgc', $bgColor);
		queryParams.set('q', $text);
		queryParams.set('isqr', '1');
		let stringParams = queryParams.toString();
		stringParams
			? history.replaceState(null, null, '?' + stringParams)
			: history.replaceState(null, null);
	}

	$: canvas &&
		QRCode.toCanvas(canvas, $text, {
			margin: $margin,
			color: {
				light: $bgColor,
				dark: $linesColor
			}
		});

	function onClose() {
		let queryParams = new URLSearchParams(window.location.search);
		queryParams.set('margin', String($margin));
		queryParams.set('lc', $linesColor);
		queryParams.set('bgc', $bgColor);
		queryParams.set('q', $text);
		queryParams.set('isqr', '0');
		let stringParams = queryParams.toString();
		stringParams
			? history.replaceState(null, null, '?' + stringParams)
			: history.replaceState(null, null);
	}
</script>

<Modal id="barcode-qr-modal" bind:hidden on:close={onClose}>
	<div slot="title">QR Code</div>
	<div class="grid p-5 justify-center">
		<canvas bind:this={canvas} />
	</div>
	<div class="btn-group justify-center gap-1">
		<a
			on:click={download}
			href={qrDataURL}
			download="qr-{$text.toLowerCase().split(' ').join('-')}.png"
			class="btn"
		>
			<Icon name="download" /> &nbsp; Download
		</a>
		<button class="btn" on:click={copy}><Icon name="copy" /> &nbsp; Copy</button>
	</div>
</Modal>
