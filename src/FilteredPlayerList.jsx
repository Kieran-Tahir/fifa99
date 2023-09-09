import React from "react";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";
import PlayerCard from "./PlayerCard";
import { defaultPlayers } from "./data/defaultPlayers";

function FilteredPlayerList({ maxRating, nameFilter }) {
  const players = useLiveQuery(async () => {
    let thingsQuery = db.players.where("rating").between(0, maxRating + 1);

    if (nameFilter !== "") {
      thingsQuery = thingsQuery.and((thing) => thing.name === nameFilter);
    }
    const filteredThings = await thingsQuery.toArray();
    if (filteredThings.length > 0) {
      return filteredThings;
    } else {
      defaultPlayers.map((player) => {
        return db.players.add({name: player.name, rating: player.rating, id: player.id})
      })
      const batchArray = await db.players.toArray();
      return batchArray;
    }
  }, [maxRating, nameFilter]);

  return (
    <>
      <div>
        <ul className="playerlist-container">
          {players
            ?.map((player) => <PlayerCard key={player.id} player={player} />)
            .reverse()}
        </ul>
      </div>
    </>
  );
}

export default FilteredPlayerList;
