<script lang="ts">
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	let hashAlgorithm: string = 'SHA-256';

	let inputTypes: ('text' | 'file' | 'hash')[] = ['text', 'text'];
	let inputStrings: string[] = ['', ''];
	let files: File | null[] = [null, null];
	let inputHashes: string[] = ['', ''];

	let generatedHashes: string[] = ['', ''];
	let compareResult: '' | 'error' | 'match' | 'nomatch' = '';

	function handleFileChange(column: number, event: Event) {
		const target = event.target as HTMLInputElement;
		files[column] = target.files ? target.files[0] : null;
	}

	async function generateAndSetHash(hashAlgorithm, source, column) {
		const hashBuffer = await crypto.subtle.digest(hashAlgorithm, source);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

		generatedHashes[column] = hashHex;
	}

	async function generateHash(column: number) {
		generateAndSetHash(hashAlgorithm, new TextEncoder().encode(inputStrings[column]), column);
	}

	async function generateFileHash(column: number) {
		const file = files[column];
		if (!file) {
			alert('Please select a file first.');
			return;
		}

		generateAndSetHash(hashAlgorithm, await file.arrayBuffer(), column);
	}

	// Click generate hash buttons for user
	// Used before `compareHashes` and after user changes select value
	async function autoGenerateHashes() {
		// TODO: remove this and fix below implementation and bug test
		// For now, it's fine the way it is
		return;

		// Run generate hash for the user first
		if (inputTypes[0] === 'text') {
			generateHash(0);
		} else if (inputTypes[0] === 'file') {
			generateFileHash(0);
		}
		if (inputTypes[1] === 'text') {
			generateHash(1);
		} else if (inputTypes[1] === 'file') {
			generateFileHash(1);
		}
	}

	async function compareHashes() {
		await autoGenerateHashes();

		const hash1 = inputTypes[0] === 'hash' ? inputHashes[0] : generatedHashes[0];
		const hash2 = inputTypes[1] === 'hash' ? inputHashes[1] : generatedHashes[1];

		if (!hash1 || !hash2) {
			compareResult = 'error';
		} else {
			compareResult = hash1 === hash2 ? 'match' : 'nomatch';
		}
	}
</script>

<ProjectHeader
	title="Hash Checker"
	slug="hash-checker"
	description="Check hashes for text or files, compare hashes, and pick from several different hasing algorithms such as SHA-256, SHA-384, and SHA-512"
	keywords={[
		'check text hash',
		'check file hash',
		'compare text hashes',
		'compare file hashes',
		'compare text hash to file hash',
		'copy file hash',
		'hash comparison tool',
		'sha-256 hash comparison tool',
		'sha-256 hash generator',
		'sha-256 hash comparison tool',
		'sha-384 hash generator',
		'sha-384 hash comparison tool',
		'sha-512 hash generator',
		'sha-512 hash comparison tool',
		'sha-1 hash generator'
	]}
	icon="img/projects/icons/hash-checker.png"
	screenshot="img/projects/screenshots/hash-checker.png"
/>

<div class="text-center container my-8">
	<label for="hash-algorithm" class="mr-2">Hash Algorithm:</label>
	<select id="hash-algorithm" bind:value={hashAlgorithm} class="select select-bordered">
		<option value="SHA-1">SHA-1</option>
		<option value="SHA-256" selected>SHA-256</option>
		<option value="SHA-384">SHA-384</option>
		<option value="SHA-512">SHA-512</option>
	</select>

	<div class="my-8 flex justify-around flex-col md:flex-row gap-8">
		{#each [0, 1] as columnNum}
			<div class="bg-base-800 p-4 flex flex-col gap-4 w-full">
				<select
					bind:value={inputTypes[columnNum]}
					on:change={autoGenerateHashes}
					class="select select-bordered"
				>
					<option value="text" selected>Text Input</option>
					<option value="file">File Input</option>
					<option value="hash">Enter Hash</option>
				</select>

				{#if inputTypes[columnNum] === 'text'}
					<input
						type="text"
						class="input input-bordered w-full"
						bind:value={inputStrings[columnNum]}
						placeholder="Enter string to hash"
					/>
					<button class="block btn btn-secondary" on:click={() => generateHash(columnNum)}
						>Generate Hash</button
					>
				{/if}
				{#if inputTypes[columnNum] === 'file'}
					<input
						type="file"
						class="file-input"
						on:change={handleFileChange.bind(null, columnNum)}
					/>
					<button class="block btn btn-secondary" on:click={() => generateFileHash(columnNum)}>
						Generate File Hash
					</button>
				{/if}
				{#if inputTypes[columnNum] === 'hash'}
					<input
						type="text"
						class="input input-bordered w-full"
						bind:value={inputHashes[columnNum]}
						placeholder="Enter hash"
					/>
				{/if}

				{#if inputTypes[columnNum] !== 'hash'}
					<p>
						Generated Hash: <input
							type="text"
							class="input input-bordered w-full"
							value={generatedHashes[columnNum]}
						/>
					</p>
				{/if}
			</div>
		{/each}
	</div>

	<button class="btn btn-primary" on:click={compareHashes}>Compare Hashes</button>
	<p
		class="mt-4 text-3xl p-2 bg-opacity-50"
		class:bg-error={compareResult === 'error'}
		class:bg-success={compareResult === 'match'}
		class:bg-warning={compareResult === 'nomatch'}
	>
		{#if compareResult === 'error'}
			Please generate or enter both hashes first
		{:else if compareResult === 'match'}
			Hashes match
		{:else if compareResult === 'nomatch'}
			Hashes do not match
		{/if}
	</p>

	<hr />
	<h3 class="text-2xl mt-8">Hashing Algorithm Information</h3>

	<table class="table bg-base-800 table-compact w-full my-4">
		<tr>
			<th>Algorithm</th>
			<th>Output length (bits)</th>
			<th>Block size (bits)</th>
		</tr>
		<tr>
			<td class="font-bold">SHA-1</td>
			<td>160</td>
			<td>512</td>
		</tr>
		<tr>
			<td class="font-bold">SHA-256</td>
			<td>256</td>
			<td>512</td>
		</tr>
		<tr>
			<td class="font-bold">SHA-384</td>
			<td>384</td>
			<td>1024</td>
		</tr>
		<tr>
			<td class="font-bold">SHA-512</td>
			<td>512</td>
			<td>1024</td>
		</tr>
	</table>

	<p>
		Source:
		<a
			class="link link-hover font-bold"
			href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest">Web Crypto API</a
		>
		&nbsp; | &nbsp; Spec:
		<a
			class="link link-hover font-bold"
			href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf">FIPS 180-4</a
		>
	</p>
	<p class="mt-2">
		Note: SHA-1 is considered vulnerable and should not be used for cryptographic applications
	</p>
	<p class="mt-2">Note: Each character output above is 4 bits, since they are in hex</p>
</div>
