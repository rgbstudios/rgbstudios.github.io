<script>
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	let currentGrade = 75;
	let assignmentWeight = 20;
	let assignmentScore = 85;

	$: finalGrade = Math.round(
		currentGrade * (1 - assignmentWeight / 100) + (assignmentWeight / 100) * assignmentScore
	);
</script>

<ProjectHeader
	title="Simple Grade Calc"
	description="Calculate Grades"
	keywords={['calculate grades']}
	icon="img/projects/icons/simple-grade-calc.png"
	screenshot="img/projects/screenshots/simple-grade-calc.png"
/>
<form on:submit|preventDefault class="flex flex-col gap-5 mt-5">
	<label class="input-group">
		<span>Current Grade</span>
		<input
			type="number"
			required
			placeholder="Current Grade"
			bind:value={currentGrade}
			class="input input-bordered grow text-center"
		/>
	</label>
	<label class="input-group">
		<span>Assignment Weight</span>
		<input
			type="number"
			min="0"
			max="100"
			required
			placeholder="Assignment Weight"
			bind:value={assignmentWeight}
			class="input input-bordered grow text-center"
		/>
	</label>
	<label class="input-group">
		<span>Assignment Score</span>
		<input
			type="number"
			required
			min="0"
			max="200"
			placeholder="Assignment Score"
			bind:value={assignmentScore}
			class="input input-bordered grow text-center"
		/>
	</label>
	<label class="input-group">
		<span class="bg-blue-600">Final Grade</span>
		<input
			type="number"
			disabled
			placeholder="Final Grade"
			value={finalGrade}
			class="input input-bordered grow text-center"
		/>
	</label>
	<span>
		<button class="btn btn-primary" type="submit">Calculate</button>
	</span>
</form>

<style>
</style>
