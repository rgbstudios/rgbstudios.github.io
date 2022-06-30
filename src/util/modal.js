// Copied from Desktop Clock

// set this to null to close the modal

import { writable, get } from 'svelte/store';

export const modal = writable({});

export const close = () => modal.set({});
export const open = (name) => modal.set({ name });
export const toggle = (name) => (!get(modal)?.name ? open(name) : close());
