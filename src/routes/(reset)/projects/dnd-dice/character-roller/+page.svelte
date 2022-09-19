<script>
	import { onMount } from 'svelte';

	import Alert from '$lib/components/Alert.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ModalButton from '$lib/components/base/ModalButton.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	import DndSideNav from '../SideNav.svelte';

	import CharacterHistoryModal from '$lib/components/modals/dnd_dice/CharacterHistoryModal.svelte';
	import CharacterAboutModal from '$lib/components/modals/dnd_dice/CharacterAboutModal.svelte';
	import CharacterModifiersModal from '$lib/components/modals/dnd_dice/CharacterModifiersModal.svelte';
	import CharacterSettingsModal from '$lib/components/modals/dnd_dice/CharacterSettingsModal.svelte';
	import CharacterSkillsModal from '$lib/components/modals/dnd_dice/CharacterSkillsModal.svelte';
	import CharacterStatsModal from '$lib/components/modals/dnd_dice/CharacterStatsModal.svelte';

	import copyText from '$lib/util/copyText';
	import downloadFile from '$lib/util/downloadFile';
	import { getRoll } from '$lib/util/dndUtil';

	import { characterSettings as s } from '$lib/stores/dnd-dice';

	// TODO: bugtest url param import / export

	/**
	 * future todo:
	 * options to chose number of stats generated, number of rolls, number of dice dropped, dice sides, etc
	 * enter custom mods table
	 * show method used to generate character in history and download txt file
	 * create and download x characters at a time
	 * speak option
	 * show percentile option
	 * roll one at a time animation option
	 * option to download img of skills by stat and modifiers
	 * implement stats in language into text somewhere: https://www.dmingwithcharisma.com/2011/10/dd-stats-in-simple-language/
	 * percentile option
	function percentile(num) {
		num -= 3;
		let val=0;
		for(i=0; i<num; i++)
			val += odds[i];
		val += Math.ceil(odds[num]/2);
		val /= 1296;
		return val;
	}
	 */

	let showImportAlert = false;
	let isRollingAnimation = false;
	let animationRolls = [];

	const modifierNames = {
		non: '-',

		str: 'Strength',
		dex: 'Dexterity',
		con: 'Constitution',
		int: 'Intelligence',
		wis: 'Wisdom',
		cha: 'Charisma'
	};

	$: currentCharacter = $s.characters[$s.characters.length - 1];

	$: charactersGeneratedText = `${$s.characters.length} character${
		$s.characters.length !== 1 ? 's' : ''
	} generated`;

	const modNames = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

	// rolls: die rolls
	// stat: 3 highest dice
	// mod: mapped stat to a plus/minus modifier

	// classes
	function Character(givenRolls) {
		this.stats = [];
		this.statTotal = 0;
		this.modTotal = 0;
		for (let i = 0; i < 6; i++) {
			// 6 stats
			let newStat = givenRolls ? new Stat(givenRolls[i]) : new Stat(false);
			this.stats.push(newStat);
			this.statTotal += newStat.value;
			this.modTotal += newStat.mod;
		}
	}

	function Stat(givenRolls) {
		// rolls is array of 4 dice results
		if (givenRolls) {
			this.rolls = givenRolls;
		} else {
			this.rolls = [];
			// 4 rolls
			for (let i = 0; i < 4; i++) {
				this.rolls.push(getRoll(6));
			}
		}
		const sum = this.rolls.reduce((a, b) => a + b, 0);
		const min = Math.min(...this.rolls);
		// don't count lowest roll
		this.value = sum - min;

		this.mod = getStatMod(this.value);
	}

	// utils
	function getStatMod(stat) {
		for (let i = 3, j = -4; ; i += 2, j++) {
			if (i >= stat) return j;
		}
	}

	function getDieCode(roll) {
		return '&#98' + (55 + roll);
	}
	function getDieUnicode(roll) {
		return ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'][roll - 1];
	}

	function getDiceCodes(rolls) {
		let diceCodes = '';
		for (let i = 0; i < rolls.length; i++) diceCodes += getDieCode(rolls[i]) + ' ';
		return diceCodes;
	}

	function downloadCharacter() {
		if ($s.characters.length === 0) return;
		const modifierNameMap = {
			non: ' - ',
			str: 'Str',
			dex: 'Dex',
			con: 'Con',
			int: 'Int',
			wis: 'Wis',
			cha: 'Cha'
		};
		let txt = $s.characterName + '\r\n';
		for (let i = 0; i < currentCharacter.stats.length; i++) {
			txt += modifierNameMap[$s.selectedModifiers[i]] + ': ';
			for (let j = 0; j < currentCharacter.stats[i].rolls.length; j++) {
				if ($s.settings.exportUnicodeDice) txt += getDieUnicode(currentCharacter.stats[i].rolls[j]);
				else txt += currentCharacter.stats[i].rolls[j].toString();

				if (j < currentCharacter.stats[i].rolls.length - 1) txt += ',';
			}
			txt +=
				'\tVal: ' + currentCharacter.stats[i].value + '\tMod: ' + currentCharacter.stats[i].mod;
			txt += '\r\n';
		}
		txt +=
			'\r\nTotal:\t\tVal: ' + currentCharacter.statTotal + '\tMod: ' + currentCharacter.modTotal;
		txt += '\r\n\r\nLink:\t\t' + getRollLink();

		if (allAreSelected)
			txt +=
				'\r\nRoll with your stats: https://rgbstudios.org/projects/dnd-dice' + getDieRollerParams();

		downloadFile(txt, 'Character - ' + $s.characterName + '.txt');
	}

	let loaded = false;
	onMount(() => {
		// todo: sometimes `TypeError 500 — Cannot read properties of undefined (reading 'isSelfAccepting')`
		const url = new URL(window.location.href);
		let r = url.searchParams.get('r');
		if (r) {
			r = atob(r);
			console.log(r);

			let givenRolls = [];
			let idx = 0;
			for (let i = 0; i < 6; i++) {
				let tmp = [];
				for (let j = 0; j < 4; j++) {
					tmp[j] = parseInt(r.charAt(idx++));
				}
				givenRolls.push(tmp);
			}

			resetSelections();

			for (let i = 0; i < $s.selectedModifiers.length; i++) {
				$s.selectedModifiers[i] = modNames[parseInt(r.charAt(idx++))];
			}

			$s.characterName = r.substring(idx);

			$s.characters = [new Character(givenRolls)];

			console.log($s.characters[0]);

			showImportAlert = true;
		} else {
			rollCharacter();
		}
		loaded = true;
	});

	function prettyPrint(character) {
		let str = 'mod total: ' + character.modTotal + ' | ' + 'value total: ' + character.statTotal;

		for (let i = 0; i < 6; i++) {
			str +=
				'\r\nmod: ' +
				character.stats[i].mod +
				(character.stats[i].mod < 0 ? '' : ' ') +
				' | value: ' +
				character.stats[i].value +
				(character.stats[i].value > 9 ? '' : ' ') +
				' | rolls: ' +
				character.stats[i].rolls;
		}

		return (
			str +
			'\r\nmean: ' +
			Math.round((character.statTotal * 100) / 6) / 100 +
			'\r\ndeviation: ' +
			Math.round(stdDev(statsToValues(character.stats)) * 100) / 100 +
			'\r\n\r\n'
		);
	}

	function displayRolling() {
		isRollingAnimation = true;

		// roll every 100ms for 1000ms
		const intvl = setInterval(() => {
			animationRolls = Array(6)
				.fill()
				.map(() => [getRoll(6), getRoll(6), getRoll(6), getRoll(6)]);
		}, 100);
		setTimeout(function () {
			clearInterval(intvl);
			isRollingAnimation = false;
		}, 1000);
	}

	// params are all rolls in order, then all selection indicies in order
	function getRollLink() {
		// url params
		let r = '';
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 4; j++) {
				// no need to delimit since all possible vals 1-6 are 1 digit
				r += currentCharacter.stats[i].rolls[j];
			}
		}
		for (let i = 0; i < 6; i++) {
			// these values are also 0-6 so one digit
			r += modNames.indexOf($s.selectedModifiers[i]);
		}
		r += $s.characterName;
		r = btoa(r); // encode base64
		return window.location.href.split('character-roller')[0] + 'character-roller' + '?r=' + r;
	}

	$: allAreSelected = !$s.selectedModifiers.includes('non');

	// get url params for /dnd-dice
	function getDieRollerParams() {
		// 9 modifiers separated by spaces
		let m = '';

		for (const modName of modNames) {
			const idx = $s.selectedModifiers.indexOf(modName);
			console.log(idx);
			m += currentCharacter.stats[idx].mod + ' ';
		}

		// last 3 are always 0 (prf, spl, itv)
		m += '0 0 0';
		m = btoa(m); // encode base 64
		return '?m=' + m;
	}

	function statsToValues(stats) {
		let vals = [];
		for (let i = 0; i < stats.length; i++) vals[i] = stats[i].value;
		return vals;
	}

	function statsToMods(stats) {
		let mods = [];
		for (let i = 0; i < stats.length; i++) mods[i] = stats[i].mod;
		return mods;
	}

	function stdDev(array) {
		// standard deviation
		let sum = 0,
			len = array.length;
		for (let i = 0; i < len; i++) sum += array[i];
		let mean = sum / len;
		let devs = 0;
		for (let i = 0; i < len; i++) devs += Math.pow(array[i] - mean, 2);
		return Math.sqrt(devs / (len - 1));
	}

	function rollCharacter() {
		resetSelections();
		$s.characterName = '';

		$s.characters = [...$s.characters, new Character()];

		if ($s.settings.displayRolling) displayRolling();

		// show alert, remove url param
		showImportAlert = false;
		history.replaceState({}, '', '?r=');

		$s.historyText += prettyPrint(currentCharacter);
	}

	function resetSelections() {
		$s.selectedModifiers = ['non', 'non', 'non', 'non', 'non', 'non'];
	}
</script>

<DndSideNav />

<ProjectHeader
	title="D&D Character Roller"
	slug="dnd-dice/character-roller"
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
	screenshot="img/projects/screenshots/dnd-character-roller.png"
	isDark={true}
	isCondensed={true}
	parentBreadcrumb={{
		text: 'D&D Dice Roller',
		link: '/projects/dnd-dice'
	}}
/>

<div class="text-center">
	<button class="btn btn-info btn-lg" on:click={rollCharacter}>
		<Icon name="roll_dice" /> &nbsp; Roll New Character
	</button>

	<br />

	<button class="my-4 btn" on:click={() => copyText(getRollLink())}>
		<Icon name="link" /> &nbsp; Copy Character Link
	</button>

	<p class="mb-4">{charactersGeneratedText}</p>

	{#if allAreSelected}
		<button
			class="btn mb-2"
			on:click={() => window.open('/projects/dnd-dice' + getDieRollerParams())}
		>
			<Icon name="open" /> &nbsp; Open Character in D&D Roller
		</button>
	{/if}

	{#if showImportAlert}
		<div class="my-4">
			<Alert text="Imported rolls from link" />
		</div>
	{/if}
</div>

{#if loaded}
	<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
		{#each $s.selectedModifiers as selectedMod, idx}
			<div class="border-2 border-base-200 p-4 rounded-lg text-center">
				<p class="text-4xl">
					{@html getDiceCodes(
						isRollingAnimation && animationRolls.length
							? animationRolls[idx]
							: currentCharacter.stats[idx].rolls
					)}
				</p>
				{#if !isRollingAnimation}
					<p class="text-xl font-extrabold mt-3">{currentCharacter.stats[idx].value}</p>
					<p class="mb-4">
						{(currentCharacter.stats[idx].mod > 0 ? '+' : '') + currentCharacter.stats[idx].mod}
					</p>
					<select class="select select-bordered w-full" bind:value={selectedMod}>
						{#each Object.keys(modifierNames) as mod}
							<option value={mod} disabled={$s.selectedModifiers.includes(mod) && mod !== 'non'}
								>{modifierNames[mod]}</option
							>
						{/each}
					</select>
				{/if}
			</div>
		{/each}
	</div>

	{#if !isRollingAnimation}
		<div class="text-center my-4">
			<div class="w-20 sm:w-32 text-left inline-block border-2 border-base-200 p-2">
				<b>Total:</b>
				<br />
				{currentCharacter.statTotal}
				<br />
				{currentCharacter.modTotal}
			</div>
			<div class="w-20 sm:w-32 text-left inline-block border-2 border-base-200 p-2 mx-4">
				<b>Mean:</b>
				<br />
				{Math.round((currentCharacter.statTotal * 100) / 6) / 100}
				<br />
				{Math.round((currentCharacter.modTotal * 100) / 6) / 100}
			</div>
			<div class="w-20 sm:w-32 text-left inline-block border-2 border-base-200 p-2">
				<b>Deviation:</b>
				<br />
				{Math.round(stdDev(statsToValues(currentCharacter.stats)) * 100) / 100}
				<br />
				{Math.round(stdDev(statsToMods(currentCharacter.stats)) * 100) / 100}
			</div>
		</div>

		<div class="sm:btn-group justify-center mt-4 sm:mt-0">
			<input
				type="text"
				class="input mb-2 sm:mb-0 sm:border-r-0"
				placeholder="Character name"
				bind:value={$s.characterName}
			/>
			<input
				type="text"
				class="input mb-2 sm:mb-0 sm:border-r-0"
				value={currentCharacter.stats
					.map((stat) => stat.value)
					.sort((a, b) => a - b)
					.join(', ')}
			/>
			<button class="btn mb-2 sm:mb-0 sm:border-r-0" on:click={downloadCharacter}>
				<Icon name="download" /> &nbsp; Download
			</button>
			<button
				class="btn mb-2 sm:mb-0 sm:border-r-0"
				on:click={() =>
					copyText(
						currentCharacter.stats
							.map((stat) => stat.value)
							.sort((a, b) => a - b)
							.join(', ')
					)}
			>
				<Icon name="copy" /> &nbsp; Copy
			</button>
			<button class="btn" on:click={resetSelections}>
				<Icon name="reset" /> &nbsp; Reset Selections
			</button>
		</div>
	{/if}
{/if}

<div class="grid grid-cols-4 xl:grid-cols-6 mt-12">
	<div class="hidden xl:block" />
	<div class="col-span-2">
		<ModalButton _for="dnd-dice-character-modifiers-modal" class="btn-info mr-2 mb-2">
			<Icon name="table" /> &nbsp; Modifiers
		</ModalButton>
		<ModalButton _for="dnd-dice-character-skills-modal" class="btn-info mr-2 mb-2">
			<Icon name="clipboard_list" /> &nbsp; Skills
		</ModalButton>
		<ModalButton _for="dnd-dice-character-stats-modal" class="btn-info mr-2 mb-2">
			<Icon name="chart" /> &nbsp; Stats
		</ModalButton>
	</div>
	<div class="col-span-2">
		<ModalButton _for="dnd-dice-character-history-modal" class="btn-info mr-2 mb-2">
			<Icon name="history" /> &nbsp; History
		</ModalButton>
		<ModalButton _for="dnd-dice-character-about-modal" class="btn-info mr-2 mb-2">
			<Icon name="info" /> &nbsp; About
		</ModalButton>
		<ModalButton _for="dnd-dice-character-settings-modal" class="btn-info mr-2 mb-2">
			<Icon name="settings" /> &nbsp; Settings
		</ModalButton>
	</div>
	<div class="hidden xl:block" />
</div>

<CharacterHistoryModal historyText={$s.historyText} />
<CharacterAboutModal />
<CharacterModifiersModal />
<CharacterSettingsModal settings={$s.settings} />
<CharacterSkillsModal />
<CharacterStatsModal character={currentCharacter} />

<style lang="postcss">
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

	button:focus,
	select:focus,
	input:focus,
	label:focus,
	textarea:focus {
		@apply outline-base-500;
	}
</style>
