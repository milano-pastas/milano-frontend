import React, { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenu, setSubmenu] = useState(null);

    const categories = {
        Pastas: {
            "Pasta Fresca": ["Laminada", "Rellena", "Prensa", "Artesanal", "Masas"],
            "Pasta Seca": ["Tallarines", "Moñas", "Moñitas"],
        },
        "Comidas Preparadas": ["Rotisería", "Pastas prontas", "Pizza", "Empanadas"],
        Salsas: [
            "Caruso",
            "Queso",
            "Puerro",
            "Rosa",
            "Pesto",
            "Tuco de carne",
            "Tuco de pollo",
            "Pomarola",
        ],
        Postres: ["Helados", "Pastelería", "Panadería"],
        Bebidas: ["Refrescos", "Aguas", "Vinos"],
    };

    const isMobile = window.innerWidth <= 768;

    return (
        <header className="nav">
            <div className="nav-inner">
                {isMobile ? (
                    <>
                        {/* 🔸 Modo móvil */}
                        <button className="menu-toggle" onClick={() => setMenuOpen(true)}>
                            ☰
                        </button>
                        <div className="brand">
                            <a href="/">
                                <img src="/milano-pastas-logo-black.jpg" alt="Milano Pastas" />
                            </a>
                        </div>

                        <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}>
                            {submenu ? (
                                <>
                                    <div className="mobile-menu-header">
                                        <button onClick={() => setSubmenu(null)}>←</button>
                                        <h3>{submenu}</h3>
                                    </div>
                                    {Array.isArray(categories[submenu])
                                        ? categories[submenu].map((item) => (
                                            <a
                                                key={item}
                                                href={`/productos?cat=${submenu.toUpperCase()}`}
                                                className="mobile-menu-item"
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                {item}
                                            </a>
                                        ))
                                        : Object.entries(categories[submenu]).map(([subcat, items]) => (
                                            <div key={subcat} className="mobile-subcategory">
                                                <h4>{subcat}</h4>
                                                {items.map((i) => (
                                                    <a
                                                        key={i}
                                                        href={`/productos?cat=${submenu.toUpperCase()}`}
                                                        className="mobile-menu-item"
                                                        onClick={() => setMenuOpen(false)}
                                                    >
                                                        {i}
                                                    </a>
                                                ))}
                                            </div>
                                        ))}
                                </>
                            ) : (
                                <>
                                    <div className="mobile-menu-header">
                                        <button onClick={() => setMenuOpen(false)}>✕</button>
                                        <h3>Menú</h3>
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
                        {/* 🔸 Modo desktop */}
                        <div className="brand">
                            <a href="/"><img src="/milano-pastas-logo-black.jpg" alt="Milano Pastas" /></a>
                        </div>

                        <ul className="nav-links">
                            {Object.keys(categories).map((cat) => (
                                <li className="has-dropdown" key={cat}>
                                    <span>{cat}</span>
                                    <ul className="dropdown-level">
                                        {Array.isArray(categories[cat])
                                            ? categories[cat].map((i) => (
                                                <li key={i}>
                                                    <a href={`/productos?cat=${cat.toUpperCase()}`}>{i}</a>
                                                </li>
                                            ))
                                            : Object.entries(categories[cat]).map(([subcat, items]) => (
                                                <li key={subcat}>
                                                    <span>{subcat}</span>
                                                    <ul className="dropdown-sublevel">
                                                        {items.map((i) => (
                                                            <li key={i}>
                                                                <a href={`/productos?cat=${cat.toUpperCase()}`}>{i}</a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                    </ul>
                                </li>
                            ))}
                            <a
                                className="ig"
                                href="https://www.instagram.com/milano_pastas_/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Instagram
                            </a>
                        </ul>
                    </>
                )}
            </div>
        </header>
    );
}
