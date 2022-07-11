import _ from 'lodash';
import { writable, type Writable } from 'svelte/store';

function localStore<T>(key: string, defaultValue: T): Writable<T> {
	const store = writable<T>(defaultValue);

	if (typeof localStorage !== 'undefined') {
		const lsVal = JSON.parse(localStorage.getItem(key));
		const value = lsVal ?? defaultValue;

		if (typeof defaultValue === 'object' && !(defaultValue instanceof Array)) {
			if (value !== null) store.set(_.merge(defaultValue, lsVal));
		} else {
			if (value !== null) store.set(value);
		}

		store.subscribe((val) => {
			localStorage.setItem(key, JSON.stringify(val));
		});
	}

	return store;
}

export default localStore;
