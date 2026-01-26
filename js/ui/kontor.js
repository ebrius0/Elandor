import { GameState } from "../core/gamestate.js";
import { Cities } from "../core/data.js";
import { getPrice } from "../core/economy.js";

export function renderKontor() {
  const city = GameState.player.aktuelleStadt;
  let html = `<h3>📦 Kontor</h3>`;

  Object.keys(Cities[city].gueter).forEach(ware => {
    const preis = getPrice(city, ware);
    html += `
      <div>
        ${ware} – ${preis} Gold
        <button onclick="window.buy('${ware}')">Kaufen</button>
      </div>
    `;
  });

  document.getElementById("aktionsBereich").innerHTML = html;
}

window.buy = function (ware) {
  GameState.player.inventar[ware] =
    (GameState.player.inventar[ware] || 0) + 1;
  alert(`${ware} gekauft`);
};