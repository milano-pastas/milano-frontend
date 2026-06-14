import React, { useState, useEffect } from "react";

const NAV_CAT_KEY = {
    "Pasta Fresca":       "PASTA_FRESCA",
    "Pasta Seca":         "PASTA_SECA",
    "Comidas Preparadas": "COMIDAS_PREPARADAS",
    Salsas:               "SALSAS",
    Postres:              "POSTRES",
    Bebidas:              "BEBIDAS",
};

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenu, setSubmenu]   = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [dark, setDark]         = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    const categories = {
        Pastas: {
            "Pasta Fresca": ["Ñoqui", "Ravioles", "Romanitos", "Sorrentinos", "Capeletis", "Canelones", "Lasaña"],
            "Pasta Seca":   ["Tallarines", "Moñas", "Moñitas"],
        },
        "Comidas Preparadas": ["Empanadas", "Pizza", "Rotisería"],
        Salsas:  ["Salsa carusso", "Salsa de queso", "Salsa pesto", "Tuco de carne", "Tuco de pollo", "Pomarola"],
        Postres: ["Torta de ricota", "Helados", "Panadería"],
        Bebidas: ["Agua mineral", "Refrescos", "Vinos"],
    };

    const catUrl = (cat) => `/productos?cat=${NAV_CAT_KEY[cat] || cat.toUpperCase().replace(/ /g, "_")}`;

    return (
        <header className="nav">
            <div className="nav-inner">
                {isMobile ? (
                    <>
                        <button className="menu-toggle" onClick={() => setMenuOpen(true)}>☰</button>
                        <div className="brand">
                            <a href="/">
                                <img src={dark ? "/milano-pastas-logo-inverted.jpg" : "/milano-pastas-logo.jpg"} alt="Milano Pastas" />
                            </a>
                        </div>
                        {/* espacio vacío para centrar el logo */}
                        <div style={{ width: 40 }} />

                        <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}>
                            {submenu ? (
                                <>
                                    <div className="mobile-menu-header">
                                        <button onClick={() => setSubmenu(null)}>←</button>
                                        <h3>{submenu}</h3>
                                        <div style={{ width: 36 }} />
                                    </div>
                                    {Array.isArray(categories[submenu])
                                        ? categories[submenu].map((item) => (
                                            <a
                                                key={item}
                                                href={catUrl(submenu)}
                                                className="mobile-menu-item"
                                                onClick={() => { setMenuOpen(false); setSubmenu(null); }}
                                            >
                                                {item}
                                            </a>
                                        ))
                                        : Object.entries(categories[submenu]).map(([subcat, items]) => (
                                            <div key={subcat} className="mobile-subcategory">
                                                <h4>
                                                    <a
                                                        href={catUrl(subcat)}
                                                        onClick={() => { setMenuOpen(false); setSubmenu(null); }}
                                                    >
                                                        {subcat}
                                                    </a>
                                                </h4>
                                                {items.map((i) => (
                                                    <a
                                                        key={i}
                                                        href={catUrl(subcat)}
                                                        className="mobile-menu-item"
                                                        onClick={() => { setMenuOpen(false); setSubmenu(null); }}
                                                    >
                                                        {i}
                                                    </a>
                                                ))}
                                                <a
                                                    href={catUrl(subcat)}
                                                    className="mobile-menu-item ver-todo"
                                                    onClick={() => { setMenuOpen(false); setSubmenu(null); }}
                                                >
                                                    Ver todo
                                                </a>
                                            </div>
                                        ))}
                                </>
                            ) : (
                                <>
                                    <div className="mobile-menu-header">
                                        <button onClick={() => setMenuOpen(false)}>✕</button>
                                        <h3>Menú</h3>
                                        <button
                                            className="theme-toggle"
                                            onClick={() => setDark(d => !d)}
                                            aria-label="Cambiar tema"
                                        >
                                            <i className={`fas fa-${dark ? "sun" : "moon"}`}></i>
                                        </button>
                                    </div>
                                    {Object.keys(categories).map((cat) => (
                                        <button
                                            key={cat}
                                            className="mobile-menu-item"
                                            onClick={() => setSubmenu(cat)}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                    <a
                                        className="ig"
                                        href="https://www.instagram.com/milano_pastas_/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Instagram
                                    </a>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="brand">
                            <a href="/">
                                <img src={dark ? "/milano-pastas-logo-inverted.jpg" : "/milano-pastas-logo.jpg"} alt="Milano Pastas" />
                            </a>
                        </div>

                        <ul className="nav-links">
                            {Object.keys(categories).map((cat) => (
                                <li className="has-dropdown" key={cat}>
                                    <span>{cat}</span>
                                    <ul className="dropdown-level">
                                        {Array.isArray(categories[cat])
                                            ? categories[cat].map((i) => (
                                                <li key={i}>
                                                    <a href={catUrl(cat)}>{i}</a>
                                                </li>
                                            ))
                                            : Object.entries(categories[cat]).map(([subcat, items]) => (
                                                <li key={subcat}>
                                                    <span>{subcat}</span>
                                                    <ul className="dropdown-sublevel">
                                                        {items.map((i) => (
                                                            <li key={i}>
                                                                <a href={catUrl(subcat)}>{i}</a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                    </ul>
                                </li>
                            ))}
                            <a className="ig" href="https://www.instagram.com/milano_pastas_/" target="_blank" rel="noreferrer">
                                Instagram
                            </a>
                            <button className="theme-toggle" onClick={() => setDark(d => !d)} aria-label="Cambiar tema">
                                <i className={`fas fa-${dark ? "sun" : "moon"}`}></i>
                            </button>
                        </ul>
                    </>
                )}
            </div>
        </header>
    );
}
