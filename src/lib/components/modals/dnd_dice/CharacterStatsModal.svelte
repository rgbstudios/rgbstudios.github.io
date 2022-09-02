<script>
	import { onMount } from 'svelte';

	import Icon from '$lib/components/Icon.svelte';
	import Modal from '$lib/components/base/Modal.svelte';

	import roundNumber from '$lib/util/roundNumber';

	export let character;

	let googleChartsLoaded = false;
	let normalChartURI, userChartURI;

	$: if (character && googleChartsLoaded) {
		drawCharts();
	}

	onMount(() => {
		if (typeof google !== 'undefined') {
			googleChartSetup();
		} else {
			setTimeout(googleChartSetup, 3000);
		}
	});

	function googleChartSetup() {
		// load google charts visualization API and corechart package
		google.charts.load('current', { packages: ['corechart'] });

		// set a callback to run after visualization API loads
		google.charts.setOnLoadCallback(() => {
			googleChartsLoaded = true;
		});
	}

	// Creates and populates data table, instantiates charts, passes in data and draws charts
	const odds = [1, 4, 10, 21, 38, 62, 91, 122, 148, 167, 172, 160, 131, 94, 54, 21];
	const oddsTotal = 1296;
	function drawCharts() {
		const colors = {
			blue: '#36f',
			white: '#fff',
			light: '#ccc',
			dark: '#333'
		};

		//begin chart 1: odds of each roll
		let chartdata = [['', '', { role: 'style' }]];
		for (let i = 0; i < odds.length; i++) chartdata.push([i + 3, odds[i] / oddsTotal, colors.blue]);

		let data = google.visualization.arrayToDataTable(chartdata);

		let options = {
			title: '',
			titleTextStyle: { color: colors.dark },
			legend: 'none',
			chartArea: { legend: { position: 'none' } },
			hAxis: {
				title: 'Stat',
				gridlines: {
					count: 8,
					color: colors.light
				},
				textStyle: { color: colors.dark },
				titleTextStyle: { color: colors.dark }
			},
			vAxis: {
				title: 'Odds of each stat',
				gridlines: {
					count: 4,
					color: colors.light
				},
				textStyle: { color: colors.dark },
				titleTextStyle: { color: colors.dark }
			},
			backgroundColor: { fill: colors.white }
		};

		const normalRollsChart = new google.visualization.ColumnChart(
			document.getElementById('normal-rolls-chart')
		);
		google.visualization.events.addListener(normalRollsChart, 'ready', () => {
			normalChartURI = normalRollsChart.getImageURI(); // for download img
		});
		normalRollsChart.draw(data, options);

		//begin chart 2: user rolls
		let occurences = new Array(16).fill(0);
		for (let i = 0; i < 6; i++) occurences[character.stats[i].value - 3]++;

		chartdata = [['', '', { role: 'style' }]];
		for (let i = 0; i < 16; i++) chartdata.push([i + 3, occurences[i] / 6, colors.blue]);
		data = google.visualization.arrayToDataTable(chartdata);

		options.vAxis.title = 'Frequency';
		const userRollsChart = new google.visualization.ColumnChart(
			document.getElementById('user-rolls-chart')
		);
		google.visualization.events.addListener(userRollsChart, 'ready', () => {
			userChartURI = userRollsChart.getImageURI(); // for download img
		});
		userRollsChart.draw(data, options);
	}
</script>

<svelte:head>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</svelte:head>

<Modal id="dnd-dice-character-stats-modal" class="bg-white text-base-900">
	<div slot="title">
		<Icon name="chart" /> &nbsp; Odds of Each Roll
	</div>

	<div class="grid gap-4">
		<p>Average Rolls:</p>
		<small>Mean: 12.24, Median: 12, Mode: 13, Standard Deviation: 2.85</small>
		<div id="normal-rolls-chart" />
		<div class="flex justify-center">
			<a
				class="btn"
				download="normal-rolls.png"
				href={normalChartURI}
				title="Download normal rolls chart"
			>
				<Icon name="download" />
			</a>
		</div>

		<p>My rolls:</p>
		<div id="user-rolls-chart" />
		<div class="flex justify-center">
			<a class="btn" download="my-rolls.png" href={userChartURI} title="Download my rolls chart">
				<Icon name="download" />
			</a>
		</div>
		<hr />
		<table class="table table-compact w-full">
			<tr>
				<th>Stat</th>
				<th>Odds</th>
				<th>Percent</th>
			</tr>
			{#each odds as odd, idx}
				<tr>
					<td>{idx + 3}</td>
					<td>{odd}/{1296}</td>
					<td>{roundNumber(odd / 1296, 5)}</td>
				</tr>
			{/each}
		</table>
	</div>
</Modal>

<style lang="postcss">
	.btn {
		@apply bg-white border-2 border-base-200 hover:bg-base-200;
	}

	table * {
		@apply bg-white;
	}
	th,
	td {
		@apply border-gray-200;
	}

	button:focus,
	select:focus,
	input:focus,
	label:focus,
	textarea:focus {
		@apply outline-base-500;
	}
</style>
