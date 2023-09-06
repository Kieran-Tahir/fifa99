
import React, { useState, useEffect } from "react";
import { db } from "./db";

function PitchCanvas({ squares, setSquares }) {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const playersFromDB = await db.players.toArray();
        setPlayers(playersFromDB);
      } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
      }
    }

    fetchData();
  }, []);

  const handleCreatePlayer = async () => {
    if (selectedPlayer !== "") {
      try {
        const player = await db.players.get({ name: selectedPlayer });
        const newSquare = {
          id: Date.now(),
          x: 50,
          y: 50,
          position: "absolute",
          player: player,
        };
        setSquares([...squares, newSquare]);
        await db.squares.add(newSquare);
      } catch (error) {
        console.error(`Failed to add player to square: ${error}`);
      }
    } else {
      console.log("Please select a player from the dropdown.");
    }
  };

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
      <div className="player-dropdown">
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          <option value="">Select a player</option>
          {players.map((player) => (
            <option key={player.id} value={player.name}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleCreatePlayer} className="update-button">
        Add player to pitch
      </button>
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
        ))}      </div>
    </>
  );
}

export default PitchCanvas;
