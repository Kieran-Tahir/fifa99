import React from "react";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";
import PlayerCard from "./PlayerCard";

function FilteredPlayerList({ maxRating, nameFilter }) {
  const players = useLiveQuery(async () => {
    let thingsQuery = db.players.where("rating").between(0, maxRating + 1);

    if (nameFilter !== "") {
      thingsQuery = thingsQuery.and((thing) => thing.name === nameFilter);
    }

    const filteredThings = await thingsQuery.toArray();

    return filteredThings;
  }, [maxRating, nameFilter]);

  return (
    <>
      <div>
        <h3>Players:</h3>
        <ul className="playerlist-container">
          {players?.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default FilteredPlayerList;
