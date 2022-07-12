export function factorial(n: number): number {
	let retval = 1;
	for (let i = n; i > 1; i--) {
		retval *= i;
	}
	return retval;
}

export function nCk(n: number, x: number): number {
	if (x > n) return 0;
	return factorial(n) / (factorial(n - x) * factorial(x));
}
