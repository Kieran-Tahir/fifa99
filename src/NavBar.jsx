import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div>
        <Link to="/addplayer" className="nav-link">Add Player</Link>
        <Link to="/viewsquad" className="nav-link">View Squad</Link>
      </div>
    </>
  );
}

export default NavBar