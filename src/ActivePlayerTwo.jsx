import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";
import StatComparisons from "./StatComparisons";

function ActivePlayerTwo({ activePlayerOne, activePlayerTwo }) {
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
        <div className="active-player-title">{p2?.name}</div>
        <StatComparisons thisPlayer={p2} otherPlayer={p1} />
      </div>
    </>
  );
}
export default ActivePlayerTwo;
