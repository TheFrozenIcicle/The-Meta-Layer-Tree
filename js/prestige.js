addLayer("p", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    hotkeys: [
        {
            key: "p", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "P: Reset your Points for Prestige Points", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.p.unlocked) doReset("p") },
            unlocked() {return true} // Determines if you can use the hotkey, optional
        }
    ],
    doReset(resettingLayer) {
        let keep = [];
        let keptUpgrades = [];
        if ((layers[resettingLayer].row > this.row)) { 
            if (hasUpgrade('p', 43)) keptUpgrades.push(43)
            if (hasUpgrade('p', 45)) keptUpgrades.push(45)
            layerDataReset(this.layer, keep);
            player[this.layer].upgrades.push(...keptUpgrades)
            if ((hasUpgrade('w', 13)) && (resettingLayer == 'l' || resettingLayer == 'w' || resettingLayer == 's') && (hasUpgrade('l', 24))) {
                for (let i = 1; i < 6; i++) {
                    player[this.layer].upgrades.push(i+10)
            }} else if ((hasUpgrade('w', 13)) && (resettingLayer == 'l' || resettingLayer == 'w' || resettingLayer == 's')) {
                for (let i = 1; i < 4; i++) {
                    player[this.layer].upgrades.push(i+10)
            }}
        }
        //anything u place here is for keeping specific things, like if(hasUpgrade('x',99))player.y.upgrades.push(11) if that makes sense
    },
    automate() {
        if (hasUpgrade('lf',32)) {
            for (let i = 1; i < 6; i++) {
                buyUpgrade('p',i+10)
                buyUpgrade('p',i+20)
                buyUpgrade('p',i+30)
                buyUpgrade('p',i+40)
            }
        }
    },
    passiveGeneration() {
        let gen = 0
        if (!hasUpgrade('p', 43)){gen=0}
        else if (!hasUpgrade('p', 99)){gen=2.5}
        return gen
    },
    color: "#0086D1",
    branches: ["w", "s"],
    requires: new Decimal('10'), // Can be a function that takes requirement increases into account
    resource: "Prestige Points", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        // Prestige Upgrades
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 21)) mult = mult.times(upgradeEffect('p', 21))
        if (hasUpgrade('p', 31)) mult = mult.times('10')
        if (hasUpgrade('p', 32)) mult = mult.times('5')
        if (hasUpgrade('p', 34)) mult = mult.times(upgradeEffect('p', 34))
        if (hasUpgrade('p', 35)) mult = mult.times(upgradeEffect('p', 35))
        // Power Upgrades
        if (hasUpgrade('w', 11)) mult = mult.times('1.5')
        if (hasUpgrade('w', 12)) mult = mult.times('2')
        if (hasUpgrade('w', 22)) mult = mult.times(upgradeEffect('w', 22))
        if (hasUpgrade('w', 24)) mult = mult.times(upgradeEffect('w', 24))
        if (hasUpgrade('w', 25)) mult = mult.times(upgradeEffect('w', 25))
        // System Upgrades
        if (hasUpgrade('s', 12)) mult = mult.times('50')
        if (hasUpgrade('s', 31)) mult = mult.times(upgradeEffect('s', 31))
        // Layer Upgrades
        if (hasUpgrade('l', 11)) mult = mult.times('2')
        if (hasUpgrade('l', 12)) mult = mult.times('2.5')
        if (hasUpgrade('l', 14)) mult = mult.times('1.25')
        if (hasUpgrade('l', 15)) mult = mult.times('3')
        // Layer Fragment Upgrades
        if (hasUpgrade('lf', 12)) mult = mult.times('2')
        if (hasChallenge('lf', 11)) mult = mult.times('500')
        // Challenges
        if (inChallenge('lf', 11)) mult = mult.div('2')
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    upgrades: {
        99: {
            title: "placeholder",
            description: "placeholder",
            unlocked(){return false},
            cost: new Decimal('1e100'),
        },
        11: {
            title: "Newly Prestiged",
            description: "The First Upgrade, Point gain increased.",
            cost: new Decimal('1'),
        },
        12: {
            title: "A Nice Boost.",
            description: "Point gain increases as you gain more Prestige Points.",
            cost: new Decimal('2'),
            effect() {
                let effect = player[this.layer].points.add(1).pow(0.5);
                if (effect.gt(25) && !hasUpgrade('l', 23)) effect=new Decimal(25);
                else if (effect.gt(75) && hasUpgrade('l', 23)) effect=new Decimal(75);
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return (effect)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "Woah! More Prestige Points?",
            description: "You gain more Prestige Points based on Points.",
            cost: new Decimal('4'),
            effect() {
                let effect = player.points.add(1).pow(0.15).min(50)
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return (effect)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Power",
            description: "More Prestige Points based on Points again but Stronger.",
            unlocked(){if (hasUpgrade('l', 24)) return true; else return false},
            cost: new Decimal('5000'),
            effect() {
                let effect = player.points.add(1).pow(0.2).min(100)
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return (effect)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        15: {
            title: "Prestige Power!",
            description: "Previous upgrade but even STRONGER.",
            unlocked(){if (hasUpgrade('l', 24)) return true; else return false},
            cost: new Decimal('250000'),
            effect() {
                let effect = player.points.add(1).pow(0.25).min(200)
                return (effect)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            title: "Upgrader",
            description: "Doubles Prestige Point Gain",
            cost: new Decimal('7'),
            effect() {
                if (!hasUpgrade('p', 21)) (effect=new Decimal(1));
                else if (!hasUpgrade('p', 22)) (effect=new Decimal(2));
                else if (!hasUpgrade('p', 24)) (effect=new Decimal(5));
                else if (!hasUpgrade('p', 25)) (effect=new Decimal(10));
                else if (!hasUpgrade('p', 44)) (effect=new Decimal(25));
                else (effect=new Decimal(500));
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            tooltip: "this will NOT last as just a 'doubling'"
        },
        22: {
            title: "Upgrader+",
            description: "Upgrades the Upgrader Upgrade.",
            cost: new Decimal('50'),
        },
        23: {
            title: "More Points!",
            description: "Unlocks a new layer + A Nice Boost again But slightly Weaker.",
            cost: new Decimal('250'),
            effect() {
                let effect = player[this.layer].points.add(1).pow(0.4);
                if (effect.gt(20) && !hasUpgrade('l', 23)) effect=new Decimal(20);
                else if (effect.gt(50) && hasUpgrade('l', 23)) effect=new Decimal(50);
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        24: {
            title: "Upgrader++",
            description: "Upgrade the Upgrader+ Upgrade",
            unlocked(){if (hasUpgrade('l', 24)) return true; else return false},
            cost: new Decimal('500000'),
        },
        25: {
            title: "Upgrader+3",
            description: "Upgrade the Upgrader++ upgrade and allow it to Boost Layer Points Half as much.",
            unlocked(){if (hasUpgrade('l', 24)) return true; else return false},
            cost: new Decimal('2.5e6'),
        },
        31: {
            title: "Back Again.",
            description: "Return to the roots. x10 Prestige Points.",
            unlocked(){if (hasUpgrade('lf', 35)) return true; else return false},
            cost: new Decimal('2.5e16'),
        },
        32: {
            title: "Further and Further",
            description: "Push the Layers. 5x Prestige and Layer Points.",
            unlocked(){if (hasUpgrade('lf', 35)) return true; else return false},
            cost: new Decimal('1e17'),
        },
        33: {
            title: "Further.",
            description: "x50 Layer Points and Watts",
            unlocked(){if (hasUpgrade('lf', 35)) return true; else return false},
            cost: new Decimal('1e18'),
        },
        34: {
            title: "FURTHER.",
            description: "Prestige Points boosted by Layer Points.",
            unlocked(){if (hasUpgrade('lf', 35)) return true; else return false},
            cost: new Decimal('1e19'),
            effect() {
                let effect = player.l.points.add(1).pow(0.2);
                if (effect.gt(5000)) effect=(effect.pow(0.9));
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            tooltip: "Extra Power applied to effect at 5000+, but there is no upper limit on this. said Power is 0.9",
        },
        35: {
            title: "FASTER.",
            description: "AGAIN.",
            unlocked(){if (hasUpgrade('lf', 35)) return true; else return false},
            cost: new Decimal('1e21'),
            effect() {
                let effect = player.l.points.add(1).pow(0.15);
                if (effect.gt(2500)) effect=(effect.pow(0.75));
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            tooltip: "Extra Power applied to effect at 2500+, but there is no upper limit on this. said Power is 0.75",
        },
        41: {
            title: "A G A I N .",
            description: "FRAGMENT EDITION.",
            unlocked(){if (hasUpgrade('lf', 35)) return true; else return false},
            cost: new Decimal('1e24'),
            effect() {
                let effect = player.l.points.add(1).pow(0.1);
                if (effect.gt(500)) effect=(effect.pow(0.35));
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            tooltip: "Extra Power applied to effect at 500+, but there is no upper limit on this. said Power is 0.35",
        },
        42: {
            title: "MORE.",
            description: "WATTS BOOSTED BY PRESTIGE POINTS.",
            unlocked(){if (hasUpgrade('lf', 35)) return true; else return false},
            cost: new Decimal('2.5e25'),
            effect() {
                let effect = player.p.points.add(1).pow(0.1);
                if (effect.gt(2500)) effect = new Decimal(2500)
                else if (effect.gt(500)) effect = effect.pow(0.35)
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return effect    
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        43: {
            title: "AUTOMATE.",
            description: "GENERATE 250% OF PRESTIGE POINTS EVERY SECOND.",
            unlocked(){if (hasUpgrade('lf', 35)) return true; else return false},
            cost: new Decimal('1e26'),
            tooltip: "Kept on Watt-Layer Resets."
        },
        44: {
            title: "EXPANSION",
            description: "BETTER THE UPGRADER. BOOST FRAGMENTS WITH IT.",
            unlocked(){if (hasUpgrade('lf', 35)) return true; else return false},
            cost: new Decimal('2.5e26'),
        },
        45: {
            title: "FRAGMENTED SYSTEM BOOST",
            description: "MORE SYSTEMS. MORE LAYER FRAGMENTS.",
            unlocked(){if (hasUpgrade('lf', 35)) return true; else return false},
            cost: new Decimal('5e28'),
        },
    },
})
