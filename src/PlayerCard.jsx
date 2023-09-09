import React, { useState } from "react";
import { db } from "./db";

function PlayerCard({ player }) {
  
  async function deleteEntirePlayer(playerId) {
    try {
      await db.players.delete(playerId);
      console.log("Player deleted successfully");
    } catch (error) {
      console.log("Failed to delete player:", error);
    }
  }

  return (
    <>
      <div className="player-card">
        <div style={{fontWeight: 'bold'}}>{player.name} </div>
        <div className="player-property">{player.rating} </div>
        {player.stats &&
          player.stats.map((stat, i) => (
            <div key={i} className="player-property">
              <span className="property-key">{stat.name}:</span>
              <span className="property-value">{stat.value}</span>
            </div>
          ))}
        <div>
          <button
            onClick={() => deleteEntirePlayer(player.id)}
            className="delete-player-button"
          >
            x
          </button>
        </div>
      </div>
    </>
  );
}

export default PlayerCard;
