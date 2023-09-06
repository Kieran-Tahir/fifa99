import React from "react";
import { db } from "./db";

function PitchCanvas({ squares, setSquares }) {
  const handleSquareMouseDown = (event, square) => {
    const x = event.clientX - square.x;
    const y = event.clientY - square.y;

    function handleMouseMove(event) {
      const newX = event.clientX - x;
      const newY = event.clientY - y;
      setSquares((prevSquares) =>
        prevSquares.map((prevSquare) =>
          prevSquare.id === square.id
            ? { ...prevSquare, x: newX, y: newY }
            : prevSquare
        )
      );
      db.squares.update(square.id, { x: newX, y: newY });
    }

    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const removePlayerFromSquad = async (playerId) => {
    try {
      const updatedSquares = squares.filter((square) => {
        if (square.player && square.player.id === playerId) {
          db.squares.delete(square.id);
          return false;
        }
        return true;
      });
      setSquares(updatedSquares);
    } catch (error) {
      console.error(`Failed to remove player from squad: ${error}`);
    }
  };

  return (
    <>
      <div className="canvas">
        {squares.map((square) => (
          <div
            className="player-card"
            key={square.id}
            onMouseDown={(e) => handleSquareMouseDown(e, square)}
            style={{
              position: square.position,
              left: square.x,
              top: square.y,
              cursor: "pointer",
            }}
          >
            {square.player && (
              <div className="player-info">
                <p>
                  {square.player.name}, {square.player.rating}
                </p>
                <button
                  className="delete-button"
                  onClick={() => removePlayerFromSquad(square.player.id)}
                >
                  x
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default PitchCanvas;
