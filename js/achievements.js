addLayer("a", {
    name: "Achievements",
    symbol: "A",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0)
    }},
    color: "#F1E41E",
    resource: "Achievements",
    row: 'side',
    layerShown(){return true},
    achievements: {
        rows: 3,
        cols: 5,
        11: {
            name: "Prestige!",
            done() {
                return (hasUpgrade('p', 11))
            },
            tooltip: "Get the first Prestige Upgrade.",
            onComplete() {
                addPoints('a', 1)
            },
        },
        12: {
            name: "what",
            done() {
                return player.l.unlocked
            },
            tooltip: "what",
            doneTooltip: "Unlock the Layers Layer..?",
            onComplete() {
                addPoints('a', 1)
            },
        },
        13: {
            name: "Layers upon Layers.",
            done() {
                return (hasUpgrade('l', 21))
            },
            tooltip: "Unlock another Layer from ???'s. This is getting more confusing to say every second...",
            doneTooltip: "Unlock another Layer from Layers. This is getting more confusing to say every second...",
            onComplete() {
                addPoints('a', 1)
            },
        },
        14: {
            name: "OH NO THE INFLATION!",
            done() {
                return (hasUpgrade('p', 14))
            },
            tooltip: "Purchase the Fourth Prestige upgrade in the First Row. Reward: 2.5x ??? Points",
            doneTooltip: "Purchase the Fourth Prestige upgrade in the First Row. Reward: 2.5x Layer Points",
            onComplete() {
                addPoints('a', 1)
            },
        },
        15: {
            name: "Slowing Down, Finally",
            done() {
                return (hasUpgrade('lf', 13))
            },
            tooltip: "Third ??? Upgrade, Inflation is slowing down.",
            doneTooltip: "Third Layer Fragments Upgrade, Inflation is slowing down.",
            onComplete() {
                addPoints('a', 1)
            },
        },
        21: {
            name: "The heck is this?",
            done() {
                return player.w.points.gte(1)
            },
            tooltip: "We aren't powering ANYTHING are we? Moreover, WHERE ARE WE GETTING THIS POWER???",
            onComplete() {
                addPoints('a', 1)
            },
        },
        22: {
            name: "Lossless Resets",
            done() {
                return (hasUpgrade('lf', 14))
            },
            tooltip: "Never lose ??? Upgrades on any current resets",
            doneTooltip: "Never lose Watt upgrades. You will still lose the first layer of Prestige Upgrades on LF reset though.",
            onComplete() {
                addPoints('a', 1)
            },
        },
        23: {
            name: "oh dear.",
            done() {
                return (hasUpgrade('w', 25))
            },
            tooltip: "the ???'s are boosting EVERYTHING, now... :fearful:",
            doneTooltip: "the watts are mboosting EVERYTHING, now... :fearful:",
            onComplete() {
                addPoints('a', 1)
            },
        },
        24: {
            name: "Further Fragmentation",
            done() {
                return (hasUpgrade('lf', 21))
            },
            tooltip: "This... Doesn't even make Sense? Reward: 2x ???'s",
            doneTooltip: "This... Doesn't even make Sense? Reward: 2x Watts",
            onComplete() {
                addPoints('a', 1)
            },
        },
        25: {
            name: "Buttons :)",
            done() {
                return (hasUpgrade('s', 15))
            },
            tooltip: "ok but seriously, what do these buttons do? Reward: 5x ???'s",
            doneTooltip: "ok but seriously, what do these buttons do? Reward: 5x Watts",
            onComplete() {
                addPoints('a', 1)
            },
        },
        31: {
            name: "wha- MORE?!",
            done() {
                return (hasUpgrade('s', 25))
            },
            tooltip: "are we serious?!",
            doneTooltip: "More... Layer Fragment Upgrades... This layer is SO annoying...",
            onComplete() {
                addPoints('a', 1)
            },
        },
        32: {
            name: "THE LAYERS ARE EXPANDING",
            done() {
                return (hasUpgrade('lf', 35))
            },
            tooltip: "NOOOO",
            doneTooltip: "WHY DOES THIS KEEP HAPPENING WE CANT KEEP GETTING AWAY WITH THIS",
            onComplete() {
                addPoints('a', 1)
            },
        },
        33: {
            name: "FURTHERING INTO A SPLIT.",
            done() {
                return (hasUpgrade('p', 45))
            },
            tooltip: "FARTHER, FASTER.",
            doneTooltip: "GO. FARTHER. DO IT. FASTER.",
            onComplete() {
                addPoints('a', 1)
            },
        },
        34: {
            name: "Forgotten? No no no. Its been waiting.",
            done() {
                return (hasUpgrade('lf', 45) && hasUpgrade('s', 45) && hasUpgrade('l', 31))
            },
            tooltip: "It Awaits.",
            doneTooltip: "Its Been Waiting for a Long Time.",
            onComplete() {
                addPoints('a', 1)
            },
        },
        36: {
            name: "Approaching a End.",
            done() {
                return (player.points.gte(new Decimal('1e100')))
            },
            tooltip: "Is it worth it?",
            doneTooltip: "Something tells you this path you are down has already been tread.",
            onComplete() {
                addPoints('a', 1)
            },
        },
    }
})