import "../styles/Header.css";
import '../styles/BackgroundVideo.css';
import { Link, useLocation } from "react-router-dom";

import Logo from "../assets/logo.png";
import MarvelVideo from "../assets/MarvelTheme.mp4";
import { useState, useEffect } from "react";

function Header() {
    const [scrolling, setScrolling] = useState(false);
    const location = useLocation();

    const handleScroll = () => {
        if (window.scrollY > 400) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header className={scrolling ? "scrolled" : ""}>
                <div className="header-logo">
                    <Link to="/">
                        <img src={Logo} className="Logo" alt="Logo" />
                    </Link>
                </div>
                <div className="header-tabs">
                    <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                        Personnages
                    </Link>
                    <Link to="/comics" className={location.pathname === "/comics" ? "active" : ""}>
                        Comics
                    </Link>
                    <Link to="/favorites" className={location.pathname === "/favorites" ? "active" : ""}>
                        Favoris
                    </Link>
                </div>
            </header>

            <div className="video-background">
                <video autoPlay loop muted>
                    <source src={MarvelVideo} type="video/mp4" />
                    Votre navigateur ne prend pas en charge les vidéos.
                </video>
            </div>
        </>
    );
}

export default Header;
