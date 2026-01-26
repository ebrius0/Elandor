import { GameState } from "./gamestate.js";
import { Cities } from "./data.js";

export function getPrice(city, ware) {
  const g = Cities[city].gueter[ware];
  let price = g.basisPreis * g.produktion;
  price *= 1 + (Math.random() * 0.1 - 0.05);
  return Math.max(1, Math.round(price));
}

export function buy(ware, menge) {
  const city = GameState.player.aktuelleStadt;
  const price = getPrice(city, ware) * menge;

  if (GameState.player.gold < price) return false;

  GameState.player.gold -= price;
  GameState.player.inventar[ware] =
    (GameState.player.inventar[ware] || 0) + menge;

  Cities[city].gueter[ware].lager -= menge;
  return true;
}