
/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	const props = {};

	for (const x of ['p', 'n', 'x']) {
		const l = url.searchParams.get(x);
		if (!l) continue;
		props[x] = parseFloat(l);
	}
	props.q = url.searchParams.get('q');

	return props;
}
