<script lang="ts">
	export let _for: string;
	export let className: string = '';
</script>

<label tabindex="0" on:click for={_for} class="btn modal-button {className}"><slot /></label>
