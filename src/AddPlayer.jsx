import React, {useState} from "react";
import AddPlayerForm from "./AddPlayerForm";
// import Filter from "./Filter";
import FilteredPlayerList from "./FilteredPlayerList";

function AddPlayer() {
  // const [maxRating, setMaxRating] = useState(100);
  // const [nameFilter, setNameFilter] = useState("");

  const maxRating = 100
  const nameFilter= ""
  return (
    <>
      <div className="content-wrap">
          <AddPlayerForm defaultAge={30} />
        <div className="content-wrap-right">
          {/* <Filter
            maxRating={maxRating}
            nameFilter={nameFilter}
            setMaxRating={setMaxRating}
            setNameFilter={setNameFilter}
          /> */}
          <FilteredPlayerList maxRating={maxRating} nameFilter={nameFilter} />
        </div>
      </div>
    </>
  );
}

export default AddPlayer;
