<script>
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import DndSideNav from '../SideNav.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { getRoll } from '$lib/util/dndUtil';

	let numDice = 1;
	let numSides = 6;
	let numTimesToRoll = 1;

	let rolls = [[]];

	function doRoll() {
		rolls = [];
		for (let i = 0; i < numTimesToRoll; i++) {
			let roll = [];
			for (let j = 0; j < numDice; j++) {
				roll.push(getRoll(numSides));
			}
			rolls.push(roll);
		}
	}
</script>

<DndSideNav />

<ProjectHeader
	title="Simple Die Roller"
	slug="dnd-dice/simple-die-roller"
	description="A very simple die roller. Roll any die, or multiple dice at once. Supports d4, d6, d8, d10, d12, d20 and more."
	keywords={[
		'roll a die',
		'roll a dice',
		'simple die roller',
		'die roller',
		'online die roller',
		'roll dice online',
		'roll a die simple',
		'roll a dice simple'
	]}
	icon="img/projects/icons/dnd-simple-die-roller.png"
	screenshot="img/projects/screenshots/dnd-simple-die-roller.png"
	isDark={true}
	isCondensed={true}
	parentBreadcrumb={{
		text: 'D&D Dice Roller',
		link: '/projects/dnd-dice'
	}}
/>

<div class="text-xl text-center">
	Roll
	<input type="number" min="1" max="9999" class="input w-16" bind:value={numDice} />

	dice with

	<input type="number" min="2" max="9999" class="input w-16" bind:value={numSides} />

	sides. &mdash; Roll
	<input type="number" min="1" max="9999" class="input w-16" bind:value={numTimesToRoll} />

	times.

	<button class="btn btn-info btn-lg my-8 block mx-auto" on:click={doRoll}>
		<Icon name="roll_dice" /> &nbsp; Roll
	</button>

	<p class="text-3xl font-mono">
		{#each rolls as rollSet}
			<span class="font-bold text-5xl">{rollSet.join(',')}</span>
			{#if rollSet.length > 1}
				(total {rollSet.reduce((a, b) => a + b, 0)})
			{/if}
			<br />
		{/each}
		{#if rolls.length > 1}
			(total {rolls.reduce((a, b) => a + b.reduce((a, b) => a + b, 0), 0)})
		{/if}
	</p>
</div>

<style lang="postcss">
	button,
	input {
		@apply font-bold;
	}

	button:not(.btn-info),
	input {
		@apply bg-white border-2 border-base-200 hover:bg-base-200;
	}

	button:focus,
	select:focus,
	input:focus,
	label:focus,
	textarea:focus {
		@apply outline-base-500;
	}
</style>
