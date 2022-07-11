<script lang="ts">
	/// COMPONENTS ///
	import ProjectHeader from '$lib/components/ProjectHeader.svelte';

	/// UTILS ///
	import roundNumber from '$lib/util/roundNumber';
	import copyText from '$lib/util/copyText';
	import downloadFile from '$lib/util/downloadFile';
	import uid from '$lib/util/uid';

	/// STORES ///
	import {
		clearData,
		assignments,
		studentsHistory,
		settings,
		resetSettings
	} from '$lib/stores/grade-calc';
	import Tabs, { type TabItem } from '$lib/components/Tabs.svelte';

	/// STATE ///
	const tabs: TabItem[] = [
		{
			id: 0,
			title: 'Assignments'
		},
		{
			id: 1,
			title: 'Students'
		}
	];
	let activeTab: TabItem['id'] = 0;
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
		history.push(`${student.grade * 100}% ${getGradeLetter(student.grade * 100)}`);
		history = history;
		$studentsHistory.push(student);
		$studentsHistory = $studentsHistory;
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

	function newAssignment() {
		$assignments.push({
			id: uid(),
			max_score: 100,
			weight: 100
		});
		student.scores.push(0);
		$assignments = $assignments;
		student = student;
	}

	function clear() {
		student.scores.fill(0);
		student = student;
	}

	function resetWeights() {
		$assignments = $assignments.map((a) => {
			a.weight = 100;
			return a;
		});
	}

	function removeAssignment(index: number) {
		$assignments = $assignments.filter((_, i) => i !== index);
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

	function exportAsCSV() {
		let data = '';
		data += 'Assignment,Total,Weight\n';
		for (const [index, { name, max_score, weight }] of $assignments.entries()) {
			data += `${name || `Assignment ${index + 1}`},${max_score},${weight}\n`;
		}
		data += '\n';
		data += 'Student';
		for (const [index, { name }] of $assignments.entries()) {
			data += `,${name || `Assignment ${index + 1}`}`;
		}
		data += ',Final Grade\n';
		for (const { name, scores, grade } of $studentsHistory) {
			data += `${name || 'Anonymous'}`;
			for (const [index, _] of $assignments.entries()) {
				data += `,${scores[index]}`;
			}
			data += `,${grade}\n`;
		}

		const dateString = new Date().toLocaleDateString(undefined, {
			dateStyle: 'short'
		});
		downloadFile(data, `grade_data_${dateString.replaceAll('/', '-')}.csv`, 'text/csv');
	}

	function uploadCSV() {
		document.getElementById('upload-grades-input').click();
	}

	async function readCSV(e: Event) {
		const inp = e.target as HTMLInputElement;
		const f = inp.files[0];
		if (f) {
			const data = await f.text();
			// Split assignments and students into var as and ss
			let [as, ss] = data.split('\n\n') as [string, string];

			// Remove headers
			as = as.split('\n').slice(1).join('\n').trim();
			ss = ss.split('\n').slice(1).join('\n').trim();

			$assignments = [];
			for (const [index, a] of as.split('\n').entries()) {
				const [name, max_score, weight] = a.split(',');
				console.log({ name, max_score, weight });
				const n = name === `Assignment ${index + 1}` ? null : name;
				$assignments.push({ id: uid(), name: n, max_score: +max_score, weight: +weight });
			}
			$assignments = $assignments;

			$studentsHistory = [];
			for (const s of ss.split('\n')) {
				const x = s.split(',');
				const name = x[0];
				const grade = +x.at(-1);
				const scores = x.slice(1, x.length - 1).map(Number);
				$studentsHistory.push({ id: uid(), name, scores, grade });
			}
			$studentsHistory = $studentsHistory;
		} else {
			console.log('failed to load file');
			// todo: notification (toast, modal, or alert) for 'failed to load file'
		}
	}

	function selectTextOnClick(e: Event) {
		if (!$settings.selectOnClick) return;
		const inp = e.target as HTMLInputElement;
		inp.select();
	}
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
		<label for="info-modal" class="btn modal-button">Info</label>
		<label for="settings-modal" class="btn modal-button">Settings</label>
		<label for="gradebook-modal" class="btn modal-button btn-primary">Gradebook</label>
	</div>
	<form on:submit|preventDefault={calculate} class="grid gap-5">
		{#each $assignments as { name, max_score, weight }, index}
			<div class="card w-full bg-gray-900 border">
				<div class="card-body">
					<small class="text-center">
						Points {points(student.scores[index], weight, max_score) * 100}%; Grade: {grade(
							student.scores[index],
							max_score
						) * 100}%
					</small>
					<div class="grid grid-cols-1 xl:grid-cols-[auto,auto,auto,auto] gap-2 mt-5">
						<label class="input-group">
							<span>Score</span>
							<input
								on:click|self={selectTextOnClick}
								type="number"
								min="0"
								required
								bind:value={student.scores[index]}
								max={max_score}
								placeholder="10"
								class="input input-bordered xl:w-auto w-full"
							/>
							<span>/</span>
							<input
								on:click|self={selectTextOnClick}
								type="number"
								min="0"
								required
								bind:value={max_score}
								class="input input-bordered xl:w-auto w-full"
							/>
						</label>
						<label class="input-group ">
							<span>Weight</span>
							<input
								on:click|self={selectTextOnClick}
								type="number"
								min="0"
								bind:value={weight}
								required
								class="input input-bordered xl:w-auto w-full"
							/>
						</label>
						<label class="input-group ">
							<span>Name</span>
							<input
								on:click|self={selectTextOnClick}
								type="text"
								bind:value={name}
								placeholder="Assignment (optional)"
								class="input input-bordered xl:w-auto w-full"
							/>
						</label>
						<button class="btn btn-error text-xl" on:click={() => removeAssignment(index)}
							>&times;</button
						>
					</div>
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
			<button type="button" on:click={newAssignment} class="btn">New Assignment</button>
			<button type="button" on:click={clear} class="btn">Clear</button>
			<button type="button" on:click={resetWeights} class="btn">Same Weights</button>
		</div>
		<button class="btn btn-primary">Calculate</button>
	</form>
	<div class="bg-gray-900 border card p-5 text-center grid gap-3">
		<p class="flex gap-5 justify-center text-5xl">
			{student.grade * 100}%<button
				class="btn btn-primary text-md"
				type="button"
				on:click={() => copyText(`${student.grade * 100}% ${getGradeLetter(student.grade * 100)}`)}
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

<!-- Gradebook Modal -->
<input type="checkbox" id="gradebook-modal" class="modal-toggle" />
<label for="gradebook-modal" class="modal cursor-pointer">
	<label class="modal-box relative text-center" for="">
		<h3 class="mb-3">Gradebook</h3>
		<Tabs {tabs} bind:activeTab />
		<div class="py-5">
			<!-- Assignments Tab -->
			{#if activeTab === 0}
				<div class="overflow-x-auto">
					<table class="table table-zebra w-full">
						<!-- head -->
						<thead>
							<tr>
								<th />
								<th>Name</th>
								<th>Max Score</th>
								<th>Weight</th>
							</tr>
						</thead>
						<tbody>
							{#each $assignments as { id, name, max_score, weight }, index (id)}
								<tr>
									<td>{index + 1}</td>
									<td>{name || `Assignment ${index + 1}`}</td>
									<td>{max_score}</td>
									<td>{weight}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<!-- Students Tab -->
			{:else if activeTab === 1}
				<div class="overflow-x-auto">
					<table class="table table-zebra w-full">
						<!-- head -->
						<thead>
							<tr>
								<th />
								<th>Name</th>
								{#each $assignments as { id, name }, index (id)}
									<th>{name || `Assignment ${index + 1}`}</th>
								{/each}
								<th>Grade</th>
							</tr>
						</thead>
						<tbody>
							{#each $studentsHistory as { name, scores, grade, id }, index (id)}
								<tr>
									<td>{index + 1}</td>
									<td>{name || 'Anonymous'}</td>
									{#each $assignments as { id }, index (id)}
										<th>{scores[index]}</th>
									{/each}
									<td>{grade * 100}%</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
		<div class="btn-group justify-end gap-1 mt-5">
			<button class="btn" on:click={exportAsCSV}>Download Grades</button>
			<button class="btn btn-primary" on:click={uploadCSV}>Upload Grades</button>
			<input type="file" class="hidden" id="upload-grades-input" on:change={readCSV} />
		</div>
	</label>
</label>

<!-- Settings Modal -->
<input type="checkbox" id="settings-modal" class="modal-toggle" />
<label for="settings-modal" class="modal cursor-pointer">
	<label class="modal-box relative text-center" for="">
		<h3>Settings</h3>
		<div class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">Select input text on click</span>
				<input
					type="checkbox"
					class="toggle"
					bind:checked={$settings.selectOnClick}
					on:change={() => ($settings = $settings)}
				/>
			</label>
			<label class="label cursor-pointer">
				<span class="label-text">Clear input on calculate</span>
				<input
					type="checkbox"
					class="toggle"
					bind:checked={$settings.clearOnCalculate}
					on:change={() => ($settings = $settings)}
				/>
			</label>
			<button class="btn btn-error" on:click={clearData}>Clear All Data</button>
		</div>
		<div class="btn-group justify-end gap-1 mt-5">
			<label
				for="settings-modal"
				class="btn"
				on:click={() => document.documentElement.requestFullscreen()}>Fullscreen</label
			>
			<button class="btn btn-error" on:click={resetSettings}>Reset Settings</button>
		</div>
	</label>
</label>

<!-- Info Modal -->
<input type="checkbox" id="info-modal" class="modal-toggle" />
<label for="info-modal" class="modal cursor-pointer">
	<label class="modal-box relative text-left" for="">
		<h3 class="border-b">Setup</h3>
		<p>
			✅ Add as many assignments as you'd like, click "New Item" to add a new one,or the close
			button on the top of each assignment to remove it
		</p>
		<p>✅ Name your assignments to easily keep track of them</p>
		<p>
			✅ Assign weights to your assignments. If weights no not add up to 100, they will be weighted
			relative to each other, so if the total weights are 1000, then an assignment worth 200 will be
			worth 20%
		</p>
		<p>✅ Enter total scores those assignments are out of</p>
		<p>
			✅ Optional: Use the gavel button titled "Same Weights" to make all assignments equally
			weighted.
		</p>
		<h3 class="border-b">Grading</h3>
		<p>✅ Click on the score of the first assignment and start with the first student's grade.</p>
		<p>
			✅ Enter their scores for each assignment and their name, then click "Calculate" to receive
			their final (or current) grade
		</p>
		<p>
			✅ Optional: Use <kbd>tab</kbd> and <kbd>shift + tab</kbd> to easily navigate the student grade
			inputs, so you can quickly enter students' grades.
		</p>
		<p>✅ Optional: You can click the "Clear" button to clear the inputs for the next student.</p>
		<h3 class="border-b">Other Features</h3>
		<p>
			✅ The top right corner features a night mode button, to darken the screen for late night
			grading, a refresh button to reload the page, and a fullscreen button, to give you more space
			to work with
		</p>
		<p>
			✅ The bottom of the page features a history log, so you can view all of the students' grades
			at once when you're done.
		</p>
	</label>
</label>

<style>
	p {
		margin-bottom: 1rem;
	}
</style>
