import merge from 'lodash.merge';
import { writable, type Writable } from 'svelte/store';

function localStore<T>(key: string, defaultValue: T): Writable<T> {
	const store = writable<T>(defaultValue);

	if (typeof localStorage !== 'undefined') {
		const value = merge(defaultValue, JSON.parse(localStorage.getItem(key)));
		if (value !== null) store.set(value);
		// const localValue = JSON.parse(localStorage.getItem(key));
		// const newValue = localValue ?? defaultValue;

		// if (newValue !== null) {
		// 	if (typeof defaultValue === 'object' && !(defaultValue instanceof Array)) {
		// 		store.set(merge(defaultValue, localValue));
		// 	} else {
		// 		store.set(newValue);
		// 	}
		// }

		store.subscribe((val) => {
			localStorage.setItem(key, JSON.stringify(val));
		});
	}

	return store;
}

export default localStore;
