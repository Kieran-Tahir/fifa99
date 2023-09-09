import React, { useState, useEffect } from "react";
import { db } from "./db";

function SquadValuePanel({ squadValue }) {
  const [isActive, setIsActive] = useState(false);
  const [maximumSquadValue, setMaximumSquadValue] = useState(1250);

  // Add a value initially if the table is empty
  useEffect(() => {
    async function addInitialValue () {
      const allValues = await db.maximumSquadValue.toArray();
      if (allValues.length === 0) {
        await db.maximumSquadValue.add({ value: 1250 });
      }
    };
    addInitialValue();
  }, []);

  // Load squad value from db
  useEffect(() => {
    async function loadMaximumSquadValue() {
      try {
        const max = await db.maximumSquadValue.get(1);
        setMaximumSquadValue(max.value);
      } catch (error) {
        console.log("max val error is: ", error);
      }
    }
    loadMaximumSquadValue();
  }, []);

  // Toggles between display and input field
  function handleActivation() {
    setIsActive(true);
  }

  // Submits user-input maximum squad value to db and resets input to display
  async function submitSquadValue() {
    setIsActive(false);
    try {
      const squadValue = await db.maximumSquadValue.update(1, {
        value: maximumSquadValue,
      });
      return squadValue;
    } catch (error) {
      console.log("squad value load error is: ", error);
    }
  }

  return (
    <>
      {isActive ? (
        <>
          <input
            type="text"
            placeholder="Squad value"
            value={maximumSquadValue}
            onChange={(e) => setMaximumSquadValue(e.target.value)}
            title="Edit maximum squad value"
          />
          <button onClick={submitSquadValue} className="add-value-button bulge">
            +
          </button>
        </>
      ) : (
        <div>
          <span title="Current squad value">{squadValue}</span> /{" "}
          <span
            onClick={handleActivation}
            className="max-squad-value"
            title="Maximum squad value"
          >
            {maximumSquadValue}
          </span>
          ,{" "}
          <span
            className={
              squadValue > maximumSquadValue
                ? "red-background"
                : "green-background"
            }
            title="Remaining difference"
          >
            {maximumSquadValue - squadValue}
          </span>
        </div>
      )}
    </>
  );
}
export default SquadValuePanel;
