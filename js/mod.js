let modInfo = {
	name: "The Meta Layer Tree",
	id: "1stIcyDev",
	author: "TheIcyIcicle",
	pointsName: "Points",
	modFiles: ["prestige.js", "achievements.js", "power.js", "system.js", "layers.js", "layerfragments.js", "tree.js", "anotherway.js", "thepathlongfollowed.js"],

	discordName: "TheIcyIcicle",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 4,  // In hours
}
function Rand(min, max, int=true) {
	if (min > max) {[min, max] = [max, min];}
	if (int) return Math.floor(Math.random()*(max-min+1))+min;
	else return Math.random()*(max-min)+min
}

// Set your version in num and name
let VERSION = {
	num: "0.1.0",
	name: "WHERE DID THIS 'Meta' COME FROM? WE AREN'T META! ...wait a second",
}

let changelog = `<h1>Changelog:</h1><br>
	<h2>A.B.C Cookie Style. ...mostly <br>
	A = HUGE update, B = Big Update, C = Normal Update,</h2><br>
	<h3>Hotfixes will be kept in the next update's changelog from here on out. (0.1.0)</h3><br>
		<br>
		<br>
	<h3>v0.1.0 LAYERS</h3><br>
		- More. Layers.<br>
		- Timewalls :(<br>
		- Quite a few upgrades.<br>
		- Rename from 'The Layered Tree' to 'The Meta Layer Tree' as result of the poll.<br>
		- GUYS. GUYS I DIDN'T MAKE SIGMA67LER IN THEMES. GUYS. I DIDN'T DO THIS. IT JUST APPEARED AFTER A PLAYTEST. I CANT REMOVE IT. SOMEONE HELP, PLEASE!!!<br>
	<h3>v0.0.1 POWAHHH</h3><br>
		- So begins the Power Layer.<br>
		- Random Bug with Upgrade Keeping you get to have for now!<br>
		- Three new achievements (literally nothing)<br>
	<h3>v0.0.0 The Start</h3><br>
		- Three Layers.<br>
		- Multiple Upgrades.<br>
		- Probably some inflation<br>
		- Begin the Layers.<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		...there is something among the files... keep the contents. secret. from the others. or just dont open them... (this message was added in 0.1.0)<br>`

let winText = `EVERCHANGING LAYERS, EVERLASTING TIMEFRAMES.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	epsilon: Decimal.dZero
}}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	// Additives
	if (hasUpgrade('p', 11)) gain = gain.add('1.5')
	// Achievements
	if (hasAchievement('a', 13)) gain = gain.times('2.5')
	// Prestige Upgrades
	if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 23)) gain = gain.times(upgradeEffect('p', 23))
	// Power Upgrades
	if (hasUpgrade('w', 11)) gain = gain.times('1.25')
	// System
	// blank
	// Layer Upgrades
	if (hasUpgrade('l', 12)) gain = gain.times('5')
	if (hasUpgrade('l', 13)) gain = gain.times('1.75')
	if (hasUpgrade('l', 14)) gain = gain.times('2.5')
	if (hasUpgrade('l', 15)) gain = gain.times('5')
	// Layer Fragment Upgrades
	if (hasChallenge('lf', 11)) gain = gain.times('1e9')
	// Exponents
	if (hasUpgrade('lf', 12)) gain = gain.pow('1.1')
	if (hasUpgrade('lf', 22)) gain = gain.pow('1.1')
	if (hasUpgrade('s', 14)) gain = gain.pow('1.35')
	return gain
}

function canGenEpsilon(){
	if (getPointGen().lte(new Decimal(0.001)) || player.epsilon.lte(new Decimal(0))){return false}
	else return true
}

function getEpsilonGen() {
	if(!canGenEpsilon())
		return new Decimal(0)

	let Epgain = new Decimal(0.5)
	if (hasUpgrade('eps', 12)) Epgain = Epgain.add('2').times('5')
	return Epgain
}

// Display extra things at the top of the page
var displayThings = [
	function(){if(player.epsilon > new Decimal(0) || player.eps.unlocked == true){return '<h2>You have ' + format(player.epsilon) + ' Epsilon</h2>'} else return "hi, i will change later! (not in this update though)"},
]
function isEndgame() {
	return (hasUpgrade('s', 25) && player.points.gte('5e50'))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}