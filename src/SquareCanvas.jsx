import React, { useState, useEffect } from "react";
import { db } from "./db"; // Import the Dexie database
function SquareCanvas() {
  const [squares, setSquares] = useState([]); // State to manage created squares
  const [selectedPlayer, setSelectedPlayer] = useState(""); // State to manage the selected player from the dropdown
  const [players, setPlayers] = useState([]); // State to store the list of players

  // Fetch squares and players from the database on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const squaresFromDB = await db.squares.toArray();
        const playersFromDB = await db.players.toArray();
        setSquares(squaresFromDB);
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
        // Add the selected player to the database
        const player = await db.players.get({ name: selectedPlayer });

        // Create a new square with player info
        const newSquare = {
          id: Date.now(),
          x: 0, // Initial position
          y: 0, // Initial position
          position: "absolute",
          player: player, // Attach player info to the square
        };

        // Save the new square to the state
        setSquares([...squares, newSquare]);

        // Save the new square to the database
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

    const handleMouseMove = (event) => {
      const newX = event.clientX - x;
      const newY = event.clientY - y;

      // Update the position of the active square in the state
      setSquares((prevSquares) =>
        prevSquares.map((prevSquare) =>
          prevSquare.id === square.id
            ? { ...prevSquare, x: newX, y: newY }
            : prevSquare
        )
      );

      // Update the position of the active square in the database
      db.squares.update(square.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Function to remove a player-card from the canvas
  const removePlayerFromSquad = async (playerId) => {
    try {
      // Filter out the square associated with the player to remove
      const updatedSquares = squares.filter((square) => {
        // If the square has a player and the player's ID matches the one to remove, exclude it
        if (square.player && square.player.id === playerId) {
          // Remove the square from the database
          db.squares.delete(square.id);
          return false; // Exclude this square from the updatedSquares array
        }
        return true; // Include all other squares
      });

      // Update the state with the filtered squares
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
          {players?.map((player) => (
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
        ))}
      </div>
    </>
  );
}

export default SquareCanvas;
