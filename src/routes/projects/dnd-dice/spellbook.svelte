<script>
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	import DndSideNav from '$lib/components/dnd-dice/DndSideNav.svelte';
</script>

<DndSideNav />

<!-- todo d8 icon
topdo update screenshot -->
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
	icon="img/projects/icons/dnd-dice.png"
	screenshot="img/projects/screenshots/dnd-dice.png"
	isDark={true}
	isCondensed={true}
/>

Coming soon...
