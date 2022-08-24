<script>
	// todo show loader when searching
	// todo autocomplete
	// http://www.dnd5eapi.co/docs/
	import { onMount } from 'svelte';

	import screenfull from 'screenfull';

	import Autocomplete from '$lib/components/Autocomplete.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ModalButton from '$lib/components/base/ModalButton.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	import DndSideNav from '$lib/components/dnd-dice/DndSideNav.svelte';
	import SpellbookAboutModal from '$lib/components/modals/dnd_dice/SpellbookAboutModal.svelte';

	import copyText from '$lib/util/copyText';

	let searchValue = '',
		spellName = '',
		spellInfo = [];

	// api variables
	let resultData = {};
	let spellNames = [];

	onMount(async function () {
		const response = await fetch('http://www.dnd5eapi.co/api/spells');
		const data = await response.json();
		// console.log(data);

		// save data for later
		resultData = data.results;
		//NOTE: this part slows down page load
		for (let i = 0; i < resultData.length; i++) {
			spellNames[i] = resultData[i].name;
		}

		//get url params
		const url = new URL(window.location.href);
		const q = url.searchParams.get('q');
		searchValue = q ?? 'magic missile';

		doSearch(searchValue);
	});

	$: if (searchValue) {
		console.log('searching:', searchValue);
		doSearch(searchValue);
	}

	// https://stackoverflow.com/a/53620876/4907950
	function propertiesToArray(obj) {
		const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val);
		const addDelimiter = (a, b) => (a ? `${a}.${b}` : b);

		const paths = (obj = {}, head = '') => {
			return Object.entries(obj).reduce((product, [key, value]) => {
				let fullPath = addDelimiter(head, key);
				return isObject(value) ? product.concat(paths(value, fullPath)) : product.concat(fullPath);
			}, []);
		};
		return paths(obj);
	}

	// search

	async function getSpellData(spellName) {
		const response = await fetch('http://www.dnd5eapi.co/api/spells/' + spellName);
		const data = await response.json();
		console.log(data);

		// spellInfo = propertiesToArray(data);
		// return;

		spellInfo = [];

		for (const item in data) {
			// skip irrelevant items
			if (item == '_id' || item == 'url' || item == 'index') {
				continue;
			}
			let itemDescription = ' ';
			if (data[item][0] && data[item][0].name) {
				for (let i = 0; i < data[item].length; i++) {
					itemDescription += data[item][i].name + (i == data[item].length - 1 ? '' : ', ');
				}
			} else {
				itemDescription = (data[item].name ? data[item].name : data[item]).toString();
				itemDescription = itemDescription.replace('phb ', ''); //page number fix
			}

			// fix data that wasn't properly escaped in api
			itemDescription = itemDescription.split('â€™').join("'");
			itemDescription = itemDescription.split('â€œ').join("'");
			itemDescription = itemDescription.split('â€�').join("'");

			itemDescription = itemDescription.split(',-').join('\n').split('.,').join('.\n');

			spellInfo.push(
				capitalize(item.replace('_', ' ').replace('desc', 'description')) + ': ' + itemDescription
			);
		}
	}

	function doSearch(term) {
		for (const idx in resultData) {
			spellName = resultData[idx].name;
			if (
				spellName.toLowerCase().replace(' ', '').indexOf(term.toLowerCase().replace(' ', '')) != -1
			) {
				const tmpArr = resultData[idx].url.split('/');
				const num = tmpArr[tmpArr.length - 1];
				getSpellData(num);
				searchValue = spellName;
				history.replaceState({}, '', '?q=' + spellName);
				document.title = spellName + ' - D&D Spellbook | RGB Studios';
				return;
			}
		}
		spellName = '';
		spellInfo = ['No results found...'];
	}

	// https://stackoverflow.com/a/38530325/4907950
	const capitalize = (str) => str.replace(/\b\w/g, (l) => l.toUpperCase());
</script>

<DndSideNav />

<!-- todo update screenshot -->
<ProjectHeader
	title="D&D Spellbook"
	description="Search for D&D spells and find description, range, class, level, and more"
	keywords={[
		'dnd',
		'd&d',
		'dnd spell',
		'd&d spell',
		'dnd5e',
		'spell',
		'spellbook',
		'spell',
		'searcher'
	]}
	icon="img/projects/icons/dnd-spellbook.png"
	screenshot="img/projects/screenshots/dnd-dice.png"
	isDark={true}
	isCondensed={true}
	parentBreadcrumb={{
		text: 'D&D Dice Roller',
		link: '/projects/dnd-dice'
	}}
/>

<div class="sm:btn-group justify-center mt-4 mb-8 sm:mt-0">
	<ModalButton
		_for="dnd-dice-spellbook-about-modal"
		class="btn bg-white border-2 border-base-200 hover:bg-base-200 hover:border-base-200 mb-2 sm:mb-0 sm:border-r-0"
	>
		<Icon name="info" /> &nbsp; About
	</ModalButton>
	<button class="btn" on:click={() => screenfull.toggle()}>
		<Icon name="fullscreen" /> &nbsp; Fullscreen
	</button>
</div>

<div class="form-control">
	<div class="input-group">
		<button class="btn btn-square" on:click={() => copyText(window.location.href)}>
			<Icon name="link" />
		</button>
		<Autocomplete
			id="dnd-spell-search-autocomplete"
			bind:value={searchValue}
			placeholder="Search for a spell..."
			options={spellNames}
			maxResults={false}
			selectOnFocus={true}
			selectOnClick={true}
			class="input bg-white border-2 border-base-200 hover:bg-base-200 border-x-0"
		/>
		<button class="btn btn-square" on:click={() => doSearch(searchValue)}>
			<Icon name="search" />
		</button>
	</div>
</div>

<h3 class="text-3xl my-4">{spellName}</h3>

{#each spellInfo as info}
	<p class="my-2">
		<b>{info.split(':')[0]}</b>:
		{info.split(':')[1]}
	</p>
{/each}

<SpellbookAboutModal />

<style>
	button,
	input {
		@apply font-bold;
	}

	button:not(.btn-info),
	input {
		@apply bg-white border-2 border-base-200 hover:bg-base-200;
	}
</style>
