/**
 * Contains utils for rolling a die and getting die roller url parameters
 */

export const getRoll = (sides) => Math.floor(Math.random() * sides) + 1;

export const getDieRollerParams = (modifiers) => {
	// 9 modifiers separated by spaces
	let m = '';
	for (const modifier in modifiers) {
		m += modifiers[modifier] + ' ';
	}
	m = m.slice(0, -1); // remove last space

	m = btoa(m); // encode base 64
	return '?m=' + m;
};
