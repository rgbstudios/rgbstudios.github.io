const copyText = (str) => {
	const elm = document.createElement('textarea');
	elm.value = str;
	document.body.appendChild(elm);
	elm.select();
	document.execCommand('copy');
	document.body.removeChild(elm);
};

export default copyText;
