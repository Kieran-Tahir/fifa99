import React, { useState, useEffect } from "react";
import { db } from "./db";
import positions from "./data/defaultPositions";
import { defaultFormation } from "./data/defaultFormation";
import PlayerSearch from "./PlayerSearch";

function Formations({ squares, setSquares, setSquadValue }) {
  const [formationName, setFormationName] = useState(defaultFormation.name);
  const [formations, setFormations] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState(Array(16).fill(""));
  const [players, setPlayers] = useState([]);
  const [currentFormationId, setCurrentFormationId] = useState(null);
  const [showFormationDetails, setShowFormationDetails] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextPlayer, setNextPlayer] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const playersFromDB = await db.players.toArray();
        const formationsFromDB = await db.formations.toArray();
        setPlayers(playersFromDB);
        setFormations(formationsFromDB);
        setSquares(defaultFormation.layout);

        const loadedSelectedPlayers = defaultFormation.layout.map((square) => {
          return square.player ? square.player.name : "";
        });
        setSelectedPlayers(loadedSelectedPlayers);
      } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const newSquadValue = squares.reduce((sum, square) => {
      if (square.player) {
        return sum + square.player.rating;
      }
      return sum;
    }, 0);
    setSquadValue(newSquadValue);
  }, [squares, setSquadValue]);

  async function saveFormation() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    const formationToSave = {
      name: formationName,
      layout: squares,
      timestamp: formattedDate,
    };
    if (currentFormationId) {
      await db.formations.update(currentFormationId, formationToSave);
    } else {
      const id = await db.formations.add(formationToSave);
      setCurrentFormationId(id);
      setFormations([...formations, { id, ...formationToSave }]);
    }

    const savedSelectedPlayers = squares.map((square) => {
      return square.player ? square.player.name : "";
    });
    setSelectedPlayers(savedSelectedPlayers);
  }

  async function loadFormation(formationId) {
    try {
      const formation = await db.formations.get(Number(formationId));
      if (formation) {
        setSquares(formation.layout);
        setCurrentFormationId(formation.id);
        setFormationName(formation.name);
        setShowFormationDetails(true);

        // Update selectedPlayers based on the loaded formation
        const loadedSelectedPlayers = formation.layout.map((square) => {
          return square.player ? square.player.name : "";
        });
        setSelectedPlayers(loadedSelectedPlayers);
      }
    } catch (error) {
      console.error(`Failed to load formation: ${error}`);
    }
  }

  const deleteFormation = async () => {
    try {
      await db.formations.delete(currentFormationId);
      setFormations(
        formations.filter((formation) => formation.id !== currentFormationId)
      );
      setCurrentFormationId(null);
      setSquares([]);
      setShowFormationDetails(false);
    } catch (error) {
      console.error(`Failed to delete formation: ${error}`);
    }
  };

  function addPlayersToPitch(playerToAdd) {
    if (playerToAdd) {
      // this code generates the item moving through the array
      // Array.from({ length: 16 }).map((_, i) => {
      //   const newSelectedPlayers = [...selectedPlayers];
      //   if (selectedPlayers[i] === "" ) {
      //     console.log('selectedPlayers is: ', selectedPlayers)
      //     newSelectedPlayers[i] = playerToAdd;
      //     setSelectedPlayers(newSelectedPlayers);
      //   }

      //   console.log("newSelectedPlayers is: ", newSelectedPlayers);
      //   return newSelectedPlayers
      // });
      selectedPlayers.map((slot, i) => {
        console.log("currentIndex is: ", currentIndex);
        const newSelectedPlayers = [...selectedPlayers];
        newSelectedPlayers[currentIndex] = playerToAdd;
        setCurrentIndex(currentIndex + 1);
        setNextPlayer(newSelectedPlayers[currentIndex]);
        setSelectedPlayers(newSelectedPlayers);
        console.log("selectedPlayers is: ", selectedPlayers);
        return playerToAdd;
      });
    }
    // const newSquares = selectedPlayers
    //   .filter((playerName) => playerName !== "") // Filter out empty selections
    //   .map((playerName, i) => {
    //     // Find the player object based on the name

    //     // const player = players.find((p) => p.name === playerName);
    //     const player = nextPlayer

    const newSquares = selectedPlayers.map((player, i) => {
      // Get the corresponding position
      const position = positions[i] || { x: 0, y: 0 };

      return {
        id: i + Date.now(),
        x: position.x,
        y: position.y,
        player: player,
      };
    });
    // });
    console.log("newSquares is: ", newSquares);
    const newSquadValue = newSquares.reduce((sum, square) => {
      if (square.player) {
        return sum + square.player.rating;
      }
      return sum;
    }, 0);
    console.log("newSquadValue is: ", newSquadValue);
    // Update the squad value
    setSquadValue(newSquadValue);

    setSquares(newSquares);
  }

  useEffect(() => {
    addPlayersToPitch()
  }, [selectedPlayers])

  const createNewFormation = () => {
    setSquares([]);
    setShowFormationDetails(true);
    setFormationName("");
    setSelectedPlayers(Array(16).fill(""));
    setCurrentFormationId(null);
  };

  return (
    <div className="sidebar">
      <button className="formation-button bulge" onClick={createNewFormation}>
        New Formation
      </button>
      <select
        className="formation-dropdown bulge"
        onChange={(e) => loadFormation(e.target.value)}
      >
        <option value="">Load Formation</option>
        {formations.map((formation) => (
          <option key={formation.id} value={formation.id}>
            {formation.name} - {formation.timestamp}
          </option>
        ))}
      </select>
      {showFormationDetails && (
        <>
          <label>Formation Name:</label>
          <input
            type="text"
            className="formation-input bulge"
            placeholder="Formation name"
            value={formationName}
            onChange={(e) => setFormationName(e.target.value)}
          />
          <label>Select Your Players:</label>
          {Array.from({ length: 16 }).map((_, i) => (
            <select
              key={i}
              className="player-dropdown bulge"
              value={selectedPlayers[i]}
              onChange={(e) => {
                const newSelectedPlayers = [...selectedPlayers];
                newSelectedPlayers[i] = e.target.value;
                console.log("newSelectedPlayers is: ", newSelectedPlayers);
                setSelectedPlayers(newSelectedPlayers);
              }}
            >
              <option value="">Select a player</option>
              {players.map((player) => (
                <option key={player.id} value={player.name}>
                  {player.name}, {player.rating}
                </option>
              ))}
            </select>
          ))}
          <PlayerSearch addPlayersToPitch={addPlayersToPitch} />
          <button
            className="add-players-button bulge"
            onClick={addPlayersToPitch}
          >
            Add Players to Pitch
          </button>
          <div className="formation-macros">
            <button
              className="save-formation-button bulge"
              onClick={saveFormation}
            >
              Save Formation
            </button>
            {currentFormationId && (
              <button
                className="delete-formation-button bulge"
                onClick={deleteFormation}
              >
                Delete Formation
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Formations;
