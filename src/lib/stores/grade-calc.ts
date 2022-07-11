import localStore from '$lib/util/localStore';
import uid from '$lib/util/uid';

const defaultAssignments: Assignment[] = [
	{
		id: uid(),
		max_score: 100,
		weight: 100
	},
	{
		id: uid(),
		max_score: 100,
		weight: 100
	},
	{
		id: uid(),
		max_score: 100,
		weight: 100
	}
];

export const assignments = localStore<Assignment[]>('grade-calc-assignments', defaultAssignments);
export const studentsHistory = localStore<Student[]>('grade-calc-students-history', []);
interface Settings {
	selectOnClick: boolean;
	clearOnCalculate: boolean;
}

const defaultSettings: Settings = {
	selectOnClick: false,
	clearOnCalculate: false
};
export const settings = localStore<Settings>('grade-calc-settings', defaultSettings);

export function clearData() {
	assignments.set(defaultAssignments);
	studentsHistory.set([]);
}
export function resetSettings() {
	settings.set(defaultSettings);
}
