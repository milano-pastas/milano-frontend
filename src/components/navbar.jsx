import React from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <header className="nav">
            <div className="nav-inner container">
                <div className="brand">
                    <a href="/">
                        <img src="/milano-pastas-logo.jpg" alt="Milano Pastas" />
                    </a>
                </div>
                <nav className="links">
                    {isHome && (
                        <>
                            <a href="#productos">Productos</a>
                            <a href="#historia">La Fábrica</a>
                            <a href="#contacto">Contacto</a>
                        </>
                    )}
                    <a
                        className="ig"
                        href="https://www.instagram.com/milano_pastas_/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Instagram
                    </a>
                </nav>
            </div>
        </header>
    );
}
