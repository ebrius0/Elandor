// =======================
// GRUNDSTRUKTUR
// =======================

const views = ["map", "cities", "ships"];

function openView(name) {
    views.forEach(v => {
        document.getElementById(`view-${v}`).classList.add("hidden");
    });
    document.getElementById(`view-${name}`).classList.remove("hidden");
}

function backToMenu() {
    views.forEach(v => {
        document.getElementById(`view-${v}`).classList.add("hidden");
    });
}

// =======================
// STADT
// =======================

const city = {
    name: "Startstadt",
    population: 6000
};

function cityAction(action) {
    const output = document.getElementById("cityOutput");

    switch (action) {
        case "kontor":
            output.innerHTML = "<h3>Kontor</h3><p>Hier kannst du Waren lagern (noch nicht implementiert).</p>";
            break;
        case "tavern":
            output.innerHTML = "<h3>Taverne</h3><p>Gerüchte, Kontakte und Ruf (später).</p>";
            break;
        case "council":
            output.innerHTML = "<h3>Ratshaus</h3><p>Politische Entscheidungen & Einfluss (später).</p>";
            break;
        case "build":
            output.innerHTML = "<h3>Gebäude bauen</h3><p>Wohnhäuser, Produktion & Politik (später).</p>";
            break;
        case "market":
            output.innerHTML = "<h3>Markt</h3><p>Handelssystem (kommt als nächster Schritt).</p>";
            break;
    }
}

// =======================
// SCHIFFE
// =======================

const ships = [
    {
        id: 1,
        name: "Seemöwe",
        location: "Startstadt",
        destination: "Hafenstadt",
        timeRemaining: 4,
        cargo: {
            Getreide: 5,
            Wein: 2
        }
    },
    {
        id: 2,
        name: "Nordwind",
        location: "Hafenstadt",
        destination: null,
        timeRemaining: 0,
        cargo: {
            Fisch: 6
        }
    }
];

function renderShips() {
    const list = document.getElementById("shipList");
    list.innerHTML = "";

    ships.forEach(ship => {
        const div = document.createElement("div");
        div.className = "shipCard";

        let cargoText = Object.keys(ship.cargo).length === 0
            ? "Leer"
            : Object.entries(ship.cargo).map(([g, a]) => `${g}: ${a}`).join(", ");

        div.innerHTML = `
            <h3>${ship.name}</h3>
            <p><strong>Standort:</strong> ${ship.location}</p>
            <p><strong>Ziel:</strong> ${ship.destination ?? "—"}</p>
            <p><strong>Restzeit:</strong> ${ship.timeRemaining > 0 ? ship.timeRemaining + " Min" : "Bereit"}</p>
            <p><strong>Ladung:</strong> ${cargoText}</p>
        `;

        list.appendChild(div);
    });
}

renderShips();