import React, { useState, useEffect } from "react";
import { db } from "./db";

function Formations({ formations, setFormations, squares, setSquares }) {
  const [formationName, setFormationName] = useState("");
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

  const saveFormation = async () => {
    try {
      const formation = {
        name: formationName || `Formation-${new Date().toISOString()}`,
        layout: squares,
        timestamp: new Date().getTime(),
      };
      const id = await db.formations.add(formation);
      formation.id = id;
      setFormations([...formations, formation]);
      setFormationName("");
    } catch (error) {
      console.error(`Failed to save formation: ${error}`);
    }
  };

  const loadFormation = async (formationId) => {
    const id = Number(formationId);
    try {
      const formation = await db.formations.get(id);
      if (formation) {
        setSquares(formation.layout);
      }
    } catch (error) {
      console.error(`Failed to load formation: ${error}`);
    }
  };

  return (
    <div className="sidebar">
        
      {/* formation name */}
      <input
        type="text"
        placeholder="Formation name"
        value={formationName}
        onChange={(e) => setFormationName(e.target.value)}
      />

      {/* save formation */}
      <button onClick={saveFormation}>Save Formation</button>

      {/* create new formation */}
      <button onClick={() => setSquares([])}>Create New Formation</button>

      {/* select player */}
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

      {/* add player to pitch */}
      <button onClick={handleCreatePlayer}>Add player to pitch</button>

      {/* list formations */}
      <div>
        {formations.map((formation) => (
          <button
            key={formation.id}
            onClick={() => loadFormation(formation.id)}
          >
            {formation.name} ({new Date(formation.timestamp).toLocaleString()})
          </button>
        ))}
      </div>
    </div>
  );
}

export default Formations;
