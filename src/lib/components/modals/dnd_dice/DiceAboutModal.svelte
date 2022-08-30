<script>
	import Icon from '$lib/components/Icon.svelte';
	import Modal from '$lib/components/base/Modal.svelte';
</script>

<Modal id="dnd-dice-about-modal" class="bg-white text-base-900">
	<div slot="title">
		<Icon name="info" /> &nbsp; About
	</div>

	<ul class="mx-4 list-disc">
		<li>
			Select how many dice you want to roll ("Number of Dice") and how many sides ("Die") and then
			click "Roll"
		</li>
		<li>Add a <b>Modifier</b> to add or subtract to your result</li>
		<li>
			Add <b>Advantage</b> or <b>Disadvantage</b> to roll two dice and use the highest / lowest (1 die
			only)
		</li>
		<li>
			Add an <b>Attribute</b> (such as strength, dexterity, etc.) to add the coresponding modifier to
			your roll (click "Mods &amp; Notes" to change your modifiers)
		</li>
		<li>
			Add a <b>Bonus</b> (such as proficiency, spell attack, etc.) to add the coresponding modifier to
			your roll (click "Mods &amp; Notes" to change your modifiers) (D20 only)
		</li>
		<li>Expertise is double your proficiency value</li>
		<li>Initiative determines the order of turns during combat</li>
		<li>
			An attack hits if a d20 plus the appropriate modifiers equals or exceeds the target's Armor
			Class (AC)
		</li>
		<li>
			When attacking in dnd, roll the correct number of dice and add your modifier to determine how
			much damage is dealt
		</li>
	</ul>

	<hr class="my-4" />

	<ul class="mx-4 list-disc">
		<li>Click the blue "+" buttons to roll a custom number of custom dice</li>
		<li>Click "Reset" to quickly reset modifier, advantage, attribute, and bonus</li>
		<li>
			Click "Mods &amp; Notes" to view and edit your modifiers, and take notes during your campaign
		</li>
		<li>Click "History" to view your roll history, clear it, and download it</li>
		<li>Modifiers can be stored in the website URL with the "link modifiers" setting</li>
		<li>
			You can speak roll results, enter fullscreen, and send an email all from the Settings window
		</li>
	</ul>
</Modal>
