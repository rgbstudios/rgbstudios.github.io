/*TODO:
*/

window.onload = function() {
	var tmp = new Image();
	tmp.src = "icon/email-open.svg";	
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function talk(words) {
	var synth = window.speechSynthesis;
	if ('speechSynthesis' in window) {
		var msg = new SpeechSynthesisUtterance(words);
		msg.rate = 1;
		msg.pitch = 1;
		synth.speak(msg);
	}
}

//https://www.thewebflash.com/toggling-fullscreen-mode-using-the-html5-fullscreen-api/
function toggleFullscreen(elem) {
	elem = elem || document.documentElement;
	if (!document.fullscreenElement && !document.mozFullScreenElement &&
		!document.webkitFullscreenElement && !document.msFullscreenElement) {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
}

function toggleCleanTheme() {
	var bonusTheme = document.getElementById("bonusTheme");
	bonusTheme.href = (bonusTheme.href.substring(bonusTheme.href.length-3, bonusTheme.href.length) != "css" ? "cleanTheme.css" : "");	
}

function toggleModal(modal) {
	if(modal.style.display == "none") {
		modal.style.display = "block";
	} else {
		modal.style.display = "none";
	}
}

function closeModal(modal) {
	modal.style.display = "none";
}

function openModal(modal) {
	modal.style.display = "block";
}
