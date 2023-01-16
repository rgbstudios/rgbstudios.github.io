/**
 * Contains utilities for math functions used in calculators
 *
 * Currently, only used by binomial calc
 */

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

export function probabilityMass(p: number, n: number, x: number): number {
	return nCk(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
}

export function lessProbabilityMass(p: number, n: number, x: number): number {
	let retval = 0;
	for (let i = 0; i < x; i++) {
		retval += probabilityMass(p, n, i);
	}
	return retval;
}

export function moreProbabilityMass(p: number, n: number, x: number): number {
	let retval = 0;
	for (let i = n; i > x; i--) {
		retval += probabilityMass(p, n, i);
	}
	return retval;
}

export function meanProbabilityMass(p: number, n: number): number {
	return p * n;
}

export function varianceProbabilityMass(p: number, n: number): number {
	return n * p * (1 - p);
}

export function exactKdistinct(N: number, m: number, n: number, k: number): number {
	return (nCk(m, k) * nCk(N - m, n - k)) / nCk(N, n);
}

export function lessKdistinct(N: number, m: number, n: number, k: number): number {
	let retval = 0;
	for (let i = 0; i < k; i++) {
		retval += exactKdistinct(N, m, n, i);
	}
	return retval;
}

export function moreKdistinct(N: number, m: number, n: number, k: number): number {
	let retval = 0;
	for (let i = m; i > k; i--) {
		retval += exactKdistinct(N, m, n, i);
	}
	return retval;
}

export function meanReplacement(N: number, m: number, n: number): number {
	return (m * n) / N;
}
