addLayer("s", {
    name: "Systems", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        time: 0,
        clickables: {11: false, 12: false, 21: false, 22: false},
        SliderOne: 0,
        SliderTwo: 0,
        AlphaSlider1: 0,
        AlphaSlider2: 0,
        AlphaDecider: 0,
        AlphaClickable: 0,
        BetaClickable: 11,
        Overclock: 1,
        MaxClock: 3,
    }},
    update(diff){
        if (hasUpgrade('s', 32)) {player.s.MaxClock=5}
        if (hasUpgrade('s', 35)) {player.s.Overclock=100}

        if ((player.s.time > 0) && (player.s.Overclock != 0)) player.s.time = player.s.time-diff
        else if (player.s.Overclock == 100){
            if (player.s.AlphaDecider == 0){setClickableState('s', player.s.BetaClickable, true); player.s.AlphaSlider1 = Rand(0, 50, true); player.s.AlphaSlider2 = Rand(0, 100, true); player.s.time = Rand(45,450,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 1){player.s.AlphaSlider1 = Rand(0, 50, true); player.s.AlphaSlider2 = Rand(0, 100, true); setClickableState('s', player.s.BetaClickable, true); player.s.time = Rand(45,450,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 2){player.s.AlphaSlider2 = Rand(0, 100, true); player.s.AlphaSlider1 = Rand(0, 50, true); setClickableState('s', player.s.BetaClickable, true); player.s.time = Rand(45,450,true); player.s.AlphaDecider = Rand(0,2,true)}
            else (player.s.AlphaDecider = Rand(0,2,true), player.s.time=45, console.log("Something went wrong with player.s.AlphaDecider but it should be fixed now. if you see this again soon then uh, yeah i cant help you."))
        } else if (player.s.Overclock == 1){
            if (player.s.AlphaDecider == 0){setClickableState('s', player.s.BetaClickable, true); player.s.time = Rand(45,450,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 1){player.s.AlphaSlider1 = Rand(0, 50, true); player.s.time = Rand(45,450,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 2){player.s.AlphaSlider2 = Rand(0, 100, true); player.s.time = Rand(45,450,true); player.s.AlphaDecider = Rand(0,2,true)}
            else (player.s.AlphaDecider = Rand(0,2,true), player.s.time=45, console.log("Something went wrong with player.s.AlphaDecider but it should be fixed now. if you see this again soon then uh, yeah i cant help you."))
        } else if (player.s.Overclock == 2){
            if (player.s.AlphaDecider == 0){setClickableState('s', player.s.BetaClickable, true); player.s.AlphaSlider1 = Rand(0, 50, true); player.s.time = Rand(15,150,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 1){player.s.AlphaSlider1 = Rand(0, 50, true); player.s.AlphaSlider2 = Rand(0, 100, true); player.s.time = Rand(15,150,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 2){player.s.AlphaSlider2 = Rand(0, 100, true); player.s.AlphaSlider1 = Rand(0, 50, true); player.s.time = Rand(15,150,true); player.s.AlphaDecider = Rand(0,2,true)}
            else (player.s.AlphaDecider = Rand(0,2,true), player.s.time=15, console.log("Something went wrong with player.s.AlphaDecider but it should be fixed now. if you see this again soon then uh, yeah i cant help you."))
        } else if (player.s.Overclock == 3){
            if (player.s.AlphaDecider == 0){setClickableState('s', player.s.BetaClickable, true); player.s.AlphaSlider1 = Rand(0, 50, true); player.s.AlphaSlider2 = Rand(0, 100, true); player.s.time = Rand(5,50,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 1){player.s.AlphaSlider1 = Rand(0, 50, true); player.s.AlphaSlider2 = Rand(0, 100, true); setClickableState('s', player.s.BetaClickable, true); player.s.time = Rand(5,50,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 2){player.s.AlphaSlider2 = Rand(0, 100, true); player.s.AlphaSlider1 = Rand(0, 50, true); setClickableState('s', player.s.BetaClickable, true); player.s.time = Rand(5,50,true); player.s.AlphaDecider = Rand(0,2,true)}
            else (player.s.AlphaDecider = Rand(0,2,true), player.s.time=5, console.log("Something went wrong with player.s.AlphaDecider but it should be fixed now. if you see this again soon then uh, yeah i cant help you."))
        } else if (player.s.Overclock == 4){
            if (player.s.AlphaDecider == 0){setClickableState('s', player.s.BetaClickable, true); player.s.AlphaSlider1 = Rand(0, 50, true); player.s.AlphaSlider2 = Rand(0, 100, true); player.s.time = Rand(2.5,25,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 1){player.s.AlphaSlider1 = Rand(0, 50, true); player.s.AlphaSlider2 = Rand(0, 100, true); setClickableState('s', player.s.BetaClickable, true); player.s.time = Rand(2.5,25,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 2){player.s.AlphaSlider2 = Rand(0, 100, true); player.s.AlphaSlider1 = Rand(0, 50, true); setClickableState('s', player.s.BetaClickable, true); player.s.time = Rand(2.5,25,true); player.s.AlphaDecider = Rand(0,2,true)}
            else (player.s.AlphaDecider = Rand(0,2,true), player.s.time=2.5, console.log("Something went wrong with player.s.AlphaDecider but it should be fixed now. if you see this again soon then uh, yeah i cant help you."))
        } else if (player.s.Overclock == 5){
            if (player.s.AlphaDecider == 0){setClickableState('s', player.s.BetaClickable, true); player.s.AlphaSlider1 = Rand(0, 50, true); player.s.AlphaSlider2 = Rand(0, 100, true); player.s.time = Rand(1,10,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 1){player.s.AlphaSlider1 = Rand(0, 50, true); player.s.AlphaSlider2 = Rand(0, 100, true); setClickableState('s', player.s.BetaClickable, true); player.s.time = Rand(1,10,true); player.s.AlphaDecider = Rand(0,2,true)}
            else if (player.s.AlphaDecider == 2){player.s.AlphaSlider2 = Rand(0, 100, true); player.s.AlphaSlider1 = Rand(0, 50, true); setClickableState('s', player.s.BetaClickable, true); player.s.time = Rand(1,10,true); player.s.AlphaDecider = Rand(0,2,true)}
            else (player.s.AlphaDecider = Rand(0,2,true), player.s.time=1, console.log("Something went wrong with player.s.AlphaDecider but it should be fixed now. if you see this again soon then uh, yeah i cant help you."))
        }
        
        if ((player.s.AlphaClickable == 0)){player.s.BetaClickable = 11; player.s.AlphaClickable = Rand(0,3,true)}
        else if ((player.s.AlphaClickable == 1)){player.s.BetaClickable = 12; player.s.AlphaClickable = Rand(0,3,true)}
        else if ((player.s.AlphaClickable == 2)){player.s.BetaClickable = 21; player.s.AlphaClickable = Rand(0,3,true)}
        else if ((player.s.AlphaClickable == 3)){player.s.BetaClickable = 22; player.s.AlphaClickable = Rand(0,3,true)}
    },
    hotkeys: [
        {
            key: "s", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "S: Consume Watts and Power some Systems", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.s.unlocked) doReset("s") },
            unlocked() {return player.s.unlocked || hasUpgrade('lf', 23)} // Determines if you can use the hotkey, optional
        }
    ],
    doReset(resettingLayer) {
        let keep = ["time","SliderOne","SliderTwo","AlphaSlider1","AlphaSlider2","AlphaDecider","AlphaClickable","BetaClickable","Overclock"];
        let keptUpgrades = [];
        if (layers[resettingLayer].layer == 'lf' || layers[resettingLayer].layer == 'l' || layers[resettingLayer].layer == 'w') { 
            if (hasUpgrade('s', 25)) keptUpgrades.push(25)
            if (hasUpgrade('s', 33)) keptUpgrades.push(33)
            if (hasUpgrade('s', 35)) keptUpgrades.push(35)
            if (hasUpgrade('s', 42)) keptUpgrades.push(42)
            if (hasUpgrade('s', 45)) keptUpgrades.push(45)
            layerDataReset(this.layer, keep);
            player[this.layer].upgrades.push(...keptUpgrades)
        }
        else if (layers[resettingLayer].row > this.row) {
            layerDataReset(this.layer, keep);
        }
        //anything u place here is for keeping specific things, like if(hasUpgrade('x',99))player.y.upgrades.push(11) if that makes sense
    },
    color: "#7D7D7D",
    branches: "",
    requires: new Decimal('5e5'), // Can be a function that takes requirement increases into account
    resource: "Systems", // Name of prestige currency
    baseResource: "Watts", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        // Prestige Upgrade
        // Blank
        // Power Upgrades
        // Blank
        // System Upgrades
        if (hasUpgrade('s', 21)) mult = mult.times('2')
        if (hasUpgrade('s', 23)) mult = mult.times('4')
        if (hasUpgrade('s', 24)) mult = mult.times('10')
        if (hasUpgrade('s', 34)) mult = mult.times(upgradeEffect('s', 34))
        if (hasUpgrade('s', 44)) mult = mult.times(upgradeEffect('s', 44))
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
    gainBoost() {
        const SliderDiff1 = Math.abs((player.s.AlphaSlider1)-(player.s.SliderOne))
        const SliderDiff2 = Math.abs((player.s.AlphaSlider2)-(player.s.SliderTwo))
        const a = getClickableState(this.layer, 11) ? 0 : 1
        const b = getClickableState(this.layer, 12) ? 0 : 1
        const c = getClickableState(this.layer, 21) ? 0 : 1
        const d = getClickableState(this.layer, 22) ? 0 : 1

        let e; 
        if (SliderDiff1==0){e=2}
        else if (SliderDiff1<=5){e=1.5}
        else (e = 1)

        let f; 
        if (SliderDiff2==0){f=2}
        else if (SliderDiff2<=5){f=1.5}
        else (f = 1)

        let g; 
        if (hasUpgrade('s', 35)){g=25}
        else if (hasUpgrade('lf', 31)){g=5}
        else (g=1)

        let x;
        if (player.s.Overclock == 0){x=0}
        else if (player.s.Overclock != 0){x=new Decimal(player.s.Overclock).pow(2)}
        else (x=0, console.log("put, that, variable, BACK. to a NORMAL VALUE for this VARIABLE. till then, enjoy no layer fragment boosts. one is a good choice."))

        let Boost = ((((a*2)+(b*2)+(c*2)+(d*2))**(e*f))*g)*x
        return Math.max(Boost, 1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    displayRow: 2,
    layerShown(){return player.s.unlocked || hasUpgrade('lf', 23)},
    infoboxes: {
        SYSTEM: {
            title: "SYSTEM BOOTUP DETECTED",
            body() { return "KEEP THE SYSTEM RUNNING FOR A VARYING BOOST TO YOUR LAYER FRAGMENTS THE SYSTEM WILL BECOME UNSTABLE OVER TIME AS CERTAIN ASPECTS BREAK SOLVE THESE ISSUES WITH THE FOUR GIVEN CLICKABLES AND THE TWO SLIDERS. LATER YOU CAN OVERCLOCK YOUR SYSTEM AS WELL."
            },
        },
        OVERCLOCKED: {
            title: "INCREASED TIMER SPEEDS",
            body() { return "OVERCLOCKING HAS BEEN ENABLED THE ABOVE SLIDER CONTROLS HOW INTENSE IT IS THE HIGHER THE OVERCLOCK THE FASTER AND MORE THINGS BREAK, BUT IN RETURN YOU GET A BOOST TO THE MULTIPLIER EQUAL TO THE SQUARE OF THE MULTIPLIER. OR ALTERNATIVELY YOU COULD DISABLE THE HARDWARE WHICH WILL DISABLE THE BOOST BUT ALSO STOPS ISSUES FROM ARISING."
            },
        },
        ETERNITY: {
            title: ". . .",
            body() { return "AN ERROR HAS OCCURED, PLEASE REPORT THE FOLLOWING CODE TO THE SYSTEM ADMINISTRATOR: '313RN1T7'"
            },
        },
        TREADED: {
            title: "313RN1T7",
            body() { return "IS THIS PATH WORTH WHILE? THE WAY YOU ARE GOING HAS ALREADY BEEN TREAD THOUSANDS OF TIMES BEFORE. BUT THEN AGAIN, WHAT ELSE IS THERE TO DO BUT GO HIGHER?"
            },
        },
    },
    clickables: {
        11: {
            title: "DEBUG",
            display(){if (getClickableState('s', 11) == true) return 'REGISTRY CORRUPTION DETECTED.'; else return 'SYSTEM FUNCTIONING AS USUAL.'},
            canClick(){if (getClickableState('s', 11) == true) return true; else return false},
            onClick(){setClickableState('s', 11, false)}
        },
        12: {
            title: "OVERRIDE",
            display(){if (getClickableState('s', 12) == true) return 'SYSTEM INFILTRATION DETECTED.'; else return 'SYSTEM FUNCTIONING AS USUAL.'},
            canClick(){if (getClickableState('s', 12) == true) return true; else return false},
            onClick(){setClickableState('s', 12, false)}
        },
        21: {
            title: "SCAN",
            display(){if (getClickableState('s', 21) == true) return 'POSSIBLE VIRUSES DETECTED.'; else return 'SYSTEM FUNCTIONING AS USUAL.'},
            canClick(){if (getClickableState('s', 21) == true) return true; else return false},
            onClick(){setClickableState('s', 21, false)}
        },
        22: {
            title: "RESTART",
            display(){if (getClickableState('s', 22) == true) return 'NEW SYSTEM UPDATE DETECTED.'; else return 'SYSTEM FUNCTIONING AS USUAL.'},
            canClick(){if (getClickableState('s', 22) == true) return true; else return false},
            onClick(){setClickableState('s', 22, false)}
        }
    },
    upgrades: {
        99: {
            title: "placeholder",
            description: "placeholder",
            unlocked() {return false},
            cost: new Decimal('1e100'),
        },
        11: {
            title: "Power ON",
            description: "10x Watts",
            cost: new Decimal('1'),
        },
        12: {
            title: "Diagnostics CHECK",
            description: "50x Prestige Points",
            cost: new Decimal('5'),
        },
        13: {
            title: "Debug Mode ON",
            description: "25x Layer Points",
            cost: new Decimal('10'),
        },
        14: {
            title: "Viruses NONE",
            description: "^1.35 Points",
            cost: new Decimal('20'),
        },
        15: {
            title: "ALL SYSTEMS GREEN",
            description: "Intiate the Systems Minigame",
            cost: new Decimal('35'),
        },
        21: {
            title: "System Overdrive",
            description: "2x Systems",
            cost: new Decimal('125'),
        },
        22: {
            title: "Optimizations",
            description: "5x Watts",
            cost: new Decimal('275'),
        },
        23: {
            title: "New Processor",
            description: "4x Systems",
            cost: new Decimal('525'),
        },
        24: {
            title: "Maximum Output",
            description: "10x Systems",
            cost: new Decimal('1000'),
        },
        25: {
            title: "/:Generate\n"+"Fragments",
            description: "Boost your Currency Gains and unlock new upgrades in Layer Fragments.",
            cost: new Decimal('2500'),
            tooltip: "Incase the name of the upgrade wasn't obvious, which the way this is worded, yeah it could be confusing, this upgrade boosts your Fragments in FRAGMENTED. a 10x boost.",
        },
        31: {
            title: "Neural Net",
            description: "Systems now boost Prestige Points.",
            unlocked() {if (hasUpgrade('p', 45)) return true; else return false},
            cost: new Decimal('1e7'),
            effect() {
                let effect = player.s.points.add(1).pow(0.5).min(1e9)
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return (effect)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            tooltip: "The Max for this upgrade is 1e9."
        },
        32: {
            title: "Coolant Loop",
            description: "Maximum Overclock increased.",
            unlocked() {if (hasUpgrade('p', 45)) return true; else return false},
            cost: new Decimal('1e10'),
        },
        33: {
            title: "Tricky Situation",
            description: "LF Awaits you.",
            unlocked() {if (hasUpgrade('p', 45)) return true; else return false},
            cost: new Decimal('1e11'),
        },
        34: {
            title: "Superconductor",
            description: "System and Watts gain is increased by their combined total, tenth rooted.",
            unlocked() {if (hasUpgrade('p', 45)) return true; else return false},
            cost: new Decimal('5e12'),
            effect() {
                let effect = player.w.points.add(player.s.points).pow(0.1).min('1e7')
                if (hasUpgrade('s', 41)) effect = effect.times('100')
                if (hasUpgrade('s', 42)) effect = effect.times('100')
                return (effect)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            tooltip: "<h4>if theres SOMEHOW any confusion here, player.w.points .add(player.s.points) .pow(0.1) hopefully this clears it up! oh also, .min('1e7') which basically just takes the smaller value between 10 million and the calculated value.</h4>"
        },
        35: {
            title: "ETERNITY",
            description: "Remove the illusion of freewill.",
            unlocked() {if (hasUpgrade('p', 45)) return true; else return false},
            cost: new Decimal('2.5e17'),
            tooltip: "Overclocking is now permanently enabled to x100, without the... decaying time factor.",
        },
        41: {
            title: "SYSTEM ERROR",
            description: "SUPERCONDUCTOR EFFECT INCREASED HUNDREDFOLD",
            unlocked() {if (hasUpgrade('lf', 43)) return true; else return false},
            cost: new Decimal('1e18'),
        },
        42: {
            title: "A FATAL ERROR HAS OCCURED",
            description: "PRIOR UPGRADE APPLIED AGAIN, TO ALL PREVIOUS EFFECT UPGRADES.",
            unlocked() {if (hasUpgrade('lf', 43)) return true; else return false},
            cost: new Decimal('1e20'),
            tooltip: "DUE TO THE NATURE OF THIS UPGRADE, THIS WILL BE KEPT ON LF RESET",
        },
        43: {
            title: "313RN1T7",
            description: ". . . ^1.5 Watts",
            unlocked() {if (hasUpgrade('lf', 43)) return true; else return false},
            cost: new Decimal('1e33'),
            tooltip: "Another Infobox. and... something else somewhere... not yet, you'll reach it... later."
        },
        44: {
            title: "Infinite Loop",
            description: "Systems boost themselves.",
            unlocked() {if (hasUpgrade('lf', 43)) return true; else return false},
            cost: new Decimal('5e44'),
            effect() {
                let effect = player.s.points.pow(0.2).min('1e18')
                return effect
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            tooltip: "This is a Fifth Root, and the max is one quintillion."
        },
        45: {
            title: "Half a Piece",
            description: "Get the other. Expand what should.",
            unlocked() {if (hasUpgrade('lf', 43)) return true; else return false},
            cost: new Decimal('1e55'),
            tooltip: "This Upgrade also boosts Layer Fragments by 50"
        },
},
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "upgrades"],
            unlocked(){if (hasUpgrade('s', 15)) return true; else return false}
        },
        "SYSTEM:BOOT": {
            content: [
                ["infobox", "SYSTEM"],
                ["display-text",
                    function(){if ([11,12,21,22].every(id => getClickableState('s', id) == false)) return '<h2>SYSTEMS GREEN.</h2>'; else return '<h2>WARNING SYSTEM INSTABILITY DETECTED</h2>'}],
                ["display-text",
                    function(){if (player.s.SliderOne == player.s.AlphaSlider1 && player.s.SliderTwo == player.s.AlphaSlider2) return '<h2>PIPE SYSTEMS FUNCTIONAL.</h2>'; else return '<h2>WARNING PIPE STABILITY FAILING</h2>'}],
                "blank",
                ["display-text",function() {return "SYSTEM MODIFIER: x" + tmp[this.layer].gainBoost}],
                "blank",
                ["row", ["clickables",
                        "blank", "blank", "blank",
                        ["vert-slider", ["SliderOne", 0, 50]],
                        "blank", "blank", "blank",
                        ["vert-slider", ["SliderTwo", 0, 100]]]],
                "blank",
                "blank",
                ["display-text",
                    function(){if (hasUpgrade('lf',33) && player.s.Overclock >=2) return ("OVERCLOCKING ENABLED AT " + formatWhole(player.s.Overclock) + "x POWER!")
                        else if (hasUpgrade('lf',33) && player.s.Overclock == 1) return "NORMAL HARDWARE SPEEDS."
                        else if (hasUpgrade('lf',33) && player.s.Overclock == 0) return "HARDWARE DISABLED"
                    }
                ],
                "blank",
                function(){if (hasUpgrade('lf',33) && !hasUpgrade('s', 35)){return ["slider", ["Overclock", 0, player.s.MaxClock]]}},
                "blank",
                function(){if (hasUpgrade('lf',33)){return ["infobox", "OVERCLOCKED"]}},
                function(){if (hasUpgrade('s',35)){return ["infobox", "ETERNITY"]}},
                function(){if (hasUpgrade('s',43)){return ["infobox", "TREADED"]}}
            ],
            unlocked(){if (hasUpgrade('s', 15)) return true; else return false}
        }
}})