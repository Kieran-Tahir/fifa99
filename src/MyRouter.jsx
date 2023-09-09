import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import App from "./App";
import AddPlayer from "./AddPlayer";
import ViewSquad from "./ViewSquad";

function MyRouter() {
  const [squadValue, setSquadValue] = useState(1250)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App squadValue={squadValue} />}>
          <Route path="/addplayer" element={<AddPlayer/>} />
          <Route path="/viewsquad" element={<ViewSquad setSquadValue={setSquadValue}/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default MyRouter;
