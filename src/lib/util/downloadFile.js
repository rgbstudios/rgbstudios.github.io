export default function (content, filename, filetype = 'text/plain') {
	var blob = new Blob([content], { type: filetype });

	var a = document.createElement('a');
	a.download = filename;
	a.href = URL.createObjectURL(blob);
	a.dataset.downloadurl = [filetype, a.download, a.href].join(':');
	a.style.display = 'none';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(function () {
		URL.revokeObjectURL(a.href);
	}, 1500);
}
