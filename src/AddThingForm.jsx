import React, { useState } from "react";
import { db } from "./db";

function AddThingForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [status, setStatus] = useState("");

  async function addThing() {
    if (name !== "") {
      try {
        // Add the new thing
        const id = await db.things.add({
          name,
          age: parseInt(age),
        });

        setStatus(`Thing ${name} successfully added. id: ${id}`);
        setName("");
        setAge(0);
      } catch (error) {
        setStatus(`Failed to add ${name}: ${error}`);
      }
    } else {
      setStatus("Please enter your thing's name!");
    }
  }

  return (
    <>
      <h2>Add a thing</h2>
      {status ? <p>{status}</p> : <p>...</p>}
      <div className="form">
        <div className="input-row">
          <label>Name</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. Thing 1"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
        <div className="input-row">
          <label>Age</label>
          <input
            type="text"
            className="age-input-field"
            placeholder="30"
            value={age}
            onChange={(ev) => setAge(ev.target.value)}
          />
        </div>
        <button onClick={addThing} className="add-button">
          +
        </button>
      </div>
    </>
  );
}

export default AddThingForm;
