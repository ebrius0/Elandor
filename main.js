// ======================
// VIEWS
// ======================
const views = ["map", "cities", "ships"];
function openView(v) {
    views.forEach(x => document.getElementById(`view-${x}`).classList.add("hidden"));
    document.getElementById(`view-${v}`).classList.remove("hidden");
    if (v === "cities") renderCities();
    if (v === "ships") renderShips();
}
function backToMenu() {
    views.forEach(x => document.getElementById(`view-${x}`).classList.add("hidden"));
}

// ======================
// SPIELER
// ======================
const player = {
    gold: 120,
    reputation: 0,
    discoveredCities: ["Startstadt", "Hafenstadt", "Marktstadt"]
};

// ======================
// STÄDTE
// ======================
const cities = {
    Startstadt: { population: 6000, neighbors: ["Hafenstadt", "Marktstadt"] },
    Hafenstadt: { population: 5000, neighbors: ["Startstadt"] },
    Marktstadt: { population: 7000, neighbors: ["Startstadt"] },
    Fernstadt: { population: 12000, neighbors: [] } // noch unbekannt
};

function renderCities() {
    const list = document.getElementById("cityList");
    const actions = document.getElementById("cityActions");
    list.innerHTML = "";
    actions.classList.add("hidden");

    player.discoveredCities.forEach(name => {
        const div = document.createElement("div");
        div.className = "cityCard";
        div.innerHTML = `
            <h3>${name}</h3>
            <p>Einwohner: ${cities[name].population}</p>
            <button onclick="openCity('${name}')">Betreten</button>
        `;
        list.appendChild(div);
    });
}

function openCity(name) {
    const actions = document.getElementById("cityActions");
    actions.classList.remove("hidden");
    actions.innerHTML = `
        <h3>${name}</h3>
        <button onclick="alert('Kontor (kommt)')">Kontor</button>
        <button onclick="alert('Taverne (kommt)')">Taverne</button>
        <button onclick="alert('Ratshaus (kommt)')">Ratshaus</button>
        <button onclick="alert('Werft: Repariert Schiffe')">Werft</button>
        <button onclick="alert('Gebäude bauen (kommt)')">Gebäude bauen</button>
    `;
}

// ======================
// SCHIFFE
// ======================
const ships = [
    {
        id: 1,
        name: "Seemöwe",
        location: "Startstadt",
        destination: null,
        arrivalTime: null,
        damage: 0,
        cargo: { Getreide: 4 }
    }
];

function sendShip(shipId, destination) {
    const ship = ships.find(s => s.id === shipId);
    const travelTime = 2 * 60 * 1000; // 2 Minuten
    ship.destination = destination;
    ship.arrivalTime = Date.now() + travelTime;
}

function explorationTrip(shipId) {
    const ship = ships.find(s => s.id === shipId);
    ship.destination = "Unbekannt";
    ship.arrivalTime = Date.now() + 3 * 60 * 1000;

    setTimeout(() => {
        if (Math.random() < 0.5 && !player.discoveredCities.includes("Fernstadt")) {
            player.discoveredCities.push("Fernstadt");
            alert("Du hast eine neue Stadt entdeckt!");
        }
        if (Math.random() < 0.4) {
            ship.damage += 20;
            alert("Dein Schiff wurde beschädigt!");
        }
    }, 3000);
}

function renderShips() {
    const list = document.getElementById("shipList");
    list.innerHTML = "";

    ships.forEach(ship => {
        let status = "Bereit";
        if (ship.arrivalTime) {
            const remaining = Math.max(0, ship.arrivalTime - Date.now());
            if (remaining > 0) {
                status = `Unterwegs (${Math.ceil(remaining / 1000)}s)`;
            } else {
                ship.location = ship.destination;
                ship.destination = null;
                ship.arrivalTime = null;
                status = "Angekommen";
            }
        }

        const div = document.createElement("div");
        div.className = "shipCard";
        div.innerHTML = `
            <h3>${ship.name}</h3>
            <p>Ort: ${ship.location}</p>
            <p>Status: ${status}</p>
            <p>Schaden: ${ship.damage}%</p>
            <button onclick="sendShip(${ship.id}, 'Hafenstadt')">Nach Hafenstadt</button>
            <button onclick="sendShip(${ship.id}, 'Marktstadt')">Nach Marktstadt</button>
            <button onclick="explorationTrip(${ship.id})">Erkundungsfahrt</button>
        `;
        list.appendChild(div);
    });
}

setInterval(renderShips, 1000);