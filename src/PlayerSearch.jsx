import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

function PlayerSearch() {
  const [search, setSearch] = useState("");
  //   const [resultList, setResultList] = useState([]);
  const [status, setStatus] = useState("")

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
    if (searchQuery){
        if (searchQuery.length === 1) {
          let matcher = searchQuery[0].name;
          console.log("matcher is: ", matcher);
          setStatus("")
        } else if (result.name){
          let matcher = result.name;
          setStatus("")
          console.log("matcher is: ", matcher);
        } else {
            setStatus("Please enter player name")
        }
    } else {
        setStatus("Please enter player to search for")
    }
  }

  function enter(e) {
    console.log("e is: ", e);
    console.log("e.key is: ", e.key);
    if (e.key === "Enter") {
      handleSearch(search);
    }
  }

  return (
    <>
      <div className="search-box-container">
        <div className="searchbox bulge">
        <div className="error-message">{status}</div>
          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => enter(e)}
          />
        </div>
      </div>
      <div className="search-results">
        {searchQuery &&
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
