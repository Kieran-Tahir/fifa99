import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

function PlayerSearch({ addPlayersToPitch }) {
  const [search, setSearch] = useState("");
  //   const [resultList, setResultList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const searchQuery = useLiveQuery(async () => {
    let query = db.players.where("name").startsWithIgnoreCase(search);
    if (search !== "") {
      const resultList = await query.toArray();
      if (resultList.length > 0) {
        return resultList;
      } else {
        console.log("search error !! search is: ", search);
      }
    }
  }, [search]);

  function handleSearch(result) {
    if (searchQuery) {
      if (searchQuery.length === 1) {
        let playerToAdd = searchQuery[0];
        setError("");
        setSearch("");
        addPlayersToPitch(playerToAdd);
        setSuccess("Player added");
      } else if (result.name) {
        let playerToAdd = result;
        setError("");
        setSearch("");
        addPlayersToPitch(playerToAdd);
        setSuccess("Player added");
      } else {
        setSuccess("");
        setError("I need a little more info");
      }
    } else {
      setSuccess("");
      setError("Start entering a player name");
    }
  }

  function enter(e) {
    if (e.key === "Enter") {
      handleSearch(search);
    }
  }

  // Recreate the formations logic when player is searched:

  return (
    <>
      <div className="search-box-container">
        <div className="searchbox">
          <div className="message">
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}
          </div>
          <input
            type="text"
            placeholder="Player search..."
            className="search-input-field bulge"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => enter(e)}
          />
        </div>
      </div>
      <div className="search-results">
        {search !== "" &&
          searchQuery &&
          searchQuery.map((result, i) => (
            <div key={i} className="one-result bulge">
              <div onClick={() => handleSearch(result)}>
                {result.name}, {result.rating}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
export default PlayerSearch;
