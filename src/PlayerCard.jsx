import React from "react";
import {db} from './db'

function PlayerCard({ player }) {

  async function deletePlayer (playerId) {
    console.log('delete function runs')
    console.log('player is: ', player)
    console.log('playerId is: ', playerId)
    try {
      await db.players.delete(playerId)
    } catch (error) {
      console.log('Sorry you have an error: ', error)
    }
  }
  
  return (
    <>
      <div className="player-card">
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
            onClick={() => deletePlayer(player.id)}
          >
            x
          </button>
        </div>
      </div>
    </>
  );
}

export default PlayerCard;
