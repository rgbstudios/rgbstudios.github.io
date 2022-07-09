<script context="module">
	/** @type {import('./__types/[slug]').Load} */
	export async function load({ url }) {
		const props = {};

		for (const x of ['N', 'n', 'm', 'k']) {
			props[x] = parseInt(url.searchParams.get(x));
		}

		return {
			status: 200,
			props
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import Icon from '$lib/components/Icon.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import roundNumber from '$lib/util/roundNumber';

	let googleChartsLoaded = false;
	const roundPrecision = 10;
	export let N, m, n, k;
	let btnSubmit;
	let errorMsg = '';

	$: if (browser) {
		let queryParams = new URLSearchParams(window.location.search);
		N && queryParams.set('N', N);
		n && queryParams.set('n', n);
		k && queryParams.set('k', k);
		m && queryParams.set('m', m);
		history.replaceState(null, null, '?' + queryParams.toString());
	}

	$: eq = exactKdistinct(N, m, n, k);
	$: lt = lessKdistinct(N, m, n, k);
	$: gt = moreKdistinct(N, m, n, k);
	$: le = lt + eq;
	$: ge = gt + eq;
	$: mu = mean(N, m, n, k);

	$: if (isNaN(N) || isNaN(m) || isNaN(n) || isNaN(k)) {
		errorMsg = 'N, m, n, and k must be numbers';
	} else if (N <= 0 || m <= 0 || n <= 0) {
		errorMsg = 'N, m, and n must be &gt; 0';
	} else if (k < 0) {
		errorMsg = 'k must be &ge; 0';
	} else if (N >= 1000 || m >= 1000 || n >= 1000 || k >= 1000) {
		errorMsg = 'Inputs must be less than 1000';
	} else if (N < m) {
		errorMsg = 'N must be &ge; m';
	} else if (n < k) {
		errorMsg = 'n must be &ge; k';
	} else if (N < n) {
		errorMsg = 'N must be &ge; n';
	} else {
		errorMsg = '';
	}

	function validateForm() {
		if (btnSubmit) {
			N, m, n, k;
			btnSubmit.click();
		}
	}

	$: if ((N || m || n || k) && googleChartsLoaded) {
		drawCharts();
	}

	// Math

	function factorial(n) {
		let retval = 1;
		for (let i = n; i > 1; i--) {
			retval *= i;
		}
		return retval;
	}

	function nCk(n, k) {
		if (k > n) return 0;
		return factorial(n) / (factorial(n - k) * factorial(k));
	}

	function exactKdistinct(N, m, n, k) {
		return roundNumber((nCk(m, k) * nCk(N - m, n - k)) / nCk(N, n), roundPrecision);
	}

	function lessKdistinct(N, m, n, k) {
		let retval = 0;
		for (let i = 0; i < k; i++) {
			retval += exactKdistinct(N, m, n, i);
		}
		return roundNumber(retval, roundPrecision);
	}

	function moreKdistinct(N, m, n, k) {
		let retval = 0;
		for (let i = m; i > k; i--) {
			retval += exactKdistinct(N, m, n, i);
		}
		return roundNumber(retval, roundPrecision);
	}

	function mean(N, m, n, k) {
		return roundNumber((m * n) / N, roundPrecision);
	}

	// Charts

	onMount(() => {
		// load google charts visualization API and corechart package
		google.charts.load('current', { packages: ['corechart'] });

		// set a callback to run after visualization API loads
		google.charts.setOnLoadCallback(() => {
			drawCharts();
			googleChartsLoaded = true;
		});
	});

	const colors = {
		red: '#c30',
		green: '#396',
		blue: '#36f',
		gray: '#ccc'
	};

	// Creates and populates data table, instantiates charts, passes in data and draws charts
	function drawCharts() {
		// ========
		// Pie Chart
		// ========

		// data
		const piedata = new google.visualization.DataTable();
		piedata.addColumn('string', 'Picking Without Replacement Probability Distribution');
		piedata.addColumn('number', 'Probability');
		piedata.addRows([
			['P(X=k)', eq],
			['P(X<k)', lt],
			['P(X>k)', gt]
		]);

		// options
		const pieOptions = {
			title: 'Picking Without Replacement Probability Distribution',
			legend: { textStyle: { color: colors.gray } },
			titleTextStyle: { color: colors.gray },
			width: '90%',
			colors: [colors.blue, colors.red, colors.green],
			backgroundColor: { fill: 'transparent' }
		};

		// instantiate and draw
		const piechart = new google.visualization.PieChart(document.getElementById('pie-chart'));
		piechart.draw(piedata, pieOptions);

		// ========
		// Bar Chart
		// ========

		// data
		const bardata = new google.visualization.DataTable();
		bardata.addColumn('number', 'Number of distinct items picked (k)');
		bardata.addColumn('number', 'Probability');
		bardata.addColumn({ type: 'string', role: 'style' });
		for (let i = 0; i <= n; i++) {
			const colorName = i === k ? 'blue' : i > k ? 'green' : 'red';
			bardata.addRows([[i, exactKdistinct(N, m, n, i), colors[colorName]]]);
		}

		// options
		const barOptions = {
			title: 'Odds by number of distinct items picked (k)',
			titleTextStyle: { color: colors.gray },
			legend: 'none',
			chartArea: { width: '90%', legend: { position: 'none' } },
			hAxis: {
				title: 'Number of Distinct Items (k)',
				textStyle: { color: colors.gray },
				titleTextStyle: { color: colors.gray }
			},
			vAxis: {
				title: 'P(X=k)',
				textStyle: { color: colors.gray },
				titleTextStyle: { color: colors.gray }
			},
			backgroundColor: { fill: 'transparent' }
		};

		// instantiate and draw
		const barchart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
		barchart.draw(bardata, barOptions);
	}
</script>

<svelte:head>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</svelte:head>

<ProjectHeader
	title="Replacement Calc"
	description="Use Replacement Calc to calculate the probabilities of picking a certain number of objects without replacement, such as picking marbles or cards"
	keywords={[
		'picking without replacement',
		'picking without replacement calculator',
		'picking without replacement probability',
		'statistics',
		'without replacement',
		'replacemenet calc',
		'replacement calculator',
		'calculator',
		'stats',
		'probability'
	]}
	icon="img/projects/icons/replacement-calc.png"
	screenshot="img/projects/screenshots/replacement-calc.png"
/>

<div class="overflow-x-auto mt-8">
	<form on:submit|preventDefault>
		<table class="table w-full border border-gray-700">
			<tbody>
				<!-- Input -->
				<tr>
					<td>Total number of items</td>
					<td>N</td>
					<td>
						<input
							on:blur={validateForm}
							type="number"
							bind:value={N}
							min="1"
							max="1000"
							class="input input-bordered w-full"
							required
						/>
					</td>
				</tr>
				<tr>
					<td>Number of distinct items</td>
					<td>m</td>
					<td>
						<input
							on:blur={validateForm}
							type="number"
							bind:value={m}
							min="1"
							max={N}
							class="input input-bordered w-full"
							required
						/>
					</td>
				</tr>
				<tr>
					<td>Number of items picked</td>
					<td>n</td>
					<td>
						<input
							on:blur={validateForm}
							type="number"
							bind:value={n}
							min="1"
							max={N}
							class="input input-bordered w-full"
							required
						/>
					</td>
				</tr>
				<tr>
					<td>Number of distinct items picked</td>
					<td>k</td>
					<td>
						<input
							on:blur={validateForm}
							type="number"
							bind:value={k}
							min="0"
							max={n}
							class="input input-bordered w-full"
							required
						/>
					</td>
				</tr>
				<hr class="w-full" />
				<button type="submit" class="hidden" bind:this={btnSubmit}>Submit</button>
				<!-- Error -->
				{#if errorMsg !== ''}
					<tr>
						<td colspan="3">
							{#if errorMsg !== ''}
								<div class="alert alert-warning font-bold">
									{@html errorMsg}
								</div>
							{/if}
						</td>
					</tr>
				{/if}
				<!-- Output -->
				<tr>
					<td>Probability exactly k distinct items are picked</td>
					<td class="text-brand-blue font-bold">P(X=k)</td>
					<td>
						<input disabled value={eq} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Probability less than k distinct items are picked</td>
					<td class="text-brand-red font-bold">P(X&lt;k)</td>
					<td>
						<input disabled value={lt} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Probability more than k distinct items are picked</td>
					<td class="text-brand-green font-bold">P(X&gt;k)</td>
					<td>
						<input disabled value={gt} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Probability less than or equal to k distinct items are picked</td>
					<td>P(X&le;k)</td>
					<td>
						<input disabled value={le} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Probability more than or equal to k distinct items are picked</td>
					<td>P(X&ge;k)</td>
					<td>
						<input disabled value={ge} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Mean</td>
					<td>&mu;</td>
					<td>
						<input disabled value={mu} class="input input-bordered w-full" />
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</div>

<div class="alert mt-5">
	<div>
		<Icon name="info" class="w-6 h-6 inline text-brand-blue" />
		<span
			>Example: A deck of <strong>{N}</strong> (N) cards has <strong>{m}</strong> (m) red cards. If
			we draw <strong>{n}</strong> (n) cards, what are the odds exactly <strong>{k}</strong> (k) of them
			will be red?</span
		>
	</div>
</div>

<div id="pie-chart" class="mt-5" />
<div id="bar-chart" class="mt-5" />

<!-- Info modal -->
<div class="mt-5">
	<label for="info-modal" class="btn modal-button btn-info">Info</label>

	<input type="checkbox" id="info-modal" class="modal-toggle" />
	<label for="info-modal" class="modal cursor-pointer">
		<label class="modal-box relative text-center" for="">
			<h3 class="font-bold text-lg">Picking without replacements</h3>
			<div class="divider" />
			<p>
				When picking n items out of N total items, where m of them are distinct, the odds of picking
				<i>exactly</i>
				k distinct items is defined as:
				<br />P(X = k) = <sub>m</sub>C<sub>k</sub> * <sub>N-m</sub>C<sub>n-k</sub> /
				<sub>N</sub>C<sub>n</sub>
				<br />
				<br />Where <sub>n</sub>C<sub>x</sub> ("n choose x") is defined as
				<br /><sub>n</sub>C<sub>x</sub> = n! / [ x! (n - x)! ]
				<br />
				<br />Mean: n * m / N
			</p>

			<div class="divider" />

			<p>Inputs should be positive integers. Non-integer inputs will be rounded down.</p>

			<p>
				Picking wihtout replacement means that once you've picked your item, you do not put it back
				into the pool of items to pick before picking the next item
			</p>

			<div class="divider" />

			<p>
				<a
					class="link"
					href="https://en.wikipedia.org/wiki/Hypergeometric_distribution"
					target="_blank"
				>
					Wikipedia on Hypergeometric Distributions
				</a>
			</p>
			<p>
				<a class="link" href="https://en.wikipedia.org/wiki/Simple_random_sample" target="_blank">
					Wikipedia on Simple Random Samples
				</a>
			</p>
			<p>
				<a class="link" href="https://en.wikipedia.org/wiki/Urn_problem" target="_blank">
					Wikipedia on the Urn Problem
				</a>
			</p>

			<br />
			<p>
				<a
					class="link"
					href="https://web.ma.utexas.edu/users/parker/sampling/woreplshort.htm"
					target="_blank"
				>
					UTexas provides formulas for sampling with and without replacement
				</a>
			</p>
		</label>
	</label>

	<!-- About modal -->
	<label for="about-modal" class="btn modal-button btn-info">About</label>

	<input type="checkbox" id="about-modal" class="modal-toggle" />
	<label for="about-modal" class="modal cursor-pointer">
		<label class="modal-box relative text-center" for="">
			<h3 class="font-bold text-lg">Picking without replacements</h3>
			<div class="divider" />
			View the data as pie and bar charts, where the odds of
			<ul>
				<li>
					<span class="text-brand-blue font-bold">exactly k items is represented in blue</span>,
				</li>
				<li>
					<span class="text-brand-red font-bold">less than k items is represented in red</span>, and
				</li>
				<li>
					<span class="text-brand-green font-bold">
						greater than k items is represented in green
					</span>
				</li>
			</ul>

			<br />

			<p>
				Note that we limit input to 1000. This is because when calculating n choose k for inputs of
				1000 and 500, we get about 1e300, which is a number larger than should ever been needed, and
				is just approaching the largest number Javascript will store.
			</p>
			<p>
				To put this into perspective: Say we take every particle in the known universe and multiply
				that number by the number of nanoseconds the universe has been alive. This number squared is
				significantly less than 1e300.
			</p>
		</label>
	</label>
</div>
