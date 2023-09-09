import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import React from "react";
import StatComparisons from "./StatComparisons";

function ActivePlayerOne({ activePlayerOne, activePlayerTwo }) {
  const p1 = useLiveQuery(async () => {
    let matchingPlayersList = await db.players
      .where("name")
      .equals(activePlayerOne);
    const matchingPlayer = await matchingPlayersList.toArray();
    return matchingPlayer[0];
  }, [activePlayerOne]);

  const p2 = useLiveQuery(async () => {
    let matchingPlayersList = await db.players
      .where("name")
      .equals(activePlayerTwo);
    const matchingPlayer = await matchingPlayersList.toArray();
    return matchingPlayer[0];
  }, [activePlayerTwo]);

  return (
    <>
      <div className="right-sidebar">
        <div className="active-player-title">{p1?.name}</div>
        <StatComparisons thisPlayer={p1} otherPlayer={p2} /> 
      </div>
    </>
  );
}
export default ActivePlayerOne;
