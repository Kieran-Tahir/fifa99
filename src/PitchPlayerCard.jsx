import React from "react";

function PitchPlayerCard({
  square,
  handleSquareMouseDown,
  removePlayerFromSquad,
  handleActivePlayerOne,
  handleActivePlayerTwo
}) {
  return (
    <>
      <div
        className="squad-view-player-card bulge"
        onMouseDown={(e) => handleSquareMouseDown(e, square)}
        onClick={() => handleActivePlayerOne(square.player.name)}
        onContextMenu={(e) => handleActivePlayerTwo(square.player.name, e)}
        style={{
          position: square.position,
          left: square.x,
          top: square.y,
          cursor: "pointer",
        }}
      >
        {square.player && (
          <div>
            <p className="player-info">{square.player.name}</p>
            <span className="player-rating">{square.player.rating}</span>
            <div>
              {/* <button
                className="small-delete-button"
                onClick={() => removePlayerFromSquad(square.player.id)}
              >
                x
              </button> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default PitchPlayerCard;
