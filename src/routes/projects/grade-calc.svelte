<script context="module" lang="ts">
	export interface Assignment {
		name?: string;
		max_score: number;
		weight: number;
	}

	export interface Student {
		name?: string;
		scores: Array<Assignment['max_score']>;
		grade: number;
	}
</script>

<script lang="ts">
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';
	import roundNumber from '$lib/util/roundNumber';

	let assignments: Assignment[] = [
		{
			max_score: 100,
			weight: 100
		},
		{
			max_score: 100,
			weight: 100
		},
		{
			max_score: 100,
			weight: 100
		}
	];

	let student: Student = {
		scores: new Array(assignments.length).fill(0),
		grade: 0
	};

	let history: string[] = [];

	function calculate() {
		let grade = 0;
		for (const [index, { weight, max_score }] of assignments.entries()) {
			grade += points(student.scores[index], weight, max_score);
		}
		student.grade = grade;
		assignments = assignments;
		student = student;
		history.push(`${student.grade * 100}% ${getGradeLetter(student.grade * 100)}`);
		history = history;
	}

	function points(score: number, weight: number, max_score: number): number {
		const totalScore = student.scores.reduce((acc, s) => acc + s, 0);
		if (totalScore === 0) return 0;
		const totalWeight = assignments.reduce((acc, a) => acc + a.weight, 0);
		const weightedScore = (score / max_score) * (weight / totalWeight);
		return roundNumber(weightedScore, 5);
	}

	function grade(score: number, max_score: number): number {
		return roundNumber(score / max_score, 5);
	}

	function newAssignment() {
		assignments.push({
			max_score: 100,
			weight: 100
		});
		student.scores.push(0);
		assignments = assignments;
		student = student;
	}

	function clear() {
		student.scores.fill(0);
		student = student;
	}

	function resetWeights() {
		assignments = assignments.map((a) => {
			a.weight = 100;
			return a;
		});
	}

	function removeAssignment(index: number) {
		assignments = assignments.filter((_, i) => i !== index);
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

	function copyGrade() {
		navigator.clipboard.writeText(`${student.grade * 100}% ${getGradeLetter(student.grade * 100)}`);
	}

	function downloadHistory() {
		var blob = new Blob([history.join('\n')], { type: 'text/txt' });

		var a = document.createElement('a');
		a.download = 'gradeCalcHistory.txt';
		a.href = URL.createObjectURL(blob);
		a.dataset.downloadurl = ['text/txt', a.download, a.href].join(':');
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(function () {
			URL.revokeObjectURL(a.href);
		}, 1500);
	}
</script>

<ProjectHeader
	title="Grade Calc"
	description="Use Grade Calc to calculate students' grades quickly and simply"
	keywords={['professor', 'grade', 'calculator', 'calc']}
	icon="img/projects/icons/grade-calc.png"
	screenshot="img/projects/screenshots/grade-calc.png"
/>
<div class="wrapper mt-5 grid gap-5">
	<div class="btn-group justify-center gap-1">
		<button class="btn">Info</button>
		<button class="btn">Settings</button>
		<button class="btn btn-primary">Gradebook</button>
	</div>
	<form on:submit|preventDefault={calculate} class="grid gap-5">
		{#each assignments as { name, max_score, weight }, index}
			<div class="card w-full bg-gray-900 border">
				<div class="card-body">
					<div class="grid grid-cols-1 lg:grid-cols-[1fr,1fr,1fr,auto] gap-2 mb-5">
						<label class="input-group justify-center">
							<span>Score</span>
							<input
								type="number"
								min="0"
								required
								bind:value={student.scores[index]}
								max={max_score}
								placeholder="10"
								class="input input-bordered"
							/>
							<span>/</span>
							<input
								type="number"
								min="0"
								required
								bind:value={max_score}
								class="input input-bordered"
							/>
						</label>
						<label class="input-group justify-center">
							<span>Weight</span>
							<input
								type="number"
								min="0"
								bind:value={weight}
								required
								class="input input-bordered"
							/>
						</label>
						<label class="input-group justify-center">
							<span>Name</span>
							<input
								type="text"
								bind:value={name}
								placeholder="Assignment (optional)"
								class="input input-bordered"
							/>
						</label>
						<button class="btn btn-error text-xl" on:click={() => removeAssignment(index)}
							>&times;</button
						>
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
				type="text"
				bind:value={student.name}
				placeholder="Name or ID (optional)"
				class="input input-bordered"
			/>
		</label>
		<div class="btn-group justify-center gap-1">
			<button type="button" on:click={newAssignment} class="btn">New Assignment</button>
			<button type="button" on:click={clear} class="btn">Clear</button>
			<button type="button" on:click={resetWeights} class="btn">Same Weights</button>
		</div>
		<button class="btn btn-primary">Calculate</button>
	</form>
	<div class="bg-gray-900 border card p-5 text-center grid gap-3">
		<p class="flex gap-5 justify-center text-5xl">
			{student.grade * 100}%<button class="btn text-md" type="button" on:click={copyGrade}
				>Copy</button
			>
		</p>
		<p class="text-3xl font-bold">{getGradeLetter(student.grade * 100)}</p>
	</div>
	<div class="bg-gray-900 border card p-5 text-center grid gap-3">
		{#each history as item}
			<span>{item}</span>
		{/each}
	</div>
	<div class="btn-group justify-center gap-1">
		<button type="button" on:click={() => (history = [])} class="btn">Clear History</button>
		<button type="button" on:click={downloadHistory} class="btn">Download</button>
	</div>
</div>
