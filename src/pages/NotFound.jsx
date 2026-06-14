import React from "react";

export default function NotFound() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <p>La página que buscás no existe o fue movida.</p>
            <div className="btn-group">
                <a href="/" className="btn">Ir al inicio</a>
                <a href="/productos" className="btn secondary">Ver productos</a>
            </div>
        </div>
    );
}
