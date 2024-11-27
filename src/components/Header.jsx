import Logo from "../assets/logo.png"
import "../styles/Header.css"
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="header-logo">
                <Link to="/">
                    <img src={Logo} className="Logo" />
                </Link>
            </div>
            <div className="header-tabs">
                <Link to="characterDetails">Personnages</Link>
                <Link to="/comics">Comics</Link>
                <Link>Favoris</Link>
            </div>
        </header>
    )
}

export default Header;