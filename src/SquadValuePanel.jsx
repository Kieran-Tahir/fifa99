import React, { useState, useEffect } from "react";
import { db } from "./db";

function SquadValuePanel({ squadValue }) {
  const [isActive, setIsActive] = useState(false);
  const [maximumSquadValue, setMaximumSquadValue] = useState(1250);

  // Add a value initially if the table is empty
  useEffect(() => {
    const addInitialValue = async () => {
      const allValues = await db.maximumSquadValue.toArray();
      if (allValues.length === 0) {
        await db.maximumSquadValue.add({ value: 1275 });
      }
    };
    addInitialValue();
  }, []);

  function updateMaximumSquadValue() {
    setIsActive(true);
  }

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
          <button onClick={submitSquadValue} className="add-value-button bulge">+</button>
        </>
      ) : (
        <div>
          
          <span title="Current squad value">
            {squadValue}
          </span>
          {" "}/{" "} 
          <span
            onClick={updateMaximumSquadValue}
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
