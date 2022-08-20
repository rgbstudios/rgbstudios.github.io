<script>
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';

	/**
	 * Todo:
	 * SEO keywords ampersand is escaped
	 * Share buttons not dark
	 * FB messenger share not working
	 */
</script>

<button class="btn absolute top-0 left-0">
	<Icon name="menu" />
</button>

<ProjectHeader
	title="D&amp;D Dice Roller"
	description="Use D&D Dice Roller to easily roll any number any dice, with modifiers and more"
	keywords={[
		'dnd',
		'd&d',
		'dnd dice',
		'dnd roller',
		'dnd dice roller',
		'd&d dice',
		'd&d roller',
		'd&d dice roller',
		'dungeons and dragons',
		'dice',
		'die',
		'roller',
		'roll',
		'dice roller',
		'die roller'
	]}
	icon="img/projects/icons/dnd-dice.png"
	screenshot="img/projects/screenshots/dnd-dice.png"
	isDark={true}
/>

<div class="btn-group justify-center mt-8">
	<button class="btn">
		<Icon name="pencil_alt" /> &nbsp; Mods and Notes
	</button>
	<button class="btn">
		<Icon name="history" /> &nbsp; History
	</button>
	<button class="btn">
		<Icon name="settings" /> &nbsp; Settings
	</button>
</div>

<div class="justify-center mt-8">
	<div id="number-of-dice" class="btn-group justify-center">
		<label for="number-of-dice">Number of Dice:</label>
		{#each [1, 2, 3, 4, 5] as num}
			<button class="btn" class:btn-active={num === 1}>
				{num}
			</button>
		{/each}
		<button class="btn">10</button>
		<button class="btn btn-primary">+</button>
	</div>
</div>

<div class="justify-center mt-8">
	<div id="dice-sides" class="btn-group justify-center">
		<label for="dice-sides">Die:</label>
		{#each [4, 6, 8, 12, 20] as num}
			<button class="btn" class:btn-active={num === 20}>
				<img src="/img/projects/other/icon-d{num}.svg" alt="d{num}" class="w-6 h-6 mr-2" />
				d{num}
			</button>
		{/each}
		<button class="btn">D10</button>
		<button class="btn btn-primary">+</button>
	</div>
</div>

<div class="mx-auto grid sm:grid-cols-2 md:grid-cols-3 sm:gap-8">
	<div class="mx-auto sm:col-span-2 md:col-span-1 mt-8 w-full">
		<label for="mod-input" class="w-full">Modifier:</label>
		<input
			id="mod-input"
			type="number"
			min="-999"
			max="999"
			value="0"
			class="input input-bordered w-full"
		/>
	</div>
	<div class="mx-auto mt-8 w-full">
		<label for="adv-select" class="w-full">Advantage:</label>
		<select id="adv-select" class="select select-bordered w-full">
			{#each ['none', 'advantage', 'disadvantage'] as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
	</div>
	<div class="mx-auto mt-8 w-full">
		<label for="attr-select" class="w-full">Attributes:</label>
		<select id="attr-select" class="select select-bordered w-full">
			{#each ['none', 'str', 'dex', 'con', 'int', 'wis', 'cha'] as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
		<select class="select select-bordered mt-8 w-full">
			<!-- non prf exp spl itv -->
			{#each ['none', 'Proficiency', 'Expertise', 'Spell atk', 'initiative'] as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
	</div>
</div>

<div class="flex justify-evenly mt-12">
	<button class="btn btn-primary btn-lg"><Icon name="roll_dice" /> &nbsp; Roll</button>
	<button class="btn btn-lg"><Icon name="reset" /> &nbsp; Reset</button>
</div>

<input disabled class="mt-8 input input-bordered w-full input-lg" type="text" />

<style>
	* {
		@apply text-gray-900;
	}

	label {
		@apply mr-4 my-auto;
	}

	button,
	select,
	input,
	label {
		@apply font-bold;
	}

	button:not(.btn-primary),
	select,
	input {
		@apply bg-white border-2 border-gray-200;
	}

	button.btn-primary {
		@apply text-white;
	}

	.btn-group button:not(:last-child) {
		@apply border-r-0;
	}

	button.btn-active {
		@apply bg-gray-300;
	}
</style>
