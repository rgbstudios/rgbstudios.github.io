/// <reference types="@sveltejs/kit" />

// Grade Calc
interface Assignment {
	id: string;
	name?: string;
	max_score: number;
	weight: number;
}

interface Student {
	id: string;
	name?: string;
	scores: Array<Assignment['max_score']>;
	grade: number;
}
