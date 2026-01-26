import { GameState } from "./core/gamestate.js";
import { initUI } from "./ui/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  GameState.init();
  initUI();
}

GameState.load();
GameState.init();
render();

setInterval(() => {
  GameState.nextDay();
  render();
  GameState.save();
}, 30000);