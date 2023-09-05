import { useState } from "react";
import "./styles/index.scss";
import AddThingForm from "./AddThingForm";
import Filter from "./Filter";
import FilteredThingList from "./FilteredThingList";

function App() {
  const [maxAge, setMaxAge] = useState(100);
  const [nameFilter, setNameFilter] = useState("");

  return (
    <div className="App">
      <div className="content-wrap">
        <div className="content-wrap-left">
          <AddThingForm defaultAge={30} />
        </div>
        <div className="content-wrap-right">
          <Filter
            maxAge={maxAge}
            nameFilter={nameFilter}
            setMaxAge={setMaxAge}
            setNameFilter={setNameFilter}
          />
        </div>
      </div>
          <FilteredThingList
            maxAge={maxAge}
            nameFilter={nameFilter}
          />
    </div>
  );
}

export default App;
