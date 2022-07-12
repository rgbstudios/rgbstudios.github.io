<script context="module">
	/** @type {import('./__types/[slug]').Load} */
	export async function load({ url }) {
		const props = {};

		for (const x of ['p', 'n', 'x']) {
			const l = url.searchParams.get(x);
			if (!l) continue;
			props[x] = parseFloat(l);
		}
		props.q = url.searchParams.get('q');

		return {
			status: 200,
			props
		};
	}
</script>

<script>
	import { afterUpdate, onMount } from 'svelte';
	import { browser } from '$app/env';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	/// UTILS ///
	import roundNumber from '$lib/util/roundNumber';
	import { nCk } from '$lib/util/math';
	import Icon from '$lib/components/Icon.svelte';
	import { binomial_calc_info_html } from '$lib/data/consts';
	import copyText from '$lib/util/copyText';

	/// STATE ///
	let googleChartsLoaded = false;
	const roundPrecision = 10;
	export let p = 0.5,
		n = 40,
		x = 18;
	export let q;
	let errorMsg = '';
	let barChartURI, pieChartURI;
	const learnLocation = browser
		? window.location.protocol + `//` + window.location.host + window.location.pathname + `?q=learn`
		: '';

	$: if (browser) {
		let queryParams = new URLSearchParams(window.location.search);
		(typeof p == 'number') & !isNaN(p) && queryParams.set('p', p);
		(typeof n == 'number') & !isNaN(n) && queryParams.set('n', n);
		(typeof x == 'number') & !isNaN(x) && queryParams.set('x', x);
		q !== null && queryParams.set('q', q);
		let stringParams = queryParams.toString();
		stringParams
			? history.replaceState(null, null, '?' + stringParams)
			: history.replaceState(null, null);
	}

	$: eq = errorMsg !== '' ? 0 : probabilityMass(p, n, x);
	$: lt = errorMsg !== '' ? 0 : less(p, n, x);
	$: gt = errorMsg !== '' ? 0 : more(p, n, x);
	$: le = lt + eq;
	$: ge = gt + eq;
	$: mu = errorMsg !== '' ? 0 : roundNumber(mean(p, n, x), roundPrecision);
	$: sigma = errorMsg !== '' ? 0 : roundNumber(variance(p, n, x), roundPrecision);
	$: stddev = roundNumber(Math.sqrt(sigma), roundPrecision);

	$: if (n > 1000) {
		n = 1000;
	} else if (n < 0) {
		n = 0;
	}
	$: if (x > 1000) {
		x = 1000;
	} else if (x < 0) {
		x = 0;
	}
	$: if (p > 1) {
		p = 1;
	} else if (p < 0) {
		p = 0;
	}

	$: if (isNaN(p) || isNaN(n) || isNaN(x)) errorMsg = 'p, n, and x must be numbers';
	else if (p > 1 || p < 0) errorMsg = 'p must be between 0 and 1';
	else if (n < 0 || x < 0) errorMsg = 'n and x must be positive integers';
	else if (n >= 1000 || x >= 1000) errorMsg = 'n and x must be less than 1000';
	else if (n < x) errorMsg = 'n must be &ge; x';
	else errorMsg = '';

	$: if ((p || n || x) && googleChartsLoaded) {
		drawCharts();
	}

	/// MATH ///
	function probabilityMass(p, n, x) {
		return roundNumber(nCk(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x), roundPrecision);
	}

	function less(p, n, x) {
		let retval = 0;
		for (let i = 0; i < x; i++) {
			retval += probabilityMass(p, n, i);
		}
		return roundNumber(retval, roundPrecision);
	}

	function more(p, n, x) {
		let retval = 0;
		for (let i = n; i > x; i--) {
			retval += probabilityMass(p, n, i);
		}
		return roundNumber(retval, roundPrecision);
	}

	function mean(p, n, x) {
		return roundNumber(p * n, roundPrecision);
	}
	function variance(p, n, x) {
		return n * p * (1 - p);
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
			['P(X=x)', eq],
			['P(X<x)', lt],
			['P(X>x)', gt]
		]);

		// options
		const pieOptions = {
			title: 'Probability relative to x',
			legend: { textStyle: { color: colors.gray } },
			titleTextStyle: { color: colors.gray },
			width: '90%',
			colors: [colors.blue, colors.red, colors.green],
			backgroundColor: { fill: 'transparent' }
		};

		// instantiate and draw
		const piechart = new google.visualization.PieChart(document.getElementById('pie-chart'));
		google.visualization.events.addListener(piechart, 'ready', () => {
			pieChartURI = piechart.getImageURI(); // for download img
		});
		piechart.draw(piedata, pieOptions);

		// ========
		// Bar Chart
		// ========

		// data
		const bardata = new google.visualization.DataTable();
		bardata.addColumn('number', 'Number of successes');
		bardata.addColumn('number', 'Probability');
		bardata.addColumn({ type: 'string', role: 'style' });
		for (let i = 0; i <= n; i++) {
			const colorName = i === x ? 'blue' : i > x ? 'green' : 'red';
			bardata.addRows([[i, probabilityMass(p, n, i), colors[colorName]]]);
		}

		// options
		const barOptions = {
			title: 'Probability vs Number of successes',
			titleTextStyle: { color: colors.gray },
			legend: 'none',
			chartArea: { width: '90%', legend: { position: 'none' } },
			hAxis: {
				title: 'Number of successes (x)',
				textStyle: { color: colors.gray },
				titleTextStyle: { color: colors.gray }
			},
			vAxis: {
				format: 'decimal',
				title: 'P(X)',
				textStyle: { color: colors.gray },
				titleTextStyle: { color: colors.gray }
			},
			backgroundColor: { fill: 'transparent' }
		};

		// instantiate and draw
		const barchart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
		google.visualization.events.addListener(barchart, 'ready', () => {
			barChartURI = barchart.getImageURI(); // for download img
		});
		barchart.draw(bardata, barOptions);
	}

	afterUpdate(() => {
		MathJax.typeset();
	});
</script>

<svelte:head>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</svelte:head>

<ProjectHeader
	title="Binomial Calc"
	description="Use Binomial Calc to calculate the probabilities of binomial distributions and see them represented by interactve graphs"
	keywords={[
		'binomial calculator',
		'binomial distribution',
		'binomial distribution calculator',
		'binomial statistics',
		'binomial formulas',
		'binomial calculations',
		'binomial distribution charts',
		'binomial distribution graphs',
		'binomial distribution pie chart',
		'binomial distribution bar chart',
		'binomial probability',
		'binomial probability calculator',
		'binomial probability formulas',
		'binomial distribution probability'
	]}
	icon="img/projects/icons/binomial-calc.png"
	screenshot="img/projects/screenshots/binomial-calc.png"
/>

<div class="overflow-x-auto mt-8">
	<form on:submit|preventDefault>
		<table class="table w-full border border-gray-700">
			<tbody>
				<!-- Input -->
				<tr>
					<td>Probability of success (single trial)</td>
					<td>p</td>
					<td>
						<input
							type="number"
							bind:value={p}
							min="0"
							max="1"
							step="0.1"
							class="input input-bordered w-full"
							required
						/>
					</td>
				</tr>
				<tr>
					<td>Number of trials</td>
					<td>n</td>
					<td>
						<input
							type="number"
							bind:value={n}
							min="0"
							max="999"
							class="input input-bordered w-full"
							required
						/>
					</td>
				</tr>
				<tr>
					<td>Number of successes</td>
					<td>x</td>
					<td>
						<input
							type="number"
							bind:value={x}
							min="0"
							max={n}
							class="input input-bordered w-full"
							required
						/>
					</td>
				</tr>
				<hr class="w-full" />
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
					<td>Binomial probability</td>
					<td class="text-brand-blue font-bold">
						<div class="flex items-center gap-3">
							<span>P(X=x)</span>
							<img class="h-[1.5rem]" src="/img/projects/other/icon-equal.png" alt="equal" />
						</div>
					</td>
					<td>
						<input disabled value={eq} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Cumulative probability</td>
					<td class="text-brand-red font-bold">
						<div class="flex items-center gap-3">
							<span>P(X&lt;x)</span>
							<img class="h-[1.5rem]" src="/img/projects/other/icon-less.png" alt="less" />
						</div>
					</td>
					<td>
						<input disabled value={lt} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Cumulative probability</td>
					<td class="text-brand-green font-bold">
						<div class="flex items-center gap-3">
							<span>P(X&gt;x)</span>
							<img class="h-[1.5rem]" src="/img/projects/other/icon-greater.png" alt="greater" />
						</div>
					</td>
					<td>
						<input disabled value={gt} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Cumulative probability</td>
					<td class="font-bold">
						<div class="flex items-center gap-3">
							<span>P(X&le;x)</span>
							<img
								class="h-[1.5rem]"
								src="/img/projects/other/icon-less-equal.png"
								alt="less-equal"
							/>
						</div></td
					>
					<td>
						<input disabled value={le} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Cumulative probability</td>
					<td class="font-bold">
						<div class="flex items-center gap-3">
							<span>P(X&ge;x)</span>
							<img
								class="h-[1.5rem]"
								src="/img/projects/other/icon-greater-equal.png"
								alt="greater-equal"
							/>
						</div></td
					>
					<td>
						<input disabled value={ge} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>N choose X</td>
					<td><sub>n</sub>C<sub>x</sub></td>
					<td>
						<input
							disabled
							value={errorMsg !== '' ? 0 : nCk(n, x)}
							class="input input-bordered w-full"
						/>
					</td>
				</tr>
				<tr>
					<td>Mean</td>
					<td>&mu;</td>
					<td>
						<input disabled value={mu} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Variance</td>
					<td>&sigma;<sup>2</sup></td>
					<td>
						<input disabled value={sigma} class="input input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Standard Deviation</td>
					<td>&sigma;</td>
					<td>
						<input disabled value={stddev} class="input input-bordered w-full" />
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</div>

<div class="grid gap-5">
	<div id="pie-chart" class="mt-5" />
	<div class="flex justify-center">
		<a class="btn" download="pie_chart.png" href={pieChartURI} title="Download pie chart">
			<Icon name="download" />
		</a>
	</div>
	<div id="bar-chart" class="mt-5" />
	<div class="flex justify-center">
		<a class="btn" download="bar_chart.png" href={barChartURI} title="Download bar chart">
			<Icon name="download" />
		</a>
	</div>
</div>

<!-- Info modal -->
<div class="mt-5">
	<label for="info-modal" class="btn modal-button btn-info">Info</label>

	<input
		on:change={(e) => {
			if (!e.target.checked) q = '';
		}}
		checked={q === 'learn'}
		type="checkbox"
		id="info-modal"
		class="modal-toggle"
	/>
	<label for="info-modal" class="modal cursor-pointer">
		<label class="modal-box relative" for="">
			<h3 class="font-bold text-lg">Binomial Distributions</h3>
			<div class="divider" />
			{@html binomial_calc_info_html}
			<!-- Link to this modal: -->
			<div class="mt-5 grid gap-1">
				<span>Share the link to these formulas:</span>
				<div class="flex w-full">
					<input
						id="learnLink"
						class="input input-bordered grow"
						disabled
						type="text"
						value={learnLocation}
					/>
					<!-- TODO: show toast when copied -->
					<button type="button" class="btn" title="Copy" on:click={() => copyText(learnLocation)}>
						<Icon name="copy" />
					</button>
				</div>
				<div class="divider" />
				<p>
					Made with <a class="link" target="_blank" href="https://developers.google.com/chart"
						>Google Charts</a
					>,
					<a class="link" target="_blank" href="https://www.mathjax.org/">MathJax</a>,
					<a class="link" target="_blank" href="https://kit.svelte.dev/">SvelteKit</a>,
				</p>
			</div>
		</label>
	</label>
</div>
