/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
	const props = {};

	for (const x of ['N', 'n', 'm', 'k']) {
		const val = parseInt(url.searchParams.get(x));
		if (val) props[x] = val;
	}

	return props;
}
