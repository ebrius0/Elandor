import { GameState } from "./gamestate.js";

export function pirateCheck() {
  if (Math.random() < 0.05) {
    return {
      text: "Piraten greifen an!",
      success: Math.random() > 0.5
    };
  }
  return null;
}