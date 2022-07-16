<script>
	import Icon from '$lib/components/Icon.svelte';
	import copyText from '$lib/util/copyText';

	export let value, onChange;

	let input;
</script>

<!-- input-group -->
<div class="input-group {$$props.class ?? ''}">
	<input
		bind:this={input}
		spellcheck="false"
		class="input w-full input-bordered bg-white text-base-100"
		type="text"
		{value}
		on:change={onChange}
	/>
	<button
		on:click={() => {
			const str = input.value;
			input.focus();
			input.setSelectionRange(0, str.length);

			copyText(str);
		}}
		class="btn inset-y-0 btn-secondary"
		title="Copy"
	>
		<Icon name="copy" />
	</button>
</div>
