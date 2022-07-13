const getUrlParam = (key) => {
	const url = new URL(window.location.href);
	return url.searchParams.get(key);
};

const setUrlParam = (key, val) => {
	history.replaceState({}, '', `?${key}=${val}`);
};

const removeUrlParam = () => {
	history.replaceState(null, null, window.location.pathname);
};

export { getUrlParam, setUrlParam, removeUrlParam };
