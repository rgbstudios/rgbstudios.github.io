/*TODO
download and upload assignments from previous session
upload console

warn if anything under 0 or if grade > total
!!option to drop lowest
option to have different categories and weights assigned to each
option to enter own scale
make a large number of items at once with same weight/category
!!display number of items
!!if a blank item then ignore
!!and if no weights assume equal
!!console with number, letter, and name/id (optional)
!!checkbox to clear grades and name with each calculation
option to add one assignment to all students
option to print all grade or one person's
full java program has more features. can enter class title, time, semester, student id nums

BUGS
doesn't always display info to side of assignment correctly
*/


document.getElementById("RGBIcon").onclick = function() {
	window.open("../index.html");
}

for(var i = 0; i < 3; i++) {
	makeNewDiv();
}

document.getElementById("add").onclick = function() {
	makeNewDiv();
}

function makeNewDiv() {
	var div = document.createElement("div");
	div.className = "gradeItem";

	var scoreP = document.createElement("p");
	scoreP.innerHTML = " Score: ";
	div.appendChild(scoreP);
	
	var scoreInput = document.createElement("input");
	scoreInput.type = "number";
	scoreInput.min = "0";
	scoreInput.className = "score";
	scoreInput.value = "0";
	scoreInput.title = "Score";
	div.appendChild(scoreInput);
	
	var slash = document.createElement("p");
	slash.innerHTML = " / ";
	div.appendChild(slash);
	
	var totalInput = document.createElement("input");
	totalInput.type = "number";
	totalInput.min = "0";
	totalInput.className = "total";
	totalInput.tabIndex = "-1";
	totalInput.title = "Total";
	div.appendChild(totalInput);

	var breakP = document.createElement("p");
	breakP.innerHTML = " | ";
	breakP.style.color = "#090";
	breakP.style.fontSize = "150%";
	div.appendChild(breakP);
	
	var weightP = document.createElement("p");
	weightP.innerHTML = "Weight: ";
	div.appendChild(weightP);
	
	var weightInput = document.createElement("input");
	weightInput.type = "number";
	weightInput.min = "0";
	weightInput.className = "weight";
	weightInput.tabIndex = "-1";
	weightInput.title = "Weight (should add to 100%)";
	div.appendChild(weightInput);

	var percentP = document.createElement("p");
	percentP.innerHTML = " % ";
	div.appendChild(percentP);
	
	var breakP = document.createElement("p");
	breakP.innerHTML = " | ";
	breakP.style.color = "#090";
	breakP.style.fontSize = "150%";
	div.appendChild(breakP);
	
	var nameP = document.createElement("p");
	nameP.innerHTML = " Name: ";
	div.appendChild(nameP);
	
	var nameInput = document.createElement("input");
	nameInput.type = "text";
	nameInput.min = "0";
	nameInput.tabIndex = "-1";
	nameInput.title = "Assignment Name (optional)";
	nameInput.className = "name";
	nameInput.placeholder = "Assignment"
	div.appendChild(nameInput);
	
	var deleteButton = document.createElement("img");
	deleteButton.src = "img/delete.svg";
	deleteButton.className = "svgButton";
	deleteButton.title = "Delete Item";
	deleteButton.onclick = function() {
		this.parentNode.parentNode.removeChild(this.parentNode);
	}
	div.appendChild(deleteButton);
	
	var gradeInfo = document.createElement("p");
	gradeInfo.className = "gradeInfo";
	div.appendChild(gradeInfo);

	document.getElementById("gradeItems").appendChild(div);
	//document.body.appendChild(div);
}

document.getElementById("clear").onclick = function() {
	var scores = document.getElementsByClassName("score");
	for(var i = 0; i < scores.length; i++) {
		scores[i].value = 0;
	}
}

var grade = 0;
var invalid = false;
document.getElementById("calc").onclick = function() {
	var scoreInputs = document.getElementsByClassName("score");
	var totalInputs = document.getElementsByClassName("total");
	var weightInputs = document.getElementsByClassName("weight");
	var gradeInfos = document.getElementsByClassName("gradeInfo");
	var weightTotal = 0;
	for(var i = 0; i < weightInputs.length; i++) {
		weightTotal += parseFloat(weightInputs[i].value);
	}
	grade = 0;
	for(var j = 0; j < scoreInputs.length; j++) {
		if(scoreInputs[j].value == "" || totalInputs[j].value == "" || weightInputs[j].value == "") {
			console.log(j + "oops");
			grade = "Please enter all numerical inputs and delete empty items";
			invalid = true;
			break;
		} else {
			var newVal = scoreInputs[j].value/totalInputs[j].value*weightInputs[j].value/weightTotal*100;
			console.log(j);
			gradeInfos[j].innerHTML = "Points: " + Math.round(newVal*100)/100 + "% Grade: " + Math.round(scoreInputs[j].value/totalInputs[j].value*10000)/100 + "%";
			
			grade += newVal;
			invalid = false;
		}
	}
	if(scoreInputs.length == 0) {
		invalid = true;
		grade = "Please add an item with the button on the left";
	}
	if(!invalid) {
		grade = Math.round(grade*100)/100;
		document.getElementById("letter").innerHTML = getGradeLetter(grade);
		var consoleText = document.getElementById("console");
		consoleText.value = document.getElementById("studentName").value + " " + grade + "% " + getGradeLetter(grade) + "\n" + consoleText.value;
		document.getElementById("grade").innerHTML = grade + " %";
	} else {
		document.getElementById("letter").innerHTML = "";
		document.getElementById("grade").innerHTML = grade;
	}
}

function getGradeLetter(grade) {
	if(grade >= 100) {
		return "A+";
	}
	var letter;
	if(grade >= 90) {
		letter = "A";
	} else if(grade >= 80) {
		letter = "B";
	} else if(grade >= 70) {
		letter = "C";
	} else if(grade >= 60) {
		letter = "D";
	} else {
		return "F";
	}
	
	if(grade%10 >= 7) {
		letter += "+";
	} else if(grade%10 < 3) {
		letter += "-";
	}
	
	return letter;
}

document.getElementById("same").onclick = function() {
	var weightInputs = document.getElementsByClassName("weight");
	for(var i = 0; i < weightInputs.length; i++) {
		weightInputs[i].value = 100/weightInputs.length;
	}
}

var isNight = false;
var night = document.getElementById("night");
night.onclick = function() {
	if(!isNight) {
		document.body.style.backgroundColor = "#333";
		night.backgroundColor = "#090";
		var inputs = document.getElementsByTagName("input");
		for(var i = 0; i < inputs.length; i++) {
			inputs[i].style.backgroundColor = "#666";
			inputs[i].style.color = "#ccc";
		}
		document.getElementById("console").style.backgroundColor = "#666";
		document.getElementById("console").style.color = "#333";
		document.getElementById("calc").style.backgroundColor = "#666";
		document.getElementById("calc").style.color = "#9f9";
	} else {
		document.body.style.backgroundColor = "#eee";
		night.backgroundColor = "";
		var inputs = document.getElementsByTagName("input");
		for(var i = 0; i < inputs.length; i++) {
			inputs[i].style.backgroundColor = "#f6f6f6";
			inputs[i].style.color = "#666";
			document.getElementById("calc").style.backgroundColor = "";
			document.getElementById("calc").style.color = "";
		}
		document.getElementById("console").style.backgroundColor = "";
		document.getElementById("console").style.color = "";
	}
	isNight = !isNight;
}

document.getElementById("copy").onclick = function() {
	if(!invalid) {
		
		document.oncopy = function(event) {
			event.clipboardData.setData("Text", document.getElementById("console").value.split("\n")[0] );
			event.preventDefault();
		};
		document.execCommand("copy");
		document.oncopy = undefined;
		console.log("copied");
			
	}
}

document.getElementById("clearConsole").onclick = function() {
	document.getElementById("console").focus();
	document.getElementById("console").value = "";
}

document.getElementById("downloadConsole").onclick = function() {
	data = [];
	data.push(document.getElementById("console").value.replace(/\r?\n/g, '\r\n'));
	
	properties = {type: 'plain/text'};
	try {
		file = new File(data, "stats.txt", properties);
	} catch (e) {
		file = new Blob(data, properties);
	}
	document.getElementById("downloadLink").download = "grade console " + getFormattedDate() + ".txt";
	document.getElementById("downloadLink").href = URL.createObjectURL(file);
}

function getFormattedDate() {
	var today = new Date();
	var day = today.getDate();
	var mon = today.getMonth()+1; //Jan is 0
	day = day < 10 ? "0" + day : day;
	mon = mon < 10 ? "0" + mon : mon;
	return mon + "/" + day + "/" + today.getFullYear();	
}

//https://www.thewebflash.com/toggling-fullscreen-mode-using-the-html5-fullscreen-api/
document.getElementById("fullscreen").onclick = function() {
	var elem = elem || document.documentElement;
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
