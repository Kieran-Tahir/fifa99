import "./styles/index.scss";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function App({ squadValue }) {
  return (
    <>
      <div className="App">
        <div className="navbar-container">
          <NavBar squadValue={squadValue} />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
