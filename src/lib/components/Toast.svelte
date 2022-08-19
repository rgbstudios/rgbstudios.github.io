<script context="module" lang="ts">
	import { writable } from 'svelte/store';
	import uid from '$lib/util/uid';

	interface Message {
		id: string;
		text: string;
	}
	let messages = writable<Message[]>([]);

	export function toast(text: string, duration: number = 5000) {
		const id = uid();
		messages.update((m) => [...m, { id, text }]);
		setTimeout(() => {
			messages.update((m) => m.filter((e) => e.id !== id));
		}, duration);
	}
</script>

<script lang="ts">
</script>

<div class="toast">
	{#each $messages as m}
		<div class="alert alert-info">
			<div>
				<span>{m.text}</span>
			</div>
		</div>
	{/each}
</div>
