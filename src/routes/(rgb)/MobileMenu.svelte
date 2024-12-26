<script>
	import MobileMenuDropdown from './MobileMenuDropdown.svelte';
	import Icon from '$lib/components/Icon.svelte';
 import { navigating } from '$app/stores'

	let mobileMenuDropdownParent;
	let isMobileMenuDropdownOpen = false;
 $: if($navigating) isMobileMenuDropdownOpen = false;
</script>

<svelte:window
	on:resize={() => (isMobileMenuDropdownOpen = false)}
	on:click={({ target }) => {
		if (!mobileMenuDropdownParent.contains(target)) {
			isMobileMenuDropdownOpen = false;
		}
	}}
/>
<div class="relative lg:hidden" bind:this={mobileMenuDropdownParent}>
	<button
		class="btn btn-ghost"
		title="Menu"
		on:click={() => (isMobileMenuDropdownOpen = !isMobileMenuDropdownOpen)}
	>
		<Icon name="menu" />
	</button>
	<MobileMenuDropdown {isMobileMenuDropdownOpen}>
		<slot />
	</MobileMenuDropdown>
</div>
