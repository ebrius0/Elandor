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
    discoveredCities: ["Eichenhafen", "Salzbruck", "Goldfurt"]
};

// ======================
// STÄDTE
// ======================
const cities = {
    Eichenhafen: {
        population: 6000,
        neighbors: ["Salzbruck", "Goldfurt"]
    },
    Salzbruck: {
        population: 5000,
        neighbors: ["Eichenhafen"]
    },
    Goldfurt: {
        population: 8000,
        neighbors: ["Eichenhafen"]
    },
    Fernstadt: {
        population: 14000,
        neighbors: []
    }
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
            <button onclick="openCity('${name}')">Stadt betreten</button>
        `;
        list.appendChild(div);
    });
}

function openCity(name) {
    const actions = document.getElementById("cityActions");
    actions.classList.remove("hidden");
    actions.innerHTML = `
        <h3>${name}</h3>
        <div class="menu vertical">
            <button>🧺 Markt</button>
            <button>🏗️ Kontor</button>
            <button>🍺 Taverne</button>
            <button>🏛️ Ratshaus</button>
            <button>🛠️ Werft</button>
            <button>🧱 Gebäude bauen</button>
        </div>
    `;
}

// ======================
// SCHIFFE
// ======================
const ships = [
    {
        id: 1,
        name: "Seemöwe",
        location: "Eichenhafen",
        destination: null,
        arrivalTime: null,
        damage: 0,
        cargo: { Getreide: 4 }
    }
];

function sendShip(shipId, destination) {
    const ship = ships.find(s => s.id === shipId);
    const travelTime = 2 * 60 * 1000;
    ship.destination = destination;
    ship.arrivalTime = Date.now() + travelTime;
}

function explorationTrip(shipId) {
    const ship = ships.find(s => s.id === shipId);
    ship.destination = "Unbekannte Gewässer";
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
            const remaining = ship.arrivalTime - Date.now();
            if (remaining > 0) {
                status = `Unterwegs (${Math.ceil(remaining / 1000)}s)`;
            } else {
                ship.location = ship.destination;
                ship.destination = null;
                ship.arrivalTime = null;
            }
        }

        const div = document.createElement("div");
        div.className = "shipCard";
        div.innerHTML = `
            <h3>${ship.name}</h3>
            <p>Ort: ${ship.location}</p>
            <p>Status: ${status}</p>
            <p>Schaden: ${ship.damage}%</p>
            <div class="menu vertical">
                <button onclick="sendShip(${ship.id}, 'Salzbruck')">Nach Salzbruck</button>
                <button onclick="sendShip(${ship.id}, 'Goldfurt')">Nach Goldfurt</button>
                <button onclick="explorationTrip(${ship.id})">🧭 Erkundungsfahrt</button>
            </div>
        `;
        list.appendChild(div);
    });
}

setInterval(renderShips, 1000);