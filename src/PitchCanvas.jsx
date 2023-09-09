import React from "react";
import { db } from "./db";
import PitchPlayerCard from "./PitchPlayerCard";

function PitchCanvas({ squares, setSquares, handleActivePlayerOne, handleActivePlayerTwo }) {
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
      <div>
        {squares.map((square, i) => (
          <PitchPlayerCard
            key={square.id}
            square={square}
            handleSquareMouseDown={handleSquareMouseDown}
            removePlayerFromSquad={removePlayerFromSquad}
            handleActivePlayerOne={handleActivePlayerOne}
            handleActivePlayerTwo={handleActivePlayerTwo}
          />
        ))}
      </div>
    </>
  );
}

export default PitchCanvas;
