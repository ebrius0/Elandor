export const Cities = {
  Aethelgard: {
    versorgung: "Gut",
    verbindungen: ["Port Valerius"],
    gueter: {
      Getreide: { basisPreis: 10, lager: 80, produktion: 0.7 },
      Fisch: { basisPreis: 12, lager: 60, produktion: 0.8 }
    }
  }
};

export const Goods = [
  "Getreide", "Fisch", "Holz", "Eisen", "Waffen"
];

export const ShipTypes = {
  Schnigge: { kapazitaet: 50, speed: 1, waffenPlaetze: 1 },
  Kraier: { kapazitaet: 150, speed: 1.1, waffenPlaetze: 2 }
};

export const Buildings = {
  Werft: { max: 3 },
  Lagerhaus: { max: 3 },
  Kontor: { max: 3 }
};