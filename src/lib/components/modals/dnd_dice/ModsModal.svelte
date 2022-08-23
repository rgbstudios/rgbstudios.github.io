<script>
	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '../../Icon.svelte';

	export let modifiers, modifierNames, notes;
</script>

<Modal id="dnd-dice-mods-modal" class="bg-white text-gray-900">
	<div slot="title">
		<Icon name="pencil_alt" /> &nbsp; Mods &amp; Notes
	</div>

	<div class="xs:grid xs:grid-cols-3 xs:gap-2">
		{#each Object.keys(modifiers) as modifier, idx}
			{#if idx === 0}
				<div class="col-span-3">
					<h3>Modifiers:</h3>
				</div>
			{/if}
			<label class="block">
				{modifierNames[modifier]}
				<br />
				<input
					type="number"
					class="input input-sm input-bordered w-full"
					bind:value={modifiers[modifier]}
					min="-99"
					max="99"
				/>
			</label>
			{#if idx === 5}
				<div class="col-span-3 mt-8">
					<h3>Bonuses:</h3>
				</div>
			{/if}
		{/each}

		<div class="col-span-3 my-2" />

		<button class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0">
			<Icon name="trash" class="w-4 h-4 inline" /> &nbsp; Clear Modifiers
		</button>
		<button class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0">
			<Icon name="download" class="w-4 h-4 inline" /> &nbsp; Download Modifiers
		</button>
		<button class="btn block h-auto leading-6 text-xs">
			<Icon name="upload" class="w-4 h-4 inline" /> &nbsp; Upload Modifiers
		</button>

		<div class="col-span-3">
			<hr class="my-6" />
			<h3>Notes:</h3>
			<textarea bind:value={notes} rows="5" class="textarea w-full" />
			<div class="xs:grid xs:grid-cols-2 xs:gap-2">
				<button class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0">
					<Icon name="trash" class="w-4 h-4 inline" /> &nbsp; Clear Notes
				</button>
				<button class="btn block h-auto leading-6 text-xs">
					<Icon name="download" class="w-4 h-4 inline" /> &nbsp; Download Notes
				</button>
			</div>
		</div>
	</div>
</Modal>

<style>
	h3 {
		@apply text-xl;
	}
	label {
		@apply font-bold;
	}
	input,
	textarea {
		@apply bg-white border-2 border-gray-200 font-normal;
	}
	button,
	select,
	input {
		@apply bg-white border-2 border-gray-200 hover:bg-gray-200;
	}
</style>
