export const GameState = {
  player: {
    gold: 5000,
    level: 1,
    xp: 0,
    ruf: 0,
    tag: 1,
    aktuelleStadt: "Aethelgard",
    inventar: {},
    schiffe: []
  },

  init() {
    this.player.schiffe.push({
      typ: "Schnigge",
      ort: "Aethelgard",
      status: "anker",
      ladung: {},
      waffen: 0
    });
  },

  nextDay() {
    this.player.tag++;
  },

  save() {
    localStorage.setItem("elandor_save", JSON.stringify(this.player));
  },

  load() {
    const save = localStorage.getItem("elandor_save");
    if (save) this.player = JSON.parse(save);
  }
};