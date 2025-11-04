import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="nav">
            <div className="nav-inner container">
                <div className="brand">
                    <a href="/">
                        <img src="/milano-pastas-logo.jpg" alt="Milano Pastas" />
                    </a>
                </div>

                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                </button>

                <nav className={`links ${menuOpen ? "open" : ""}`}>
                    {isHome && (
                        <>
                            <a href="#productos" onClick={() => setMenuOpen(false)}>
                                Productos
                            </a>
                            <a href="#historia" onClick={() => setMenuOpen(false)}>
                                La Fábrica
                            </a>
                            <a href="#contacto" onClick={() => setMenuOpen(false)}>
                                Contacto
                            </a>
                        </>
                    )}
                    <a
                        className="ig"
                        href="https://www.instagram.com/milano_pastas_/"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setMenuOpen(false)}
                    >
                        Instagram
                    </a>
                </nav>
            </div>
        </header>
    );
}
