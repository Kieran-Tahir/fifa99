import "./styles/index.scss";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SquareCanvas from "./SquareCanvas";

function App() {
  return (
    <>
      <div className="App">
        <div className="navbar-container">
          <NavBar />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
