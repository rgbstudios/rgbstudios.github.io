// https://stackoverflow.com/a/12830454
function roundNumber(num, precision) {
	precision = Math.pow(10, precision);
	return Math.round(num * precision) / precision;
}

export default roundNumber;
