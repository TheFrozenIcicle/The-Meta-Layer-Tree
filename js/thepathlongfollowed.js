addLayer("inf", {
    name: "Infinite", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "∞", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    hotkeys: [
        {
            key: "i", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "I: Collapse Points into Infinity.", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.inf.unlocked) doReset("inf") },
            unlocked() {return player.inf.unlocked || hasUpgrade('lf', 16)} // Determines if you can use the hotkey, optional
        }
    ],
    doReset(resettingLayer) {
        let keep = [];
        if (layers[resettingLayer].row > this.row) { 
            layerDataReset(this.layer, keep);
                
        }
        //anything u place here is for keeping specific things, like if(hasUpgrade('x',99))player.y.upgrades.push(11) if that makes sense
    },
    color: "#ffc400",
    branches: "",
    requires: new Decimal('2^1024'), // Can be a function that takes requirement increases into account
    resource: "Infinity Points", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.inf.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
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
    layerShown(){return player.inf.unlocked || (player.points.gte(Decimal.dNumberMax))},
    upgrades: {
        11: {
            title: "Filled to the Brim",
            description: "Like a Glass of Water. Quintuple Prestige Points, and Square Point gain.",
            cost: new Decimal('1'),
        },
},
})