import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import App from "./App";
import AddPlayer from "./AddPlayer";
import ViewSquad from "./ViewSquad";

function MyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/addplayer" element={<AddPlayer />} />
          <Route path="/viewsquad" element={<ViewSquad />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default MyRouter;
