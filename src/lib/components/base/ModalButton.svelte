<script lang="ts">
	export let _for: string;
</script>

<label tabindex="0" on:click for={_for} class="btn modal-button {$$props.class}"><slot /></label>
