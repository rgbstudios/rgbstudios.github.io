/*TODO:
make simple/advanced button bigger
turn off up/down input arrows firefox on disabled textarea
console output different for custom
make readme

save/read txt file of inputs (str, dex...) save all info and upload later
cookies for keeping notes
server tracks total dice and visitors, countries, mean/median rolls per visit
log all rolls with time/date, length of visit, rolls per visit
theme modal, nightmode option
save console and copy console options
check all inputs before roll (can copy/paste lower, higher, or e,E,-...
night mode?

roll custom for multiple only rolls one
rest cookies button
we use cookies blurb
use material icons
use sass
accent color
*/

var totalRolls = 0;
var statNames = ["Prf", "Spl", "Itv", "Str", "Dex", "Con", "Int", "Wis", "Cha"];
window.onload = function() {
	
	loadStatsFromCookies();
	
	var inputs = document.getElementsByTagName("input");
	for(var i = 0; i < inputs.length; i++) {
		inputs[i].onclick = function() {
			this.select();
		}	
	}
	
	document.getElementById("RGBIcon").onclick = function() {
		window.open("../index.html");
	}
		
	
	//TODO: get to type dash in mod and not refresh page if enter in num dice input
	var numberInputNames = ["numD4", "numD6", "numD8", "numD12", "numD20", "numcustom", "customSides", "D4Mod", "D6Mod", "D8Mod", "D12Mod", "D20Mod", "customMod", "D4Multiplier", "D4Multiplier", "D6Multiplier", "D8Multiplier", "D12Multiplier", "D20Multiplier", "customMultiplier", "Prf", "Spl", "Itv", "Str", "Dex", "Con", "Int", "Wis", "Cha"];
	for(var i = 0; i < numberInputNames.length; i++) {
	document.getElementById(numberInputNames[i]).onkeypress =
		//https://stackoverflow.com/questions/25825843/restrict-user-to-put-value-in-range-in-html-input-type-number
		function (e) {
			var ev = e || window.event;
			if(ev.charCode == 189) //dash
				return true;
			if(ev.charCode < 48 || ev.charCode > 57) //not a digit
				return false;
			else if(this.value * 10 + ev.charCode - 48 > this.max)
				return false;
			return true;
		}
	}
	
	document.getElementById("simpleButton").onclick = toggleTRs;
	document.getElementById("email").onclick = function() {
		window.open("mailto:justingolden21@gmail.com?Subject=Regarding%20Dnd%20Dice%20Roller");
	};
	
	document.getElementById("simpleButton").click();
	
	var fileInput = document.getElementById("fileInput");
	fileInput.addEventListener("change", function(e) {
		var file = fileInput.files[0];
		var textType = /text.*/;

		if(file.type.match(textType)) {
			var reader = new FileReader();

			reader.onload = function(e) {
				var fileText = reader.result;
				var newStats = fileText.split(",");
				
				if(newStats.length != statNames.length + 1) {
					window.alert("Invalid text file");
					return;
				}
				for(var i = 0; i < statNames.length; i++) {
					document.getElementById(statNames[i]).value = newStats[i];
				}
				window.alert("Stats loaded");
			}

			reader.readAsText(file);    
		} else {
			window.alert("Must be a text file");
		}
	});
	
	document.getElementById("download").onclick = function() {
		var data = [];

		for(var i = 0; i < statNames.length; i++) {
			data.push(document.getElementById(statNames[i]).value + ",");
		}
		
		properties = {type: 'plain/text'};
		try {
			file = new File(data, "stats.txt", properties);
		} catch (e) {
			file = new Blob(data, properties);
		}
		document.getElementById("downloadLink").download = "character-stats.txt";
		document.getElementById("downloadLink").href = URL.createObjectURL(file);
	}
	
	for(var i = 0; i < statNames.length; i++) {
		document.getElementById(statNames[i]).onchange = function() {
			setStatCookies();
		}
	}
	
	
}

window.onkeyup = function(e) {
	if(e.keyCode == 13 && e.target.className != "notes") {
		//e.preventDefault(); //prevent enter from refreshing page
		rollAll();
	}
}

//reset functions
function resetDie(name) {
	document.getElementById("num" + name).value = 1;
	document.getElementById(name + "Mod").value = 0;
	document.getElementById(name + "StatMod").value = "None";
	if(name == "D20")
		document.getElementById(name + "BonusMod").value = "None";
	if(name == "custom")
		document.getElementById("customSides").value = 10;
	document.getElementById(name + "Advantage").value = "None";
	document.getElementById(name + "Multiplier").value = 1;	
	document.getElementById(name + "MultiplierRadio").reset();	
}
function resetStats() {
	var statNames = ["Prf", "Spl", "Itv", "Str", "Dex", "Con", "Int", "Wis", "Cha"];
	for(var i = 0; i < statNames.length; i++)
		document.getElementById(statNames[i]).value = 0;
}

//update info
function update(name) {
	var sides = (name == "custom" ? document.getElementById("customSides").value : name.slice(1, name.length) );
	var isCustom = name == "custom";
	document.getElementById(name + "Label").innerHTML = rollDie(sides, isCustom, true);
}

function updateAll() {
	setTimeout(function(){ //timeout because onclick and onreset call BEFORE values reset
		var dieNames = ["D4", "D6", "D8", "D12", "D20", "custom"];
		for(var i = 0; i < dieNames.length; i++)
			update(dieNames[i]);
	}, 50);
}

//roll functions
function diceRaw(sides, num) {
	var rolls = [];
	for(var i = 0; i < num; i++)
		rolls.push(random(1, sides) );
	return rolls;
}

function rollRaw(sides, isCustom) {
	var result = random(1, sides);
	var resultText = "Rolled 1d" + sides + ": " + result + (sides == 20 ? (result == 20 ? " (Crit!)" : result == 1 ? " (Fail!)" : "") : "") + "\n\n";
	var rollsText = document.getElementById("rollsText");
	rollsText.value = resultText + rollsText.value;
	console.log(resultText);
	document.getElementById( (isCustom ? "custom" : "D" + sides) + "RawResult").value = result;
	document.getElementById("recentRoll").innerHTML = "Most recent result: <b>" + resultText + "</b>";
	totalRolls++;
	document.getElementById("totalRollsP").innerHTML = "You've rolled " + totalRolls + " dice";
	if(document.getElementById("speak").checked) {
		talk(result);
	}
}

function rollAll() {
		rollDie(document.getElementById("customSides").value, true, false);
		rollDie(20, false, false);
		rollDie(12, false, false);
		rollDie(8, false, false);
		rollDie(6, false, false);
		rollDie(4, false, false);
		var names = ["custom", "D4", "D6", "D8", "D12", "D20"], sum = 0;
		for(var i = 0; i < names.length; i++) {
			var val = parseInt(document.getElementById(names[i] + "RawResult").value);
			if(!isNaN(val) ) {
				sum += val;
			}
		}
		var rollsText = document.getElementById("rollsText");
		rollsText.value = "Sum: " + sum + "\n\n" + rollsText.value;
}

function rollDie(sides, isCustom, isPreview) { //TODO:
	var name = isCustom ? "custom" : "D" + sides;
	var num = parseInt(document.getElementById("num" + name).value);
	
	if(isNaN(num)) {
		num = 1;
	}
	
	if(num < 1) {
		if(!isPreview) {
			document.getElementById( (isCustom ? "custom" : "D" + sides) + "RawResult").value = "";
		}
		return "0d" + sides;
		//num = 1;
		//document.getElementById("num" + name).value = 1;
	} else if(num > document.getElementById("num" + name).max) {
		num = document.getElementById("num" + name).max;
		document.getElementById("num" + name).value = document.getElementById("num" + name).max;		
	}
	var rolls = diceRaw(sides, num);
	
	var rollsList = "";
	for(var i = 0; i < rolls.length - 1; i++)
		rollsList += rolls[i] + ", ";
	rollsList += rolls[rolls.length - 1];
	
	var adv = document.getElementById(name + "Advantage").value;
	var rollUsed = 0;
	if(adv == "Adv") {
		var sortedRolls = rolls.sort(); //low to high
		rollUsed = sortedRolls[sortedRolls.length - 1];
	} else if(adv == "Dis") {
		var sortedRolls = rolls.sort(); //low to high
		rollUsed = sortedRolls[0];
	} else {
		for(var i = 0; i < rolls.length; i++)
			rollUsed += rolls[i];
	}
	
	var mod = document.getElementById(name + "Mod").value;
	var statMod = 0;
	var statType = document.getElementById(name + "StatMod").value;
	if(statType != "None")
		var statMod = document.getElementById(document.getElementById(name + "StatMod").value).value;
	var bonusMod = 0;
	var bonusType = "None";
	if(name == "D20" && document.getElementById(name + "BonusMod").value != "None") {
		var bonusType = document.getElementById(name + "BonusMod").value;
		bonusMod = document.getElementById(bonusType).value;
		
	}
	var result = rollUsed;
	var multiply = document.getElementById(name + "MultiplierRadio")[0].checked;
	var multiplier = document.getElementById(name + "Multiplier").value;
	if(multiply)
		result *= multiplier;
	else {
		result /= multiplier;
		result = Math.ceil(result);
	}
	mod = parseInt(mod);
	statMod = parseInt(statMod);
	bonusMod = parseInt(bonusMod);
	result += mod + statMod + bonusMod;
	
	var preview =  num + "d" + sides + (adv == "None" ? "" : " (" + adv.toLowerCase() + ")") + ( multiplier == 1 ? "" : (multiply ? " (*" : " (/") + multiplier + ")" ) + (mod == 0 ? "" : mod > 0 ? " + " + mod : " - " + Math.abs(mod) )
		+ (statType == "None" ? "" : (statMod >= 0 ? " + " + statMod : " - " + Math.abs(statMod) ) + "(" + statType.toLowerCase() + ")")
		+ (bonusType == "None" ? "" : (bonusMod >= 0 ? " + " + bonusMod : " - " + Math.abs(bonusMod) ) + "(" + bonusType.toLowerCase() + ")");
	var resultText = "Rolled " + preview + "\nRolls: " + rollsList + "\nResult: " + result + "\n\n";
	var rollsText = document.getElementById("rollsText");
	
	if(!isPreview) {
		rollsText.value = resultText + rollsText.value;
		console.log(resultText);
		document.getElementById( (isCustom ? "custom" : "D" + sides) + "RawResult").value = result;
		document.getElementById("recentRoll").innerHTML = "Most recent result: <b>" + result + "</b>";
		totalRolls += num;
		
		document.getElementById("totalRollsP").innerHTML = "You've rolled " + totalRolls + " dice";
		if(document.getElementById("speak").checked) {
			talk(result);
		}
	}
	return preview;
}

function toggleTRs() {
	var modTRs = document.getElementsByClassName("modTR");
	for(var i = 0; i < modTRs.length; i++) {
		modTRs[i].style.display = modTRs[i].style.display == "none" ? "table-row" : "none";
	}
	document.getElementById("simpleButton").innerHTML = modTRs[0].style.display == "none" ? "Advanced Display" : "Simple Display";
}

function loadStatsFromCookies() {
	var splitStatString = getCookie("statString").split(",");
	for(var i = 0; i < statNames.length; i++) {
		document.getElementById(statNames[i]).value = splitStatString[i] || 0;
	}
	console.log("loadedStats: " + getCookie("statString"));
}

function setStatCookies() {
	var statString = "";
	for(var i = 0; i < statNames.length; i++) {
		statString += document.getElementById(statNames[i]).value + ",";
	}
	setCookie("statString", statString, 1000);
	console.log("setStats: " + statString);
}

function setCookie(cname, cvalue, exdays) {
	var date = new Date();
	date.setTime(date.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ date.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(";");
	console.log(document.cookie);
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while(c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if(c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
