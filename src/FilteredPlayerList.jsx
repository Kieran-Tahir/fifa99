import React from "react";
import { db } from "./db";
import { useLiveQuery } from "dexie-react-hooks";

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
            <li key={player.id} className="player-card">
              <div>
                <p>
                  {player.name}, {player.rating}
                </p>
              </div>
              <div className="button-row">
                <button
                  className="update-button"
                  onClick={() => console.log("Something could happen here...")}
                >
                  Update
                </button>
                <button
                  className="delete-button"
                  onClick={() => console.log("Something could happen here...")}
                >
                  x
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FilteredPlayerList;
