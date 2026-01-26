import { ShipTypes } from "../core/data.js";
import { GameState } from "../core/gamestate.js";

export function renderWerft() {
  let html = `<h3>⚓ Werft</h3>`;

  Object.entries(ShipTypes).forEach(([name, s]) => {
    html += `
      <div>
        <b>${name}</b><br>
        Kapazität: ${s.kapazitaet}<br>
        Waffenplätze: ${s.waffenPlaetze}<br>
        <button onclick="window.buyShip('${name}')">Bauen</button>
      </div><hr>
    `;
  });

  document.getElementById("aktionsBereich").innerHTML = html;
}

window.buyShip = function (typ) {
  GameState.player.schiffe.push({
    typ,
    ort: GameState.player.aktuelleStadt,
    status: "anker",
    ladung: {},
    waffen: 0
  });
  alert(`${typ} gebaut!`);
};