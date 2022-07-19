import { barcodeFormats } from '$lib/data/consts';
import localStore from '$lib/util/localStore';

export const text = localStore<string>('barcode-text', 'Hello World!');
export const format = localStore<string>('barcode-format', barcodeFormats[0]);
export const showLabel = localStore<boolean>('barcode-show-label', true);
export const linesColor = localStore<string>('barcode-lines-color', '#000000');
export const bgColor = localStore<string>('barcode-bg-color', '#FFFFFF');
export const width = localStore<number>('barcode-width', 2);
export const height = localStore<number>('barcode-height', 100);
export const margin = localStore<number>('barcode-margin', 10);
