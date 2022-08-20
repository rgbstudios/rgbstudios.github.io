<script>
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';

	/**
	 * Todo:
	 * SEO keywords ampersand is escaped (seems ok?)
	 * FB messenger share not working
	 */

	// TODO store these in settings:
	let currentAmount = 1,
		currentSides = 20;

	let customAmount = 10,
		customSides = 10;

	let modifier = 0,
		advantage = 'none',
		attribute = 'none',
		bonus = 'none';
</script>

<button class="btn absolute top-0 left-0">
	<Icon name="menu" />
</button>

<ProjectHeader
	title="D&D Dice Roller"
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
	isCondensed={true}
/>

<div class="sm:btn-group justify-center">
	<button class="btn block mb-2 sm:mb-0">
		<Icon name="pencil_alt" /> &nbsp; Mods &amp; Notes
	</button>
	<button class="btn block mb-2 sm:mb-0">
		<Icon name="history" /> &nbsp; History
	</button>
	<button class="btn block">
		<Icon name="settings" /> &nbsp; Settings
	</button>
</div>

<div class="mt-8">
	<label for="number-of-dice" class="sm:hidden block mb-2">Number of Dice:</label>
	<div id="number-of-dice" class="btn-group sm:justify-center">
		<label for="number-of-dice" class="hidden sm:block">Number of Dice:</label>
		<br class="sm:hidden" />
		{#each [1, 2, 3, 4, 5, customAmount] as num}
			<button
				class="btn"
				class:btn-active={num === currentAmount}
				on:click={() => (currentAmount = num)}
			>
				{num}
			</button>
		{/each}
		<button class="btn btn-primary">+</button>
	</div>
</div>

<div class="justify-center mt-8">
	<label for="dice-sides" class="sm:hidden block mb-2">Die:</label>
	<div id="dice-sides" class="btn-group sm:justify-center">
		<label for="dice-sides" class="hidden sm:block">Die:</label>
		{#each [4, 6, 8, 12, 20, customSides] as num, idx}
			<button
				class="btn d-{num}"
				class:btn-active={num === currentSides}
				on:click={() => (currentSides = num)}
			>
				{#if idx !== 5}
					<img src="/img/projects/other/icon-d{num}.svg" alt="d{num}" class="w-6 h-6 mr-2" />
				{/if}
				d{num}
			</button>
		{/each}
		<button class="btn btn-primary">+</button>
	</div>
</div>

<div class="mx-auto grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8">
	<div class="mx-auto mt-8 w-full">
		<label for="mod-input" class="w-full">Modifier:</label>
		<input
			id="mod-input"
			type="number"
			min="-999"
			max="999"
			bind:value={modifier}
			class="input input-bordered w-full"
		/>
	</div>
	<div class="mx-auto mt-8 w-full">
		<label for="adv-select" class="w-full">Advantage:</label>
		<select id="adv-select" class="select select-bordered w-full" bind:value={advantage}>
			{#each ['none', 'advantage', 'disadvantage'] as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
	</div>
	<div class="mx-auto mt-8 w-full">
		<label for="attr-select" class="w-full">Attributes:</label>
		<select id="attr-select" class="select select-bordered w-full" bind:value={attribute}>
			{#each ['none', 'str', 'dex', 'con', 'int', 'wis', 'cha'] as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
	</div>
	<div class="mx-auto mt-8 w-full">
		<label for="bonus-select" class="w-full">Bonus:</label>
		<select id="bonus-select" class="select select-bordered w-full" bind:value={bonus}>
			{#each ['none', 'proficiency', 'expertise', 'spell atk', 'initiative'] as val}
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
		@apply mr-4 sm:my-auto;
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

	/* fix for d8 right border on sm screens
	since we use a container, we can guarentee
	that we will only encounter several fixed width sizes */
	.btn-group button.d-8 {
		@apply border-r-2 sm:border-r-0;
	}

	button.btn-active {
		@apply bg-gray-300;
	}
</style>
