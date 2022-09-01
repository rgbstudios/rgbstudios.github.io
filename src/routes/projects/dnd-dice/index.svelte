<script>
	import { onMount } from 'svelte';

	import Icon from '$lib/components/Icon.svelte';
	import ModalButton from '$lib/components/base/ModalButton.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import { toast } from '$lib/components/Toast.svelte';

	import ModsModal from '$lib/components/modals/dnd_dice/ModsModal.svelte';
	import HistoryModal from '$lib/components/modals/dnd_dice/HistoryModal.svelte';
	import SettingsModal from '$lib/components/modals/dnd_dice/SettingsModal.svelte';
	import ChangeDiceModal from '$lib/components/modals/dnd_dice/ChangeDiceModal.svelte';
	import DiceAboutModal from '$lib/components/modals/dnd_dice/DiceAboutModal.svelte';

	import { getDieRollerParams, getRoll } from '$lib/util/dndUtil';

	import DndSideNav from '$lib/components/dnd-dice/DndSideNav.svelte';

	import { diceSettings as s } from '$lib/stores/dnd-dice';

	/**
	 * Todo:
	 * SEO keywords ampersand is escaped (seems ok?)
	 * FB messenger share not working
	 * Make URL params work
	 * Input validation
	 *
	 * Future todo:
	 * Option to doubleclick to roll die by itself
	 */

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

	// reset disabled inputs
	$: if ($s.currentAmount !== 1) $s.advantage = 'non';
	$: if ($s.currentSides !== 20) $s.bonus = 'non';

	// update url params when modifiers changes if linkParams setting is enabled
	$: if ($s.modifiers && $s.settings.linkParams) {
		updateParams(true);
	} else {
		updateParams(false);
	}

	onMount(() => {
		// load url params
		const url = new URL(window.location.href);
		let m = url.searchParams.get('m');
		if (m) {
			// atob decodes base 64
			m = atob(m).split(' ');
			$s.modifiers.str = parseInt(m[0]);
			$s.modifiers.dex = parseInt(m[1]);
			$s.modifiers.con = parseInt(m[2]);
			$s.modifiers.int = parseInt(m[3]);
			$s.modifiers.wis = parseInt(m[4]);
			$s.modifiers.cha = parseInt(m[5]);
			$s.modifiers.prf = parseInt(m[6]);
			$s.modifiers.spl = parseInt(m[7]);
			$s.modifiers.itv = parseInt(m[8]);
			toast('Loaded modifiers successfully from url');
		}
	});

	// utility

	const talk = (words) => {
		if ('speechSynthesis' in window) {
			const synth = window.speechSynthesis;
			const msg = new SpeechSynthesisUtterance(words);
			msg.rate = 1;
			msg.pitch = 1;
			synth.speak(msg);
		}
	};

	// todo: this breaks sometimes `history is not defined`
	function updateParams(doLink) {
		if (typeof history !== 'undefined') {
			history.replaceState({}, '', doLink ? getDieRollerParams($s.modifiers) : '?m=');
		}
	}

	// core dice roll logic
	let rollText = '';
	//advantage is 0 if none, 1 if advantage, -1 if disadvantage. values are strings
	function doRolls() {
		let result = 0,
			rolls = [];

		if ($s.currentAmount === 1 && $s.advantage !== 'non') {
			rolls.push(getRoll($s.currentSides));
			rolls.push(getRoll($s.currentSides));
			result += $s.advantage == 'adv' ? Math.max(rolls[0], rolls[1]) : Math.min(rolls[0], rolls[1]);
		} else {
			for (let i = 0; i < $s.currentAmount; i++) {
				rolls.push(getRoll($s.currentSides));
				result += rolls[i];
			}
		}

		result += $s.modifier;
		if ($s.attribute !== 'non') {
			result += $s.modifiers[$s.attribute];
		}
		if ($s.bonus !== 'non') {
			if ($s.bonus === 'exp') {
				result += $s.modifiers['prf'] * 2; // expertise is double proficiency
			} else {
				result += $s.modifiers[$s.bonus];
			}
		}

		rollText =
			'Rolled ' +
			$s.currentAmount +
			' D' +
			$s.currentSides +
			($s.advantage === 'non' ? '' : $s.advantage == 'adv' ? ' (advantage)' : ' (disadvantage)') +
			($s.modifier === 0 ? '' : $s.modifier > 0 ? ' +' + $s.modifier : ' ' + $s.modifier) +
			($s.attribute === 'non'
				? ''
				: ' +' + modifierNames[$s.attribute] + '(' + $s.modifiers[$s.attribute] + ')') +
			($s.bonus === 'non'
				? ''
				: ' +' +
				  modifierNames[$s.bonus] +
				  '(' +
				  ($s.bonus === 'exp' ? $s.modifiers['prf'] * 2 : $s.modifiers[$s.bonus]) +
				  ')') +
			': ' +
			result +
			'  |  Rolls: ' +
			rolls.join(', ');

		$s.rollHistory = [...$s.rollHistory, rollText];
		$s.rolledDice += $s.currentAmount === 1 && $s.advantage !== 'non' ? 2 : $s.currentAmount;

		if ($s.settings.speak) {
			talk(rollText.replace('|  Rolls:', '... rolls were: '));
		}
	}

	function doReset() {
		$s.modifier = 0;
		$s.advantage = 'non';
		$s.attribute = 'non';
		$s.bonus = 'non';
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
		class="bg-white border-2 border-base-200 hover:bg-base-200 hover:border-base-200 mb-2 sm:mb-0 sm:border-r-0"
	>
		<Icon name="settings" /> &nbsp; Settings
	</ModalButton>
	<ModalButton
		_for="dnd-dice-about-modal"
		class="bg-white border-2 border-base-200 hover:bg-base-200 hover:border-base-200"
	>
		<Icon name="info" /> &nbsp; About
	</ModalButton>
</div>

<ModsModal bind:modifiers={$s.modifiers} {modifierNames} bind:notes={$s.notes} />
<HistoryModal bind:rollHistory={$s.rollHistory} bind:rolledDice={$s.rolledDice} />
<SettingsModal bind:settings={$s.settings} />
<ChangeDiceModal bind:value={$s.customAmount} title="Number of Dice" change="dice" />
<ChangeDiceModal bind:value={$s.customSides} title="Dice Sides" change="sides" />
<DiceAboutModal />

<div class="mt-8">
	<label for="number-of-dice" class="sm:hidden block mb-2">Number of Dice:</label>
	<div id="number-of-dice" class="btn-group sm:justify-center">
		<label for="number-of-dice" class="hidden sm:block">Number of Dice:</label>
		<br class="sm:hidden" />
		{#each [1, 2, 3, 4, 5, $s.customAmount] as num}
			<button
				class="btn"
				class:btn-active={num === $s.currentAmount}
				on:click={() => ($s.currentAmount = num)}
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
		{#each [4, 6, 8, 12, 20, $s.customSides] as num, idx}
			<button
				class="btn d-{num}"
				class:btn-active={num === $s.currentSides}
				on:click={() => ($s.currentSides = num)}
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
			bind:value={$s.modifier}
			class="input input-bordered w-full"
		/>
	</div>
	<div class="mx-auto mt-8 w-full">
		<label for="adv-select" class="w-full">Advantage:</label>
		<select
			id="adv-select"
			class="select select-bordered w-full"
			disabled={$s.currentAmount !== 1}
			bind:value={$s.advantage}
		>
			{#each ['non', 'adv', 'dis'] as val}
				<option value={val}>{modifierNames[val]}</option>
			{/each}
		</select>
	</div>
	<div class="mx-auto mt-8 w-full">
		<label for="attr-select" class="w-full">Attribute:</label>
		<select id="attr-select" class="select select-bordered w-full" bind:value={$s.attribute}>
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
			disabled={$s.currentSides !== 20}
			bind:value={$s.bonus}
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

	button:focus,
	select:focus,
	input:focus,
	label:focus,
	textarea:focus {
		@apply outline-base-500;
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
