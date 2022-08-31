<script>
	import Icon from '$lib/components/Icon.svelte';
	import Modal from '$lib/components/base/Modal.svelte';
</script>

<Modal id="dnd-dice-spellbook-about-modal" class="bg-white text-base-900">
	<div slot="title">
		<Icon name="info" /> &nbsp; About
	</div>

	<p><b>About Searching</b></p>

	<ul class="mx-4 list-disc">
		<li>
			Search for the name of a spell and find info such as description, range, level, classes, and
			more.
		</li>
		<li>Spells are on pages <b>211-289</b> in the D&amp;D 5e Handbook.</li>
		<li>Spellbook has a button to copy the link to your current spell.</li>
		<li><b>Useful Links:</b></li>
		<a
			class="link"
			href="http://media.wizards.com/2014/downloads/dnd/PlayerDnDBasicRules_v0.2_PrintFriendly.pdf"
			target="_blank">D&amp;D 5e Basic Rules for Players</a
		><br />
		<a
			class="link"
			href="http://media.wizards.com/2014/downloads/dnd/DMBasicRulesv.0.3_PrinterFriendly.pdf"
			target="_blank">D&amp;D 5e Basic Rules for DMs</a
		>
	</ul>
</Modal>
