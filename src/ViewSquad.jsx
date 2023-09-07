import React, { useState, useEffect } from "react";
import PitchCanvas from "./PitchCanvas";
import Formations from "./Formations";
import { db } from "./db";

function ViewSquad({squadValue, setSquadValue}) {
  const [formations, setFormations] = useState([]);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const squaresFromDB = await db.squares.toArray();
        const formationsFromDB = await db.formations.toArray();
        setSquares(squaresFromDB);
        setFormations(formationsFromDB);
      } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div>
        <div>
          <Formations
            formations={formations}
            setFormations={setFormations}
            setSquares={setSquares}
            squares={squares}
            squadValue={squadValue}
            setSquadValue={setSquadValue}
          />
        </div>
        <div className="content">
          <PitchCanvas squares={squares} setSquares={setSquares} />
        </div>
      </div>
    </>
  );
}

export default ViewSquad;
