import { GameState } from "../core/gamestate.js";

export function renderTaverne() {
  document.getElementById("aktionsBereich").innerHTML = `
    <h3>🍺 Taverne</h3>
    <p>Matrosen suchen Arbeit.</p>
    <button onclick="window.anwerben()">Matrosen anwerben (50 Gold)</button>
  `;
}

window.anwerben = function () {
  if (GameState.player.gold < 50) {
    alert("Nicht genug Gold!");
    return;
  }
  GameState.player.gold -= 50;
  alert("Matrosen angeheuert! (später Crew-System)");
};