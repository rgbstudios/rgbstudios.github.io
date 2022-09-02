

<script>
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import { afterUpdate, onMount } from 'svelte';
	import { browser } from '$app/env';

	/// COMPONENTS ///
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';

	/// UTILS ///
	import roundNumber from '$lib/util/roundNumber';
	import {
		probabilityMass,
		lessProbabilityMass,
		moreProbabilityMass,
		nCk,
		meanProbabilityMass,
		varianceProbabilityMass
	} from '$lib/util/math';
	import copyText from '$lib/util/copyText';

	/// STATE ///
	// mathjax conflicts with svelte templating
	const info_html = `
  <h4>Formulas</h4><br>
  <p>
    A binomial experiment with <b>n</b> trials, probability of success <b>p</b>, and <b>x</b> successes, has
    <br>Binomial Probability: $$P(X = x) = _nC_x * p^x * (1 - p)^{n - x}$$
    <br>Where "n choose x" is: $$(_nC_x) = \\frac{n!}{x! (n - x)!}$$
    <br>
    <br>Mean: $$ \\mu = n * p$$
    <br>Variance: $$ \\sigma = n * p * (1-p)$$
    <br>Standard Deviation: $$ \\sigma^2 = \\sqrt{n * p * (1-p)}$$
  </p>

  <div class="divider"></div>
  <h4>Requirements</h4><br>

  <p>Binomial Experiments must have:</p>
  <ul>
    <li><b>Trials with 2 outcomes</b> (success or failure)</li>
    <li><b>Independent trials</b> (the probability of a particular outcome is constant)</li>
  </ul>

  <br><p><b>p</b> must be between 0 and 1, <b>n</b> and <b>x</b> must be positive integers where <b>n</b> &ge; <b>x</b></p>

  <div class="divider"></div>

  <p>Learn more on <a class="link" href="https://en.wikipedia.org/wiki/Binomial_distribution" target="_blank">Wikipedia</a>
  and <a class="link" href="https://www.mathsisfun.com/data/binomial-distribution.html" target="_blank">Math is Fun</a>, or watch a <a class="link" href="https://youtu.be/8idr1WZ1A7Q" target="_blank">3Blue1Brown video</a>.</p>
`;
	let changed = false;
	$: {
		p, n, x;
		changed = true;
	}
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

	/// sync inputs with url
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

	let eq, lt, gt, le, ge, mu, sigma, stddev, _nck;

	/// Input limiter
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

	/// Warn on invalid inputs
	$: if (isNaN(p) || isNaN(n) || isNaN(x)) errorMsg = 'p, n, and x must be numbers';
	else if (n === null || p === null || x === null) errorMsg = 'p, n, x must be numbers';
	else if (p > 1 || p < 0) errorMsg = 'p must be between 0 and 1';
	else if (n < 0 || x < 0) errorMsg = 'n and x must be positive integers';
	else if (n >= 1000 || x >= 1000) errorMsg = 'n and x must be less than 1000';
	else if (n < x) errorMsg = 'n must be &ge; x';
	else errorMsg = '';

	$: if ((p || n || x) && googleChartsLoaded) {
		drawCharts();
	}

	/// METHODS ///
	function calculate() {
		changed = false;
		eq = errorMsg !== '' ? 0 : roundNumber(probabilityMass(p, n, x), roundPrecision);
		lt = errorMsg !== '' ? 0 : roundNumber(lessProbabilityMass(p, n, x), roundPrecision);
		gt = errorMsg !== '' ? 0 : roundNumber(moreProbabilityMass(p, n, x), roundPrecision);
		le = lt + eq;
		ge = gt + eq;
		mu = errorMsg !== '' ? 0 : roundNumber(meanProbabilityMass(p, n), roundPrecision);
		sigma = errorMsg !== '' ? 0 : roundNumber(varianceProbabilityMass(p, n), roundPrecision);
		stddev = roundNumber(Math.sqrt(sigma), roundPrecision);
		_nck = errorMsg !== '' ? 0 : nCk(n, x);
	}

	/// LIFECYCLE HOOKS ///
	// Charts
	onMount(() => {
		// load google charts visualization API and corechart package
		google.charts.load('current', { packages: ['corechart'] });

		// set a callback to run after visualization API loads
		google.charts.setOnLoadCallback(() => {
			drawCharts();
			googleChartsLoaded = true;
		});
		calculate();
		setInterval(() => {
			if (!changed) return;
			calculate();
		}, 2000);
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
	<script
		id="MathJax-script"
		async
		src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</svelte:head>

<ProjectHeader
	title="Binomial Distribution Calculator"
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
		<table class="table w-full border border-base-700">
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
							class="input input-sm input-bordered w-full"
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
							class="input input-sm input-bordered w-full"
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
							class="input input-sm input-bordered w-full"
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
							<img class="h-[1.5rem]" src="/img/projects/other/icon-equal.svg" alt="equal" />
						</div>
					</td>
					<td>
						<input disabled value={eq} class="input input-sm input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Cumulative probability</td>
					<td class="text-brand-red font-bold">
						<div class="flex items-center gap-3">
							<span>P(X&lt;x)</span>
							<img class="h-[1.5rem]" src="/img/projects/other/icon-less.svg" alt="less" />
						</div>
					</td>
					<td>
						<input disabled value={lt} class="input input-sm input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Cumulative probability</td>
					<td class="text-brand-green font-bold">
						<div class="flex items-center gap-3">
							<span>P(X&gt;x)</span>
							<img class="h-[1.5rem]" src="/img/projects/other/icon-greater.svg" alt="greater" />
						</div>
					</td>
					<td>
						<input disabled value={gt} class="input input-sm input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Cumulative probability</td>
					<td class="font-bold">
						<div class="flex items-center gap-3">
							<span>P(X&le;x)</span>
							<img
								class="h-[1.5rem]"
								src="/img/projects/other/icon-less-equal.svg"
								alt="less-equal"
							/>
						</div></td
					>
					<td>
						<input disabled value={le} class="input input-sm input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Cumulative probability</td>
					<td class="font-bold">
						<div class="flex items-center gap-3">
							<span>P(X&ge;x)</span>
							<img
								class="h-[1.5rem]"
								src="/img/projects/other/icon-greater-equal.svg"
								alt="greater-equal"
							/>
						</div></td
					>
					<td>
						<input disabled value={ge} class="input input-sm input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>N choose X</td>
					<td><sub>n</sub>C<sub>x</sub></td>
					<td>
						<input disabled value={_nck} class="input input-sm input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Mean</td>
					<td>&mu;</td>
					<td>
						<input disabled value={mu} class="input input-sm input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Variance</td>
					<td>&sigma;<sup>2</sup></td>
					<td>
						<input disabled value={sigma} class="input input-sm input-bordered w-full" />
					</td>
				</tr>
				<tr>
					<td>Standard Deviation</td>
					<td>&sigma;</td>
					<td>
						<input disabled value={stddev} class="input input-sm input-bordered w-full" />
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
			{@html info_html}
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

<style lang="postcss">
	td {
		@apply px-4 py-2 text-sm sm:text-base;
	}
</style>
