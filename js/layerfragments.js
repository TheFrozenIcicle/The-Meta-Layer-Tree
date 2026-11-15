addLayer("lf", {
    name: "Layer Fragments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
        fragments: new Decimal(0),
		points: new Decimal(0),
    }},
    update(diff) {
        let fragmentGain = tmp.lf.fragmentGain
        fragmentGain = fragmentGain.mul(diff)
        player.lf.fragments = player.lf.fragments.add(fragmentGain)
    },
    fragmentGain(){
        if (player.lf.fragments.lte(0) && !hasUpgrade('lf', 11)) return Decimal.dZero;
        let gain = player.lf.points.plus(1).pow(0.75);
        // Prestige Upgrades
        if (hasUpgrade('p', 41)) gain = gain.times(upgradeEffect('p', 41))
        if (hasUpgrade('p', 44)) gain = gain.times(upgradeEffect('p', 21))
        // Power Upgrades
        // Blank
        // System Upgrades
        if (hasUpgrade('s', 25)) gain = gain.times('10');
        // Layer Upgrades
        // Blank
        // Layer Fragment Upgrades
        if (hasUpgrade('lf', 21)) gain = gain.times('2');
        if (hasUpgrade('lf', 41)) gain = gain.times('2');
        gain = gain.times(buyableEffect('lf', 21));
        // Exponentiation Upgrades
        if (hasUpgrade('lf', 34)) gain = gain.pow('1.25');
        return gain;
    },
    hotkeys: [
        {
            key: "f", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "F: Reset Layer Points for Layer Fragments.", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.lf.unlocked) doReset("lf") },
            unlocked() {return player.lf.unlocked || hasUpgrade('l', 21)} // Determines if you can use the hotkey, optional
        }
    ],
    doReset(resettingLayer){
        let keep = [];
        if (layers[resettingLayer].row > this.row) {
            layerDataReset(this.layer, keep)
        }
    },
    color: "#757575",
    requires: new Decimal('100'), // Can be a function that takes requirement increases into account
    resource: "Layer Fragments", // Name of prestige currency
    baseResource: "Layer Points", // Name of resource prestige is based on
    baseAmount() {return player.l.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        // Prestige Upgrades
        // Blank
        // Power Upgrades
        if (hasUpgrade('w', 15)) mult = mult.times(upgradeEffect('w', 15))
        if (hasUpgrade('w', 25)) mult = mult.times(upgradeEffect('w', 25)/2)
        // System Upgrades
        if (hasUpgrade('s', 25)) mult = mult.times('5')
        if (hasUpgrade('s', 45)) mult = mult.times('500')
        // Layer Upgrades
        // Blank
        // Layer Fragment Upgrades
        // Blank
        // System Minigame
        if (hasUpgrade('s', 15)) mult = mult.times(tmp['s'].gainBoost)
        // Exponentiation Upgrades
        if (hasUpgrade('lf', 34)) mult = mult.pow('1.25')
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 11, // Row the layer is in on the tree (0 is the first row)
    displayRow: 'side',
    layerShown(){return player.lf.unlocked || hasUpgrade('l', 21)},
    challenges: {
        99: {
        name: "Placeholder",
        challengeDescription: "description of placeholder",
        canComplete: function(){return player.points.gte(1e1000)},
        unlocked(){return false}
        },
        11: {
        name: "Fragmented Reality...",
        challengeDescription: "WARNING! ENTERING THIS <i>WILL</i> RESET EVERYTHING OTHER THAN THE UPGRADE THAT UNLOCKED THIS TAB! <br> Fragment Reality, to halve Prestige Point and Layer Point gain.",
        goalDescription: "Be Able to reset for 5 Layer Fragments. *YOU CANNOT RESET LF!*",
        rewardDescription: "1e9x point gain and 500x boost to Prestige/Layer Points, Watts.",
        onEnter(){if (hasChallenge('lf', 11)){keep=['challenges']} else {keep=[]} layerDataReset(this.layer,keep), layerDataReset('l'), layerDataReset('s'), player.s.upgrades.push('33'), layerDataReset('w'), layerDataReset('p')},
        canComplete: function(){if ((player.l.points.pow(0.35)).gte(5)) return true; else return false},
        unlocked(){if (hasUpgrade('s', 33)) return true; else return false}
        },
    },
    buyables: {
        11: {
            cost(){return new Decimal(5).pow(getBuyableAmount('lf', 11))},
            title: 'Fragment Power',
            display(){if (!hasUpgrade('lf', 15)) return ('Increase Layer Point Gain by 1.1x <br> Effect: '
                            + format(new Decimal.pow('1.1',getBuyableAmount('lf', 11))) + 'x<br> Amount: '
                            + format(getBuyableAmount('lf', 11)) + '<br> Cost: '
                            + format(new Decimal(5).pow((getBuyableAmount('lf', 11)))));

                      else if (hasUpgrade('lf', 15)) return ('Increase Layer Point Gain by 1.25x <br> Effect: '
                            + format(new Decimal.pow('1.25',getBuyableAmount('lf', 11))) + 'x<br> Amount: '
                            + format(getBuyableAmount('lf', 11)) + '<br> Cost: '
                            + format(new Decimal(5).pow((getBuyableAmount('lf', 11)))))},
            unlocked(){if (hasUpgrade('lf', 11)) return true; else return false},
            canAfford(){return player.lf.fragments.gte(this.cost())},
            effect(){
                if (hasUpgrade('lf', 15)) return (new Decimal.pow('1.25', getBuyableAmount('lf', 11)))
                else return (new Decimal.pow('1.1', getBuyableAmount('lf', 11)))
            },
            buy(x){
                player.lf.fragments = player.lf.fragments.sub(5^x)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        21: {
            cost(x){return new Decimal(2).pow(x).times(5)},
            title: 'Fragmented Multiplier',
            display(){return ('Increase Fragment Gain by 1.5x <br> Effect: '
                            + format(new Decimal.pow('1.5',getBuyableAmount('lf', 21))) + 'x<br> Amount: '
                            + format(getBuyableAmount('lf', 21)) + '<br> Cost: '
                            + format(new Decimal(2).pow((getBuyableAmount('lf', 21)).add(1)).times(5)));
            },
            unlocked(){if (hasUpgrade('lf', 41)) return true; else return false},
            canAfford(){return player.lf.fragments.gte(this.cost())},
            effect(x){
                return new Decimal.pow('1.5', x).times(x).max(1)
            },
            buy(x){
                player.lf.fragments = player.lf.fragments.sub((2^x)*5)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    upgrades: {
        99: {
            title: "placeholder",
            description: "placeholder",
            unlocked() {return false},
            cost: new Decimal('1e100'),
        },
        11: {
            title: "Fragmented Layers",
            description: "2x Layer Points Begin Fragment Generation",
            cost: new Decimal('1'),
        },
        12: {
            title: "Fragmented Points",
            description: "^1.1 Points, 2x Prestige Points More layer Upgrades, Inflate.",
            cost: new Decimal('2'),
        },
        13: {
            title: "Proper Layers",
            description: "Finally unlock a layer that ISN'T a Side Layer!",
            cost: new Decimal('10'),
        },
        14: {
            title: "Upgrades Kept",
            description: "Keep Watt Upgrades on Layer Resets",
            cost: new Decimal('250'),
        },
        15: {
            title: "Careful with this.",
            description: "Boost Fragment Power to 1.25x per. x10 Watts and Add more watt upgrades as well.",
            cost: new Decimal('750'),
        },
        21: {
            title: "Fragmented Fragmented Layers",
            description: "uh... 5x Layer Points and 2x Fragment generation.",
            unlocked(){if (hasUpgrade('w', 25)) return true; else return false},
            cost: new Decimal('1000'),
        },
        22: {
            title: "Fragmented Fragmented Points",
            description: "is... this gonna continue? ^1.1 Points again, 2.5x Prestige Points.",
            unlocked(){if (hasUpgrade('w', 25)) return true; else return false},
            cost: new Decimal('2500'),
        },
        23: {
            title: "Layers upon Layers.",
            description: "Unlock another layer.",
            unlocked(){if (hasUpgrade('w', 25)) return true; else return false},
            cost: new Decimal('5000'),
        },
        24: {
            title: "Generating Currencies.",
            description: "Boost Prestige Points and Watts.",
            unlocked(){if (hasUpgrade('s', 25)) return true; else return false},
            cost: new Decimal('12500000'),
        },
        25: {
            title: "Self-Sustaining Loop.",
            description: "Boost Systems and Watts based on Layer Fragments.",
            unlocked(){if (hasUpgrade('s', 25)) return true; else return false},
            cost: new Decimal('50000000'),
            effect() {
                let effect = player[this.layer].points.add(1).pow(0.75).log(10).max(1).min(50)
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return (effect)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        31: {
            title: "BOOT_SYS: MULTITHREAD",
            description: "INTIALIZE MORE CORE THREADS FOR A 5* BOOST TO SYSTEM:BOOT MULTIPLIER.",
            unlocked(){if (hasUpgrade('s', 25)) return true; else return false},
            cost: new Decimal('1e9'),
        },
        32: {
            title: "About time.",
            description: "Automate Prestige Upgrades",
            unlocked(){if (hasUpgrade('s', 25)) return true; else return false},
            cost: new Decimal('3.5e9'),
        },
        33: {
            title: "SYS.OVERCLOCK PROTOCOL",
            description: "Allow Overclocking.",
            unlocked(){if (hasUpgrade('s', 25)) return true; else return false},
            cost: new Decimal('1e10'),
        },
        34: {
            title: "wait, no... PLEASE NO!",
            description: "Exponentiate Fragment and Layer Fragment Gain by 1.25",
            unlocked(){if (hasUpgrade('s', 25)) return true; else return false},
            cost: new Decimal('5e10'),
        },
        35: {
            title: "Prestige Expansion",
            description: "Oh for goodness sake, we CANNOT keep doing this. Expand Prestige Upgrades by Two Rows.",
            unlocked(){if (hasUpgrade('s', 25)) return true; else return false},
            cost: new Decimal('1e13'),
        },
        41: {
            title: "FRAGMENTED FRAGMENTED FRAGMENTED",
            description: "NEW BUYABLE, UPGRADE 11 AND 21 APPLIED AGAIN",
            unlocked() {if (hasUpgrade('p', 45)) return true; else return false},
            cost: new Decimal('5e15'),
        },
        42: {
            title: "INCREASE",
            description: "Layer Fragments boosts Watts",
            unlocked() {if (hasUpgrade('p', 45)) return true; else return false},
            cost: new Decimal('1e22'),
        },
        43: {
            title: "...again?",
            description: "More Systems. again.",
            unlocked() {if (hasUpgrade('p', 45)) return true; else return false},
            cost: new Decimal('1e30'),
            tooltip: "'the reference?!"
        },
        44: {
            title: "What Remains.",
            description: "Gain 250% Watts Passively.",
            unlocked() {if (hasUpgrade('p', 45)) return true; else return false},
            cost: new Decimal('2.5e42'),
        },
        45: {
            title: "Half a Piece",
            description: "Get the other. Expand what should.",
            unlocked() {if (hasUpgrade('p', 45)) return true; else return false},
            cost: new Decimal('1e46'),
            tooltip: "This Upgrade also boosts Points by 50000"
        },
    },
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "upgrades"],
            unlocked(){if (hasUpgrade('lf', 11)) return true; else return false}
        },
        "FRAGMENTED": {
            content: [
                ["display-text",
                    function(){return "You have "+format(player.lf.fragments)+" Fragments"}],
                ["display-text",
                    function(){return "<h5>You are gaining "+format(tmp.lf.fragmentGain)+" Fragments a second</h5>"}],
                "blank",
                "buyables"
            ],
            unlocked(){if (hasUpgrade('lf', 11)) return true; else return false}
        },
        "Challenging": {
            content: [
                ["display-text", "...welcome to the challenge tab."],
                "blank",
                "challenges"
            ],
            unlocked(){if (hasUpgrade('s', 33)) return true; else return false}
        }
}})
