import React, { useState } from "react";
import { db } from "./db";

function PlayerCard({ player }) {
  const [newProperty, setNewProperty] = useState({ key: "", value: "" });

  async function deleteEntirePlayer(playerId) {
    try {
      await db.players.delete(playerId);
      console.log("Player deleted successfully");
    } catch (error) {
      console.log("Failed to delete player:", error);
    }
  }

  async function deletePlayerProperty(playerId, propertyKey) {
    try {
      // Fetch the player from the database
      const player = await db.players.get(playerId);

      if (!player) {
        console.log("Player not found");
        return;
      }

      // Delete the property from the player object
      delete player[propertyKey];

      // Update the player in the database with the modified data
      await db.players.put(player, playerId);
    } catch (error) {
      console.log("Failed to delete player property:", error);
    }
  }

  async function addPlayerProperty(playerId) {
    try {
      const updatedPlayer = { ...player };
      updatedPlayer[newProperty.key] = newProperty.value;

      await db.players.update(playerId, updatedPlayer);

      // Clear the input fields
      setNewProperty({ key: "", value: "" });
    } catch (error) {
      console.log("Failed to add player property:", error);
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
        <div className="player-properties">
          {Object.entries(player)
            .filter(([key]) => key !== "id" && key !== "name" && key !== "rating") // Exclude "id" and "name"
            .map(([key, value]) => (
              <div key={key} className="player-property">
                <span className="property-key">{key}:</span>
                <span className="property-value">{value}</span>
                <button
                  className="delete-property-button"
                  onClick={() => deletePlayerProperty(player.id, key)}
                >
                  x
                </button>
              </div>
            ))}
        </div>
        <div>
          <input
            type="text"
            className="property-form"
            placeholder="Property Key"
            value={newProperty.key}
            onChange={(e) =>
              setNewProperty({ ...newProperty, key: e.target.value })
            }
          />
          <input
            type="text"
            className="property-form"
            placeholder="Property Value"
            value={newProperty.value}
            onChange={(e) =>
              setNewProperty({ ...newProperty, value: e.target.value })
            }
          />
          <button
            onClick={() => addPlayerProperty(player.id)}
            className="add-property-button"
          >
            +
          </button>
        </div>
        <div>
          <button
            onClick={() => deleteEntirePlayer(player.id)}
            className="delete-player-button"
          >
            Delete Player
          </button>
        </div>
      </div>
    </>
  );
}

export default PlayerCard;
