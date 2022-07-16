<script lang="ts">
	export let _for: string;
	export let className: string = '';
</script>

<label on:click for={_for} class="btn modal-button {className}"><slot /></label>
