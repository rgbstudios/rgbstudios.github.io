import { addToast } from '$lib/components/Toast/toastStore';

const copyText = (txt) => {
	navigator.clipboard.writeText(txt).then(
		() => {
			console.log('clipboard successfully set');
			addToast({ message: 'Copied', type: 'success', timeout: 3000 });
		},
		() => {
			console.log('clipboard write failed');
			addToast({ message: 'Failed to copy', type: 'info', timeout: 3000 });
		}
	);
};

export default copyText;
