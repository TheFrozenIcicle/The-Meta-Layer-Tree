addLayer("eps", {
    name: "Infinitesimal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ε", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		sparks: new Decimal(0),
        gain: new Decimal(0),
    }},
    hotkeys: [
        {
            key: "e", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "E..?: ...what? what is this... what did you do? WHAT DID YOU DO?", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.eps.unlocked) doReset("eps") },
            unlocked() {return player.eps.unlocked || hasUpgrade('lf', 16)} // Determines if you can use the hotkey, optional
        }
    ],
    doReset(resettingLayer) {
        let keep = [];
        if (layers[resettingLayer].row > this.row) { 
            layerDataReset(this.layer, keep);
                
        }
        //anything u place here is for keeping specific things, like if(hasUpgrade('x',99))player.y.upgrades.push(11) if that makes sense
    },
    color: "#0f90b8",
    branches: "p",
    requires: new Decimal('1'), // Can be a function that takes requirement increases into account
    resource: "Infinitesimal Sparks", // Name of prestige currency
    baseResource: "Epsilon", // Name of resource prestige is based on
    baseAmount() {return player.epsilon}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    getResetGain(gain) {
        if (player.epsilon >= 1) {
            gain = new Decimal(1)
        }
        else gain = new Decimal(0)
        return gain
    },
    getNextAt() {
        return player.epsilon.times(player.eps.sparks).max(0)
    },
    canReset() {
        if (player.points==new Decimal('0')) return true; else return false
    },
    prestigeButtonText() {
        return ("...what..? you'll gain... " + player[this.layer].gain + " infinitesimal sparks?")
    },
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        // Prestige Upgrade
        // Blank
        // Power Upgrades
        // Blank
        // System Upgrades
        // Layer Upgrades
        // Blank
        // Layer Fragment Upgrades
        // Blank
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 999, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0,
    layerShown(){return player.eps.unlocked || hasUpgrade('lf', 16)},
    upgrades: {
        11: {
            title: "...what did... what did you do?",
            description: "i... dont know what to say... i guess i'll just... square layer and layer fragment gain...",
            cost: new Decimal('1'),
            currencyLocation: function(){return player.eps},
            currencyDisplayName: "Infinitesimal Sparks",
            currencyInternalName: "sparks",
        },
        12: {
            title: "i... what?",
            description: "epsilon gain plus two, multiplied by five?",
            cost: new Decimal('2'),
            currencyLocation: function(){return player.eps},
            currencyDisplayName: "Infinitesimal Sparks",
            currencyInternalName: "sparks",
        },
},
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "upgrades"],
            unlocked(){if (player.points.lte('2^-1024') || player.eps.unlocked) return true; else return false}
        },
        "a+bε": {
            content: [
                ["display-text",
                    function(){return 'is this the right way?'}],
                "blank",
                ["row", ["hori-slider", 0, 100]]
            ],
            unlocked(){if (hasUpgrade('eps', 15)) return true; else return false}
        }
}})