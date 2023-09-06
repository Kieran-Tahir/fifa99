import Dexie from "dexie";

export const db = new Dexie("MyDatabase");
db.version(1).stores({
  squares: "++id,x,y",
  players: "++id,name,rating",
  formations: "++id,name,layout",
});
