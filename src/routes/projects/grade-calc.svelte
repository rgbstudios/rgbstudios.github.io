<script lang="ts">
	import { onMount } from 'svelte';
	/// COMPONENTS ///
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';

	/// UTILS ///
	import roundNumber from '$lib/util/roundNumber';
	import copyText from '$lib/util/copyText';
	import downloadFile from '$lib/util/downloadFile';
	import uid from '$lib/util/uid';

	/// STORES ///
	import { assignments, studentsHistory, settings, setupDone } from '$lib/stores/grade-calc';
	import SetupModal from '$lib/components/modals/grade_calc/SetupModal.svelte';
	import ClearAllDataModal from '$lib/components/modals/grade_calc/ClearAllDataModal.svelte';
	import InfoModal from '$lib/components/modals/grade_calc/InfoModal.svelte';
	import SettingsModal from '$lib/components/modals/grade_calc/SettingsModal.svelte';
	import GradebookModal from '$lib/components/modals/grade_calc/GradebookModal.svelte';

	/// STATE ///
	let student: Student = {
		id: uid(),
		scores: new Array($assignments.length).fill(0),
		grade: 0
	};

	let history: string[] = [];

	/// METHODS ///
	function calculate() {
		let grade = 0;
		for (const [index, { weight, max_score }] of $assignments.entries()) {
			grade += points(student.scores[index], weight, max_score);
		}
		student.grade = grade;
		$assignments = $assignments;
		student = student;
		history.push(
			`${student.name ? student.name + ' ' : ''} ${student.grade * 100}% ${getGradeLetter(
				student.grade * 100
			)}`
		);
		history = history;
		$studentsHistory.push(student);
		$studentsHistory = $studentsHistory;
		const new_id = uid();
		student = { ...student, id: new_id };
		if ($settings.clearOnCalculate) clear();
	}

	function points(score: number, weight: number, max_score: number): number {
		const totalScore = student.scores.reduce((acc, s) => acc + s, 0);
		if (totalScore === 0) return 0;
		const totalWeight = $assignments.reduce((acc, a) => acc + a.weight, 0);
		const weightedScore = (score / max_score) * (weight / totalWeight);
		return roundNumber(weightedScore, 5);
	}

	function grade(score: number, max_score: number): number {
		return roundNumber(score / max_score, 5);
	}

	function clear() {
		student.scores.fill(0);
		student = student;
	}

	type Grade = 'A' | 'A+' | 'A-' | 'B' | 'B+' | 'A-' | 'C' | 'C+' | 'C-' | 'D' | 'D+' | 'D-' | 'F';
	function getGradeLetter(grade: number): Grade {
		if (grade >= 100) return 'A+';
		let letter: Grade;
		if (grade >= 90) letter = 'A';
		else if (grade >= 80) letter = 'B';
		else if (grade >= 70) letter = 'C';
		else if (grade >= 60) letter = 'D';
		else return 'F';

		if (grade % 10 >= 7) letter += '+';
		else if (grade % 10 < 3) letter += '-';
		// @ts-ignore
		return letter;
	}

	function downloadHistory() {
		downloadFile(history.join('\n'), 'gradeCalcHistory.txt');
	}

	function selectTextOnClick(e: Event) {
		if (!$settings.selectOnClick) return;
		const inp = e.target as HTMLInputElement;
		inp.select();
	}

	/// LIFECYCLE HOOKS ///
	onMount(() => {
		if ($setupDone) return;
	});
</script>

<ProjectHeader
	title="Grade Calc"
	description="Use Grade Calc to calculate students' grades quickly and simply"
	keywords={[
		'free grade calculator',
		'grade calculator',
		'grade calculator for professors',
		'grade tracker',
		'student grade calculator',
		'student grade organizer'
	]}
	icon="img/projects/icons/grade-calc.png"
	screenshot="img/projects/screenshots/grade-calc.png"
/>

<!-- Root Layout -->
<div class="wrapper mt-5 grid gap-5">
	<div class="btn-group justify-center gap-1">
		<label for="grade-calc-info-modal" class="btn modal-button">
			<Icon name="info" /> &nbsp; Info
		</label>
		<label for="grade-calc-settings-modal" class="btn modal-button">
			<Icon name="settings" /> &nbsp; Settings
		</label>
		<label for="grade-calc-gradebook-modal" class="btn modal-button btn-primary">
			<Icon name="book" /> &nbsp; Gradebook
		</label>
	</div>
	<h3 class="text-center">Assignments</h3>
	<form on:submit|preventDefault={calculate} class="grid gap-5">
		{#each $assignments as { name, max_score, weight }, index}
			<div class="card w-full bg-base-900 border">
				<div class="card-body p-6">
					<div class="grid grid-cols-1 xl:grid-cols-[auto,auto,auto] gap-2 mb-4">
						<label class="input-group">
							<span>Score</span>
							<input
								on:click|self={selectTextOnClick}
								type="number"
								min="0"
								required
								bind:value={student.scores[index]}
								max={max_score * 2}
								class="input input-bordered xl:w-auto w-full"
							/>
							<span>/</span>
							<input
								disabled
								on:click|self={selectTextOnClick}
								type="number"
								min="0"
								value={max_score}
								required
								class="input input-bordered xl:w-auto w-full"
							/>
						</label>
						<label class="input-group ">
							<span>Weight</span>
							<input
								disabled
								on:click|self={selectTextOnClick}
								type="number"
								min="0"
								value={weight}
								required
								class="input input-bordered xl:w-auto w-full"
							/>
						</label>
						<label class="input-group ">
							<span>Name</span>
							<input
								disabled
								on:click|self={selectTextOnClick}
								type="text"
								value={name || `Assignment (optional)`}
								placeholder="Assignment (optional)"
								class="input input-bordered xl:w-auto w-full"
							/>
						</label>
					</div>
					<small class="text-center">
						Points {points(student.scores[index], weight, max_score) * 100}%; Grade: {grade(
							student.scores[index],
							max_score
						) * 100}%
					</small>
				</div>
			</div>
		{/each}
		<label class="input-group">
			<span>Student</span>
			<input
				on:click|self={selectTextOnClick}
				type="text"
				bind:value={student.name}
				placeholder="Name or ID (optional)"
				class="input input-bordered"
			/>
		</label>
		<div class="btn-group justify-center gap-1">
			<button type="button" on:click={clear} class="btn">
				<Icon name="backspace" /> &nbsp; Clear
			</button>
		</div>
		<button class="btn btn-primary">Calculate &nbsp; <Icon name="chevron_right" /> </button>
	</form>
	<div class="bg-base-900 border card p-5 text-center grid gap-3">
		<p class="flex gap-5 justify-center text-5xl">
			{student.grade * 100}%<button
				class="btn btn-primary text-md"
				type="button"
				on:click={() => copyText(`${student.grade * 100}% ${getGradeLetter(student.grade * 100)}`)}
			>
				<Icon name="copy" /> &nbsp; Copy
			</button>
		</p>
		<p class="text-3xl font-bold">{getGradeLetter(student.grade * 100)}</p>
	</div>
	<div class="bg-base-900 border card p-5 text-center grid gap-3">
		{#each history as item}
			<span>{item}</span>
		{/each}
	</div>
	<div class="btn-group justify-center gap-1">
		<button type="button" on:click={() => (history = [])} class="btn"
			><Icon name="backspace" /> &nbsp; Clear History</button
		>
		<button type="button" on:click={downloadHistory} class="btn"
			><Icon name="download" /> &nbsp; Download</button
		>
	</div>
</div>
<GradebookModal />
<SettingsModal />
<ClearAllDataModal />
<SetupModal />
<InfoModal />

<style>
	p {
		margin-bottom: 1rem;
	}
</style>
