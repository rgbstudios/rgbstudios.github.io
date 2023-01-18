<script>
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { resetSettings, settings } from '$lib/stores/grade-calc';
	import Screenfull from 'screenfull';
</script>

<Modal id="grade-calc-settings-modal">
	<div slot="title">Settings</div>
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Select input text on click</span>
			<input
				type="checkbox"
				class="toggle"
				bind:checked={$settings.selectOnClick}
				on:change={() => ($settings = $settings)}
			/>
		</label>
		<label class="label cursor-pointer">
			<span class="label-text">Clear input on calculate</span>
			<input
				type="checkbox"
				class="toggle"
				bind:checked={$settings.clearOnCalculate}
				on:change={() => ($settings = $settings)}
			/>
		</label>
		<label for="grade-calc-clear-data-modal" class="btn btn-error">
			<Icon name="trash" /> &nbsp; Clear All Data
		</label>
	</div>
	<div class="btn-group justify-end gap-1 mt-4">
		<button class="btn" on:click={() => Screenfull.isEnabled && Screenfull.toggle()}>
			<Icon name="fullscreen" /> &nbsp; Fullscreen
		</button>
		<button class="btn btn-error" on:click={resetSettings}>
			<Icon name="reset" /> &nbsp; Reset Settings
		</button>
	</div>
</Modal>
