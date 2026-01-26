import { GameState } from "../core/gamestate.js";
import { getPrice } from "../core/economy.js";

export function render() {
  const out = document.getElementById("output");
  out.innerHTML = `
    <p>Tag ${GameState.player.tag}</p>
    <p>Gold: ${GameState.player.gold}</p>
    <p>Stadt: ${GameState.player.aktuelleStadt}</p>
  `;
}