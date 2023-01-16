/**
 * Copy text to clipboard and display a toast
 */

import { toast } from '$lib/components/Toast.svelte';

const copyText = (txt) => {
	navigator.clipboard.writeText(txt).then(
		() => {
			console.log('clipboard successfully set');
			toast('Copied');
		},
		() => {
			console.log('clipboard write failed');
			toast('Failed to copy');
		}
	);
};

export default copyText;
