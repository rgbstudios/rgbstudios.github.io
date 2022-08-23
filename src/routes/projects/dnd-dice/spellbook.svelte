<script>
	// todo fix breadcrumbs
	// todo show loader when searching
	// todo autocomplete
	// http://www.dnd5eapi.co/docs/
	import { onMount } from 'svelte';

	import Icon from '$lib/components/Icon.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	import DndSideNav from '$lib/components/dnd-dice/DndSideNav.svelte';

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

	// search

	async function getSpellData(spellName) {
		const response = await fetch('http://www.dnd5eapi.co/api/spells/' + spellName);
		const data = await response.json();
		console.log(data);

		spellInfo = [];
		for (const item in data) {
			// skip irrelevant items
			if (item == '_id' || item == 'url' || item == 'index') {
				continue;
			}
			let spellDescription = ' ';
			if (data[item][0] && data[item][0].name) {
				for (let i = 0; i < data[item].length; i++) {
					spellDescription += data[item][i].name + (i == data[item].length - 1 ? '' : ', ');
				}
			} else {
				spellDescription = (data[item].name ? data[item].name : data[item]).toString();
				spellDescription = spellDescription.replace('phb ', ''); //page number fix
			}

			// fix data that wasn't properly escaped in api
			spellDescription = spellDescription.split('â€™').join("'");
			spellDescription = spellDescription.split('â€œ').join("'");
			spellDescription = spellDescription.split('â€�').join("'");

			spellDescription = spellDescription.split(',-').join('\n').split('.,').join('.\n');

			spellInfo.push(
				capitalize(item.replace('_', ' ').replace('desc', 'description')) + ': ' + spellDescription
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
/>

<div class="form-control">
	<div class="input-group">
		<button class="btn btn-square" on:click={() => doSearch(searchValue)}>
			<Icon name="link" />
		</button>
		<input
			type="text"
			class="input w-full"
			placeholder="Search for a spell..."
			bind:value={searchValue}
			on:change={() => doSearch(searchValue)}
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

<style>
	button,
	input {
		@apply font-bold;
	}

	button:not(.btn-info),
	input {
		@apply bg-white border-2 border-base-200 hover:bg-base-200;
	}
	input {
		@apply border-x-0;
	}
</style>
