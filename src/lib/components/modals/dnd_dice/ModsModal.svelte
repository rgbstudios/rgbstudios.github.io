<script>
	import { onMount } from 'svelte';

	import Modal from '$lib/components/base/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';

	import downloadFile from '$lib/util/downloadFile';

	export let modifiers, modifierNames, notes;

	function getDieRollerParams() {
		// 9 modifiers separated by spaces
		let m = '';
		for (const modifier in modifiers) {
			m += modifiers[modifier] + ' ';
		}
		m = m.slice(0, -1); // remove last space

		m = btoa(m); // encode base 64
		return '?m=' + m;
	}

	function downloadMods() {
		let modText = '';
		for (const modifier in modifiers) {
			// note: using `modifier` and not `modifierNames[modifier]` because we want the three letter shorthand
			modText += '\r\n' + modifier + ': ' + modifiers[modifier];
		}
		downloadFile(
			'Mods:\r\n' + 'https://rgbstudios.org/projects/dnd-dice' + getDieRollerParams() + modText,
			'dnd-modifiers.txt'
		);
	}

	function clearMods() {
		modifiers = {
			str: 0,
			dex: 0,
			con: 0,
			int: 0,
			wis: 0,
			cha: 0,

			prf: 0,
			spl: 0,
			itv: 0
		};
	}

	function uploadMods() {
		document.getElementById('fileInput').click();
	}

	// TODO: works sometimes?
	function processFile(evt) {
		let file = evt.target.result;
		if (file?.length) {
			const results = file.split('\r\n');
			console.log(results);

			// todo: try catch and console log error, maybe show toast that there was an error processing file
			// substr 5,4 because index 5 is the 6th character, after 'xyz: ' and 4 is the length, where max is '-999'
			modifiers.str = parseInt(results[0 + 2].substr(5, 4));
			modifiers.dex = parseInt(results[1 + 2].substr(5, 4));
			modifiers.con = parseInt(results[2 + 2].substr(5, 4));
			modifiers.int = parseInt(results[3 + 2].substr(5, 4));
			modifiers.wis = parseInt(results[4 + 2].substr(5, 4));
			modifiers.cha = parseInt(results[5 + 2].substr(5, 4));
			modifiers.prf = parseInt(results[6 + 2].substr(5, 4));
			modifiers.spl = parseInt(results[7 + 2].substr(5, 4));
			modifiers.itv = parseInt(results[8 + 2].substr(5, 4));

			// todo: update params if link btn checked
		} else {
			console.log('no file');
		}
	}

	onMount(() => {
		const fileInput = document.getElementById('fileInput');
		fileInput.onchange = () => {
			if (!window.FileReader) return; // browser not supported. TODO: toast

			if (fileInput.files.length) {
				// file exists
				let textFile = fileInput.files[0];
				const reader = new FileReader();
				reader.readAsText(textFile);
				reader.onload = processFile;
			}
		};
	});
</script>

<Modal id="dnd-dice-mods-modal" class="bg-white text-base-900">
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

		<button class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0" on:click={clearMods}>
			<Icon name="trash" class="w-4 h-4 inline" /> &nbsp; Clear Modifiers
		</button>
		<button class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0" on:click={downloadMods}>
			<Icon name="download" class="w-4 h-4 inline" /> &nbsp; Download Modifiers
		</button>
		<button class="btn block h-auto leading-6 text-xs" on:click={uploadMods}>
			<Icon name="upload" class="w-4 h-4 inline" /> &nbsp; Upload Modifiers
		</button>

		<input id="fileInput" class="hidden" type="file" accept=".txt" />

		<div class="col-span-3">
			<hr class="my-6" />
			<h3>Notes:</h3>
			<textarea bind:value={notes} rows="5" class="textarea w-full" />
			<div class="xs:grid xs:grid-cols-2 xs:gap-2">
				<button
					class="btn block h-auto leading-6 text-xs mb-2 xs:mb-0"
					on:click={() => (notes = '')}
				>
					<Icon name="trash" class="w-4 h-4 inline" /> &nbsp; Clear Notes
				</button>
				<button
					class="btn block h-auto leading-6 text-xs"
					on:click={() => downloadFile(notes ?? '', 'dnd-notes.txt')}
				>
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
		@apply bg-white border-2 border-base-200 font-normal;
	}
	button,
	select,
	input {
		@apply bg-white border-2 border-base-200 hover:bg-base-200;
	}
</style>
