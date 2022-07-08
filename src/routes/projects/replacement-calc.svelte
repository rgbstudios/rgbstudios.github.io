<script>
	import { onMount } from 'svelte';
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import roundNumber from '$lib/util/roundNumber';

	const roundPrecision = 10;
	let N = 52;
	let m = 4;
	let n = 5;
	let k = 1;

	$: eq = exactKdistinct(N, m, n, k);
	$: lt = lessKdistinct(N, m, n, k);
	$: gt = moreKdistinct(N, m, n, k);
	$: le = lt + eq;
	$: ge = gt + eq;
	$: mu = mean(N, m, n, k);

	function factorial(n) {
		let retval = 1;
		for (let i = n; i > 1; i--) {
			retval *= i;
		}
		return retval;
	}

	function nCk(n, k) {
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

	onMount(() => {
		// Load the Visualization API and the corechart package.
		google.charts.load('current', { packages: ['corechart'] });

		// Set a callback to run when the Google Visualization API is loaded.
		google.charts.setOnLoadCallback(drawChart);

		// Callback that creates and populates a data table,
		// instantiates the pie chart, passes in the data and
		// draws it.
		function drawChart() {
			// Create the data table.
			const piedata = new google.visualization.DataTable();
			piedata.addColumn('string', 'Picking Without Replacement Probability Distribution');
			piedata.addColumn('number', 'Probability');
			piedata.addRows([
				['P(X=k)', eq],
				['P(X<k)', lt],
				['P(X>k)', gt]
			]);

			// Set chart options
			var options = {
				title: 'Picking Without Replacement Probability Distribution',
				legend: { textStyle: { color: '#ccc' } },
				titleTextStyle: { color: '#ccc' },
				width: '90%',
				colors: ['#339', '#933', '#393'],
				backgroundColor: { fill: 'transparent' }
			};

			// Instantiate and draw our chart, passing in some options.
			var piechart = new google.visualization.PieChart(document.getElementById('pie_div'));
			piechart.draw(piedata, options);

			const bardata = new google.visualization.DataTable();
			bardata.addColumn('number', 'Number of distinct items picked (k)');
			bardata.addColumn('number', 'Probability');
			for (let i = 0; i <= n; i++) {
				bardata.addRows([[i, exactKdistinct(N, m, n, i)]]);
			}

			// Set chart options
			var options = {
				title: 'Odds by number of distinct items picked (k)',
				titleTextStyle: { color: '#ccc' },
				legend: 'none',
				chartArea: { width: '90%', legend: { position: 'none' } },
				hAxis: {
					title: 'Number of Distinct Items (k)',
					textStyle: { color: '#ccc' },
					titleTextStyle: { color: '#ccc' }
				},
				vAxis: {
					title: 'P(X=k)',
					textStyle: { color: '#ccc' },
					titleTextStyle: { color: '#ccc' }
				},
				backgroundColor: { fill: 'transparent' }
			};

			// Instantiate and draw our chart, passing in some options.
			var barchart = new google.visualization.ColumnChart(document.getElementById('bar_div'));
			barchart.draw(bardata, options);
		}
	});
</script>

<svelte:head>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</svelte:head>
<ProjectHeader
	title="Replacement Calc"
	description="Use Replacement Calc to calculate the probabilities of picking a certain number of objects without replacement, such as picking marbles or cards"
	keywords={[
		'statistics',
		'without replacement',
		'replacemenet calc',
		'replacement calculator',
		'calc',
		'calculator',
		'stats',
		'probability'
	]}
	icon="img/projects/icons/replacement-calc.png"
	screenshot="img/projects/screenshots/replacement-calc.png"
/>
<div class="mt-5 flex flex-col gap-5">
	<label class="input-group">
		<span>Total number of items</span>
		<span class="bg-info">N</span>
		<input type="number" bind:value={N} placeholder="52" class="input input-bordered grow" />
	</label>
	<label class="input-group">
		<span>Number of distinct items</span>
		<span class="bg-info">m</span>
		<input type="number" bind:value={m} placeholder="4" class="input input-bordered grow" />
	</label>
	<label class="input-group">
		<span>Number of items picked</span>
		<span class="bg-info">n</span>
		<input type="number" bind:value={n} placeholder="5" class="input input-bordered grow" />
	</label>
	<label class="input-group">
		<span>Number of distinct items picked</span>
		<span class="bg-info">k</span>
		<input type="number" bind:value={k} placeholder="1" class="input input-bordered grow" />
	</label>
</div>
<div class="mt-5 grid md:grid-cols-2 gap-1">
	<div class="stat bg-gray-900">
		<div class="stat-title">P(X=k)</div>
		<div class="stat-value">{eq}</div>
		<div class="stat-description">Probability exactly k distinct items are picked</div>
	</div>
	<div class="stat bg-gray-900">
		<div class="stat-title">P(X&lt;k)</div>
		<div class="stat-value">{lt}</div>
		<div class="stat-description">Cumulative probability less than k distinct items are picked</div>
	</div>
	<div class="stat bg-gray-900">
		<div class="stat-title">P(X&gt;k)</div>
		<div class="stat-value">{gt}</div>
		<div class="stat-description">Cumulative probability more than k distinct items are picked</div>
	</div>
	<div class="stat bg-gray-900">
		<div class="stat-title">P(X&le;k)</div>
		<div class="stat-value">
			{le}
		</div>
		<div class="stat-description">
			Cumulative probability less than or equal to k distinct items are picked
		</div>
	</div>
	<div class="stat bg-gray-900">
		<div class="stat-title">P(X&ge;k)</div>
		<div class="stat-value">
			{ge}
		</div>
		<div class="stat-description">
			Cumulative probability more than or equal to k distinct items are picked
		</div>
	</div>
	<div class="stat bg-gray-900">
		<div class="stat-title">Mean(&mu;)</div>
		<div class="stat-value">{mu}</div>
	</div>
</div>
<div class="alert shadow-lg mt-5">
	<div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="stroke-info flex-shrink-0 w-6 h-6"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span
			>Example: A deck of <strong>{N}</strong> (N) cards has <strong>{m}</strong> (m) red cards. If
			we draw <strong>{n}</strong> (n) cards, what are the odds exactly <strong>{k}</strong> (k) of them
			will be red?</span
		>
	</div>
</div>
<div id="pie_div" class="mt-5" />
<div id="bar_div" class="mt-5" />
