import React from "react";

export default function DropdownMenu() {
    return (
        <div className="dropdown-bar">
            <ul className="dropdown-root">
                <li>
                    <span>Nuestras Pastas ▾</span>
                    <ul className="dropdown-level">
                        <li>
                            <span>Pasta Fresca ▸</span>
                            <ul className="dropdown-sublevel">
                                <li><a href="#sorrentinos">Sorrentinos</a></li>
                                <li><a href="#agnolotis">Agnolotis</a></li>
                                <li><a href="#noquis">Ñoquis a la Romana</a></li>
                            </ul>
                        </li>
                        <li>
                            <span>Pasta Clásica ▸</span>
                            <ul className="dropdown-sublevel">
                                <li><a href="#tallarines">Tallarines</a></li>
                                <li><a href="#fideos">Fideos</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
