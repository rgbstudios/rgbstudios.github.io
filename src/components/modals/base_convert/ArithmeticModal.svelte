<script>
	import Icon from '../../Icon.svelte';
</script>

<div class="form-control">
	<label class="label cursor-pointer">
		<span class="label-text">Same bases</span>
		<input id="baseCheckbox" type="checkbox" checked="checked" class="checkbox" />
	</label>
</div>

<label class="text-center block">
	Base:
	<input id="baseInput" class="input input-bordered w-full max-w-xs" value="10" type="text" />
</label>

<div class="sm:grid sm:grid-cols-3" id="basesDiv">
	<div>
		<label>
			Input 1 Base:
			<input id="baseInput1" class="input input-bordered w-full max-w-xs" value="10" type="text" />
		</label>
	</div>
	<div>
		<label>
			Input 2 Base:
			<input id="baseInput2" class="input input-bordered w-full max-w-xs" value="10" type="text" />
		</label>
	</div>
	<div>
		<label>
			Output Base:
			<input id="baseInput3" class="input input-bordered w-full max-w-xs" value="10" type="text" />
		</label>
	</div>
</div>

<input id="val1Input" class="input input-bordered w-full mt-6" value="0" type="text" />
<select class="select select-bordered w-full" id="operationInput">
	<option>+</option>
	<option>-</option>
	<option>&times;</option>
	<option>/</option>
</select>

<input id="val2Input" class="input input-bordered w-full" value="0" type="text" />
<br />
<button id="calcButton" class="btn mx-auto block mt-6">
	<Icon name="calculator" /> Calculate
</button>
<br /><br />
<input
	disabled
	id="calcOutput"
	value=""
	type="text"
	class="input input-bordered w-full max-w-xs"
	style="cursor:text;"
/>
<p id="complexError" class="errorP" />
