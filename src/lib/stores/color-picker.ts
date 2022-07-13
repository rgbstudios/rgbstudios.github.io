import localStore from '$lib/util/localStore';

interface Color {
	color: string;
	name: string;
}

interface Settings {
	color: string;
	colorInUrl: boolean;
	historyList: Color[];
	favoritesList: Color[];
}

const defaultSettings: Settings = {
	color: '#000000',
	colorInUrl: false,
	historyList: [],
	favoritesList: []
};

export const settings = localStore<Settings>(
	'color-picker-settings',
	JSON.parse(JSON.stringify(defaultSettings))
);
