<script>
	import Icon from '../../components/Icon.svelte';
	import ProjectHeader from '../../components/ProjectHeader.svelte';
	import Alert from '../../components/Alert.svelte';

	let m1 = 1;
	let m2 = 1;
	let b1 = 0;
	let b2 = 0;

	$: isSameLine = m1 === m2 && b1 === b2;
	$: isParallel = m1 === m2 && b1 !== b2;
	$: hasSameIntercept = b1 === b2;

	$: x = (b1 - b2) / (m2 - m1);
	$: y = m1 * x + b1;
</script>

<ProjectHeader
	title="Intersect Calc"
	description="Find intersection of two lines"
	keywords={[
		'intersection calculator',
		'calculate intersection of two lines',
		'find out where two lines intersect'
	]}
	icon="img/projects/icons/intersect-calc.png"
	screenshot="img/projects/screenshots/base-convert.png"
/>
<div class="flex flex-col gap-5">
	<div class="form-control">
		<label class="label">
			<span class="label-text">Line 1 Equation</span>
		</label>
		<label class="input-group">
			<span>y = </span>
			<input
				type="number"
				placeholder="value of slope here (m)"
				bind:value={m1}
				class="input input-bordered text-center"
			/>
			<span> x + </span>

			<input
				type="number"
				placeholder="value of y - intercept here (b)"
				bind:value={b1}
				class="input input-bordered text-center"
			/>
		</label>
	</div>
	<div class="form-control">
		<label class="label">
			<span class="label-text">Line 2 Equation</span>
		</label>
		<label class="input-group">
			<span>y = </span>
			<input
				type="number"
				placeholder="value of slope here (m)"
				bind:value={m2}
				class="input input-bordered text-center"
			/>
			<span> x + </span>

			<input
				type="number"
				placeholder="value of y - intercept here (b)"
				bind:value={b2}
				class="input input-bordered text-center"
			/>
		</label>
	</div>
	<div class="alert alert-info shadow-lg">
		<div class="text-2xl font-bold p-5 text-center">
			{#if isSameLine}
				<span
					>Both the slopes and the y-intercept are same therefore both lines are the same and will
					intersect at every point on either line</span
				>
			{:else if hasSameIntercept}
				<span
					>The slopes are different but the y-intercept are same therefore both lines will intersect
					at the y-intercept (0, {b1})</span
				>
			{:else if isParallel}
				<span
					>Slopes are same but y-intercept are different so the lines are parallel and therefore
					never intersect</span
				>
			{:else}
				<span>Intersection at ({x}, {y})</span>
			{/if}
		</div>
	</div>
	<div class="alert shadow-lg">
		<div class="grid text-center justify-center w-full">
			<h3>Formulas</h3>
			<p class="leading-loose">
				The formula for a line is <kbd class="kbd">y = mx + b</kbd><br /> where
				<kbd class="kbd">x</kbd>
				and
				<kbd class="kbd">y</kbd> are coordinates, <kbd class="kbd">m</kbd> is the slope, and
				<kbd class="kbd">b</kbd>
				is the y-intercept.<br /> So to calculate the point where the lines intersect we substitute and
				get
			</p>
			<kbd class="kbd"> y = m1x+b1 = m2x+b2 </kbd>
			<kbd class="kbd"> x = (b1-b2)/(m2-m1) </kbd>
			<kbd class="kbd"> y = x*m1+b1 = x*m2+b2 </kbd>
		</div>
	</div>
</div>

<style>
</style>
