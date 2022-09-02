<script>
	import Icon from '$lib/components/Icon.svelte';
	import Modal from '$lib/components/base/Modal.svelte';
</script>

<Modal id="dnd-dice-character-skills-modal" class="bg-white text-base-900">
	<div slot="title">
		<Icon name="clipboard_list" /> &nbsp; List of Skills by Stat
	</div>

	<div class="text-center grid grid-cols-2 gap-8">
		<div>
			<b>Strength</b>
			<ul>
				<li>Athletics</li>
			</ul>
			<b>Dexterity</b>
			<ul>
				<li>Acrobatics</li>
				<li>Sleight of Hand</li>
				<li>Stealth</li>
				<li>Arcana</li>
			</ul>
			<b>Intelligence</b>
			<ul>
				<li>History</li>
				<li>Investigation</li>
				<li>Nature</li>
				<li>Religion</li>
			</ul>
		</div>
		<div>
			<b>Wisdom</b>
			<ul>
				<li>Animal Handling</li>
				<li>Insight</li>
				<li>Medicine</li>
				<li>Perception</li>
				<li>Survival</li>
			</ul>
			<b>Charisma</b>
			<ul>
				<li>Deception</li>
				<li>Intimidation</li>
				<li>Performance</li>
				<li>Persuasion</li>
			</ul>
		</div>
	</div>
</Modal>

<style lang="postcss">
	ul {
		@apply mb-8;
		li {
			@apply block p-2 border-2 border-base-200 border-t-0;
		}
	}
</style>
