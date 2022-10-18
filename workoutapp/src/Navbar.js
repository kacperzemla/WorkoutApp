import "./Styles/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faDumbbell,
  faUser,
  faBurger,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/plans">
            <FontAwesomeIcon icon={faDumbbell} />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/startTraining">+</Link>
        </li>
        <li className="nav-item">
          <Link to="/diet">
            <FontAwesomeIcon icon={faBurger} />
          </Link>
        </li>
        <li className="nav-item">
          <FontAwesomeIcon icon={faUser} />
        </li>
      </ul>
    </nav>
  );
}
