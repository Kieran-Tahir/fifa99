import React, { useState, useEffect } from "react";
import PitchCanvas from "./PitchCanvas";
import Formations from "./Formations";
import ActivePlayerOne from "./ActivePlayerOne";
import ActivePlayerTwo from "./ActivePlayerTwo";
import PlayerSearch from './PlayerSearch'

import { db } from "./db";
import { defaultFormation } from "./data/defaultFormation";

function ViewSquad({ squadValue, setSquadValue }) {
  const [formations, setFormations] = useState([]);
  const [squares, setSquares] = useState(defaultFormation.layout);
  const [activePlayerOne, setActivePlayerOne] = useState("Benzema");
  const [activePlayerTwo, setActivePlayerTwo] = useState("Salah");

  // Fetches formation list info from DB
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

  function handleActivePlayerOne(activePlayerOneName) {
    setActivePlayerOne(activePlayerOneName);
  }

  function handleActivePlayerTwo(activePlayerTwoName, e) {
    e.preventDefault();
    setActivePlayerTwo(activePlayerTwoName);
  }

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
            <PlayerSearch />
            <PitchCanvas
              squares={squares}
              setSquares={setSquares}
              handleActivePlayerOne={handleActivePlayerOne}
              handleActivePlayerTwo={handleActivePlayerTwo}
            />
          </div>
          <ActivePlayerOne
            activePlayerOne={activePlayerOne}
            activePlayerTwo={activePlayerTwo}
          />
          <ActivePlayerTwo
            activePlayerOne={activePlayerOne}
            activePlayerTwo={activePlayerTwo}
          />
        </div>
      </div>
    </>
  );
}

export default ViewSquad;
