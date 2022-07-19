<script lang="ts">
	import QRCode from 'qrcode';
	import jsQR from 'jsqr';

	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';

	import { bgColor, linesColor, margin, text } from '$lib/stores/barcode';
	let video: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let qrDataURL: string;
	let streamObj;
	let found: boolean = false;
	let loadingMessage: string = '';
	let output: string = '';
	export let hidden: boolean = true;

	// get webcam feed if available
	function startScan() {
		navigator.mediaDevices
			.getUserMedia({ video: { facingMode: 'environment' } })
			.then(handleVideo)
			.catch(videoError);
	}

	function handleVideo(stream) {
		// if found attach feed to video element
		streamObj = stream;
		video.srcObject = stream;
		video.play();
		requestAnimationFrame(tick);
	}

	function videoError(e) {
		// no webcam found - do something
	}

	function stopScan() {
		const tracks = streamObj.getTracks();
		tracks.forEach((track) => track.stop());
	}

	function drawLine(begin, end, color) {
		const ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(begin.x, begin.y);
		ctx.lineTo(end.x, end.y);
		ctx.lineWidth = 4;
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	function drawQuad(points, color) {
		drawLine(points[0], points[1], color);
		drawLine(points[1], points[2], color);
		drawLine(points[2], points[3], color);
		drawLine(points[3], points[0], color);
	}

	function tick() {
		if (found) {
			stopScan();
			return;
		}

		if (video.readyState === video.HAVE_ENOUGH_DATA) {
			const ctx = canvas.getContext('2d');
			loadingMessage = '';
			canvas.height = video.videoHeight;
			canvas.width = video.videoWidth;
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			let code = jsQR(imageData.data, imageData.width, imageData.height, {
				inversionAttempts: 'dontInvert'
			});
			if (code) {
				let loc = code.location;
				drawQuad(
					[loc.topLeftCorner, loc.topRightCorner, loc.bottomRightCorner, loc.bottomLeftCorner],
					'#933'
				);

				if (code.data.substring(0, 4) == 'http') {
					// if website then display as clickable link
					output = '<a href="' + code.data + '" target="_blank">' + code.data + '</a>';
				} else {
					output = code.data;
				}
				found = true;
			}
		} else {
			loadingMessage = 'Loading video...';
		}
		requestAnimationFrame(tick);
	}

	function onOpen() {
		startScan();
	}

	function restartScan() {
		found = false;
		stopScan();
		startScan();
	}
</script>

<Modal id="barcode-scan-qr-modal" bind:hidden on:open={onOpen}>
	<div slot="title">Scan QR Code</div>
	<div class="grid gap-3">
		<video bind:this={video} playsinline class="hidden" />
		{#if loadingMessage}
			<p>{loadingMessage}</p>
		{/if}
		<canvas bind:this={canvas} />
		{#if output}
			<p><strong>Data:</strong>{@html output}</p>
		{/if}
		<div class="mx-auto">
			<button class="btn" on:click={restartScan}><Icon name="reset" />Restart Scan</button>
		</div>
	</div>
</Modal>
