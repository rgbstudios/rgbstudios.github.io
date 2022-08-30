import localStore from '$lib/util/localStore';

// Generic types

type Advantage = 'non' | 'adv' | 'dis';
type Modifier = 'non' | 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
type Bonus = 'non' | 'prf' | 'exp' | 'spl' | 'itv';

// /dnd-dice

interface DiceSettings {
	currentAmount: number;
	currentSides: number;
	customAmount: number;
	customSides: number;

	modifier: number;
	advantage: Advantage;
	attribute: Modifier;
	bonus: Bonus;

	modifiers: {
		str: number;
		dex: number;
		con: number;
		int: number;
		wis: number;
		cha: number;

		prf: number;
		spl: number;
		itv: number;
	};

	settings: {
		speak: boolean;
		linkParams: boolean;
	};

	notes: string;
	rollHistory: string[];
	rolledDice: number;
}

// /character-roller

interface Stat {
	rolls: number[];
	value: number;
	mod: number;
}

interface Character {
	stats: Stat[];
	statTotal: number;
	modTotal: number;
}

interface CharacterSettings {
	characters: Character[];
	characterName: string;
	historyText: string;

	settings: {
		displayRolling: boolean;
		exportUnicodeDice: boolean;
	};

	selectedModifiers: [Modifier, Modifier, Modifier, Modifier, Modifier, Modifier];
}

// /spellbook

interface SpellbookSettings {
	searchValue: string;
}

// Defaults

const defaultDiceSettings: DiceSettings = {
	currentAmount: 1,
	currentSides: 20,
	customAmount: 10,
	customSides: 10,

	modifier: 0,
	advantage: 'non',
	attribute: 'non',
	bonus: 'non',

	modifiers: {
		str: 0,
		dex: 0,
		con: 0,
		int: 0,
		wis: 0,
		cha: 0,

		prf: 0,
		spl: 0,
		itv: 0
	},

	settings: {
		speak: false,
		linkParams: false
	},

	notes: '',
	rollHistory: [],
	rolledDice: 0
};

const defaultCharacterSettings: CharacterSettings = {
	characters: [],
	characterName: '',
	historyText: '',

	settings: {
		displayRolling: true,
		exportUnicodeDice: false
	},

	selectedModifiers: ['non', 'non', 'non', 'non', 'non', 'non']
};

const defaultSpellbookSettings: SpellbookSettings = {
	searchValue: ''
};

// Stores

export const diceSettings = localStore<DiceSettings>(
	'dnd-dice-settings',
	JSON.parse(JSON.stringify(defaultDiceSettings))
);

export const characterSettings = localStore<CharacterSettings>(
	'dnd-dice-character-settings',
	JSON.parse(JSON.stringify(defaultCharacterSettings))
);

export const spellbookSettings = localStore<SpellbookSettings>(
	'dnd-dice-spellbook-settings',
	JSON.parse(JSON.stringify(defaultSpellbookSettings))
);
