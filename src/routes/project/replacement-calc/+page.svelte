<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	/// COMPONENTS ///
	import Icon from '$lib/components/Icon.svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import AboutModal from '$lib/components/modals/replacement_calc/AboutModal.svelte';
	import ModalButton from '$lib/components/base/ModalButton.svelte';
	import InfoModal from '$lib/components/modals/replacement_calc/InfoModal.svelte';

	/// UTILS ///
	import roundNumber from '$lib/util/roundNumber';
	import { exactKdistinct, lessKdistinct, meanReplacement, moreKdistinct } from '$lib/util/math';

	let googleChartsLoaded = false;
	const roundPrecision = 10;
	export let data = {};

	let N = 52 ?? data.N;
	let m = 4 ?? data.m;
	let n = 5 ?? data.n;
	let k = 1 ?? data.k;
	let errorMsg = '';

	// sync url with inputs
	$: if (browser) {
		let queryParams = new URLSearchParams(window.location.search);
		N && queryParams.set('N', N);
		n && queryParams.set('n', n);
		k && queryParams.set('k', k);
		m && queryParams.set('m', m);
		history.replaceState(null, null, '?' + queryParams.toString());
	}

	$: eq = roundNumber(exactKdistinct(N, m, n, k), roundPrecision);
	$: lt = roundNumber(lessKdistinct(N, m, n, k), roundPrecision);
	$: gt = roundNumber(moreKdistinct(N, m, n, k), roundPrecision);
	$: le = lt + eq;
	$: ge = gt + eq;
	$: mu = roundNumber(meanReplacement(N, m, n), roundPrecision);

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

	$: if ((N || m || n || k) && googleChartsLoaded) {
		drawCharts();
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
	slug="replacement-calc"
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
		<table class="table w-full border border-base-700">
			<tbody>
				<!-- Input -->
				<tr>
					<td>Total number of items</td>
					<td>N</td>
					<td>
						<input
							type="number"
							bind:value={N}
							min="1"
							max="1000"
							class="input input-bordered w-full min-w-[10rem]"
							required
						/>
					</td>
				</tr>
				<tr>
					<td>Number of distinct items</td>
					<td>m</td>
					<td>
						<input
							type="number"
							bind:value={m}
							min="1"
							max={N}
							class="input input-bordered w-full min-w-[10rem]"
							required
						/>
					</td>
				</tr>
				<tr>
					<td>Number of items picked</td>
					<td>n</td>
					<td>
						<input
							type="number"
							bind:value={n}
							min="1"
							max={N}
							class="input input-bordered w-full min-w-[10rem]"
							required
						/>
					</td>
				</tr>
				<tr>
					<td>Number of distinct items picked</td>
					<td>k</td>
					<td>
						<input
							type="number"
							bind:value={k}
							min="0"
							max={n}
							class="input input-bordered w-full min-w-[10rem]"
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
					<td>Probability exactly k distinct items are picked</td>
					<td class="text-brand-blue font-bold">P(X=k)</td>
					<td>
						<input disabled value={eq} class="input input-bordered w-full min-w-[10rem]" />
					</td>
				</tr>
				<tr>
					<td>Probability less than k distinct items are picked</td>
					<td class="text-brand-red font-bold">P(X&lt;k)</td>
					<td>
						<input disabled value={lt} class="input input-bordered w-full min-w-[10rem]" />
					</td>
				</tr>
				<tr>
					<td>Probability more than k distinct items are picked</td>
					<td class="text-brand-green font-bold">P(X&gt;k)</td>
					<td>
						<input disabled value={gt} class="input input-bordered w-full min-w-[10rem]" />
					</td>
				</tr>
				<tr>
					<td>Probability less than or equal to k distinct items are picked</td>
					<td>P(X&le;k)</td>
					<td>
						<input disabled value={le} class="input input-bordered w-full min-w-[10rem]" />
					</td>
				</tr>
				<tr>
					<td>Probability more than or equal to k distinct items are picked</td>
					<td>P(X&ge;k)</td>
					<td>
						<input disabled value={ge} class="input input-bordered w-full min-w-[10rem]" />
					</td>
				</tr>
				<tr>
					<td>Mean</td>
					<td>&mu;</td>
					<td>
						<input disabled value={mu} class="input input-bordered w-full min-w-[10rem]" />
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</div>

<div class="alert mt-4">
	<div>
		<Icon name="info" class="w-6 h-6 inline text-brand-blue" />
		<span
			>Example: A deck of <strong>{N}</strong> (N) cards has <strong>{m}</strong> (m) red cards. If
			we draw <strong>{n}</strong> (n) cards, what are the odds exactly <strong>{k}</strong> (k) of them
			will be red?</span
		>
	</div>
</div>

<div id="pie-chart" class="mt-4" />
<div id="bar-chart" class="mt-4" />

<!-- Info modal -->
<div class="mt-4">
	<ModalButton _for="replacement-calc-info-modal">Info</ModalButton>
	<InfoModal />

	<ModalButton _for="replacement-calc-about-modal">About</ModalButton>
	<AboutModal />
</div>
