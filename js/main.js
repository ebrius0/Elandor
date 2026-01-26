import { GameState } from "./core/gamestate.js";
import { render } from "./ui/ui.js";

GameState.load();
GameState.init();
render();

setInterval(() => {
  GameState.nextDay();
  render();
  GameState.save();
}, 30000);