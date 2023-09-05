import { useState } from "react";
import "./styles/index.scss";
import AddPlayerForm from "./AddPlayerForm";
import Filter from "./Filter";
import FilteredPlayerList from "./FilteredPlayerList";

function App() {
  const [maxRating, setMaxRating] = useState(100);
  const [nameFilter, setNameFilter] = useState("");

  return (
    <div className="App">
      <div className="content-wrap">
        <div className="content-wrap-left">
          <AddPlayerForm defaultAge={30} />
        </div>
        <div className="content-wrap-right">
          <Filter
            maxRating={maxRating}
            nameFilter={nameFilter}
            setMaxRating={setMaxRating}
            setNameFilter={setNameFilter}
          />
        </div>
      </div>
          <FilteredPlayerList
            maxRating={maxRating}
            nameFilter={nameFilter}
          />
    </div>
  );
}

export default App;
