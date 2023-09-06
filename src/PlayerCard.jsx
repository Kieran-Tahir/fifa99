import React from "react";

function PlayerCard({ player }) {
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
            onClick={() => console.log("Something could happen here...")}
          >
            x
          </button>
        </div>
      </div>
    </>
  );
}

export default PlayerCard;
