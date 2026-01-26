import { GameState } from "../core/gamestate.js";
import { Cities } from "../core/data.js";
import { renderWerft } from "./werft.js";
import { renderKontor } from "./kontor.js";
import { renderTaverne } from "./taverne.js";

export function initUI() {
  const select = document.getElementById("stadtSelect");

  Object.keys(Cities).forEach(stadt => {
    const opt = document.createElement("option");
    opt.value = stadt;
    opt.textContent = stadt;
    select.appendChild(opt);
  });

  select.value = GameState.player.aktuelleStadt;

  select.addEventListener("change", e => {
    GameState.player.aktuelleStadt = e.target.value;
    renderStadt();
  });

  renderStadt();
}

export function renderStadt() {
  const stadt = GameState.player.aktuelleStadt;
  const daten = Cities[stadt];

  document.getElementById("stadtInfo").innerHTML = `
    <h2>${stadt}</h2>
    <p>Versorgung: ${daten.versorgung}</p>
  `;

  document.getElementById("aktionsBereich").innerHTML = `
    <button id="btnWerft">⚓ Werft</button>
    <button id="btnTaverne">🍺 Taverne</button>
    <button id="btnKontor">📦 Kontor</button>
  `;

  document.getElementById("btnWerft").onclick = renderWerft;
  document.getElementById("btnTaverne").onclick = renderTaverne;
  document.getElementById("btnKontor").onclick = renderKontor;
}