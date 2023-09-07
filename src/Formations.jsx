import React, { useState, useEffect } from "react";
import { db } from "./db";

function Formations({ squares, setSquares }) {
  const [formationName, setFormationName] = useState("");
  const [formations, setFormations] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState(Array(15).fill(""));
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const playersFromDB = await db.players.toArray();
        const formationsFromDB = await db.formations.toArray();
        setPlayers(playersFromDB);
        setFormations(formationsFromDB);
      } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
      }
    }
    fetchData();
  }, []);

  const saveFormation = async () => {
    try {
      const formationToSave = {
        name: formationName,
        layout: squares,
        timestamp: new Date().toISOString(),
      };
      await db.formations.add(formationToSave);
      setFormations([...formations, formationToSave]);
    } catch (error) {
      console.error(`Failed to save formation: ${error}`);
    }
  };

  const loadFormation = async (formationId) => {
    try {
      const formation = await db.formations.get(Number(formationId));
      if (formation) {
        setSquares(formation.layout);
      }
    } catch (error) {
      console.error(`Failed to load formation: ${error}`);
    }
  };

function addPlayersToPitch () {
  let startX = 264;  // Starting x-coordinate
  let startY = 75;   // Starting y-coordinate
  const xOffset = 150;  // Horizontal offset between players
  const yOffset = 150;  // Vertical offset between rows of players
  
  let row = 0;  // The current row (0, 1, 2, 3, or 4)
  const rowSizes = [3, 3, 4, 1, 4];  // Number of players in each row
  let playerIndexInRow = 0;  // The index of the player in the current row

  const newSquares = selectedPlayers
    .filter(playerName => playerName !== "") // Filter out empty selections
    .map((playerName, i) => {
      // Find the player object based on the name
      const player = players.find(p => p.name === playerName);

      // Calculate the current position
      const x = startX + playerIndexInRow * xOffset;
      const y = startY + row * yOffset;
      
      // Update the index of the player in the current row
      playerIndexInRow++;

      // Update row and reset playerIndexInRow if this player is the last in the current row
      if (playerIndexInRow === rowSizes[row]) {
        row++;
        playerIndexInRow = 0;
      }

      return {
        id: i + Date.now(),
        x: x,
        y: y,
        position: "absolute",
        player: player,
      };
    });

  setSquares(newSquares);
};

  
  

  return (
    <div className="sidebar">
      <select className="formation-dropdown" onChange={(e) => loadFormation(e.target.value)}>
        <option value="">Load Formation</option>
        {formations.map((formation) => (
          <option key={formation.id} value={formation.id}>
            {formation.name} - {new Date(formation.timestamp).toLocaleString()}
          </option>
        ))}
      </select>
      <button className="formation-button" onClick={() => setSquares([])}>+ New Formation</button>
      
      {Array.from({ length: 15 }).map((_, i) => (
        <select 
          key={i} 
          className="player-dropdown"
          value={selectedPlayers[i]}
          onChange={(e) => {
            const newSelectedPlayers = [...selectedPlayers];
            newSelectedPlayers[i] = e.target.value;
            setSelectedPlayers(newSelectedPlayers);
          }}
        >
          <option value="">Select a player</option>
          {players.map((player) => (
            <option key={player.id} value={player.name}>
              {player.name}
            </option>
          ))}
        </select>
      ))}

      <button className="add-players-button" onClick={addPlayersToPitch}>Add Players to Pitch</button>

      <input
        type="text"
        className="formation-input"
        placeholder="Formation name"
        value={formationName}
        onChange={(e) => setFormationName(e.target.value)}
      />

      <button className="save-formation-button" onClick={saveFormation}>
        Save Formation &#128190; {/* This is the floppy disk symbol */}
      </button>
    </div>
  );
}

export default Formations;
