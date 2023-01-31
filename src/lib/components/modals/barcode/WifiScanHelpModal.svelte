<script lang="ts">
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
</script>

<Modal id="barcode-wifi-scan-help-modal">
	<div slot="title"><Icon name="info" /> &nbsp; Help Scanning Wifi Codes</div>
	<div class="grid gap-4">
		<img src="/img/projects/other/wifi-scan-circle.jpg" alt="wifi-scan" />
		<p class="text-center">
			Click the icon circled in red above to scan a wifi code and instantly connect.
		</p>
	</div>
</Modal>
