<script>
	/**
	 * Maybe TODO
	 * enter custom length (nible, byte, 4 bytes) and format to that/pad zeros
	 * signed or unsigned?
	 * enter comma seperated list of items to convert
	 */

	import Alert from '$lib/components/Alert.svelte';
	import ModalButton from '$lib/components/base/ModalButton.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ArithmeticModal from '$lib/components/modals/base_convert/ArithmeticModal.svelte';
	import LearnMoreModal from '$lib/components/modals/base_convert/LearnMoreModal.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	let binary = '0',
		octal = '0',
		decimal = '0',
		hex = '0';

	let simpleError = '';

	// up and down arrow to change number inputs
	const keyup = (e) => {
		if (e.keyCode !== 38 && e.keyCode !== 40) return;
		if (document.activeElement.nodeName !== 'INPUT') return;

		let baseNames = { binary: 2, octal: 8, decimal: 10, hex: 16 };
		let base = baseNames[document.activeElement.id];

		if (base === undefined) return;

		if (e.keyCode === 38) {
			//up
			document.activeElement.value = add(document.activeElement.value, 1, base);
			convert(e.target.value, base);
		} else if (e.keyCode === 40) {
			//down
			document.activeElement.value = add(document.activeElement.value, -1, base);
			convert(e.target.value, base);
		}
		if (document.activeElement.value === 'NAN') document.activeElement.value = '0';
		document.activeElement.select();
	};

	function add(val, addend, base) {
		let decimalAns = parseInt(val, base);
		decimalAns += addend;
		try {
			return decimalAns.toString(base).toUpperCase();
		} catch (err) {
			//only catches if invalid base in arithmetic modal
			showError('Error - Invalid Inputs');
		}
	}

	function convert(val, base) {
		val = val ?? '0';

		let decimalAns = parseInt(val, base);
		if (isNaN(decimalAns)) {
			simpleError = 'Invalid input';
			return;
		}

		simpleError = '';

		binary = decimalAns.toString(2);
		octal = decimalAns.toString(8);
		decimal = decimalAns.toString(10);
		hex = decimalAns.toString(16).toUpperCase();
	}
</script>

<svelte:window on:keyup={keyup} />

<ProjectHeader
	title="Base Converter"
	description="Convert numbers between binary, octal, decimal, hexadecimal, and more"
	keywords={[
		'base converter',
		'convert number bases',
		'number bases',
		'convert binary to deciaml',
		'convert binary to hex',
		'convert decimal to binary',
		'convert decimal to hex',
		'convert hex to decimal',
		'convert hex to binary',
		'binary',
		'octal',
		'decimal',
		'hexadecimal',
		'hex'
	]}
	icon="img/projects/icons/base-convert.png"
	screenshot="img/projects/screenshots/base-convert.png"
/>

<div class="grid sm:grid-cols-2 md:grid-cols-4 my-8">
	<label>
		<input
			id="binary"
			bind:value={binary}
			on:keyup={(e) => convert(e.target.value, 2)}
			class="input input-bordered w-full max-w-xs"
			type="text"
		/>
		<p class="inline sm:block"><sub>2 </sub> Binary</p>
	</label>
	<label>
		<input
			id="octal"
			bind:value={octal}
			on:keyup={(e) => convert(e.target.value, 8)}
			class="input input-bordered w-full max-w-xs"
			type="text"
		/>
		<p class="inline sm:block"><sub>8 </sub> Octal</p>
	</label>
	<label>
		<input
			id="decimal"
			bind:value={decimal}
			on:keyup={(e) => convert(e.target.value, 10)}
			class="input input-bordered w-full max-w-xs"
			type="text"
		/>
		<p class="inline sm:block"><sub>10 </sub> Decimal</p>
	</label>
	<label>
		<input
			id="hex"
			bind:value={hex}
			on:keyup={(e) => convert(e.target.value, 16)}
			class="input input-bordered w-full max-w-xs"
			type="text"
			spellcheck="false"
		/>
		<p class="inline sm:block"><sub>16 </sub> Hex</p>
	</label>
</div>

<Alert text="Use arrow keys to increment or decrement your input" />

<p class="bg-error {simpleError && 'p-2'}">{simpleError}</p>

<div class="overflow-x-auto my-8">
	<table class="table table-compact w-full">
		<tr>
			<th>Decimal (base 10)</th>
			<th>Binary (base 2)</th>
			<th>Octal (base 8)</th>
			<th>Hexadecimal (base 16)</th>
		</tr>
		<tr>
			<td>00</td>
			<td>0000</td>
			<td>00</td>
			<td>0</td>
		</tr>
		<tr>
			<td>01</td>
			<td>0001</td>
			<td>01</td>
			<td>1</td>
		</tr>
		<tr>
			<td>02</td>
			<td>0010</td>
			<td>02</td>
			<td>2</td>
		</tr>
		<tr>
			<td>03</td>
			<td>0011</td>
			<td>03</td>
			<td>3</td>
		</tr>
		<tr>
			<td>04</td>
			<td>0100</td>
			<td>04</td>
			<td>4</td>
		</tr>
		<tr>
			<td>05</td>
			<td>0101</td>
			<td>05</td>
			<td>5</td>
		</tr>
		<tr>
			<td>06</td>
			<td>0110</td>
			<td>06</td>
			<td>6</td>
		</tr>
		<tr>
			<td>07</td>
			<td>0111</td>
			<td>07</td>
			<td>7</td>
		</tr>
		<tr>
			<td>08</td>
			<td>1000</td>
			<td>10</td>
			<td>8</td>
		</tr>
		<tr>
			<td>09</td>
			<td>1001</td>
			<td>11</td>
			<td>9</td>
		</tr>
		<tr>
			<td>10</td>
			<td>1010</td>
			<td>12</td>
			<td>A</td>
		</tr>
		<tr>
			<td>11</td>
			<td>1011</td>
			<td>13</td>
			<td>B</td>
		</tr>
		<tr>
			<td>12</td>
			<td>1100</td>
			<td>14</td>
			<td>C</td>
		</tr>
		<tr>
			<td>13</td>
			<td>1101</td>
			<td>15</td>
			<td>D</td>
		</tr>
		<tr>
			<td>14</td>
			<td>1110</td>
			<td>16</td>
			<td>E</td>
		</tr>
		<tr>
			<td>15</td>
			<td>1111</td>
			<td>17</td>
			<td>F</td>
		</tr>
	</table>
</div>

<a href="/img/projects/other/base-chart-light.png" download="base-chart-light.png" class="btn">
	<Icon name="download" />
	Download light chart
</a>

<a href="/img/projects/other/base-chart-dark.png" download="base-chart-dark.png" class="btn">
	<Icon name="download" />
	Download dark chart
</a>

<button
	on:click={() => {
		const page = window.open();
		page.document.write(
			'<title>Reference Table | Base Converter</title><img src="/img/projects/other/base-chart-light.png" onload="print();">'
		);
	}}
	class="btn"
>
	<Icon name="print" />
	Print chart
</button>

<hr class="my-8" />

<ModalButton _for="base-convert-arithmetic-modal">
	<Icon name="calculator" /> Arithmetic
</ModalButton>
<ModalButton _for="base-convert-learn-modal">
	<Icon name="lightbulb" /> Learn
</ModalButton>
<ArithmeticModal />
<LearnMoreModal />
