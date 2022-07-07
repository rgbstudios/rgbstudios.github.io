<script>
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';

	import roundNumber from '$lib/util/roundNumber';

	let currentGrade = 75;
	let assignmentWeight = 20;
	let assignmentScore = 85;
	let finalGrade = 75;
	let mode = 0; // 0 is for final grade; 1 is for assignment score

	$: calculatedFinalGrade =
		currentGrade !== null && assignmentWeight !== null && assignmentScore !== null
			? roundNumber(
					currentGrade * (1 - assignmentWeight / 100) + (assignmentWeight / 100) * assignmentScore
			  )
			: 'Please enter all inputs';

	$: calculatedAssignmentScore =
		currentGrade !== null && assignmentWeight !== null && finalGrade !== null
			? roundNumber(
					(finalGrade - currentGrade * (1 - assignmentWeight / 100)) / (assignmentWeight / 100)
			  )
			: 'Please enter all inputs';
</script>

<ProjectHeader
	title="Simple Grade Calc"
	description="Use Simple Grade Calc to easily calculate your grade"
	keywords={[
		'grade calculator simple',
		'final exam grade calculator',
		'grade calculator online',
		'easy grade calculator',
		'free grade calculator',
		'assignment grade calculator'
	]}
	icon="img/projects/icons/simple-grade-calc.png"
	screenshot="img/projects/screenshots/simple-grade-calc.png"
/>

<div class="flex flex-col gap-5 mt-5">
	<span class="input-group justify-center">
		<span>Calculate:</span>
		<div class="btn-group">
			<button class="btn" on:click={() => (mode = 1)} class:btn-active={mode === 1}>
				<Icon name="pencil_alt" /> Assignment Score
			</button>
			<button class="btn" on:click={() => (mode = 0)} class:btn-active={mode === 0}>
				<Icon name="clipboard_check" /> Final Grade
			</button>
		</div>
	</span>
	{#if mode === 0}
		<label class="input-group">
			<span class="flex gap-1"><Icon name="clock" />Current Grade</span>
			<input
				type="number"
				min="0"
				max="200"
				required
				placeholder="Current Grade"
				bind:value={currentGrade}
				class="input input-bordered grow text-center"
			/>
		</label>
		<label class="input-group">
			<span class="flex gap-1"> <Icon name="scale" />Assignment Weight</span>
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
			<span class="flex gap-1"><Icon name="pencil_alt" />Assignment Score</span>
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
			<span class="flex gap-1 bg-primary"><Icon name="clipboard_check" />Final Grade</span>
			<input
				type="text"
				disabled
				value={calculatedFinalGrade}
				class="input input-bordered grow text-center"
			/>
		</label>
	{:else}
		<label class="input-group">
			<span class="flex gap-1"><Icon name="clock" />Current Grade</span>
			<input
				type="number"
				min="0"
				max="200"
				required
				placeholder="Current Grade"
				bind:value={currentGrade}
				class="input input-bordered grow text-center"
			/>
		</label>
		<label class="input-group">
			<span class="flex gap-1"> <Icon name="scale" />Assignment Weight</span>
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
			<span class="flex gap-1 bg-primary"><Icon name="pencil_alt" />Assignment Score</span>
			<input
				type="number"
				required
				disabled
				min="0"
				max="200"
				placeholder="Assignment Score"
				bind:value={calculatedAssignmentScore}
				class="input input-bordered grow text-center"
			/>
		</label>
		<label class="input-group">
			<span class="flex gap-1"><Icon name="clipboard_check" />Final Grade</span>
			<input
				type="text"
				min="0"
				max="200"
				bind:value={finalGrade}
				class="input input-bordered grow text-center"
			/>
		</label>
	{/if}
</div>
