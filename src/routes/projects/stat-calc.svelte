<script>
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	let separator = ',';
	let dataset = [3, 1, 5, 13, 1, 2, 8].join(separator);

	$: data = dataset.split(separator).map(Number);
	$: asc = [...data].sort((a, b) => a - b);
	$: desc = [...data].sort((a, b) => b - a);
	$: sum = sigma(data);
	$: sumSquares = sigma(data.map((i) => Math.pow(i, 2)));
	$: mean = sum / data.length;
	$: popVariance = sigma(data.map((i) => Math.pow(i - mean, 2))) / data.length;
	$: popDeviation = Math.sqrt(sigma(data.map((i) => Math.pow(i - mean, 2))) / data.length);
	$: sampleVariance = sigma(data.map((i) => Math.pow(i - mean, 2))) / (data.length - 1);
	$: sampleDeviation = Math.sqrt(sigma(data.map((i) => Math.pow(i - mean, 2))) / (data.length - 1));
	$: gMean = Math.pow(productSigma(data), 1 / data.length);
	$: rms = Math.sqrt(sigma(data.map((i) => Math.pow(i, 2))) / data.length);
	$: firstQuartile = median(data.filter((i) => i < median(data)));
	$: thirdQuartile = median(data.filter((i) => i > median(data)));

	function sigma(values) {
		return values.reduce((acc, i) => acc + i, 0);
	}

	function productSigma(values) {
		return values.reduce((acc, i) => acc * i, 1);
	}

	function median(values) {
		values = [...values].sort((a, b) => b - a);
		const half = Math.floor(values.length / 2);

		if (values.length % 2) return values[half];

		return (values[half - 1] + values[half]) / 2.0;
	}

	function mode(values) {
		const counts = values.reduce((a, c) => {
			a[c] = (a[c] || 0) + 1;
			return a;
		}, {});
		const maxCount = Math.max(...Object.values(counts));
		const mostFrequent = Object.keys(counts).filter((k) => counts[k] === maxCount);
		return mostFrequent;
	}
</script>

<ProjectHeader
	title="Stat Calc"
	description="Use Stat Calc to calculate many statistics on a data set"
	keywords={[
		'stats calculator',
		'statistics calculator',
		'statistics calculator online',
		'statistics calculator free',
		'calculate mean',
		'calculate median',
		'calculate mode',
		'standard deviation',
		'sort numbers',
		'sum numbers',
		'sum of squares calculator',
		'statistics tool',
		'variance calculator',
		'quartile calculator',
		'population and sample mean'
	]}
	icon="img/projects/icons/stat-calc.png"
	screenshot="img/projects/screenshots/stat-calc.png"
/>
<div class="form-control mt-5 gap-5">
	<label class="input-group">
		<span class="bg-primary">Dataset:</span>
		<input
			type="text"
			required
			bind:value={dataset}
			placeholder="1{separator}2{separator}3{separator}4"
			class="input input-bordered grow"
		/>
	</label>
	<label class="input-group">
		<span>Separate data with:</span>
		<input
			type="text"
			required
			bind:value={separator}
			placeholder=","
			class="input input-bordered"
		/>
	</label>
</div>

<div
	class="stats stats-vertical shadow bg-gray-900 mt-5 flex flex-wrap"
	class:hidden={data.length === 1 && data[0] === 0}
>
	<div class="stat">
		<div class="stat-title">Input Size</div>
		<div class="stat-value">{data.length}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Sorted (Lo-Hi)</div>
		<div class="stat-value">{asc}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Sorted (Hi-Lo)</div>
		<div class="stat-value">{desc}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Sum</div>
		<div class="stat-value">{sum}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Sum of squares</div>
		<div class="stat-value">{sumSquares}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Mean</div>
		<div class="stat-value">{mean}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Population Variance</div>
		<div class="stat-value">{popVariance}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Population Deviation</div>
		<div class="stat-value">{popDeviation}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Sample Variance</div>
		<div class="stat-value">{sampleVariance}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Sample Deviation</div>
		<div class="stat-value">{sampleDeviation}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Geometric Mean</div>
		<div class="stat-value">{gMean}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Quadratic Mean (Root Mean Square)</div>
		<div class="stat-value">{rms}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Median</div>
		<div class="stat-value">{median(data)}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Mode</div>
		<div class="stat-value">{mode(data)}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Max</div>
		<div class="stat-value">{Math.max(...data)}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Min</div>
		<div class="stat-value">{Math.min(...data)}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Range</div>
		<div class="stat-value">{Math.max(...data) - Math.min(...data)}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Mid Range</div>
		<div class="stat-value">{(Math.max(...data) + Math.min(...data)) / 2}</div>
	</div>
	<div class="stat">
		<div class="stat-title">First Quartile</div>
		<div class="stat-value">{firstQuartile}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Third Quartile</div>
		<div class="stat-value">{thirdQuartile}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Interquartile Range</div>
		<div class="stat-value">{thirdQuartile - firstQuartile}</div>
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
		<span>Population uses number of items, Sample uses number of items minus one.</span>
	</div>
</div>
