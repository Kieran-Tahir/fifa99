import React, { useState, useEffect } from "react";
import PitchCanvas from "./PitchCanvas";
import Formations from "./Formations";
import PlayerDetails from "./PlayerDetails";
import { db } from "./db";
import { defaultFormation } from "./data/defaultFormation";

function ViewSquad({ squadValue, setSquadValue }) {
  const [formations, setFormations] = useState([]);
  const [squares, setSquares] = useState(defaultFormation.layout);
  useEffect(() => {
    async function fetchData() {
      try {
        const formationsFromDB = await db.formations.toArray();
        // Removing the code below resulted in the player formation being displayed when the page was opened, why???
        // const squaresFromDB = await db.squares.toArray();
        // if (squaresFromDB !== []){
          // setSquares(squaresFromDB);
        // }
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
        <div className="content-wrap">
          <Formations
            formations={formations}
            setFormations={setFormations}
            setSquares={setSquares}
            squares={squares}
            squadValue={squadValue}
            setSquadValue={setSquadValue}
          />
          <div className="content">
            <PitchCanvas squares={squares} setSquares={setSquares} />
          </div>
          <PlayerDetails />
        </div>
      </div>
    </>
  );
}

export default ViewSquad;
