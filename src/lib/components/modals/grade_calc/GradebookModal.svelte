<script lang="ts">
	import Modal from '$lib/components/base/Modal.svelte';
	import { assignments, studentsHistory } from '$lib/stores/grade-calc';
	import uid from '$lib/util/uid';

	import Tabs, { type TabItem } from '$lib/components/Tabs.svelte';
	import Icon from '$lib/components/Icon.svelte';
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

	/// METHODS ///
	function uploadCSV() {
		document.getElementById('upload-grades-input').click();
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
</script>

<Modal id="grade-calc-gradebook-modal" showCloseBtn>
	<div slot="title">Gradebook</div>
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
		<button class="btn" on:click={exportAsCSV}>
			<Icon name="download" /> &nbsp; Download Grades
		</button>
		<button class="btn btn-primary" on:click={uploadCSV}>
			<Icon name="upload" /> &nbsp; Upload Grades
		</button>
		<input type="file" class="hidden" id="upload-grades-input" on:change={readCSV} />
	</div>
</Modal>
