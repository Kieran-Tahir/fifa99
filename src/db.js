import Dexie from "dexie";

export const db = new Dexie("MyDatabase");
db.version(1).stores({
  maximumSquadValue: "++id,value",
  squares: "++id,x,y",
  players: "++id,name,rating,stats",
  formations: "++id,name,layout",
  lastFormation: "++id, formationToLoad"
});
