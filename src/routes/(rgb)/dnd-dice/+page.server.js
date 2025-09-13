import { redirect } from '@sveltejs/kit';

/** Pre-render redirect to avoid broken links for legacy paths.
 * @type {import('./$types').PageServerLoad}
 */
export const load = () => {
	throw redirect(301, '/projects/dnd-dice');
};

export const prerender = true;
