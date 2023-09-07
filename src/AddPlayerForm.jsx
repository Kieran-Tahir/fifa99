import React, { useState } from "react";
import { db } from "./db";

function AddPlayerForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("");

  async function addPlayer() {
    if (name !== "") {
      try {
        // Add the new player
        const id = await db.players.add({
          name,
          rating: parseInt(rating),
        });

        setStatus(`Player ${name} successfully added. id: ${id}`);
        setName("");
        setRating(0);
      } catch (error) {
        setStatus(`Failed to add ${name}: ${error}`);
      }
    } else {
      setStatus("Please enter your player's name and rating");
    }
  }

  return (
    <>
      <div className="sidebar">
        <p className="add-player">Add a Player</p>
        <div className="form">
          <div className="input-row">
            <label>Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Foden"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              />
          </div>
          <div className="input-row">
            <label>Rating</label>
            <input
              type="text"
              className="rating-input-field"
              placeholder="85"
              value={rating}
              onChange={(ev) => setRating(ev.target.value)}
              />
          </div>
          <button onClick={addPlayer} className="add-button">
            +
          </button>
              {status ? <p className="status">{status}</p> : <p></p>}
        </div>
        <p>Banlist</p>
        <p>mbap</p>
        <p>VVD</p>
        <p>messi</p>
      </div>
    </>
  );
}

export default AddPlayerForm;
