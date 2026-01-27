// ==========================
// SPIELDATEN
// ==========================

const goods = {
    Getreide: { base: 5, type: "basic" },
    Fisch: { base: 6, type: "basic" },
    Holz: { base: 7, type: "basic" },
    Stoffe: { base: 13, type: "processed" },
    Werkzeuge: { base: 15, type: "processed" },
    Wein: { base: 26, type: "luxury" },
    Gewürze: { base: 34, type: "luxury" },
    Schmuck: { base: 45, type: "luxury" }
};

const city = {
    name: "Startstadt",
    population: 6000,
    marketModifier: {
        Getreide: 0.95,
        Fisch: 1.0,
        Holz: 1.0,
        Stoffe: 1.1,
        Werkzeuge: 1.1,
        Wein: 1.2,
        Gewürze: 1.25,
        Schmuck: 1.3
    }
};

const player = {
    gold: 100,
    reputation: 0,
    ship: {
        capacity: 12,
        cargo: {}
    }
};

// ==========================
// PREISBERECHNUNG
// ==========================

function demandFactor(type, population) {
    if (type === "basic") {
        return population < 5000 ? 0.95 : population < 15000 ? 1.0 : 1.1;
    }
    if (type === "processed") {
        return population < 5000 ? 0.9 : population < 15000 ? 1.1 : 1.25;
    }
    if (type === "luxury") {
        return population < 5000 ? 0.8 : population < 15000 ? 1.3 : 1.6;
    }
    return 1;
}

function randomFactor() {
    return 0.9 + Math.random() * 0.2;
}

function getPrice(good, mode) {
    const data = goods[good];
    let price =
        data.base *
        city.marketModifier[good] *
        demandFactor(data.type, city.population) *
        randomFactor();

    if (mode === "sell") price *= 1.15;
    return Math.round(price);
}

// ==========================
// HANDEL
// ==========================

function buy(good) {
    const price = getPrice(good, "buy");
    const load = Object.values(player.ship.cargo).reduce((a, b) => a + b, 0);

    if (player.gold >= price && load < player.ship.capacity) {
        player.gold -= price;
        player.ship.cargo[good] = (player.ship.cargo[good] || 0) + 1;
        render();
    }
}

function sell(good) {
    if (player.ship.cargo[good] > 0) {
        const price = getPrice(good, "sell");
        player.ship.cargo[good]--;
        if (player.ship.cargo[good] === 0) delete player.ship.cargo[good];
        player.gold += price;
        player.reputation += goods[good].type === "luxury" ? 3 : goods[good].type === "processed" ? 2 : 1;
        render();
    }
}

// ==========================
// RENDER
// ==========================

function render() {
    document.getElementById("cityName").textContent = city.name;
    document.getElementById("population").textContent = city.population;
    document.getElementById("gold").textContent = player.gold;
    document.getElementById("reputation").textContent = player.reputation;

    const cargo = document.getElementById("cargo");
    cargo.innerHTML = "";
    for (let good in player.ship.cargo) {
        const li = document.createElement("li");
        li.textContent = `${good}: ${player.ship.cargo[good]}`;
        cargo.appendChild(li);
    }

    const market = document.getElementById("market");
    market.innerHTML = "";
    for (let good in goods) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${good}</td>
            <td>${getPrice(good, "buy")}</td>
            <td>${getPrice(good, "sell")}</td>
            <td>
                <button onclick="buy('${good}')">Kaufen</button>
                <button onclick="sell('${good}')">Verkaufen</button>
            </td>
        `;
        market.appendChild(tr);
    }
}

render();