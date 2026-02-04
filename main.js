/**
 * ELANDOR - Core Logic (MVP)
 * Architektur: State-Driven, Mobile-First
 */

// --- 1. CONFIGURATION ---
const CITIES = {
    havenport: { name: "Havenport", danger: 0, rep: 0, desc: "Sicherer Hafen für Neulinge." },
    bruchfels: { name: "Bruchfels", danger: 5, rep: 0, desc: "Ort der großen Werften." },
    goldstrom: { name: "Goldstrom", danger: 10, rep: 0, desc: "Handelszentrum des Ostens." },
    sturmwacht: { name: "Sturmwacht", danger: 25, rep: 0, desc: "Gepeitscht von ewigen Stürmen." },
    sonnenhafen: { name: "Sonnenhafen", danger: 15, rep: 0, desc: "Hafen der Gerüchte und Diebe." },
    nebelruh: { name: "Nebelruh", danger: 30, rep: 0, desc: "Hier herrscht das Chaos." },
    eisenmark: { name: "Eisenmark", danger: 5, rep: 0, desc: "Bollwerk der Sicherheit." },
    kronstadt: { name: "Kronstadt", danger: 10, rep: 0, desc: "Zentrum der Weltpolitik." }
};

const BASE_TRAVEL_TIME = 30; // Sekunden für MVP

// --- 2. GAME STATE ---
let state = {
    gold: 500,
    globalRep: 0,
    inventory: [],
    ships: [
        { id: 1, name: "Abendstern", location: "havenport", status: "docked", travelTimer: 0, target: null },
        { id: 2, name: "Wellenbrecher", location: "bruchfels", status: "docked", travelTimer: 0, target: null }
    ],
    logs: ["Willkommen in Elandor, Kapitän. Deine Flotte erwartet Befehle."],
    currentCity: "havenport"
};

// --- 3. UI CONTROLLER ---
const ui = {
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        
        // Refresh-Logik beim Tab-Wechsel
        if (screenId === 'screen-cities') this.renderCityList();
        if (screenId === 'screen-ships') this.renderShipList();
        if (screenId === 'screen-log') this.renderLogs();
    },

    updateStats() {
        document.getElementById('stat-gold').innerText = state.gold;
        document.getElementById('stat-rep').innerText = state.globalRep;
    },

    renderCityList() {
        const list = document.getElementById('city-list');
        list.innerHTML = '';
        Object.keys(CITIES).forEach(key => {
            const city = CITIES[key];
            const btn = document.createElement('button');
            btn.className = 'menu-btn';
            btn.innerHTML = `<strong>${city.name}</strong><br><small>${city.desc}</small>`;
            btn.onclick = () => this.enterCity(key);
            list.appendChild(btn);
        });
    },

    enterCity(cityKey) {
        state.currentCity = cityKey;
        document.getElementById('current-city-name').innerText = CITIES[cityKey].name;
        document.getElementById('building-content').innerHTML = "Wähle ein Gebäude, um Handel zu treiben oder die Flotte zu erweitern.";
        this.showScreen('screen-city-detail');
    },

    openBuilding(type) {
        const content = document.getElementById('building-content');
        const city = CITIES[state.currentCity];
        
        switch(type) {
            case 'Taverne':
                content.innerHTML = `<h4>🍺 Taverne</h4>
                    <p>Hier erfährst du Neuigkeiten aus fernen Ländern.</p>
                    <button class="menu-btn" onclick="game.buyRumor()">Gerücht kaufen (50g)</button>`;
                break;
            case 'Werft':
                content.innerHTML = `<h4>🏗️ Werft</h4>
                    <p>Stapellauf neuer Schiffe für deine Flotte.</p>
                    <button class="menu-btn" onclick="game.buildShip()">Neues Schiff bauen (1000g)</button>`;
                break;
            case 'Kontor':
                content.innerHTML = `<h4>📦 Kontor</h4>
                    <p>Warenangebot in ${city.name}:</p>
                    <button class="menu-btn" onclick="game.trade('buy')">Waren kaufen (Placeholder)</button>
                    <button class="menu-btn" onclick="game.trade('sell')">Waren verkaufen (Placeholder)</button>`;
                break;
            case 'Rathaus':
                content.innerHTML = `<h4>🏛️ Rathaus</h4>
                    <p>Dein lokaler Ruf: <b>${city.rep}</b></p>
                    <small>Erfülle Aufträge, um politisches Gewicht zu gewinnen.</small>`;
                break;
        }
    },

    renderShipList() {
        const list = document.getElementById('ship-list');
        list.innerHTML = '';
        
        state.ships.forEach(ship => {
            const card = document.createElement('div');
            card.className = 'card';
            
            if (ship.status === 'docked') {
                card.innerHTML = `
                    <strong>🚢 ${ship.name}</strong><br>
                    <small>Liegt im Hafen: <b>${CITIES[ship.location].name}</b></small>
                    <div style="margin-top:10px;">
                        <select id="dest-${ship.id}" style="width:100%; padding:12px; border-radius:5px; margin-bottom:8px;">
                            ${Object.keys(CITIES).filter(c => c !== ship.location).map(c => 
                                `<option value="${c}">${CITIES[c].name}</option>`).join('')}
                        </select>
                        <button class="menu-btn" style="background:var(--accent); color:black; font-weight:bold;" 
                                onclick="game.startTravel(${ship.id}, document.getElementById('dest-${ship.id}').value)">
                            REISE STARTEN
                        </button>
                    </div>
                `;
            } else {
                card.innerHTML = `
                    <strong>🚢 ${ship.name}</strong><br>
                    <span class="status-traveling">Auf dem Weg nach: ${CITIES[ship.target].name}</span><br>
                    <div class="info-box" style="margin-top:5px; text-align:center;">
                        Ankunft in: <span class="timer" id="timer-${ship.id}">${ship.travelTimer}</span>s
                    </div>
                `;
            }
            list.appendChild(card);
        });
    },

    renderLogs() {
        const container = document.getElementById('log-container');
        container.innerHTML = state.logs.map(l => `<div class="log-entry">${l}</div>`).reverse().join('');
    }
};

// --- 4. GAME LOGIC ---
const game = {
    startTravel(shipId, targetKey) {
        const ship = state.ships.find(s => s.id === shipId);
        if (!ship) return;

        ship.status = 'traveling';
        ship.target = targetKey;
        ship.travelTimer = BASE_TRAVEL_TIME;
        
        this.addLog(`${ship.name} ist von ${CITIES[ship.location].name} in See gestochen.`);
        ui.renderShipList();
    },

    processTick() {
        state.ships.forEach(ship => {
            if (ship.status === 'traveling') {
                ship.travelTimer--;
                
                // Live-Update des Timers im UI, falls sichtbar
                const timerEl = document.getElementById(`timer-${ship.id}`);
                if (timerEl) timerEl.innerText = ship.travelTimer;

                if (ship.travelTimer <= 0) {
                    this.completeTravel(ship);
                }
            }
        });
    },

    completeTravel(ship) {
        const destination = CITIES[ship.target].name;
        ship.status = 'docked';
        ship.location = ship.target;
        ship.target = null;
        
        this.addLog(`ANKUNFT: ${ship.name} hat den Hafen von ${destination} erreicht.`);
        
        // Refresh, falls User gerade auf dem Schiffs-Tab ist
        if (document.getElementById('screen-ships').classList.contains('active')) {
            ui.renderShipList();
        }
    },

    buildShip() {
        const cost = 1000;
        if (state.gold >= cost) {
            state.gold -= cost;
            const newId = state.ships.length + 1;
            state.ships.push({ 
                id: newId, 
                name: `Elandor ${newId}`, 
                location: state.currentCity, 
                status: 'docked', 
                travelTimer: 0, 
                target: null 
            });
            this.addLog(`Werft: Ein neues Schiff wurde in ${CITIES[state.currentCity].name} gebaut.`);
            ui.updateStats();
            ui.openBuilding('Werft');
        } else {
            this.addLog("Werft: Nicht genug Gold vorhanden!");
        }
    },

    buyRumor() {
        if (state.gold >= 50) {
            state.gold -= 50;
            const rumors = [
                "Piraten meiden aktuell die Gewässer vor " + state.currentCity,
                "In Kronstadt wird bald ein Fest gefeiert.",
                "Stürme ziehen in Richtung Sturmwacht auf."
            ];
            const rand = rumors[Math.floor(Math.random() * rumors.length)];
            this.addLog(`Taverne: ${rand}`);
            ui.updateStats();
        }
    },

    trade(action) {
        this.addLog(`Kontor: Der ${action === 'buy' ? 'Ankauf' : 'Verkauf'} ist in dieser Region aktuell eingeschränkt.`);
    },

    addLog(msg) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        state.logs.push(`[${time}] ${msg}`);
        if(state.logs.length > 30) state.logs.shift();
    }
};

// --- 5. INITIALIZATION ---
// Game Loop: Ein Tick pro Sekunde
setInterval(() => game.processTick(), 1000);

// Initiales UI Rendering
window.onload = () => {
    ui.updateStats();
    ui.renderCityList();
};
