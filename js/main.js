// js/main.js

import { GameState } from "./core/gamestate.js";
import { initUI } from "./ui/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  // Spielzustand initialisieren
  GameState.init();

  // UI erst starten, wenn das DOM wirklich geladen ist
  initUI();

  console.log("Elandor gestartet");
});