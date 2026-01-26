import { Cities } from "./data.js";

export function canTravel(from, to) {
  return Cities[from].verbindungen.includes(to);
}

export function travelTime(from, to) {
  return Math.max(1, Math.floor(Math.random() * 3) + 1);
}