export function factorial(n: number): number {
	let retval = 1;
	for (let i = n; i > 1; i--) {
		retval *= i;
	}
	return retval;
}

export function nCk(n: number, k: number): number {
	let result = 1;
	for (let i = 1; i <= k; i++) {
		result *= (n + 1 - i) / i;
	}
	return result;
}
