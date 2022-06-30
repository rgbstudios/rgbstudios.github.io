<script>
	import Icon from '../../Icon.svelte';

	let simpleMode = true;

	let baseInput = '10',
		val1Input = '0',
		baseInput1 = '10',
		val2Input = '0',
		baseInput2 = '10',
		operationInput = '+',
		baseInput3 = '10';

	let complexError = '';
	let result = '';

	function handleOperation() {
		let ans;
		try {
			if (simpleMode) {
				ans = doOperation(val1Input, baseInput, val2Input, baseInput, operationInput, baseInput);
			} else {
				ans = doOperation(val1Input, baseInput1, val2Input, baseInput2, operationInput, baseInput3);
			}

			if (isNaN(ans)) {
				result = '';
				complexError = 'Error - Invalid Inputs';
			} else {
				result = ans;
				complexError = '';
			}
		} catch (err) {
			console.log(err);
			result = '';
			complexError = 'Error - Invalid Inputs';
		}
	}

	function doOperation(val1, base1, val2, base2, operation, answerBase) {
		let decimalVal1 = parseInt(val1, base1),
			decimalVal2 = parseInt(val2, base2);
		let decimalAns;
		if (operation == '+') decimalAns = decimalVal1 + decimalVal2;
		else if (operation == '-') decimalAns = decimalVal1 - decimalVal2;
		else if (operation == '/') decimalAns = decimalVal1 / decimalVal2;
		else decimalAns = decimalVal1 * decimalVal2;

		return decimalAns.toString(answerBase).toUpperCase();
	}
</script>

<div class="form-control">
	<label class="label cursor-pointer">
		<span class="label-text">Same bases</span>
		<input bind:checked={simpleMode} type="checkbox" class="checkbox" />
	</label>
</div>

{#if simpleMode}
	<label class="text-center block">
		Base:
		<br />
		<input
			bind:value={baseInput}
			class="input input-bordered w-full max-w-xs"
			on:keyup={handleOperation}
			type="text"
		/>
	</label>
{:else}
	<div class="sm:grid sm:grid-cols-3">
		<div>
			<label>
				Input 1 Base:
				<input
					bind:value={baseInput1}
					class="input input-bordered w-full max-w-xs"
					on:keyup={handleOperation}
					type="text"
				/>
			</label>
		</div>
		<div>
			<label>
				Input 2 Base:
				<input
					bind:value={baseInput2}
					class="input input-bordered w-full max-w-xs"
					on:keyup={handleOperation}
					type="text"
				/>
			</label>
		</div>
		<div>
			<label>
				Output Base:
				<input
					bind:value={baseInput3}
					class="input input-bordered w-full max-w-xs"
					on:keyup={handleOperation}
					type="text"
				/>
			</label>
		</div>
	</div>
{/if}

<input
	class="input input-bordered w-full mt-6"
	bind:value={val1Input}
	type="text"
	on:keyup={handleOperation}
/>
<select
	class="select select-bordered w-full"
	bind:value={operationInput}
	on:change={handleOperation}
>
	<option>+</option>
	<option>-</option>
	<option>&times;</option>
	<option>/</option>
</select>

<input
	bind:value={val2Input}
	class="input input-bordered w-full"
	on:keyup={handleOperation}
	type="text"
/>
<br />
<button on:click={handleOperation} class="btn mx-auto block mt-6">
	<Icon name="calculator" /> Calculate
</button>
<br /><br />
<input
	disabled
	bind:value={result}
	type="text"
	class="input input-bordered w-full max-w-xs"
	style="cursor:text;"
/>
<p class="bg-error {complexError && 'p-2'}">{complexError}</p>
<p>Note: max base is 36</p>
