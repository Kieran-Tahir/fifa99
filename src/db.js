import Dexie from "dexie";

export const db = new Dexie("myDatabase");

db.version(1).stores({
  players: "++id, name, rating",
  squares: "++id, x, y, playerName",
});
