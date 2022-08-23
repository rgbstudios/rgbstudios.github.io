<script>
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '../../Icon.svelte';
	import screenfull from 'screenfull';

	export let settings;
</script>

<Modal id="dnd-dice-settings-modal" class="bg-white text-gray-900">
	<div slot="title">
		<Icon name="settings" /> &nbsp; Settings
	</div>

	<label class="flex items-center gap-3 cursor-pointer my-2">
		<input type="checkbox" bind:checked={settings.speak} class="checkbox" />
		<span class="label-text">Speak roll results</span>
	</label>

	<label class="flex items-center gap-3 cursor-pointer my-2">
		<input type="checkbox" bind:checked={settings.dark} class="checkbox" />
		<span class="label-text">Dark mode</span>
	</label>

	<div class="xs:grid xs:grid-cols-2 xs:gap-2 mt-6">
		<button
			class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0"
			on:click={() => screenfull.toggle()}
		>
			<Icon name="fullscreen" class="w-4 h-4 inline" /> &nbsp; Fullscreen
		</button>
		<button class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0">
			<Icon name="envelope" class="w-4 h-4 inline" /> &nbsp; Contact
		</button>
		<button class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0">
			<Icon name="link" class="w-4 h-4 inline" /> &nbsp; Copy link to website
		</button>
		<button class="btn block h-auto leading-6 text-xs">
			<Icon name="trash" class="w-4 h-4 inline" /> &nbsp; Delete all data
		</button>
	</div>
</Modal>

<style>
	.label-text {
		@apply font-bold text-gray-700;
	}
	button,
	select,
	input {
		@apply bg-white border-2 border-gray-200 hover:bg-gray-200;
	}
</style>
