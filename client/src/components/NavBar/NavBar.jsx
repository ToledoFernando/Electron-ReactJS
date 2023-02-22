import { Link } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/">Biblioteca Local</Link>
        </li>
        <li>
          <Link to="/download">Descargar nueva musica</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
