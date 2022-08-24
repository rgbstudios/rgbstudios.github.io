<script>
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	import DndSideNav from '$lib/components/dnd-dice/DndSideNav.svelte';

	let characters = [];

	const modifierNames = {
		non: '-',

		str: 'Strength',
		dex: 'Dexterity',
		con: 'Constitution',
		int: 'Intelligence',
		wis: 'Wisdom',
		cha: 'Charisma'
	};

	$: currentCharacter = characters ?? characters[characters.length - 1];
</script>

<DndSideNav />

<!-- todo update screenshot -->
<ProjectHeader
	title="D&D Character Roller"
	description="Use D&D Character Roller to easily roll stats for a new D&D character, complete with graphs, download, and more"
	keywords={[
		'dnd',
		'd&d',
		'character',
		'd&d character',
		'dnd character',
		'character roller',
		'character stat',
		'stat roller',
		'character generator',
		'dungeons and dragons',
		'dice',
		'die',
		'roller',
		'roll',
		'dice roller',
		'die roller'
	]}
	icon="img/projects/icons/dnd-character-roller.png"
	screenshot="img/projects/screenshots/dnd-dice.png"
	isDark={true}
	isCondensed={true}
	parentBreadcrumb={{
		text: 'D&D Dice Roller',
		link: '/projects/dnd-dice'
	}}
/>

<div class="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 sm:gap-4">
	{#each [1, 2, 3, 4, 5, 6] as _}
		<div class="">
			<p>⚄ ⚃ ⚀ ⚅</p>
			<p class="font-bold">15</p>
			<p>+2</p>
			<select class="select select-bordered w-full">
				{#each Object.keys(modifierNames) as mod}
					<option value={mod}>{modifierNames[mod]}</option>
				{/each}
			</select>
		</div>
	{/each}
</div>

<style>
	label {
		@apply mr-4 sm:my-auto;
	}

	button,
	select,
	input,
	label {
		@apply font-bold;
	}

	button:not(.btn-info),
	select,
	input {
		@apply bg-white border-2 border-base-200 hover:bg-base-200;
	}

	button.btn-info {
		@apply text-white;
	}
</style>
