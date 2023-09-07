import React from "react";
import { Link } from "react-router-dom";
import SquadValuePanel from "./SquadValuePanel";

function NavBar({squadValue}) {
  return (
    <>
      <div className="nav-row">
        <div className="nav-left">
          <Link to="/addplayer" className="nav-link">
            Players
          </Link>
          <Link to="/viewsquad" className="nav-link">
            Squad
          </Link>
        </div>
        <div className="nav-right">
          <SquadValuePanel squadValue={squadValue} />
        </div>
      </div>
    </>
  );
}

export default NavBar;
