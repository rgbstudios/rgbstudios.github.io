/*TODO:

text file has mean and std dev



add console
option to chose to roll one stat at a time?

option to choose:
numStats = 6;
numRolls = 4;
numDropped = 1;
diceSides = 6;
show method character was created in download file

*/

var characters = [];
var night = false;
var odds = [1,4,10,21,38,62,91,122,148,167,172,160,131,94,54,21];

function Character() {
	this.stats = [];
	this.statTotal = 0;
	this.modTotal = 0;
	for(var i = 0; i < 6; i++) { //6 stats
		var newStat = new Stat();
		this.stats.push(newStat);
		this.statTotal += newStat.value;
		this.modTotal += newStat.mod;
	}
}

function Stat() { //rolls is array of 4 dice results
	this.rolls = [];
	for(var i = 0; i < 4; i++) { //4 rolls take highest 3
		this.rolls.push(random(1,6) );
	}
	this.value = 0;
	for(var i = 0, minIdx = this.rolls.indexOf(Math.min.apply(Math, this.rolls) ); i < 4; i++) {
		if(i != minIdx) {
			this.value += this.rolls[i];
		}
	}
	this.mod = getStatMod(this.value);
}

function getStatMod(stat) {
	for(var i = 3, j = -4; ; i+=2, j++) {
		if(i >= stat) {
			return j;
		}
	}
}

function getDieCode(roll) {
	return "&#98" + (55 + roll);
}

function getDiceCodes(rolls) {
	var diceCodes = "";
	for(var i = 0; i < rolls.length; i++) {
		diceCodes += getDieCode(rolls[i]) + " ";
	}
	return diceCodes;
}

window.onload = function() {
	
	document.getElementById("RGBIcon").onclick = function() {
		window.open("../index.html");
	}
	
	document.getElementById("email").onclick = function() {
		window.open("mailto:justingolden21@gmail.com?Subject=Regarding%20Dnd%20Character%20Creator");
	}
	
	document.getElementById("info").onclick = function() {
		document.getElementById("infoModal").style.display = "inline-block";
	}
	
	document.getElementById("settingsClose").onclick = function() {
		document.getElementById("infoModal").style.display = "none";
	}
	
	window.onclick = function(event) {
		if (event.target == document.getElementById("infoModal") ) {
			document.getElementById("infoModal").style.display = "none";
		}
	}
	
	document.getElementById("download").onclick = function() {
		if(characters.length == 0) {
			return;
		}
		data = [];
		var currentChar = characters[characters.length-1];
		data.push(document.getElementById("nameInput").value + "\r\n");
		for(var i = 0; i < currentChar.stats.length; i++) {
			data.push(document.getElementById("stat" + (i+1) + "Mod").value + ": ");
			for(var j = 0; j < currentChar.stats[i].rolls.length; j++) {
				data.push(currentChar.stats[i].rolls[j].toString());
				if(j < currentChar.stats[i].rolls.length-1) {
					data.push(",");
				}
			}
			data.push("\tVal: " + currentChar.stats[i].value + "\tMod: " + currentChar.stats[i].mod );
			data.push("\r\n");
		}
		data.push("\r\nTotal:\t\tVal: " + currentChar.statTotal + "\tMod: " + currentChar.modTotal);
		
		properties = {type: 'plain/text'};
		try {
			file = new File(data, "stats.txt", properties);
		} catch (e) {
			file = new Blob(data, properties);
		}
		document.getElementById("downloadLink").download = "Character-" + document.getElementById("nameInput").value + ".txt";
		document.getElementById("downloadLink").href = URL.createObjectURL(file);
	}
	
	document.getElementById("genButton").onclick = function() {
		resetStats();
		document.getElementById("nameInput").value = "";
		characters.push(new Character() );
		var currentChar = characters[characters.length-1];
		for(var i = 0; i < 6; i++) {
			document.getElementById("stat" + (i+1) ).innerHTML = getDiceCodes(currentChar.stats[i].rolls) + "<br><b>" + currentChar.stats[i].value + "</b><br>" + (currentChar.stats[i].mod > 0 ? "+" : "") + currentChar.stats[i].mod;
		}
		document.getElementById("statsInfoStdDev").innerHTML = "Deviation:<br><b>" + Math.round(stdDev(statsToValues(currentChar.stats))*100)/100 + "</b><br>" + Math.round(stdDev(statsToMods(currentChar.stats))*100)/100;
		document.getElementById("statsInfoAvg").innerHTML = "Mean:<br><b>" + Math.round(currentChar.statTotal*100/6)/100 + "</b><br>" + Math.round(currentChar.modTotal*100/6)/100;
		document.getElementById("statsInfo").innerHTML = "Total:<br><b>" + currentChar.statTotal+ "</b><br>" + currentChar.modTotal;
		document.getElementById("characterDiv").style.display = "inline-block";
		document.getElementById("numChars").innerHTML = characters.length + " character" + (characters.length > 1 ? "s" : "") + " generated";
		
		var numbers = [];
		for(var i = 0; i < 6; i++) {
			numbers.push(parseInt(currentChar.stats[i].value));
		}
		numbers.sort(sortNumber);
		document.getElementById("numbersInput").value = numbers.join(", ");
		drawCanvasChart(night);
	}
	
	function sortNumber(a,b) {
		return a - b;
	}
	
	document.getElementById("genButton").click();
	
	var statMods = document.getElementsByClassName("statMod");
	for(var i = 0; i < statMods.length; i++) {
		statMods[i].onclick = statMods[i].onfocus = function(evt) {
			for(var j = 0; j < 6; j++) {
				evt.target.options[j+1].disabled = false;			
			}
			for(var j = 0; j < 6; j++) {
				var idx = document.getElementById("stat" + (j+1) + "Mod").selectedIndex;
				if(idx != 0) {
					evt.target.options[idx].disabled = true;
				}
			}
		}
	}
	
	document.getElementById("copyButton").onclick = function() {
		var numInput = document.getElementById("numbersInput");
		numInput.focus();
		numInput.setSelectionRange(0, numInput.value.length);
		document.execCommand("copy");
	}
	
	document.getElementById("resetStat").onclick = function() {
		resetStats();
	}
	
	document.getElementById("nightMode").onclick = function() {
		night = !night;
		drawCanvasChart(night);
		
		var nightStyle = document.getElementById("nightStyle");
		nightStyle.href = (night ? "charStyles-night.css" : "");
	}
	
	document.getElementById("fullscreen").onclick = function() {
		toggleFullscreen();
	}
	
}

//stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
function getPixelRatio() {
	var canvas = document.getElementById("oddsGraphCanvas");
	var ctx = canvas.getContext("2d");
	var dpr = window.devicePixelRatio || 1;
	var bsr = ctx.webkitBackingStorePixelRatio ||
		ctx.mozBackingStorePixelRatio ||
		ctx.msBackingStorePixelRatio ||
		ctx.oBackingStorePixelRatio ||
		ctx.backingStorePixelRatio || 1;
	return dpr / bsr;
}

function drawCanvasChart(night) {
	
	var ratio = getPixelRatio();
	console.log("ratio: " + ratio);
	
	var canvas = document.getElementById("oddsGraphCanvas");
	var ctx = canvas.getContext("2d");
	var width = 320, height = 240, radius = 4, unit = 20;
	var darkColor, lightColor;
	if(!night) {
		darkColor = "#19194d", lightColor = "#d9d9f2"; //20%, 90%		
	} else {
		darkColor = "#000", lightColor = "#b3b3e6"; //0%, 90%
	}

	canvas.width = width * ratio;
	canvas.height = height * ratio;
	ctx.clearRect(0, 0, width, height);
	ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
	ctx.translate(0.5, 0.5);
	
	ctx.strokeStyle = darkColor;
	ctx.lineWidth = "3";
	ctx.beginPath();
	ctx.moveTo(unit-10, height - odds[0] - 10);
	for(var i = 4; i < 19; i++) {
		ctx.lineTo( (i-2)*unit-10, height - odds[i-3] - 10 ); //graph
	}
	ctx.stroke();
	ctx.closePath();
	
	ctx.strokeStyle = lightColor;
	ctx.lineWidth = "2";
	for(var i = 0; i < 16; i++) {
		ctx.beginPath();
		ctx.moveTo(i*unit+10, height-10); //grid lines
		ctx.lineTo(i*unit+10, 0);
		ctx.stroke();
		ctx.closePath();
	}
	
	ctx.textAlign = "center";
	for(var i = 3; i < 19; i++) {
		ctx.fillStyle = darkColor;
		ctx.beginPath();
		ctx.arc( (i-2)*unit-10, height - odds[i-3] - 10, radius, 0, 2*Math.PI ); //points on line
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = lightColor;
		ctx.font = "12px Roboto";
		ctx.fillText(i, (i-2)*unit-10, height-2 ); //roll, x, y
		ctx.fillStyle = darkColor;
		ctx.font = "10px Roboto";
		ctx.fillText(odds[i-3].toString(), (i-2)*unit-10, height - odds[i-3] - 25 ); //odds, x, y
	}
	
	ctx.strokeStyle = darkColor;
	ctx.lineWidth = "2";
	for(var i = 0; i < 6; i++) { //your character
		ctx.fillStyle = lightColor;
		ctx.beginPath();
		ctx.arc( (characters[characters.length-1].stats[i].value - 2) * unit - 10, i*5+5, radius, 0, 2*Math.PI );
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
		
	ctx.fillStyle = lightColor;
	ctx.font = "14px Roboto";
	//ctx.fillText("Stat Roll (3-18)", width/2, height-25 ); //x axis label
	ctx.rotate( Math.PI/2);
	//ctx.fillText("Odds (of 1296)", width/3, -10 ); //y axis label
}

function statsToValues(stats) {
	var vals = [];
	for(var i = 0; i < stats.length; i++) {
		vals[i] = stats[i].value;
	}
	return vals;
}

function statsToMods(stats) {
	var mods = [];
	for(var i = 0; i < stats.length; i++) {
		mods[i] = stats[i].mod;
	}
	return mods;
}

function stdDev(array) { //standard deviation
	var sum = 0, len = array.length;
	for(var i = 0; i < len; i++) {
		sum += array[i];
	}
	var mean = sum / len;
	var devs = 0;
	for(var i = 0; i < len; i++) {
		devs += Math.pow(array[i] - mean, 2);
	}
	return Math.sqrt(devs / (len - 1) );	
}

function resetStats() {
	var statMods = document.getElementsByClassName("statMod");
	for(var i = 0; i < statMods.length; i++) {
		statMods[i].selectedIndex = 0;
	}
}
