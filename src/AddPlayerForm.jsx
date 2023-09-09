import React, { useState } from "react";
import { db } from "./db";
// import { defaultProperties } from "./data/defaultProperties";

function AddPlayerForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState("");
  const [pace, setPace] = useState("");
  const [shot, setShot] = useState("");
  const [passing, setPassing] = useState("")
  const [dribbling, setDribbling] = useState("")
  const [defending, setDefending] = useState("")
  const [physical, setPhysical] = useState("")

  async function addPlayer() {
    if (name !== "") {
      try {
        // Add the new player
        const id = await db.players.add({
          name,
          rating: parseInt(rating),
          stats: [
            {
              name: "Pace",
              value: parseInt(pace)
            },
            {
              name: "Shot",
              value: parseInt(shot)
            },
          ],
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

  // function handlePropSet(property, value) {
  //   if (property === "Pace") {
  //     setPace(value);
  //   }
  // }

  console.log("pace is: ", pace);

  return (
    <>
      <div className="sidebar">
        <p className="add-player">Add a Player</p>
        <div className="form">
          <div className="input-row">
            <label>Name</label>
            <input
              type="text"
              className="input-field bulge"
              placeholder="e.g. Foden"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className="input-row">
            <label>Rating</label>
            <input
              type="text"
              className="rating-input-field bulge"
              placeholder="85"
              value={rating}
              onChange={(ev) => setRating(ev.target.value)}
            />
          </div>
          <div className="input-row">
            <label>Pace</label>
            <input
              type="text"
              className="rating-input-field bulge"
              placeholder="85"
              value={pace}
              onChange={(ev) => setPace(ev.target.value)}
            />
          </div>
          <div className="input-row">
            <label>Shot</label>
            <input
              type="text"
              className="rating-input-field bulge"
              placeholder="85"
              value={shot}
              onChange={(ev) => setShot(ev.target.value)}
            />
          </div>
          <div className="input-row">
            <label>Passing</label>
            <input
              type="text"
              className="rating-input-field bulge"
              placeholder="85"
              value={passing}
              onChange={(ev) => setPassing(ev.target.value)}
            />
          </div>
          <div className="input-row">
            <label>Dribbling</label>
            <input
              type="text"
              className="rating-input-field bulge"
              placeholder="85"
              value={dribbling}
              onChange={(ev) => setDribbling(ev.target.value)}
            />
          </div>
          <div className="input-row">
            <label>Defending</label>
            <input
              type="text"
              className="rating-input-field bulge"
              placeholder="85"
              value={defending}
              onChange={(ev) => setDefending(ev.target.value)}
            />
          </div>
          <div className="input-row">
            <label>Physical</label>
            <input
              type="text"
              className="rating-input-field bulge"
              placeholder="85"
              value={physical}
              onChange={(ev) => setPhysical(ev.target.value)}
            />
          </div>

          <button onClick={addPlayer} className="add-button">
            +
          </button>
          {status ? <p className="status">{status}</p> : <p></p>}
        </div>
      </div>
    </>
  );
}

export default AddPlayerForm;
