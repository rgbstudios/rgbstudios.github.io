<script>
	import { onMount } from 'svelte';

	import Icon from '$lib/components/Icon.svelte';
	import ModalButton from '$lib/components/base/ModalButton.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	import ModsModal from '$lib/components/modals/dnd_dice/ModsModal.svelte';
	import HistoryModal from '$lib/components/modals/dnd_dice/HistoryModal.svelte';
	import SettingsModal from '$lib/components/modals/dnd_dice/SettingsModal.svelte';
	import ChangeDiceModal from '$lib/components/modals/dnd_dice/ChangeDiceModal.svelte';

	import DndSideNav from '$lib/components/dnd-dice/DndSideNav.svelte';

	/**
	 * Todo:
	 * SEO keywords ampersand is escaped (seems ok?)
	 * FB messenger share not working
	 * Fix focus styles
	 * Make URL params work
	 * Input validation
	 * Store everything in local storage
	 * Implement dark mode (?)
	 * Implement delete all data
	 * Implement clear, download, and upload btns
	 * Implement menu and other sites
	 * Add info modal with how advantage works, that expertiece is double proficiency, and about rolling for initiative, to attack against AC, and for damage
	 * Option to click to roll die by itself
	 * Menton that modifiers are stored in the website url
	 * Find delimeter other than 'a' for url params (?)
	 * Add help and info modals
	 */

	let currentAmount = 1,
		currentSides = 20;

	let customAmount = 10,
		customSides = 10;

	let modifier = 0,
		advantage = 'non',
		attribute = 'non',
		bonus = 'non';

	// values used under the hood mapped to values shown to user
	const modifierNames = {
		non: 'None',

		str: 'Strength',
		dex: 'Dexterity',
		con: 'Constitution',
		int: 'Intelligence',
		wis: 'Wisdom',
		cha: 'Charisma',

		prf: 'Proficiency',
		exp: 'Expertise',
		spl: 'Spell Attack',
		itv: 'Initiative',

		adv: 'Advantage',
		dis: 'Disadvantage'
	};

	// user data
	// current user's modifiers

	let modifiers = {
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

	// settings
	let settings = {
		speak: false,
		dark: false
	};

	// misc
	let notes = '',
		rollHistory = [],
		rolledDice = 0;

	// reset disabled inputs
	$: if (currentAmount !== 1) advantage = 'non';
	$: if (currentSides !== 20) bonus = 'non';

	onMount(() => {
		// load url params
		const url = new URL(window.location.href);
		let m = url.searchParams.get('m');
		if (m) {
			// atob decodes base 64
			m = atob(m).split(' ');
			modifiers.str = parseInt(m[0]);
			modifiers.dex = parseInt(m[1]);
			modifiers.con = parseInt(m[2]);
			modifiers.int = parseInt(m[3]);
			modifiers.wis = parseInt(m[4]);
			modifiers.cha = parseInt(m[5]);
			// TODO: open mods modal
		}
	});

	// utility
	const getRoll = (sides) => Math.floor(Math.random() * sides) + 1;

	const canTalk = () => 'speechSynthesis' in window;

	const talk = (words) => {
		if (canTalk()) {
			const synth = window.speechSynthesis;
			const msg = new SpeechSynthesisUtterance(words);
			msg.rate = 1;
			msg.pitch = 1;
			synth.speak(msg);
		}
	};

	// dice roll
	let rollText = '';
	// ---------------- function for rolling dice ----------------
	//advantage is 0 if none, 1 if advantage, -1 if disadvantage. values are strings
	function doRolls() {
		let result = 0,
			rolls = [];

		if (currentAmount === 1 && advantage !== 'non') {
			rolls.push(getRoll(currentSides));
			rolls.push(getRoll(currentSides));
			result += advantage == 'adv' ? Math.max(rolls[0], rolls[1]) : Math.min(rolls[0], rolls[1]);
		} else {
			for (let i = 0; i < currentAmount; i++) {
				rolls.push(getRoll(currentSides));
				result += rolls[i];
			}
		}

		result += modifier;
		if (attribute !== 'non') {
			result += modifiers[attribute];
		}
		if (bonus !== 'non') {
			if (bonus === 'exp') {
				result += modifiers['prf'] * 2; // expertise is double proficiency
			} else {
				result += modifiers[bonus];
			}
		}

		rollText =
			'Rolled ' +
			currentAmount +
			' D' +
			currentSides +
			(advantage === 'non' ? '' : advantage == 'adv' ? ' (advantage)' : ' (disadvantage)') +
			(modifier === 0 ? '' : modifier > 0 ? ' +' + modifier : ' ' + modifier) +
			(attribute === 'non'
				? ''
				: ' +' + modifierNames[attribute] + '(' + modifiers[attribute] + ')') +
			(bonus === 'non'
				? ''
				: ' +' +
				  modifierNames[bonus] +
				  '(' +
				  (bonus === 'exp' ? modifiers['prf'] * 2 : modifiers[bonus]) +
				  ')') +
			': ' +
			result +
			'  |  Rolls: ' +
			rolls.join(', ');

		rollHistory.push(rollText);
		rollHistory = rollHistory; // reactive bugfix
		rolledDice += currentAmount === 1 && advantage !== 'non' ? 2 : currentAmount;

		if (settings.speak) {
			talk(rollText.replace('|  Rolls:', '... rolls were: '));
		}
	}

	function doReset() {
		modifier = 0;
		advantage = 'non';
		attribute = 'non';
		bonus = 'non';
	}
</script>

<DndSideNav />

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
	<ModalButton
		_for="dnd-dice-mods-modal"
		class="bg-white border-2 border-base-200 hover:bg-base-200 hover:border-base-200 mb-2 sm:mb-0 sm:border-r-0"
	>
		<Icon name="pencil_alt" /> &nbsp; Mods &amp; Notes
	</ModalButton>
	<ModalButton
		_for="dnd-dice-history-modal"
		class="bg-white border-2 border-base-200 hover:bg-base-200 hover:border-base-200 mb-2 sm:mb-0 sm:border-r-0"
	>
		<Icon name="history" /> &nbsp; History
	</ModalButton>
	<ModalButton
		_for="dnd-dice-settings-modal"
		class="bg-white border-2 border-base-200 hover:bg-base-200 hover:border-base-200"
	>
		<Icon name="settings" /> &nbsp; Settings
	</ModalButton>
</div>

<ModsModal {modifiers} {modifierNames} {notes} />
<HistoryModal {rollHistory} {rolledDice} />
<SettingsModal {settings} />
<ChangeDiceModal bind:value={customAmount} title="Number of Dice" change="dice" />
<ChangeDiceModal bind:value={customSides} title="Dice Sides" change="sides" />

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
		<ModalButton _for="dnd-dice-change-dice-modal" class="btn-info">
			<Icon name="plus" class="w-4 h-4" />
		</ModalButton>
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
		<ModalButton _for="dnd-dice-change-sides-modal" class="btn-info">
			<Icon name="plus" class="w-4 h-4" />
		</ModalButton>
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
		<select
			id="adv-select"
			class="select select-bordered w-full"
			disabled={currentAmount !== 1}
			bind:value={advantage}
		>
			{#each ['non', 'adv', 'dis'] as val}
				<option value={val}>{modifierNames[val]}</option>
			{/each}
		</select>
	</div>
	<div class="mx-auto mt-8 w-full">
		<label for="attr-select" class="w-full">Attribute:</label>
		<select id="attr-select" class="select select-bordered w-full" bind:value={attribute}>
			{#each ['non', 'str', 'dex', 'con', 'int', 'wis', 'cha'] as val}
				<option value={val}>{modifierNames[val]}</option>
			{/each}
		</select>
	</div>
	<div class="mx-auto mt-8 w-full">
		<label for="bonus-select" class="w-full">Bonus:</label>
		<select
			id="bonus-select"
			class="select select-bordered w-full"
			disabled={currentSides !== 20}
			bind:value={bonus}
		>
			{#each ['non', 'prf', 'exp', 'spl', 'itv'] as val}
				<option value={val}>{modifierNames[val]}</option>
			{/each}
		</select>
	</div>
</div>

<div class="flex justify-evenly mt-12">
	<button class="btn btn-info btn-lg" on:click={doRolls}>
		<Icon name="roll_dice" /> &nbsp; Roll
	</button>
	<button class="btn btn-lg" on:click={doReset}>
		<Icon name="reset" /> &nbsp; Reset
	</button>
</div>

<input
	disabled
	class="mt-8 input input-bordered w-full input-lg text-center"
	type="text"
	value={rollText}
/>

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
		@apply bg-base-300 text-gray-900;
		box-shadow: inset 0 4px 4px #0002;
	}
</style>
